const fs = require('fs');

function renderHomepage(req, res) {
    const { username, usertype } = req.body;
    const classes = fs.readdirSync('./rsc/lessons');
    var subjects = {};

    if (usertype !== 'student') {
        for (var i = 0; i < classes.length; i++) {
            subjects[classes[i]] = fs.readdirSync(`./rsc/lessons/${classes[i]}`);
        }
        
        res.render('administrators', { username, data: JSON.stringify({ classes, subjects }) });
    } else {
        fs.readFile('./users/users.json', (err, content) => {
            if (err)
                throw new Error('Failed to read the users.json file.');
            const users = JSON.parse(content);
            const currentStudent = users.filter(user => user.username === username);
            const subjects = fs.readdirSync(`./rsc/lessons/${currentStudent[0].currentclass}`);

            res.render('homepage', { username, subjects, studentClass: currentStudent[0].currentclass });
        });
    }    
}

module.exports = { renderHomepage };