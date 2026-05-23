# Finding Donors for CharityML

![Python 3.10+](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat&logo=python&logoColor=white)
![Flask 3.1](https://img.shields.io/badge/Flask-3.1-000000?style=flat&logo=flask&logoColor=white)
![React 19](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)
![CatBoost 1.2](https://img.shields.io/badge/CatBoost-1.2-FFC107?style=flat)
![D3.js 7](https://img.shields.io/badge/D3.js-7-F9A03C?style=flat&logo=d3.js&logoColor=white)
![License DEPI](https://img.shields.io/badge/License-DEPI-007EC6?style=flat)

## Project Overview

This project builds a full-stack machine learning application to predict whether an individual earns more than $50,000 annually. The prediction model relies on census data and helps CharityML accurately target potential donors.

The application architecture consists of:
- A tuned CatBoost machine learning model.
- A Flask REST API backend to serve predictions.
- A modern React web interface for the dashboard.

## Project Structure

- `frontend/`: The React web application containing the user interface.
- `backend/`: The Flask API that loads the model and handles prediction requests.
- `saved_model/`: Contains the trained CatBoost model and data scaling artifacts.
- `pipeline/`: Python scripts used for preprocessing, hyperparameter tuning, and training the model.

## How to Run Locally

To run the application locally, you will need to start both the Python backend server and the React frontend development server.

### Prerequisites

Ensure you have the following installed:
- Python 3.10 or higher
- Node.js and npm (Node Package Manager)

### Step 1: Clone the Repository

If you haven't already downloaded the project, clone it using Git and navigate to the project directory:
```bash
git clone https://github.com/Hazem-Amr/ML-Finding-Donors-Project.git
cd finding_donors
```

*(Note: If you downloaded the project as a ZIP file, simply extract it and open your terminal inside the `finding_donors` directory).*

### Step 2: Start the Backend (Flask)

1. Open a terminal in the `finding_donors` directory.
2. Install the required Python dependencies using the included requirements file:
   ```bash
   pip install -r requirements.txt
   ```
3. Navigate to the backend directory and start the server:
   ```bash
   cd backend
   python backend.py
   ```
4. The Flask API will start running on `http://localhost:5000`. Leave this terminal open.

### Step 3: Start the Frontend (React)

1. Open a second terminal window and navigate to the `frontend` directory inside the project root:
   ```bash
   cd frontend
   ```
2. Install the Node.js dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. The frontend will typically start running on `http://localhost:3000`.

### Step 4: View the Application

Open your web browser and navigate to the address provided by the Vite server (e.g., `http://localhost:3000`). You can now input subject data on the left panel and click "Predict Donor Potential" to see the machine learning model execute in real-time.

## Dataset Information

The census dataset consists of approximately 32,000 data points, with each datapoint having 13 features. This dataset is a modified version of the dataset published in the paper "Scaling Up the Accuracy of Naive-Bayes Classifiers: a Decision-Tree Hybrid", by Ron Kohavi.

**Features**
- age: Age
- workclass: Working Class
- education_level: Level of Education
- education-num: Number of educational years completed
- marital-status: Marital status
- occupation: Work Occupation
- relationship: Relationship Status
- race: Race
- sex: Sex
- capital-gain: Monetary Capital Gains
- capital-loss: Monetary Capital Losses
- hours-per-week: Average Hours Per Week Worked
- native-country: Native Country

**Target Variable**
- income: Income Class (<=50K, >50K)
