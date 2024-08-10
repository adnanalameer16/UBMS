from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash

# Initialize Flask application
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///universityDB.db'  # Replace with your database URI
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Define the Student model
class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(100), nullable=False)
    lname = db.Column(db.String(100), nullable=False)
    dob = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(100), nullable=False)
    enroll_date = db.Column(db.String(100), nullable=False)
    class_id = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<Student {self.fname} {self.lname}>'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/addstudent')
def add_student():
    # Sample student data
    student_id = 1
    fname = "Gauthamkrishna"
    lname = "Binoy"
    dob = "2004-11-03"
    email = "gautham12321@gmail.com"
    phone = "7736687884"
    enroll_date = "2021-06-01"
    class_id = 1

    # Create a new student instance
    new_student = Student(
        id=student_id,
        fname=fname,
        lname=lname,
        dob=dob,
        email=email,
        phone=phone,
        enroll_date=enroll_date,
        class_id=class_id
    )

    # Add the student to the session and commit
    db.session.add(new_student)
    db.session.commit()

    return "Student added successfully!"

if __name__ == '__main__':
    app.run(debug=True)
