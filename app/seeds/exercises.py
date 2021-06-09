from app.models import db, Exercise
from .exerciseArr import exerciseArr

def seed_exercises():
    db.session.add_all(exerciseArr)
    db.session.commit()

def undo_exercises():
    db.session.execute('TRUNCATE exercises RESTART IDENTITY CASCADE;')
    db.session.commit()