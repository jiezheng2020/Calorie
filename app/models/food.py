from .db import db

class Food(db.Model):
    __tablename__='foods'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(50), nullable=False)
    calories = db.Column(db.Integer, nullable=False)
    foodType = db.Column(db.String(20), nullable=False)

    food_entries = db.relationship('FoodEntry', back_populates='food')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "calories": self.calories,
            "foodType": self.foodType
        }