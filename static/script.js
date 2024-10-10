// Function to handle form submission
function submitData() {
    const inputText = document.querySelector('#inputBox').value; // Get input text
    const displayBox = document.querySelector('#displayBox');
    
    // Prepare the data as an object
    const jsonData = {
        "student_data": inputText  // Send input string as a property
    };
    console.log(jsonData);

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
        displayBox.innerText = data;  // Display server response in the display box
    })
    .catch(error => {
        console.error('Error:', error);
        displayBox.innerText = 'Error occurred: ' + error;
    });
}

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

