const fs = require('fs');

function removeStudent(req, res) {
    const studentName = req.body.studentName;

    fs.readFile('./users/users.json', (err, content) => {
        if (err)
            throw new Error('Failed to read the users.json file.');
        const users = JSON.parse(content);
        const currentUser = users.filter(user => user.username === studentName);

        if (currentUser.length < 1 || currentUser[0].usertype !== 'student')
            res.send(JSON.stringify({ exists: false }));
        else {
            const updatedUsers = users.filter(user => user.username !== studentName);

            fs.writeFile('./users/users.json', JSON.stringify(updatedUsers, null, '\t'), (err) => {
                if (err)
                    throw new Error('Cannot update the users.json file.');
                res.send(JSON.stringify({ removed: true }));
            });
        }
    });
}

module.exports = { removeStudent };