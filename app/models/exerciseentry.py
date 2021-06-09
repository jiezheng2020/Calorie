from .db import db

class ExerciseEntry(db.Model):
    __tablename__='exerciseEntries'

    id = db.Column(db.Integer, primary_key = True)
    exercise_id = db.Column(db.Integer, db.ForeignKey('exercises.id'), nullable=False)
    diary_id = db.Column(db.Integer, db.ForeignKey('diaries.id'), nullable=False)
    totalCalories = db.Column(db.Integer, nullable=False)

    exercise = db.relationship('Exercise', back_populates='exercise_entries')
    exercise_logged = db.relationship('Diary', back_populates='diary_exercise')

    def to_dict(self):
        return {
            "id": self.id,
            "exercise": self.exercise.to_dict(),
            "diaryId": self.diary_id,
            "totalCalories": self.totalCalories
        }
