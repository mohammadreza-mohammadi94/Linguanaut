# 🌍 Text Translator & Summarizer

A simple web app built with Flask that provides two main features:

* ✏️ **Text Summarization**
* 🌐 **Text Translation (English to Dutch)**

---

## 🚀 Features

* **Summarize** long English texts using BART (facebook/bart-large-cnn)
* **Translate** English texts into Dutch using MarianMT (Helsinki-NLP/opus-mt-en-nl)
* Easy-to-use web interface (HTML + Flask backend)
* REST API endpoints for integration

---

## 📁 Project Structure

```
.
├── app.py                  # Flask application
├── templates/
│   └── index.html          # Web interface
├── models/
│   ├── summarizer.py       # Summarization logic
│   └── translator.py       # Translation logic
```

---

## 🛠 Requirements

* Python 3.7+
* Flask
* Transformers (HuggingFace)
* Torch

Install dependencies with:

```bash
pip install flask transformers torch
```

---

## 💡 Usage

Start the app with:

```bash
python app.py
```

Then visit `http://localhost:5000` in your browser.

---

## 🧠 API Endpoints

* `POST /api/summarize`
  **Input:** `{ "text": "Your long text" }`
  **Output:** `{ "summary": "..." }`

* `POST /api/translate`
  **Input:** `{ "text": "Hello world" }`
  **Output:** `{ "translation": "Hallo wereld" }`
