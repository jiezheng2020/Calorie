from app.models import db,ExerciseEntry,Exercise
from random import randint, choice



def seed_exerciseEntries():
    entries = []
    for i in range(1,100):
        ExerciseId = randint(1,36)

        entry = ExerciseEntry(exercise_id=ExerciseId,
        diary_id=randint(1,14),
        totalCalories= randint(100,300))

        entries.append(entry)

    db.session.add_all(entries)
    db.session.commit()




def undo_exerciseEntries():
    db.session.execute('TRUNCATE "exerciseEntries" RESTART IDENTITY CASCADE;')
    db.session.commit()