from app.models import db,Food
from .foodArr import foodArray


def seed_foods():
    db.session.add_all(foodArray)
    db.session.commit()


def undo_foods():
    db.session.execute('TRUNCATE foods RESTART IDENTITY CASCADE;')
    db.session.commit()