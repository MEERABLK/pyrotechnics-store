import { showAlert } from "./alert.js";

export function handleContact() { 
    const submitButton = document.querySelector('.submit-button');

    if (!submitButton) return;

    submitButton.addEventListener('click', function (e) {
        e.preventDefault(); // prevents refresh
        const fullName = document.getElementById('fullname').value;
        const emailAddress = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        const fullNameRegex = /^[a-zA-Z]{1,15}\s[a-zA-Z]{1,25}$/;
        const emailAddressRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        if (!fullName || !emailAddress) {
            showAlert('Please enter both full name and email address', 'danger');
        }
        else if (!fullNameRegex.test(fullName)) {
            showAlert('Invalid name. Must be your first name then your last name seperated by a space.', 'danger');
        }
        else if (!emailAddressRegex.test(emailAddress)) {
            showAlert('Invalid email format.', 'warning');
        }
        else if (subject == "dropdownDefault") {
            showAlert('You must chose a subject.', 'warning');
        }
        else if (!message) {
            showAlert('You must include a message.', 'warning');
        }
        else {
            showAlert('Submission Recieved! Redirecting...', 'success');
            window.location = '../index.html';
        }
    });
}