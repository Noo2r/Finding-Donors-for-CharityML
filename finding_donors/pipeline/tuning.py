"""
Stage 4 -- Model Tuning
========================
Hyperparameter tuning for CatBoostClassifier using manual cross-validation
with F-beta (beta=0.5) scoring. Uses ALL features.

Note: Uses manual CV loop instead of sklearn GridSearchCV to avoid
compatibility issues between CatBoost 1.2.x and sklearn 1.8+.
"""

from typing import Dict, Any, List
from itertools import product

import numpy as np
import pandas as pd
from sklearn.model_selection import StratifiedKFold
from sklearn.metrics import fbeta_score, accuracy_score
from catboost import CatBoostClassifier


def tune_catboost(
    X_train: pd.DataFrame,
    y_train: pd.Series,
    X_test: pd.DataFrame,
    y_test: pd.Series,
    random_state: int = 42,
    cv: int = 5,
) -> Dict[str, Any]:
    """
    Perform grid search on CatBoostClassifier over a predefined parameter grid
    using manual StratifiedKFold cross-validation.

    Parameters
    ----------
    X_train, y_train : training data (ALL features).
    X_test, y_test   : held-out test data for final evaluation.
    random_state : int
        Seed for the base estimator.
    cv : int
        Number of cross-validation folds.

    Returns
    -------
    dict
        ``best_model``     -- the best CatBoostClassifier (refit on full train)
        ``best_params``    -- dict of best hyperparameters
        ``best_cv_score``  -- best cross-validated F0.5 score
        ``acc_test``       -- accuracy on the test set
        ``f_test``         -- F0.5 score on the test set
    """
    print("\n" + "=" * 60)
    print("  STAGE 4 -- HYPERPARAMETER TUNING (Manual Grid Search)")
    print("=" * 60 + "\n")

    param_grid = {
        "iterations": [100, 500, 1000],
        "depth": [4, 6, 8],
        "learning_rate": [0.01, 0.05, 0.1],
    }

    print(f"  Parameter grid: {param_grid}")
    print(f"  CV folds: {cv}")
    print(f"  Scoring: F-beta (beta=0.5)")
    print(f"  Training on ALL {X_train.shape[1]} features...")
    print()

    # Generate all parameter combinations
    keys = list(param_grid.keys())
    values = list(param_grid.values())
    combos = list(product(*values))
    total = len(combos)

    X_arr = X_train.values if hasattr(X_train, 'values') else np.array(X_train)
    y_arr = y_train.values if hasattr(y_train, 'values') else np.array(y_train)

    skf = StratifiedKFold(n_splits=cv, shuffle=True, random_state=random_state)

    best_score = -1.0
    best_params = {}
    combo_count = 0

    for combo in combos:
        params = dict(zip(keys, combo))
        combo_count += 1

        fold_scores = []
        for train_idx, val_idx in skf.split(X_arr, y_arr):
            clf = CatBoostClassifier(
                random_state=random_state, verbose=0, **params
            )
            clf.fit(X_arr[train_idx], y_arr[train_idx])
            preds = clf.predict(X_arr[val_idx])
            score = fbeta_score(y_arr[val_idx], preds, beta=0.5)
            fold_scores.append(score)

        mean_score = np.mean(fold_scores)

        if combo_count % 5 == 0 or combo_count == total:
            print(f"  [{combo_count}/{total}] {params} -> CV F0.5 = {mean_score:.4f}")

        if mean_score > best_score:
            best_score = mean_score
            best_params = params

    # Refit best model on full training data
    print(f"\n  Refitting best model on full training data...")
    best_clf = CatBoostClassifier(
        random_state=random_state, verbose=0, **best_params
    )
    best_clf.fit(X_train, y_train)

    # Evaluate on test set
    best_predictions = best_clf.predict(X_test)
    acc = accuracy_score(y_test, best_predictions)
    f_score = fbeta_score(y_test, best_predictions, beta=0.5)

    print(f"\n[OK] Best parameters: {best_params}")
    print(f"[OK] Best CV F0.5 score: {best_score:.4f}")
    print(f"[OK] Optimized model on test set:")
    print(f"     Accuracy = {acc:.4f}")
    print(f"     F0.5     = {f_score:.4f}")
    print("=" * 60 + "\n")

    return {
        "best_model": best_clf,
        "best_params": best_params,
        "best_cv_score": best_score,
        "acc_test": acc,
        "f_test": f_score,
    }
