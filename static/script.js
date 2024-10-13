const dialog_login = document.querySelector("#myDialog");
const dialog_add = document.querySelector(".add-dialog");
const loginButton = document.querySelector(".login-btn");
const logoutButton = document.querySelector(".logout-btn");
const closeLoginButton = dialog_login.querySelector(".close-btn");
const closeAddButton = dialog_add.querySelector(".close-btn");
const submitButton = dialog_login.querySelector(".submit");
const addButton = document.querySelector('.add-btn');
const submitadd = document.querySelector('.submit-add');
const labels = document.querySelectorAll('label');
const inputs = document.querySelectorAll('input');

//buttons start

addButton.addEventListener("click", () => {
    dialog_add.showModal();
});

loginButton.addEventListener("click", () => {
    dialog_login.showModal();
});

closeLoginButton.addEventListener("click", () => {
    dialog_login.close();
});

closeAddButton.addEventListener("click", () => {
    dialog_add.close();
});
//buttons end


// login starts
submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    const inputlogin = document.querySelectorAll(".login input");
    var flag = 1;

    inputlogin.forEach(input => {
        input.classList.remove('invalid', 'valid');
    });

    const isEmpty = Array.from(inputlogin).some(i => {
        if (i.value === "") {
            alert("Fill the necessary details");
            i.classList.add('invalid');
            flag = 0;
            return true;
        } else {
            i.classList.add('valid');
        }
    });

    if (flag === 1) {
        const email = document.querySelector(".emaillogin").value;
        const pass = document.querySelector(".password").value;

        const jsonData = {
            "email": email,
            "password": pass
        };

        fetch('http://127.0.0.1:5500/verify_login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status) {
                inputlogin.forEach(input => { 
                    input.value = ""; 
                    input.classList.remove('valid');
                });
                dialog_login.close();
                addButton.style.display = 'block';
                logoutButton.style.display = 'block';
                loginButton.style.display = 'none';
                loggedin();
            } else {
                alert("Invalid username/password");
                document.querySelector(".emaillogin").classList.add('invalid');
                document.querySelector(".password").classList.add('invalid');
            }
        });
    }
});

// login ends

function loggedin(){

    submitadd.addEventListener("click",()=>{
        submitData();
        dialog_add.close();
    });


    logoutButton.addEventListener("click", () => {
        addButton.style.display = 'none';
        logoutButton.style.display = 'none';
        loginButton.style.display = 'block';
        return;
    });

}


// Function to handle form submission
function submitData() {
    var flag=1;
    const inputadd=document.querySelectorAll(".add-student input");

    inputadd.forEach(input => {
        input.classList.remove('invalid', 'valid');
    });

    const isEmpty = Array.from(inputadd).some(i => {
        if (i.value === "") {
            i.classList.add('invalid');
            alert("Fill the necessary details");
            flag=0;
            return true;
        } else {
            i.classList.add('valid');
        }
    });

    if (flag===1){

            const id = document.querySelector('#id').value;
            const fname = document.querySelector('#fname').value;
            const lname = document.querySelector('#lname').value;
            const email = document.querySelector('#emailstudent').value;
            const dob = document.querySelector('#dob').value;
            const phone = document.querySelector('#phone').value;
            const enroll_date = document.querySelector('#enroll_date').value;
            const class_id =document.querySelector('#class_id').value;

            const jsonData = {
                "id":id,"fname":fname,"lname":lname,"email":email,"dob":dob,"phone":phone,"enroll_date":enroll_date,"class_id":class_id

            };


            fetch('http://127.0.0.1:5500/addstudent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData)
            })
            .then(response => response.json())  
            .then(data => {
                if (data.status) {
                    inputadd.forEach(input => { 
                        input.value = ""; 
                        input.classList.remove('valid');
                        dialog_add.close();
                    });
                } else {
                    alert(data.message);
                    inputadd[0].classList.remove('valid');
                    inputadd[0].classList.add('invalid');
                    return;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error occurred: ' + error);
            });
}}


/* functions for sidebar starts  */

