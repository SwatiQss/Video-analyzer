# transcribe.py
import sys
import whisper

def transcribe(audio_path):
    model = whisper.load_model("base")
    result = model.transcribe(audio_path)
    return result["text"]

if __name__ == "__main__":
    audio_file = sys.argv[1]
    print(transcribe(audio_file))
