# backend/qg_model.py
import sys
import json
from transformers import PegasusTokenizer, PegasusForConditionalGeneration

model_name = "google/pegasus-xsum"
tokenizer = PegasusTokenizer.from_pretrained(model_name)
model = PegasusForConditionalGeneration.from_pretrained(model_name)

def generate_questions(text):
    tokens = tokenizer(text, truncation=True, padding="longest", return_tensors="pt")
    output = model.generate(**tokens, max_length=60, num_return_sequences=3)
    questions = tokenizer.batch_decode(output, skip_special_tokens=True)
    return questions

if __name__ == "__main__":
    input_text = sys.stdin.read()
    data = json.loads(input_text)
    text = data.get("text", "")
    questions = generate_questions(text)
    print(json.dumps({"questions": questions}))
