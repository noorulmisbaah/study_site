const fs = require('fs');

function retrieveStudents(res) {
    fs.readFile('./users/users.json', (err, content) => {
        if (err)
            throw new Error('Failed to read the users.json file.');
        const users = JSON.parse(content);
        const students = users.filter(user => user.usertype === 'student');

        res.render('manage-students', { students: JSON.stringify(students) });
    })
}

module.exports = { retrieveStudents };