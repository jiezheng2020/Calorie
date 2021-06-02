from .db import db

class CalorieProgress(db.Model):
    __tablename__='calorieProgress'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    netCalories = db.Column(db.String(20), nullable=False)

    calorie_owner = db.relationship('User', back_populates='calorie_progress')

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "date": self.date.isoformat(),
            "netCalories": self.netCalories
        }