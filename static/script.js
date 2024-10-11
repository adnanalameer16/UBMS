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
const dark = document.querySelector('.dark');
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
    //submitData();
    inputs.forEach(input => input.value="");
    updateButton.style.display = 'block';
    addButton.style.display = 'block';
    logoutButton.style.display = 'block';
    loginButton.style.display = 'none';
});

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

/* ---------- */

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
    // Get input text
    const id = document.querySelector('#id').value;
    const fname = document.querySelector('#fname').value;
    const lname = document.querySelector('#lname').value;
    const email = document.querySelector('#emailstudent').value;
    const dob = document.querySelector('#dob').value;
    const phone = document.querySelector('#phone').value;
    const enroll_date = document.querySelector('#enroll_date').value;
    const class_id =document.querySelector('#class_id').value;
       // Prepare the data as an object
    const jsonData = {
        "id":id,"fname":fname,"lname":lname,"email":email,"dob":dob,"phone":phone,"enroll_date":enroll_date,"class_id":class_id
        // Send input string as a property
    };

    // Make POST request to Flask
    fetch('http://127.0.0.1:5000/addstudent', {
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
/*
// Add event listener to the "Show" button
document.querySelector('#showButton').addEventListener('click', submitData);

function fetchAndDisplayStudents() {
    const displayBox = document.querySelector('#displayBox');  // Element to display data

    // Fetch data from the Flask route
    fetch('////', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())  // Parse the response as JSON
    .then(data => {
        // Clear the display box before showing new data
        displayBox.innerHTML = '';

        // Iterate over the fetched data and display each student
        data.forEach(student => {
            // Create a new div for each student
            const studentDiv = document.createElement('div');
            studentDiv.textContent = `ID: ${student.id}, Name: ${student.fname} ${student.lname}, Email: ${student.email}`;
            
            // Append each student div to the display box
            displayBox.appendChild(studentDiv);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        displayBox.innerText = 'Error occurred: ' + error;
    });
}

// Call the function to fetch and display students when needed
fetchAndDisplayStudents();
*/