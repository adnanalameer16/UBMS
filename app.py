from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import text
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

# Initialize Flask application
app = Flask(__name__,static_url_path='/static',template_folder='templates')
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
class Enrollments(db.Model):
    enrollment_id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, primary_key=False)
    class_id = db.Column(db.Integer, primary_key=False)
    def __repr__(self):
        return f'<Enrollments {self.student_id} {self.class_id}>'
class Grades(db.Model):
    grade_id = db.Column(db.Integer, primary_key=True)
    enrollment_id = db.Column(db.Integer, primary_key=False)

    grade = db.Column(db.String(100), nullable=False)
    grade_date = db.Column(db.String(100), primary_key=False)
    def __repr__(self):
        return f'<Grades {self.student_id} {self.class_id}>'
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/addstudent',methods=['POST'])
def add_student():
    # Sample student data
    data=request.get_json()
    student_id = data.get('student_id')
    fname = data.get('fname')
    lname = data.get('lname')
    dob = data.get('dob')
    email = data.get('email')
    phone = data.get('phone')
    enroll_date = data.get('enroll_date')
    class_id = data.get('class_id')

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
@app.route('/addstudent1',methods=['POST'])
def test():
    data=request.get_json()
    print(data)
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
@app.route('/addenrollment')
def add_enrollment():
    new_enrollment = Enrollments(
        enrollment_id=1,
        student_id=1,
        class_id=1
    )
    db.session.add(new_enrollment)
    db.session.commit()
    return "Enrollment added successfully!"
@app.route('/addgrade')
def add_grade():
    new_grade = Grades(
        grade_id=1,
        enrollment_id=1,
        grade="A",
        grade_date="2021-06-01"
    )
    db.session.add(new_grade)
    db.session.commit()
    return "Grade added successfully!"

@app.route('/displaystudents')
def display_students():
    sql = text('SELECT * FROM Student')
    result= db.session.execute(sql)
    return result.fetchall().__str__()
from sqlalchemy.sql import text

@app.route('/createview')
def create_view():
    view_sql =text( """
    CREATE VIEW view1 AS
    SELECT 
        s.id AS student_id,
        s.fname AS student_fname,
        s.lname AS student_lname,
        s.dob AS student_dob,
        s.email AS student_email,
        s.phone AS student_phone,
        s.enroll_date AS student_enroll_date,
        c.name AS class_name,
        f.fname AS faculty_fname,
        f.lname AS faculty_lname,
        d.name AS department_name,
        co.course_name,
        g.grade,
        g.grade_date
    FROM 
        Student s
    JOIN 
        Class c ON s.class_id = c.id
    JOIN 
        faculty f ON c.faculty_id = f.id
    JOIN 
        Department d ON f.department_id = d.id
    JOIN 
        Courses co ON c.course_id = co.course_id
    JOIN 
        Enrollments e ON s.id = e.student_id
    JOIN 
        Grades g ON e.enrollment_id = g.enrollment_id;
    """)
    db.session.execute(view_sql)
@app.route('/displayview')
def display_view():
    sql = text('SELECT * FROM view1')
    result= db.session.execute(sql)
    return result.fetchall().__str__()
if __name__ == '__main__':
    app.run(debug=True, host='192.168.1.10',port='5500')
