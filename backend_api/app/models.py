from .extensions import db # Assuming extensions.py initializes SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash 
from flask_login import UserMixin
from datetime import datetime

# buat model untuk user dan file metadata
class Data(db.Model, UserMixin):
    __tablename__ = "data"

    id = db.Column(db.Integer, primary_key=True)
    Goal = db.Column(db.String(80), nullable=False)
    Rule_1 = db.Column(db.String(120), nullable=False)
    Rule_2 = db.Column(db.String(120), nullable=False)
    Rule_3 = db.Column(db.String(120), nullable=False)
    Value = db.Column(db.String(120), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

