# import necessary Flask extensions and initialize them from requirement.txt
from flask_sqlalchemy import SQLAlchemy # SQLAlchemy for database ORM flask-sqlalchemy
from flask_migrate import Migrate # flask-migrate for database migrations

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()