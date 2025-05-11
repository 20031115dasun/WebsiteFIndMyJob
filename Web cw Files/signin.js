const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () =>
    container.classList.add('right-panel-active'));

signInButton.addEventListener('click', () =>
    container.classList.remove('right-panel-active'));

document.getElementById('signUpForm').addEventListener('submit', function(event) {
    // Get form elements
    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;
    var gender = document.getElementById('gender').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Validate that the required fields are filled
    if (name === '' || age === '' || gender === '' || email === '' || password === '') {
        alert('Please fill in all the required fields.');
        event.preventDefault(); // Prevent the form from submitting
    }
});
