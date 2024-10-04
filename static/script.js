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
    fetch('http://127.0.0.1:5000/addstudent1', {
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

// Optional: Add event listener to clear the text
//document.querySelector('#clearButton').addEventListener('click', function() {
    //document.querySelector('#inputBox').value = '';
   // document.querySelector('#displayBox').innerText = 'Your text will appear here';
//});
