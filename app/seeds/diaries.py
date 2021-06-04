from app.models import db,Diary
from datetime import datetime

def seed_diaries():
    demo = Diary(
        user_id =1,
        date= datetime.utcnow())

    db.session.add(demo)
    db.session.commit()

def undo_diaries():
    db.session.execute('TRUNCATE diaries RESTART IDENTITY CASCADE;')
    db.session.commit()