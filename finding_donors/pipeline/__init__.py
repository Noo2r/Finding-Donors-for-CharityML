"""
Finding Donors Pipeline Package
================================
Modular pipeline for the CharityML Finding Donors project.

Stage 1: Data Exploration (EDA)
Stage 2: Data Preprocessing
Stage 3: Model Training & Evaluation
Stage 4: Hyperparameter Tuning (GridSearchCV)
"""

from .data_loader import load_data, inspect_data
from .eda import compute_key_metrics, print_summary, plot_feature_distributions
from .preprocessing import (
    check_missing,
    handle_missing,
    remove_duplicates,
    log_transform_skewed,
    normalize_numerical,
    encode_target,
    one_hot_encode,
    preprocess,
)
from .export import export_preprocessed
from .training import split_data, naive_predictor, train_catboost
from .tuning import tune_catboost
from .model_io import save_model_artifacts, load_model_artifacts

__all__ = [
    # Stage 1 - Data Loading
    "load_data",
    "inspect_data",
    # Stage 1 - EDA
    "compute_key_metrics",
    "print_summary",
    "plot_feature_distributions",
    # Stage 2 - Data Cleaning
    "check_missing",
    "handle_missing",
    "remove_duplicates",
    # Stage 2 - Transform / Scale / Encode
    "log_transform_skewed",
    "normalize_numerical",
    "encode_target",
    "one_hot_encode",
    "preprocess",
    # Export
    "export_preprocessed",
    # Stage 3 - Training
    "split_data",
    "naive_predictor",
    "train_catboost",
    # Stage 4 - Tuning
    "tune_catboost",
    # Model I/O
    "save_model_artifacts",
    "load_model_artifacts",
]
