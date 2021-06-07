from app.models import db,Diary
from datetime import datetime, timedelta


def seed_diaries():
    diaries = []

    for i in range(14):
        diary = Diary(
            user_id=1,
            date= datetime.utcnow() + timedelta(days=i)
        )
        diaries.append(diary)


    db.session.add_all(diaries)
    db.session.commit()

def undo_diaries():
    db.session.execute('TRUNCATE diaries RESTART IDENTITY CASCADE;')
    db.session.commit()