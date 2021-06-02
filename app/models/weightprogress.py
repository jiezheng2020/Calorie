from .db import db

class WeightProgress(db.Model):
    __tablename__='weightProgress'

    id = db.Column(db.Integer, primary_key = True)
    weight = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    date = db.Column(db.DateTime, nullable=False)

    progress_owner = db.relationship('User', back_populates='weight_progress')

    def to_dict(self):
        return {
            "id": self.id,
            "weight": self.weight,
            "userId": self.user_id,
            "date": self.date.isoformat()
        }