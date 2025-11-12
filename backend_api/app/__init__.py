from flask import Flask # import flask framework
import os

# import module
from .config import Config 
from .extensions import db, migrate
from .api.routes import api_bp

def create_app():
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)

    # load config default
    app.config.from_object(Config)

    # optional instance config (overrides)
    instance_cfg = os.path.join(app.instance_path, "config.py")
    if os.path.exists(instance_cfg):
        app.config.from_pyfile(instance_cfg)
    
    # env overrides
    if os.getenv("DATABASE_URL"):
        app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")

    # extensions
    db.init_app(app)
    migrate.init_app(app, db)

    # blueprints
    app.register_blueprint(api_bp, url_prefix="/api")

    @app.route("/")
    def index():
        return {"message": "Flask RESTful API berjalan"}, 200

    return app