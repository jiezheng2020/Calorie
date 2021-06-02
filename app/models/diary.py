from .db import db

class Diary(db.Model):
    __tablename__ = 'diaries'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    date = db.Column(db.DateTime, nullable=False)

    owner = db.relationship('User', back_populates='diaries_owned')
    diary_food = db.relationship('FoodEntry', back_populates='food_logged')
    diary_exercise = db.relationship('ExerciseEntry', back_populates='exercise_logged')


    def to_dict(self):
        return {
            "id": self.id,
            "owner": self.owner.to_dict(),
            "date": self.date.isoformat(),
            "diaryFoods": [food.to_dict() for food in self.diary_food],
            "diaryExercise": [exercise.to_dict() for exercise in self.diary_exercise]
        }
