const dialog_login = document.querySelector("#myDialog");
const dialog_add = document.querySelector(".add-dialog");
const loginButton = document.querySelector(".login-btn");
const logoutButton = document.querySelector(".logout-btn");
const closeLoginButton = dialog_login.querySelector(".close-btn");
const closeAddButton = dialog_add.querySelector(".close-btn");
const submitButton = dialog_login.querySelector(".submit");
const updateButton = document.querySelector('.update-btn');
const addButton = document.querySelector('.add-btn');
const submitadd = document.querySelector('.submit-add');
const  viewStudent = document.querySelector('.view-student');
const viewClass = document.querySelector('.view-class');
const viewDepartment = document.querySelector('.view-department');
const viewFaculty = document.querySelector('.view-faculty');
const viewCourses = document.querySelector('.view-courses');
const labels=document.querySelectorAll('label')
const inputs=document.querySelectorAll('input')


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

submitButton.addEventListener("click", () => {
    dialog_login.close();
    inputs.forEach(input => input.value="");
    updateButton.style.display = 'block';
    addButton.style.display = 'block';
    logoutButton.style.display = 'block';
    loginButton.style.display = 'none';
});

viewStudent.addEventListener("click", () => {
    fetchAndDisplayStudents();
});
viewClass.addEventListener('click', fetchAndDisplayClasses);
viewDepartment.addEventListener('click', fetchAndDisplayDepartments);
viewFaculty.addEventListener('click', fetchAndDisplayFaculties);
viewCourses.addEventListener('click', fetchAndDisplayCourses);


logoutButton.addEventListener("click", () => {
    updateButton.style.display = 'none';
    addButton.style.display = 'none';
    logoutButton.style.display = 'none';
    loginButton.style.display = 'block';
});

submitadd.addEventListener("click",()=>{
    submitData()
    dialog_add.close();

    inputs.forEach(input => input.value="");
})

/* Dark theme */

const darkImage = document.querySelector('.dark');
const body = document.body;
const header = document.querySelector('.header');
const sidebar = document.querySelector('.sidebar');
const dialogs = document.querySelectorAll('dialog');

darkImage.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    header.classList.toggle('dark-theme');
    sidebar.classList.toggle('dark-theme');
    dialogs.forEach(dialog => dialog.classList.toggle('dark-theme'));
    labels.forEach(label => label.classList.toggle('dark-theme'));
});


// Function to handle form submission
function submitData() {
    const inputText = document.querySelector('input').value; // Get input text
    
    // Prepare the data as an object
    const jsonData = {
        "student_data": inputText  // Send input string as a property
    };

    // Make POST request to Flask
    fetch('http://192.168.1.10:5500/addstudent1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData) // Convert the data object to JSON string
    })
    .then(response => response.text())
    .then(data => {
        console.log(data) // Display server response in the display box
    })
    .catch(error => {
        console.error('Error:', error);
        console.log('Error occurred: ' + error);
    });
}
// Add event listener to the "Show" button
document.querySelector('#showButton').addEventListener('click', submitData);

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