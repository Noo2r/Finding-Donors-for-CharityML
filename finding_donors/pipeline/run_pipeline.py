"""
Run Pipeline -- Full End-to-End (Stages 1-4)
=============================================
End-to-end runner that executes:
    - Stage 1: Data loading, inspection, EDA metrics & visualisations
    - Stage 2: Full preprocessing pipeline
    - Stage 3: Train/test split, naive baseline, CatBoost training
    - Stage 4: GridSearchCV hyperparameter tuning on CatBoost
    - Save: Persist best model artifacts for the Tkinter app

Usage (from the ``finding_donors/`` directory):
    python -m pipeline.run_pipeline

Or import and call ``run()`` programmatically.
"""

from .data_loader import load_data, inspect_data
from .eda import compute_key_metrics, print_summary, plot_feature_distributions
from .preprocessing import preprocess
from .export import export_preprocessed
from .training import split_data, naive_predictor, train_catboost
from .tuning import tune_catboost
from .model_io import save_model_artifacts


def run(
    csv_path: str = None,
    show_plots: bool = True,
    export_csv: bool = True,
    output_path: str = None,
    train_model: bool = True,
):
    """
    Execute the full Finding Donors pipeline (Stages 1-4).

    Parameters
    ----------
    csv_path : str or None
        Path to the census CSV file.  None uses the default path.
    show_plots : bool
        Whether to display matplotlib plots (disable for CI/testing).
    export_csv : bool
        Whether to export the preprocessed data to CSV (default True).
    output_path : str or None
        Custom path for the exported CSV. None uses the default.
    train_model : bool
        Whether to run Stages 3-4 (training + tuning). Default True.

    Returns
    -------
    dict
        ``features_final`` : pd.DataFrame
        ``income``          : pd.Series
        ``scaler``          : sklearn MinMaxScaler (fitted)
        ``metrics``         : dict of EDA key metrics
        ``best_model``      : CatBoostClassifier (tuned, if train_model=True)
        ``best_params``     : dict of best hyperparameters
        ``best_f_score``    : float -- F0.5 on test set
        ``best_accuracy``   : float -- accuracy on test set
        ``feature_columns`` : list[str] -- ordered column names
    """
    # -- Stage 1: Data Loading -------------------------------------------------
    print("\n" + "=" * 60)
    print("  STAGE 1 -- DATA EXPLORATION (EDA)")
    print("=" * 60 + "\n")

    if csv_path:
        df = load_data(csv_path)
    else:
        df = load_data()

    inspect_data(df)

    # Key metrics
    metrics = compute_key_metrics(df)
    print_summary(metrics)

    # Visualisations
    if show_plots:
        plot_feature_distributions(df)

    # -- Stage 2: Preprocessing ------------------------------------------------
    features_final, income, scaler = preprocess(df)

    # -- Export preprocessed data ----------------------------------------------
    exported_path = None
    if export_csv:
        if output_path:
            exported_path = export_preprocessed(features_final, income, output_path)
        else:
            exported_path = export_preprocessed(features_final, income)

    # Build result dict
    result = {
        "features_final": features_final,
        "income": income,
        "scaler": scaler,
        "metrics": metrics,
    }

    # -- Stages 3-4: Training & Tuning ----------------------------------------
    if train_model:
        print("\n" + "=" * 60)
        print("  STAGE 3 -- MODEL TRAINING & EVALUATION")
        print("=" * 60 + "\n")

        X_train, X_test, y_train, y_test = split_data(features_final, income)

        # Naive baseline
        baseline = naive_predictor(y_test)

        # Train unoptimized CatBoost
        unopt = train_catboost(X_train, y_train, X_test, y_test)

        # Stage 4: Tune CatBoost via GridSearchCV
        tuned = tune_catboost(X_train, y_train, X_test, y_test)

        # Save model artifacts
        feature_columns = list(features_final.columns)
        save_model_artifacts(tuned["best_model"], scaler, feature_columns)

        # Update result dict
        result.update({
            "best_model": tuned["best_model"],
            "best_params": tuned["best_params"],
            "best_f_score": tuned["f_test"],
            "best_accuracy": tuned["acc_test"],
            "feature_columns": feature_columns,
            "baseline": baseline,
            "unoptimized": {
                "acc_test": unopt["acc_test"],
                "f_test": unopt["f_test"],
            },
        })

        # Final summary
        print("\n" + "=" * 60)
        print("  PIPELINE COMPLETE -- SUMMARY")
        print("=" * 60)
        print(f"  Features matrix    : {features_final.shape[0]} samples x {features_final.shape[1]} features")
        print(f"  Naive baseline     : Acc={baseline['accuracy']:.4f}  F0.5={baseline['fscore']:.4f}")
        print(f"  Unoptimized CatBoost: Acc={unopt['acc_test']:.4f}  F0.5={unopt['f_test']:.4f}")
        print(f"  Tuned CatBoost     : Acc={tuned['acc_test']:.4f}  F0.5={tuned['f_test']:.4f}")
        print(f"  Best params        : {tuned['best_params']}")
        if exported_path:
            print(f"  Exported CSV       : {exported_path}")
        print(f"  Model saved to     : saved_model/")
        print("=" * 60 + "\n")
    else:
        # Summary without training
        print(">> Pipeline complete (preprocessing only)!")
        print(f"   - Features matrix : {features_final.shape[0]} samples x {features_final.shape[1]} features")
        print(f"   - Target vector   : {income.shape[0]} samples")
        print(f"   - Income=1 count  : {income.sum()}  ({round(100.0 * income.sum() / len(income), 2)}%)")
        if exported_path:
            print(f"   - Exported CSV    : {exported_path}")
        print()

    return result


# ---------------------------------------------------------------------------
# Allow running as:  python -m pipeline.run_pipeline
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    run()
