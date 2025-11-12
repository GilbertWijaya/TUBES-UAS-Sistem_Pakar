from app import create_app
from dotenv import load_dotenv
import os

load_dotenv() # Load environment variables from .env file
app = create_app() # initialize the Flask app

# jalankan file ini untuk menjalankan aplikasi pada port 5000 atau port yang ditentukan di .env
if __name__ == '__main__':
    app.run(host="0.0.0.0",port=int(os.getenv("PORT", 5000)), debug=os.getenv("DEBUG", "False") == "True")