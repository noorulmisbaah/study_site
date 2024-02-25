const fs = require('fs');

function updateInfo(arg) {
    fs.readFile('./users/users.json', (err, content) => {
        if (err)
            throw new Error('Failed to read the users.json file.');
        const users = JSON.parse(content);
        const newUsers = users.filter(user => user.username !== arg.username)
        newUsers[newUsers.length] = arg;

        fs.writeFile('./users/users.json', JSON.stringify(newUsers, null, '\t'), (err) => {
            if (err)
                throw new Error('Failed to update the users.json file.');
        });
    });
}

function updateInformation(req, res) {
    const { studentName, studentClass, studentOldPassword, studentNewPassword } = req.body;

    fs.readFile('./users/users.json', (err, content) => {
        if (err)
            throw new Error('Cannot read the users.json file.');
        const users = JSON.parse(content);
        const student = users.filter(user => user.username === studentName);
        
        if (student.length < 1)
            res.send(JSON.stringify({ exists: false }));
        else {
            student[0].currentclass = studentClass;
    
            if (studentOldPassword) {
                if (studentOldPassword === student[0].password) {
                    student[0].password = studentNewPassword;
                    updateInfo(student[0]);
                    res.send(JSON.stringify({ updated: true }));
                } else {
                    res.send(JSON.stringify({ mismatch: true }));
                }
            } else {
                updateInfo(student[0]);
                res.send(JSON.stringify({ updated: true }));
            }
        }
    });
}

module.exports = { updateInformation };