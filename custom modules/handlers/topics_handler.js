const fs = require('fs');

function retrieveTopics(req, res) {
    const { selectedClass, selectedTerm, selectedSubject } = req.body;

    if (!(fs.existsSync(`./rsc/lessons/${selectedClass}/${selectedSubject}/${selectedTerm}/topics.json`)))
        res.send(JSON.stringify({ failed: true }));
    else
        fs.readFile(`./rsc/lessons/${selectedClass}/${selectedSubject}/${selectedTerm}/topics.json`, (err, content) => {
            if (err)
                throw new Error('Cannot read the topics.json file.');
            const topics = JSON.parse(content)
            res.send(JSON.stringify({ topics }));
        });
}

module.exports = { retrieveTopics };