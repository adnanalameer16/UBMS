from flask_mail import Mail, Message
from flask import Flask, render_template, jsonify,request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import text
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
import json
# Initialize Flask application
app = Flask(__name__,static_url_path='/static',template_folder='templates')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///universityDB.db'  # Replace with your database URI
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# email
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = '22cs327@mgits.ac.in'
app.config['MAIL_PASSWORD'] = 'adnan@2003'
mail = Mail(app)
# email

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
    credits = db.Column(db.Integer, nullable=False)
    semester = db.Column(db.String(100), nullable=False)
    def __repr__(self):
        return f'<Course {self.name}>'
class Enrollments(db.Model):
    enrollment_id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, primary_key=False)
    class_id = db.Column(db.Integer, primary_key=False)
    def __repr__(self):
        return f'<Enrollments {self.student_id} {self.class_id}>'
class Grade(db.Model):
    enrollment_id = db.Column(db.Integer, primary_key=True)
    subject = db.Column(db.String(100), primary_key=True)
    grade = db.Column(db.String(100), nullable=False)
    grade_date = db.Column(db.String(100), primary_key=False)
    def __repr__(self):
        return f'<Grades {self.student_id} {self.class_id}>'
class Authentication(db.Model):
    email = db.Column(db.String(100), nullable=False,primary_key=True)
    password = db.Column(db.String(100), nullable=False)
    def __repr__(self):
        return f'<Authentication {self.email}>'
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/addstudent',methods=['POST'])
def add_student():
    # Sample student data
    data=request.get_json()
    student_id = data.get('id')
    fname = data.get('fname')
    lname = data.get('lname')
    dob = data.get('dob')
    email = data.get('email')
    phone = data.get('phone')
    enroll_date = data.get('enroll_date')
    class_id = data.get('class_id')

    existing_student = Student.query.filter_by(id=student_id).first()
    if existing_student:
        return {"status": False, "message": "Student ID already exists."}

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

    return {"status": True}

@app.route('/displaystudents')
def display_students():
    sql = text('SELECT * FROM Student')
    result= db.session.execute(sql)
    return result.fetchall().__str__()
from sqlalchemy.sql import text

@app.route('/viewstudent')
def display_test():
    students = Student.query.all()
    student_data = []
    for student in students:
        c=Class.query.filter_by(id=student.class_id).first()
        student_dict = {
            'id': student.id,
            'fname': student.fname,
            'lname': student.lname,
            'dob': student.dob,
            'email': student.email,
            'phone': student.phone,
            'enroll_date': student.enroll_date,
            'class_id': c.name
        }
        student_data.append(student_dict)
    return jsonify(student_data)
@app.route('/viewclass')
def display_class():
    classes = Class.query.all()

    class_data = []
    for class1 in classes:
        f = faculty.query.filter_by(id=class1.faculty_id).first()
        c= Courses.query.filter_by(course_id=class1.course_id).first()
        class_dict = {
            'id': class1.id,
            'name': class1.name,
            'course_id': c.course_name,
            'faculty_id': f.fname
        }
        class_data.append(class_dict)
    return jsonify(class_data)

@app.route('/viewfaculty')
def display_faculty():
    faculties = faculty.query.all()
    faculty_data = []
    for faculty1 in faculties:
        d=Department.query.filter_by(id=faculty1.department_id).first()
        faculty_dict = {
            'id': faculty1.id,
            'fname': faculty1.fname,
            'lname': faculty1.lname,
            'email': faculty1.email,
            'phone': faculty1.phone,
            'department_id': d.name
        }
        faculty_data.append(faculty_dict)
    return jsonify(faculty_data)
@app.route('/viewdepartment')
def display_department():
    departments = Department.query.all()

    department_data = []
    for department in departments:
        h=faculty.query.filter_by(id=department.head).first()
        department_dict = {
            'id': department.id,
            'name': department.name,
            'head': h.fname + " " + h.lname
        }
        department_data.append(department_dict)
    return jsonify(department_data)

