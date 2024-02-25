const express = require('express');
const signin = require('./handlers/signin_handler');
const homepage = require('./handlers/homepage_handler');
const manageStudents = require('./handlers/manage_students_handler');
const register = require('./handlers/register_student_handler');
const remove = require('./handlers/remove_student_handler');
const udpate = require('./handlers/update_information_handler');
const topics = require('./handlers/topics_handler');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('rsc'));
app.listen(process.env.PORT || 3000);

function startServer() {
    app.get('/', (req, res) => {
        res.sendFile('index.html', { root: './views/'});
    });

    app.post('/signin', (req, res) => {
        signin.signUser(req, res);
    });

    app.post('/signedin', (req, res) => {
        homepage.renderHomepage(req, res);
    });

    app.post('/manage_students', (req, res) => {
        manageStudents.retrieveStudents(res);
    });

    app.post('/register_student', (req, res) => {
        register.registerStudent(req, res);
    });

    app.post('/remove_student', (req, res) => {
        remove.removeStudent(req, res);
    });

    app.post('/update_student_information', (req, res) => {
        udpate.updateInformation(req, res);
    });

    app.post('/retrieve_topics', (req, res) => {
        topics.retrieveTopics(req, res);
    })

    app.use((req, res) => {
        res.sendFile('404.html', { root: './views/'})
    });
}

module.exports = { startServer };
 