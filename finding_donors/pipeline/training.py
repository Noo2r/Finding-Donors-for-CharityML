"""
Stage 3 -- Model Training & Evaluation
=======================================
Train/test split and CatBoost model training with evaluation metrics.
"""

from typing import Tuple, Dict, Any
from time import time

import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import fbeta_score, accuracy_score
from catboost import CatBoostClassifier


def split_data(
    features: pd.DataFrame,
    income: pd.Series,
    test_size: float = 0.2,
    random_state: int = 0,
) -> Tuple[pd.DataFrame, pd.DataFrame, pd.Series, pd.Series]:
    """
    Split preprocessed features and target into train/test sets.

    Parameters
    ----------
    features : pd.DataFrame
        Fully preprocessed feature matrix.
    income : pd.Series
        Binary-encoded target (0 / 1).
    test_size : float
        Fraction of data to reserve for testing.
    random_state : int
        Seed for reproducibility.

    Returns
    -------
    (X_train, X_test, y_train, y_test)
    """
    X_train, X_test, y_train, y_test = train_test_split(
        features, income, test_size=test_size, random_state=random_state
    )
    print(f"[OK] Data split: {X_train.shape[0]} training / {X_test.shape[0]} testing samples.")
    return X_train, X_test, y_train, y_test


def naive_predictor(y_test: pd.Series, beta: float = 0.5) -> Dict[str, float]:
    """
    Compute baseline metrics for a naive predictor that always predicts >50K.

    Returns
    -------
    dict
        ``accuracy`` and ``fscore`` of the naive predictor.
    """
    TP = int(y_test.sum())
    FP = len(y_test) - TP
    TN = 0
    FN = 0

    accuracy = (TP + TN) / (TP + TN + FP + FN)
    recall = TP / (TP + FN) if (TP + FN) > 0 else 0
    precision = TP / (TP + FP) if (TP + FP) > 0 else 0
    fscore = (
        (1 + beta ** 2) * (precision * recall) / (beta ** 2 * precision + recall)
        if (beta ** 2 * precision + recall) > 0
        else 0
    )

    print(f"[OK] Naive Predictor: Accuracy = {accuracy:.4f}, F-score (beta={beta}) = {fscore:.4f}")
    return {"accuracy": accuracy, "fscore": fscore}


def train_catboost(
    X_train: pd.DataFrame,
    y_train: pd.Series,
    X_test: pd.DataFrame,
    y_test: pd.Series,
    random_state: int = 42,
    verbose: int = 0,
) -> Dict[str, Any]:
    """
    Train a default CatBoostClassifier and evaluate on train/test sets.

    Returns
    -------
    dict
        ``model``      -- the fitted CatBoostClassifier
        ``acc_test``   -- accuracy on test set
        ``f_test``     -- F0.5 score on test set
        ``train_time`` -- seconds to train
        ``pred_time``  -- seconds to predict
    """
    print("\n" + "-" * 50)
    print("  Training CatBoostClassifier (default params)")
    print("-" * 50)

    clf = CatBoostClassifier(random_state=random_state, verbose=verbose)

    start = time()
    clf.fit(X_train, y_train)
    train_time = time() - start

    start = time()
    predictions = clf.predict(X_test)
    pred_time = time() - start

    acc = accuracy_score(y_test, predictions)
    f_score = fbeta_score(y_test, predictions, beta=0.5)

    print(f"[OK] Unoptimized CatBoost:")
    print(f"     Accuracy  = {acc:.4f}")
    print(f"     F0.5      = {f_score:.4f}")
    print(f"     Train time = {train_time:.2f}s | Predict time = {pred_time:.4f}s")

    return {
        "model": clf,
        "acc_test": acc,
        "f_test": f_score,
        "train_time": train_time,
        "pred_time": pred_time,
    }