@app.route('/viewcourses')
def view_courses():
    courses = Courses.query.all()
    course_data = []

    for course in courses:

        department = Department.query.filter_by(id=course.department_id).first()

        course_dict = {
            'id': course.course_id,
            'name': course.course_name,
            'department_id': department.name,
            'credits': course.credits,
            'semester': course.semester
        }
        course_data.append(course_dict)
    return jsonify(course_data)


@app.route('/verify_login', methods=['POST'])
def verify_login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = Authentication.query.filter_by(email=email).first()
    if user and user.password == password:
        return {"status":True}
    else:
        return {"status":False}
    

@app.route('/updatestudent', methods=['POST'])
def updatestudent():
    data=request.get_json()
    student_id = data.get('id')
    fname = data.get('fname')
    lname = data.get('lname')
    dob = data.get('dob')
    email = data.get('email')
    phone = data.get('phone')
    enroll_date = data.get('enroll_date')
    class_id = data.get('class_id')

    existing_student = Student.query.filter_by(id=student_id).first()
    print(existing_student)

    if existing_student:
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
        sql=text("UPDATE Student SET fname=:fname,lname=:lname,dob=:dob,email=:email,phone=:phone,enroll_date=:enroll_date,class_id=:class_id WHERE id=:student_id")
        db.session.execute(sql,{'fname':fname,'lname':lname,'dob':dob,'email':email,'phone':phone,'enroll_date':enroll_date,'class_id':class_id,'student_id':student_id})
        db.session.commit()

        return {"status": True}

    return {"status": False, "message": "Student ID does not exists."}

@app.route('/deletestudent', methods=['POST'])
def deletestudent():
    data = request.get_json()
    student_id = data.get('id')
    existing_student = Student.query.filter_by(id=student_id).first()
    if existing_student:
        sql = text('DELETE FROM Student WHERE id=:student_id')
        db.session.execute(sql, {'student_id': student_id})
        db.session.commit()
        return {"status": True}
    return {"status": False, "message": "Student ID does not exists."}

@app.route('/viewgrade', methods=['POST'])
def viewgrade():
    data = request.get_json()
    student_id = data.get('id')
    sql = text('SELECT * FROM Grade WHERE enrollment_id IN (SELECT enrollment_id FROM Enrollments WHERE student_id=:student_id)')
    res=db.session.execute(sql, {'student_id': student_id})
    db.session.commit()
    grades = []
    for i in res:
        data={
            'subject':i[1],
            'grade':i[2],
            'grade_date':i[3]
        }
        grades.append(data)
    return jsonify(grades)

@app.route('/ranking', methods=['GET'])
def ranking():
    grade={'A':5,'B':4,'C':3,'D':2,'F':1}
    students=Student.query.all()
    grade_list=[]

    for i in students:
        e_id=0
        enrollment=Enrollments.query.filter_by(student_id=i.id).first()
        if enrollment is None:
            continue
        e_id=enrollment.enrollment_id
        grades= Grade.query.filter_by(enrollment_id=e_id).all()
        total=0
        for j in grades:
            total+=grade[j.grade]
        data={'id':i.id,'fname':i.fname,'lname': i.lname,'total':total}
        grade_list.append(data)
    grade_list.sort(key=lambda x:x['total'],reverse=True)
    return jsonify(grade_list)


@app.route('/forgotpassword', methods=['POST'])
def forgotpassword():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({"message": "Email is required"})


    user = Authentication.query.filter_by(email=email).first()

    if user:
        try:
            msg = Message("Your Password", sender="22cs327@mgits.ac.in", recipients=[email])
            msg.body = f"Your password is: {user.password}"
            mail.send(msg)

            return jsonify({"message": "Password sent to your email."})
        except Exception as e:
            return jsonify({"message": "Failed to send email."})
    else:
        return jsonify({"message": "Email not found."})

if __name__ == "__main__":
    app.run(debug=True,host="127.0.0.1",port="5500")