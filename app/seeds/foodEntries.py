from app.models import db,FoodEntry,Food
from random import randint, choice



def seed_foodEntries():
    entries = []
    for i in range(1,100):
        foodId = randint(1,250)
        food = Food.query.get(foodId)

        entry = FoodEntry(food_id=foodId,
        diary_id=randint(1,14),
        mealType=choice(["breakfast","lunch","dinner"]),
        totalCalories=food.to_dict()['calories'])

        entries.append(entry)

    db.session.add_all(entries)
    db.session.commit()




def undo_foodEntries():
    db.session.execute('TRUNCATE "foodEntries" RESTART IDENTITY CASCADE;')
    db.session.commit()