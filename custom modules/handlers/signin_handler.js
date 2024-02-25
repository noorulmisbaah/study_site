const fs = require('fs');

function signUser(req, res) {
    const { username, password } = req.body;
    
    fs.readFile('./users/users.json', (err, content) => {
        if (err)
            throw new Error('Failed to read the users.json file.');
        const allUsers = JSON.parse(content);
        const currentUser = allUsers.filter(user => username === user.username);

        if (currentUser.length < 1)
            res.send(JSON.stringify({ exists: false }));
        else if (currentUser[0].password !== password)
            res.send(JSON.stringify({ wrongPassword: true }));
        else
            res.send(JSON.stringify({ exists: true, usertype: currentUser[0].usertype }));
    })
}

module.exports = { signUser };