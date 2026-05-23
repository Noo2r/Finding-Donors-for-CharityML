"""
Model I/O -- Save & Load Trained Model Artifacts
=================================================
Persist the tuned CatBoost model, fitted scaler, and feature column
order so the Tkinter app can load them for inference.
"""

import os
from typing import Tuple, List

import joblib
from sklearn.preprocessing import MinMaxScaler


def save_model_artifacts(
    model,
    scaler: MinMaxScaler,
    feature_columns: List[str],
    output_dir: str = None,
) -> str:
    """
    Save trained model, scaler, and feature column names to disk.

    Parameters
    ----------
    model : fitted CatBoostClassifier
    scaler : fitted MinMaxScaler
    feature_columns : list[str]
        Ordered list of one-hot-encoded column names from training.
    output_dir : str or None
        Directory to save into. Defaults to ``finding_donors/saved_model/``.

    Returns
    -------
    str
        Absolute path of the output directory.
    """
    if output_dir is None:
        output_dir = os.path.join(
            os.path.dirname(os.path.dirname(__file__)), "saved_model"
        )

    os.makedirs(output_dir, exist_ok=True)

    model_path = os.path.join(output_dir, "model.joblib")
    scaler_path = os.path.join(output_dir, "scaler.joblib")
    columns_path = os.path.join(output_dir, "feature_columns.joblib")

    joblib.dump(model, model_path)
    joblib.dump(scaler, scaler_path)
    joblib.dump(list(feature_columns), columns_path)

    abs_dir = os.path.abspath(output_dir)
    print(f"[OK] Model artifacts saved to: {abs_dir}")
    print(f"     - model.joblib           ({os.path.getsize(model_path)} bytes)")
    print(f"     - scaler.joblib          ({os.path.getsize(scaler_path)} bytes)")
    print(f"     - feature_columns.joblib ({os.path.getsize(columns_path)} bytes)")

    return abs_dir


def load_model_artifacts(
    input_dir: str = None,
) -> Tuple:
    """
    Load saved model artifacts from disk.

    Parameters
    ----------
    input_dir : str or None
        Directory containing the saved artifacts.
        Defaults to ``finding_donors/saved_model/``.

    Returns
    -------
    (model, scaler, feature_columns)
        model           : CatBoostClassifier
        scaler          : MinMaxScaler
        feature_columns : list[str]
    """
    if input_dir is None:
        input_dir = os.path.join(
            os.path.dirname(os.path.dirname(__file__)), "saved_model"
        )

    model = joblib.load(os.path.join(input_dir, "model.joblib"))
    scaler = joblib.load(os.path.join(input_dir, "scaler.joblib"))
    feature_columns = joblib.load(os.path.join(input_dir, "feature_columns.joblib"))

    print(f"[OK] Model artifacts loaded from: {os.path.abspath(input_dir)}")
    print(f"     Features: {len(feature_columns)} columns")

    return model, scaler, feature_columns