const  viewStudent = document.querySelector('.view-student');
const viewClass = document.querySelector('.view-class');
const viewDepartment = document.querySelector('.view-department');
const viewFaculty = document.querySelector('.view-faculty');
const viewCourses = document.querySelector('.view-courses');

viewStudent.addEventListener("click", fetchAndDisplayStudents);
viewClass.addEventListener('click', fetchAndDisplayClasses);
viewDepartment.addEventListener('click', fetchAndDisplayDepartments);
viewFaculty.addEventListener('click', fetchAndDisplayFaculties);
viewCourses.addEventListener('click', fetchAndDisplayCourses);

// Function to display students
function fetchAndDisplayStudents() {
    const tableBody = document.getElementById('studentTableBody');
    const tableHead = document.getElementById('table-head');

    fetch('http://127.0.0.1:5500/viewstudent', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        tableBody.innerHTML = '';

        tableHead.innerHTML='';

        const headerRow = document.createElement('tr');

        const headers = ['ID', 'First Name', 'Last Name', 'Date of Birth', 'Email', 'Phone', 'Enrollment Date', 'Class'];

        headers.forEach(h => {
            const header = document.createElement('th');
            header.textContent = h;
            headerRow.appendChild(header);
        });

        tableHead.appendChild(headerRow);

        data.forEach(student => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = student.id;
            row.appendChild(idCell);

            const fnameCell = document.createElement('td');
            fnameCell.textContent = student.fname;
            row.appendChild(fnameCell);

            const lnameCell = document.createElement('td');
            lnameCell.textContent = student.lname;
            row.appendChild(lnameCell);

            const dobCell = document.createElement('td');
            dobCell.textContent = student.dob;
            row.appendChild(dobCell);

            const emailCell = document.createElement('td');
            emailCell.textContent = student.email;
            row.appendChild(emailCell);

            const phoneCell = document.createElement('td');
            phoneCell.textContent = student.phone;
            row.appendChild(phoneCell);

            const enroll_dateCell = document.createElement('td');
            enroll_dateCell.textContent = student.enroll_date;
            row.appendChild(enroll_dateCell);

            const class_idCell = document.createElement('td');
            class_idCell.textContent = student.class_id;
            row.appendChild(class_idCell);

            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        tableBody.innerHTML = `<tr><td colspan="3">Error occurred: ${error}</td></tr>`;
    });
}
// Function to display class
function fetchAndDisplayClasses() {

    const tableBody = document.getElementById('studentTableBody');
    const tableHead = document.getElementById('table-head');

    fetch('http://127.0.0.1:5500/viewclass', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        tableBody.innerHTML = '';

        tableHead.innerHTML='';

        const headerRow = document.createElement('tr');

        const headers = ['Class ID', 'Class Name', 'Course Name', 'Faculty Name'];

        headers.forEach(h => {
            const header = document.createElement('th');
            header.textContent = h;
            headerRow.appendChild(header);
        });

        tableHead.appendChild(headerRow);

        data.forEach(c => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = c.id;
            row.appendChild(idCell);

            const nameCell = document.createElement('td');
            nameCell.textContent = c.name;
            row.appendChild(nameCell);

            const course_idCell = document.createElement('td');
            course_idCell.textContent = c.course_id;
            row.appendChild(course_idCell);

            const faculty_idCell = document.createElement('td');
            faculty_idCell.textContent = c.faculty_id;
            row.appendChild(faculty_idCell);

            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        tableBody.innerHTML = `<tr><td colspan="3">Error occurred: ${error}</td></tr>`;
    });
}
// Function to display departments
function fetchAndDisplayDepartments() {

    const tableBody = document.getElementById('studentTableBody');
    const tableHead = document.getElementById('table-head');


    fetch('http://127.0.0.1:5500/viewdepartment', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        tableBody.innerHTML = '';

        tableHead.innerHTML='';

        const headerRow = document.createElement('tr');

        const headers = ['Department ID', 'Department Name', 'Department Head'];

        headers.forEach(h => {
            const header = document.createElement('th');
            header.textContent = h;
            headerRow.appendChild(header);
        });

        tableHead.appendChild(headerRow);

        data.forEach(department => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = department.id;
            row.appendChild(idCell);

            const nameCell = document.createElement('td');
            nameCell.textContent = department.name;
            row.appendChild(nameCell);

            const headCell = document.createElement('td');
            headCell.textContent = department.head;
            row.appendChild(headCell);

            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        tableBody.innerHTML = `<tr><td colspan="3">Error occurred: ${error}</td></tr>`;
    });
}
// Function to display faculties
function fetchAndDisplayFaculties() {

    const tableBody = document.getElementById('studentTableBody');
    const tableHead = document.getElementById('table-head');


    fetch('http://127.0.0.1:5500/viewfaculty', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        tableBody.innerHTML = '';

        tableHead.innerHTML='';

        const headerRow = document.createElement('tr');

        const headers = ['Faculty ID', 'First Name', 'Last Name', 'Email', 'Phone', 'Department'];

        headers.forEach(h => {
            const header = document.createElement('th');
            header.textContent = h;
            headerRow.appendChild(header);
        });

        tableHead.appendChild(headerRow);

        data.forEach(faculty => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = faculty.id;
            row.appendChild(idCell);

            const fnameCell = document.createElement('td');
            fnameCell.textContent = faculty.fname;
            row.appendChild(fnameCell);

            const lnameCell = document.createElement('td');
            lnameCell.textContent = faculty.lname;
            row.appendChild(lnameCell);

            const emailCell = document.createElement('td');
            emailCell.textContent = faculty.email;
            row.appendChild(emailCell);

            const phoneCell = document.createElement('td');
            phoneCell.textContent = faculty.phone;
            row.appendChild(phoneCell);

            const department_idCell = document.createElement('td');
            department_idCell.textContent = faculty.department_id;
            row.appendChild(department_idCell);

            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        tableBody.innerHTML = `<tr><td colspan="3">Error occurred: ${error}</td></tr>`;
    });
}
// Function to display course
function fetchAndDisplayCourses() {
    const tableBody = document.getElementById('studentTableBody');
    const tableHead = document.getElementById('table-head');

    fetch('http://127.0.0.1:5500/viewcourses', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        tableBody.innerHTML = '';
        tableHead.innerHTML = '';

        const headerRow = document.createElement('tr');

        const headers = ['Course ID', 'Course Name', 'Credits', 'Department ID','Semester'];

        headers.forEach(h => {
            const header = document.createElement('th');
            header.textContent = h;
            headerRow.appendChild(header);
        });

        tableHead.appendChild(headerRow);

        data.forEach(course => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = course.id;
            row.appendChild(idCell);

            const nameCell = document.createElement('td');
            nameCell.textContent = course.name;
            row.appendChild(nameCell);

            const creditsCell = document.createElement('td');
            creditsCell.textContent = course.credits; 
            row.appendChild(creditsCell);

            const departmentIdCell = document.createElement('td');
            departmentIdCell.textContent = course.department_id;
            row.appendChild(departmentIdCell);

            const semesterCell = document.createElement('td');
            semesterCell.textContent = course.semester;
            row.appendChild(semesterCell);

            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        tableBody.innerHTML = `<tr><td colspan="4">Error occurred: ${error}</td></tr>`;
    });
}

/* functions for sidebar ends */

/* Dark theme starts */

const darkImage = document.querySelector('.dark');
const body = document.body;
const header = document.querySelector('.header');
const sidebar = document.querySelector('.sidebar');
const dialogs = document.querySelectorAll('dialog');
const checkbox = document.getElementById("checkbox")

checkbox.addEventListener("change", () => {
    body.classList.toggle('dark-theme');
    header.classList.toggle('dark-theme');
    sidebar.classList.toggle('dark-theme');
    dialogs.forEach(dialog => dialog.classList.toggle('dark-theme'));
    labels.forEach(label => label.classList.toggle('dark-theme'));
})

/* Dark theme ends */