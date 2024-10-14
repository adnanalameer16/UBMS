const dialog_login = document.querySelector("#myDialog");
const dialog_add = document.querySelector(".add-dialog");
const dialog_update = document.querySelector(".update-dialog");
const clear_update = dialog_update.querySelector(".clear");
const clear_add = dialog_add.querySelector(".clear");
const dialog_button = document.querySelector(".buttonsmf");
const loginButton = document.querySelector(".login-btn");
const logoutButton = document.querySelector(".logout-btn");
const closeLoginButton = dialog_login.querySelector(".close-btn");
const closeAddButton = dialog_add.querySelector(".close-btn");
const closeupdate = dialog_update.querySelector(".close-btn");
const closemf = dialog_button.querySelector(".close-btn");
const submitButton = dialog_login.querySelector(".submit");
const addButton = document.querySelector('.add-btn');
const submitadd = document.querySelector('.submit-add');
const labels = document.querySelectorAll('label');
const inputs = document.querySelectorAll('input');
const submitupdate = document.querySelector('.submit-update');
let logstatus=false;
let student=false;

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

closemf.addEventListener('click',()=>{
    dialog_button.close();
});

closeupdate.addEventListener('click',() => {
    dialog_update.close();
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
        }
        else if (!i.checkValidity()){
            alert("Not Valid");
            i.classList.add('invalid');
            flag=0;
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
                logstatus=true;
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

    const tableBody = document.getElementById('studentTableBody');
    tableBody.addEventListener("click", firstclick);

    logoutButton.addEventListener("click", () => {
        addButton.style.display = 'none';
        logoutButton.style.display = 'none';
        loginButton.style.display = 'block';
        logstatus=false;
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

    clear_add.addEventListener('click', () => {
        inputadd.forEach(input => {
            input.value="";
        });
    });

    const isEmpty = Array.from(inputadd).some(i => {
        if (i.value === "") {
            i.classList.add('invalid');
            alert("Fill the necessary details");
            flag=0;
            return true;
        }
        else if(!i.checkValidity()){
            i.classList.add('invalid');
            alert("not valid");
            flag=0;
            return true;
        } 
        else {
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
                        window.location.reload();
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
const viewRankings = document.querySelector('.ranking');

viewStudent.addEventListener("click", fetchAndDisplayStudents);
viewClass.addEventListener('click', fetchAndDisplayClasses);
viewDepartment.addEventListener('click', fetchAndDisplayDepartments);
viewFaculty.addEventListener('click', fetchAndDisplayFaculties);
viewCourses.addEventListener('click', fetchAndDisplayCourses);
viewRankings.addEventListener('click', fetchAndDisplayRankings);

// Function to display students
function fetchAndDisplayStudents() {
    const tableBody = document.getElementById('studentTableBody');
    const tableHead = document.getElementById('table-head');
    student=true;

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
    student=false;

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
    student=false;


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
    student=false;


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
    student=false;

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

function fetchAndDisplayRankings() {
        const tableBody = document.getElementById('studentTableBody');
        const tableHead = document.getElementById('table-head');
        student=false;
    
        fetch('http://127.0.0.1:5500/ranking', {
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
    
            const headers = ['ID', 'FName', 'LName', 'Total'];
    
            headers.forEach(h => {
                const header = document.createElement('th');
                header.textContent = h;
                headerRow.appendChild(header);
            });
    
            tableHead.appendChild(headerRow);
    
            data.forEach(rank => {
                dialog_button.close();
                const row = document.createElement('tr');
    
                const idCell = document.createElement('td');
                idCell.textContent = rank.id;
                row.appendChild(idCell);
    
                const fnameCell = document.createElement('td');
                fnameCell.textContent = rank.fname;
                row.appendChild(fnameCell);
    
                const lnameCell = document.createElement('td');
               lnameCell.textContent = rank.lname; 
                row.appendChild(lnameCell);
    
                const totalCell = document.createElement('td');
                totalCell.textContent = rank.total;
                row.appendChild(totalCell);
    
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

/* update starts */

function firstclick(e){
    if(student){
    if (logstatus){
        const row = e.target.closest('tr');
        const text = dialog_button.querySelector('p');
        
        text.textContent = `What do you want to do with ${row.cells[1].textContent}?`;

    dialog_button.showModal();

    document.getElementById('edit').addEventListener('click', function() {
        updatetable(row);
    });
    document.getElementById('delete').addEventListener('click',function(){
        deletestudent(row);
    });
    document.getElementById('view-grade').addEventListener('click',function(){
        viewgrade(row);
    });
}

    else{
        alert("login to continue");
        return;
    }
    }
}

function updatetable(row){

    const inputupdate = document.querySelectorAll('.update-dialog input');


    if (row){
        inputupdate[6].value=row.cells[0].innerText;
        inputupdate[0].value=row.cells[1].innerText;  
        inputupdate[1].value=row.cells[2].innerText;  
        inputupdate[2].value=row.cells[3].innerText;  
        inputupdate[3].value=row.cells[4].innerText;  
        inputupdate[7].value=row.cells[5].innerText;  
        inputupdate[5].value=row.cells[6].innerText;    
        inputupdate[4].value=row.cells[7].innerText;      

    }

    dialog_update.showModal();

    submitupdate.addEventListener('click',updatedata);

 }

function updatedata(){
        var flag=1;
        const inputadd=document.querySelectorAll(".update-student input");

        clear_update.addEventListener('click', () => {
            inputadd.forEach(input => {
                input.value="";
            });
        });
    
        inputadd.forEach(input => {
            input.classList.remove('invalid', 'valid');
        });
    
        const isEmpty = Array.from(inputadd).some(i => {
            if (i.value === "") {
                i.classList.add('invalid');
                alert("Fill the necessary details");
                flag=0;
                return true;
            }
            else if(!i.checkValidity()){

                i.classList.add('invalid');
                alert("not valid");
                flag=0;
                return true;

            } 
            else {
                i.classList.add('valid');
            }
        });
    
        if (flag===1){
    
                const id = document.querySelector('#idupdate').value;
                const fname = document.querySelector('#fnameupdate').value;
                const lname = document.querySelector('#lnameupdate').value;
                const email = document.querySelector('#emailstudentupdate').value;
                const dob = document.querySelector('#dobupdate').value;
                const phone = document.querySelector('#phoneupdate').value;
                const enroll_date = document.querySelector('#enroll_dateupdate').value;
                const class_id =document.querySelector('#class_idupdate').value;
    
                const jsonData = {
                    "id":id,"fname":fname,"lname":lname,"email":email,"dob":dob,"phone":phone,"enroll_date":enroll_date,"class_id":class_id
    
                };
    
    
                fetch('http://127.0.0.1:5500/updatestudent', {
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
                            dialog_update.close();
                            dialog_button.close();
                            window.location.reload();
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

function deletestudent(row){
   const dialog_delete = document.querySelector(".delete-dialog");
   dialog_delete.showModal();
   const yes = dialog_delete.querySelector('.yes');
   const no = dialog_delete.querySelector('.no');

   const id = row.cells[0].innerText

   const jsonData = {"id":id }

   yes.addEventListener('click',() => {
    fetch('http://127.0.0.1:5500/deletestudent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => response.json())  
    .then(data => {
        if (data.status) {
            dialog_delete.close();
            dialog_button.close();
            window.location.reload();
        } else {
            alert(data.message);
            id.classList.remove('valid');
            id.classList.add('invalid');
            return;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error occurred: ' + error);
    });
   });

   no.addEventListener('click',() => {
    dialog_delete.close();
   });
}



function viewgrade(row){
    const id = row.cells[0].innerText

    const tableBody = document.getElementById('studentTableBody');
    const tableHead = document.getElementById('table-head');

   const jsonData = {"id":id }

   fetch('http://127.0.0.1:5500/viewgrade',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonData)
   })
   .then(response => response.json())
   .then(data => {
    tableBody.innerHTML = '';

    tableHead.innerHTML='';

    const headerRow = document.createElement('tr');

    const headers = ['Subject', 'Grade', 'Grade_Date'];

    headers.forEach(h => {
        const header = document.createElement('th');
        header.textContent = h;
        headerRow.appendChild(header);
    });
    tableHead.appendChild(headerRow);

    data.forEach(g => {
        const row=document.createElement('tr');

        const subject = document.createElement('td');
        subject.textContent = g.subject;
        row.appendChild(subject);
        const grade = document.createElement('td');
        grade.textContent = g.grade;
        row.appendChild(grade);
        const grade_date = document.createElement('td');
        grade_date.textContent = g.grade_date;
        row.appendChild(grade_date);

        tableBody.appendChild(row);
    });
    dialog_button.close();
})
.catch(error => {
    console.error('Error:', error);
    tableBody.innerHTML = `<tr><td colspan="3">Error occurred: ${error}</td></tr>`;
});

}



/*  update ends  */
const pass = document.querySelector('a');

pass.addEventListener('click',forgot)

function forgot(){
    let mess="";
    const inputemail = document.querySelectorAll(".login .emaillogin");
    const loadingElement = document.getElementById("loading");

    if (inputemail[0].checkValidity()){
        const email = inputemail[0].value

       // loadingElement.style.display = "block";

        fetch("http://127.0.0.1:5500/forgotpassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email }),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            alert("An error occurred. Please try again.");
        })
        .finally(() => {
            //loadingElement.style.display = "none";
        });
        };
    };


    function getRandomRgb() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }
    
    const party = document.querySelector('.easteregg');
    let partyInterval;
    let isPartyMode = false; 
    
    party.addEventListener('click', partymode);
    
    function partymode() {
        const root = document.documentElement;
    
        if (!isPartyMode) {
            isPartyMode = true;
            partyInterval = setInterval(() => {
                root.style.setProperty('--bg-color', getRandomRgb());
                root.style.setProperty('--header-bg', getRandomRgb());
                root.style.setProperty('--sidebar-bg', getRandomRgb());
                root.style.setProperty('--button-bg', getRandomRgb());
                root.style.setProperty('--button-hover-bg', getRandomRgb());
                root.style.setProperty('--text-color', getRandomRgb());
                root.style.setProperty('--border-color', getRandomRgb());
                root.style.setProperty('--border-light', getRandomRgb());
    
                root.style.setProperty('--table-bg', getRandomRgb());
                root.style.setProperty('--table-text-color', getRandomRgb());
                root.style.setProperty('--table-border-color', getRandomRgb());
                root.style.setProperty('--table-row-hover-bg', getRandomRgb());
                root.style.setProperty('--table-row-even-bg', getRandomRgb());
                root.style.setProperty('--table-row-odd-bg', getRandomRgb());
            }, 200); 
        } else {
            isPartyMode = false;
    
            // Reset the colors back to their original values
            root.style.setProperty('--bg-color', '#a6b1bc');
            root.style.setProperty('--header-bg', '#37414A');
            root.style.setProperty('--sidebar-bg', '#4A5864');
            root.style.setProperty('--button-bg', '#7cb9e8');
            root.style.setProperty('--button-hover-bg', '#2570a6');
            root.style.setProperty('--text-color', '#F0F0F0');
            root.style.setProperty('--border-color', 'grey');
            root.style.setProperty('--border-light', 'white');
    
            root.style.setProperty('--table-bg', '#F0F0F0');
            root.style.setProperty('--table-text-color', '#333');
            root.style.setProperty('--table-border-color', '#ccc');
            root.style.setProperty('--table-row-hover-bg', '#C0C4CC');
            root.style.setProperty('--table-row-even-bg', '#E5E7EB');
            root.style.setProperty('--table-row-odd-bg', '#fff');
    
            clearInterval(partyInterval); 
        }
    }