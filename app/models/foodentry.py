from .db import db

class FoodEntry(db.Model):
    __tablename__='foodEntries'

    id = db.Column(db.Integer, primary_key = True)
    food_id = db.Column(db.Integer, db.ForeignKey('foods.id'), nullable=False)
    diary_id = db.Column(db.Integer, db.ForeignKey('diaries.id'), nullable=False)
    mealType = db.Column(db.String(20), nullable=False)
    totalCalories = db.Column(db.Integer, nullable=False)

    food = db.relationship('Food', back_populates='food_entries')
    food_logged = db.relationship('Diary', back_populates='diary_food')

    def to_dict(self):
        return {
            "id": self.id,
            "food": self.food.to_dict(),
            "diaryId": self.diary_id,
            "mealType": self.mealType,
            "totalCalories": self.totalCalories
        }
