function insertStudentInformation(index) {
    const nameText = document.createElement('p');
    const passwordText = document.createElement('p');
    const classText = document.createElement('p');

    try {
        nameText.setAttribute('class', 'info');
        passwordText.setAttribute('class', 'info password');
        classText.setAttribute('class', 'info');
    
        nameText.innerText = 'Student name: ' + studentsArray[index].username;
        passwordText.innerText = 'Password: ' + studentsArray[index].password;
        classText.innerText = 'Student class: ' + studentsArray[index].currentclass;
    
        studentInformation.innerHTML = ' ';
        studentInformation.appendChild(nameText);
        studentInformation.appendChild(classText);
        studentInformation.appendChild(passwordText);
    } catch (err) {}
}

const studentNameField = document.getElementById('student-name-field');
const studentPasswordField = document.getElementById('student-password-field');
const studentClassField = document.getElementById('student-class-field');
const studentsList = document.getElementById('students');
const registerButton = document.querySelector('.register');
const studentNameUpdate = document.getElementById('update-students-list');
const studentOldPasswordUpdate = document.getElementById('student-old-password-field-update');
const studentNewPasswordUpdate = document.getElementById('student-new-password-field-update');
const studentClassUpdate = document.getElementById('student-class-field-update');
const updateInformationButton = document.querySelector('.update');
const removeButton = document.querySelector('.remove');
const studentInformation = document.querySelector('.information');
const studentsArray = JSON.parse(document.querySelector('.students-array').innerHTML);

insertStudentInformation(0);

if (studentsList)
    studentsList.addEventListener('change', () => {
        var currentValue = studentsList.value;
        var index;

        for (var i = 0; i < studentsArray.length; i++) {
            if (studentsArray[i].username === currentValue) {
                index = i;
                break;
            }
        }

        insertStudentInformation(index);
    });

registerButton.addEventListener('click', () => {
    const studentName = studentNameField.value.toLowerCase();
    const studentPassword = studentPasswordField.value;
    const studentClass = studentClassField.value;

    registerButton.style.pointerEvents = 'none';
    if (!studentName || !studentPassword)
        showNotificationBox('Empty Field(s)', 'Some fields are empty. Unfortunately, the operation can\'t proceed with any empty field. Make sure you enter the name of the student and password in the fields.');
    else {
        fetch('register_student', {
            body: JSON.stringify({ studentName, studentPassword, studentClass }),
            headers: { 'Content-type': 'application/json' },
            method: 'POST'
        }).then(res => res.json()).then(({ exists, registered }) => {
            if (exists)
                showNotificationBox('Registration Failed', 'The registration failed because a user with the same name is already in our record. There can\'t be multiple users with the same name.');
            else if (registered)
                showNotificationBox('Registration Successful', 'The student has been successfully registered. Now, provide the student with the sign in details.');
            else
                showNotificationBox('Unknown Error', 'An unknown error prevented the registration from proceeding. You can try again later.');
        }).catch(err => showNotificationBox('Network Error', 'Looks like you are not connected to the internet. Check your internet connection and try again.'));
    }

    registerButton.style.pointerEvents = 'all';
});

if (removeButton)
    removeButton.addEventListener('click', () => {
        const studentName = document.getElementById('students-for-removal').value.toLowerCase();

        removeButton.style.pointerEvents = 'none';
        fetch('remove_student', {
            body: JSON.stringify({ studentName }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        }).then(res => res.json()).then(({ exists, removed }) => {
            if (removed)
                showNotificationBox('Removal Successul', 'The student has been removed successfully.');
            else if (!exists)
                showNotificationBox('Removal Failed', 'Removal failed because the student does not exist.');
            else
                showNotificationBox('Unknown Error', 'An unknown error prevented the removal from proceeding. You can try again later.');
        }).catch(err => showNotificationBox('Network Error', 'Looks like you are not connected to the internet. Check your internet connection and try again.'));
        removeButton.style.pointerEvents = 'all';
    });

if (updateInformationButton)
    updateInformationButton.addEventListener('click', () => {
        const studentName = studentNameUpdate.value.toLowerCase();
        const studentOldPassword = studentOldPasswordUpdate.value;
        const studentNewPassword = studentNewPasswordUpdate.value;
        const studentClass = studentClassUpdate.value;

        if (studentOldPassword && !studentNewPassword)
            showNotificationBox('Password Missing', 'To update the password, you need to enter the old and new password.');
        else {
            updateInformationButton.style.pointerEvents = 'none';
            fetch('update_student_information', {
                body: JSON.stringify({ studentName, studentOldPassword, studentNewPassword, studentClass }),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(res => res.json()).then(({ updated, mismatch, exists }) => {
                if (updated)
                    showNotificationBox('Information Updated', 'Successfully updated the information.');
                else if (mismatch)
                    showNotificationBox('Password Mismatch', 'Failed to update the password because the new password does match with the old one.')
                else if (!exists)
                    showNotificationBox('Update Failed', 'The information could not be updated because the student could not be found.');
            }).catch(err => showNotificationBox('Network Error', 'There\'s a problem with the internet connection. Try again when the connection is stable.'));
            updateInformationButton.style.pointerEvents = 'all';
        }
    });