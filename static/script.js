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
