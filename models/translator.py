import sys
import torch
from transformers import MarianMTModel, MarianTokenizer


def translate_text(text): 
    model_name = "Helsinki-NLP/opus-mt-en-nl"

    # Load tokenizer & model
    tokenizer = MarianTokenizer.from_pretrained(model_name)
    model = MarianMTModel.from_pretrained(model_name)

    # Tokenization
    batch = tokenizer([text], return_tensors="pt", padding=True)

    # Generate translation
    translated = model.generate(**batch)

    # Decode the genreated tokens
    result = tokenizer.batch_decode(translated, skip_spceial_tokens=True)[0]
    return result
