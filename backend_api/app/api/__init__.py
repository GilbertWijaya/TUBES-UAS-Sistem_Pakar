# This file initializes the API blueprint for the Flask application.
from flask import Blueprint

api_bp = Blueprint("api", __name__)

from . import routes  # noqa