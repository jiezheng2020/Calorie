from .db import db

class Exercise(db.Model):
    __tablename__='exercises'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(50), nullable=False)
    cpm = db.Column(db.Integer, nullable=False)
    exerciseType = db.Column(db.String(20), nullable=False)

    exercise_entries = db.relationship('ExerciseEntry', back_populates='exercise')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "cpm": self.cpm,
            "exerciseType": self.exerciseType
        }
