# 🛡️ Phishing Link Detection with Homograph Attack Detection

![Python Version](https://img.shields.io/badge/Python-3.10.14-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Machine Learning](https://img.shields.io/badge/Machine%20Learning-Enabled-blue)

## 📜 Overview

This project is a Machine Learning-based **Phishing Link Detection System** that also includes a **Homograph Attack Detection** module. Homograph attacks exploit visually similar characters in URLs, making phishing links appear legitimate. This project detects phishing links and identifies homograph attacks to protect users from potential phishing scams.

> **Note**: This project is designed to work with **Python 3.10.14**.

---

## 🧰 Features

- **Phishing Link Detection**: Uses machine learning algorithms to classify URLs as legitimate or phishing.
- **Homograph Attack Detection**: Identifies URLs that use homograph attacks to mimic legitimate domains.
- **Configurable**: Easily switch between detection modes and adjust parameters as needed.
- **Modular**: Separate backend API and frontend components, enabling easy integration.

---

## 📂 Project Structure

```plaintext
phishing-detection-project/
├── backend/                                          # FastAPI backend with model serving
│   ├── main.py                                       # Main application file for FastAPI
│   ├── model.py                                      # model file with perdiction functions
│   ├── model/                                        # Machine learning model folder
│       ├── phishing_ensemble_model.joblib            # Machine learning model used in this project
│   ├── requirements.txt                              # Backend dependencies
├── websentry/                                        # Next.js frontend for user interaction
│   ├── src/                                          # Next.js src folder
│      ├── app/                                       # UI components
│          ├── page.js/                               # Next.js page for UI
│   ├── package.json                                  # Frontend dependencies
└── README.md                                         # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- **Python 3.10.14** is required. You can download it [here](https://www.python.org/downloads/).
- **Node.js and npm** (for running the frontend Next.js app). Download from [Node.js](https://nodejs.org/).

### Backend Setup (FastAPI)

1. **Navigate to the Backend Directory**:
   ```bash
   cd backend
   ```

2. **Install Dependencies**:
   ```bash
   python3.10 -m venv env          # Create a virtual environment
   source env/bin/activate         # Activate the virtual environment
   pip install -r requirements.txt  # Install required packages
   ```

3. **Run the FastAPI Server**:
   ```bash
   uvicorn app:app --reload
   ```
   The FastAPI server will be available at `http://127.0.0.1:8000`.


### Frontend Setup (Next.js)

1. **Navigate to the Frontend Directory**:
   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Frontend Server**:
   ```bash
   npm run dev
   ```
   The Next.js frontend will be available at `http://localhost:3000`.


---

## 🛠️ Usage

1. **Access the Application**:
   Open your web browser and go to `http://localhost:3000`.

2. **Submit a URL**:
   - Enter a URL in the provided input field to check for phishing characteristics.
   - The backend will analyze the URL using machine learning to determine if it is legitimate or phishing.

3. **View Results**:
   - The frontend displays results, showing the probability of the URL being phishing or legitimate.
   - If the URL contains a homograph attack, an alert will notify the user.


---

## 🧪 Testing & Examples

Here are some example URLs to test the application:

- **Legitimate URL**: `https://example.com`
- **Phishing URL**: `https://example-login.com`
- **Homograph Attack**: `https://exаmple.com` (notice the use of a Cyrillic "а" instead of the Latin "a")

---

## 🧠 Machine Learning Model

The phishing link detection is based on a trained **machine learning model** that evaluates various features of the URL, such as:

- URL length
- Presence of suspicious keywords
- Domain similarity (for homograph attacks)

The model was trained on a labeled dataset of phishing and legitimate URLs, using techniques like **NLP** and **character similarity scoring** for homograph detection.

---

## 👥 Project Team

| Name   | Roll_no    |
|--------|------------|
| Sujith | M240597CS  |
| Nabeel | M240464CS  |

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### 📞 Contact

For questions, feedback, or collaboration, please contact us at:

- **Sujith**: sujith_m240597cs@nitc.ac.in
- **Nabeel**: nabeel_m240464cs@nitc.ac.in

---