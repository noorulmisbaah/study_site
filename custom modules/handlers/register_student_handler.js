const fs = require('fs');

function createStudentAccount(studentData){
    fs.readFile('./users/users.json', (err, content) => {
        if (err)
            throw new Error('Cannot read the users.json file.');
        const users = JSON.parse(content);
        users[users.length] = studentData;

        fs.writeFile('./users/users.json', JSON.stringify(users, null, '\t'), (err) => {
            if (err)
                throw new Error('Failed to update the users.json file.');
        });
    });
}

function registerStudent(req, res) {
    const { studentName, studentPassword, studentClass } = req.body;

    fs.readFile('./users/users.json', (err, content) => {
        if (err)
            throw new Error('Failed to read the users.json file.');
        const users = JSON.parse(content);
        const currentUser = users.filter(user => user.username === studentName);

        if (currentUser.length > 0)
            res.send(JSON.stringify({ exists: true }));
        else {
            const studentData = { 
                username: studentName,
                password: studentPassword,
                usertype: 'student',
                currentclass: studentClass
            };

            createStudentAccount(studentData);
            res.send(JSON.stringify({ registered: true }));
        }
    });
}

module.exports = { registerStudent };