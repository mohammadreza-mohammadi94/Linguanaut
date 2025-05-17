from transformers import AutoModelForSeq2SeqLM, AutoTokenizer

def summarize_text(text, model_name="facebook/bart-large-cnn"):
    # Tokenization
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForSeq2SeqLM.from_pretrained(model_name)

    # Tokenization input
    inputs = tokenizer([text], 
                       max_length=1024, 
                       return_tensors='pt',
                       truncation=True)
    summary_ids = model.generate(
        inputs['input_ids'],
        num_beams = 4,
        min_length=30,
        max_length=150,
        early_stopping=True
    )

    # Decode the summary
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    return summary