from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import text
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
class Class(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    course_id = db.Column(db.Integer, nullable=False)
    faculty_id = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<Class {self.name}>'
class faculty(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(100), nullable=False)
    lname = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(100), nullable=False)
    department_id = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<Faculty {self.fname} {self.lname}>'
class Department(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    head = db.Column(db.Integer, nullable=False)
    def __repr__(self):
        return f'<Department {self.name}>'
class Courses(db.Model):
    course_id = db.Column(db.Integer, primary_key=True)
    course_name = db.Column(db.String(100), nullable=False)
    department_id = db.Column(db.Integer, nullable=False)
    credits = db.Column(db.Integer, nullable=False),
    semester = db.Column(db.String(100), nullable=False)
    def __repr__(self):
        return f'<Course {self.name}>'
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

@app.route('/addclass')
def add_class():
    new_class = Class(
        id=1,
        name="Math",
        course_id=1,
        faculty_id=1
    )



    # Add the student to the session and commit
    db.session.add(new_class)
    db.session.commit()

    return "Class added successfully!"

@app.route('/addfaculty')
def add_faculty():
    new_faculty = faculty(
        id=1,
        fname="John",
        lname="Doe",
        email="joh@gmail.com",
        phone="7736687884",
        department_id=1)
    db.session.add(new_faculty)
    db.session.commit()
    return "Faculty added successfully!"

@app.route('/adddepartment')
def add_department():
    new_department = Department(
        id=1,
        name="CS",
        head=1
    )
    db.session.add(new_department)
    db.session.commit()
    return "Department added successfully!"
@app.route('/addcourse')
def add_course():
    new_course = Courses(
        course_id=1,
        course_name="Math",
        department_id=1,
        credits=4,
        semester="1"
    )
    db.session.add(new_course)
    db.session.commit()
    return "Course added successfully!"

@app.route('/displaystudents')
def display_students():
    sql = text('SELECT * FROM Student')
    result= db.session.execute(sql)
    return result.fetchall().__str__()
if __name__ == '__main__':
    app.run(debug=True)
