function obtainUserInformation() {
    username = usernameField.value.toLowerCase();
    password = passwordField.value;
}

const submitButton = document.querySelector('button[type="submit"]');
const signButton = document.querySelector('.sign-button');
const formNameInput = document.getElementById('current-user');
const formTypeInput = document.getElementById('current-type');
const usernameField = document.getElementById('username');
const passwordField = document.getElementById('password');

var username;
var password;

signButton.addEventListener('click', () => {
    obtainUserInformation();
    
    if (!username || !password)
        showNotificationBox('Empty field(s)', 'Please enter your username and your password, then click the Sign in button to proceed.');
    else {
        signButton.style.pointerEvents = 'none';
        fetch('signin', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json()).then(({ exists, wrongPassword, usertype }) => {
            if (wrongPassword)
                showNotificationBox('Wrong Password', 'Looks like your password is incorrect. Unfortunately, we can\'t sign you in with an incorrect password. Try again or contact the school head if you forgot your password.');
            else if (!exists)
                showNotificationBox('Wrong Username', 'Looks like your username is incorrect. Try again or contact the school head to register you if you have not been registered.');
            else if (exists) {
                formNameInput.value = username;
                formTypeInput.value = usertype;
                submitButton.click();
            }
        }).catch(err => showNotificationBox('Network Error', 'Looks like your internet connection is down. Check your internet connection.'));
        signButton.style.pointerEvents = 'all';
    }
});