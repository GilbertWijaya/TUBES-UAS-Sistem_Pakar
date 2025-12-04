# This file initializes the API blueprint for the Flask application.
from flask import Blueprint

rule_api_bp = Blueprint("rule_api", __name__)

from . import routes  # noqa