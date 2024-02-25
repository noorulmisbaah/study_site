function toggleTermSelectionBox(arg) {
    if (arg === 'show') {
        termSelectionBox.style.opacity = '1';
        termSelectionBox.style.zIndex = '1';
    } else if (arg === 'hide') {
        termSelectionBox.style.opacity = '0';
        termSelectionBox.style.zIndex = '-1';
    } else
        return;
}

function displayTopics(topics) {
    topicsSectionTitle.innerText = `${selectedTerm} Topics for ${selectedSubject}`;
    subjectTopicsList.innerHTML = topics.map(topic => {
        return `<ul>
            <li><a class="topic" href="${topic.url}">${topic.title}</a></li>
        </ul>`;
    }).join('');
}

const subjectBoxes = document.querySelectorAll('.subject-box');
const termButtons = document.querySelectorAll('.term-button');
const termSelectionBox = document.querySelector('.term-selection');
const selectedTermText = document.querySelector('.selected-term');
const studentClass = document.querySelector('[student-class]');
const closeIcon = document.querySelector('.term-selection img');
const selectedSubjectText = document.querySelector('.selected-subject-text');
const topicsSectionTitle = document.querySelector('.topics-section .section-title');
const subjectTopicsList = document.querySelector('.topics-section .content')

var selectedSubject;
var selectedTerm;

subjectBoxes.forEach(subjectBox => {
    subjectBox.addEventListener('click', (arg) => {
        selectedSubject = arg.target.innerText;
        selectedSubjectText.innerText = `Selected subject: ${selectedSubject}`;
        toggleTermSelectionBox('show');
    });
});

termButtons.forEach(button => {
    button.addEventListener('click', (arg) => {
        selectedTerm = arg.target.innerText;
        toggleTermSelectionBox('hide');

        fetch('retrieve_topics', {
            body: JSON.stringify({ selectedSubject, selectedClass: studentClass.innerText, selectedTerm: selectedTerm.toLowerCase() }),
            headers: { 'Content-Type': 'application/json'},
            method: 'POST'
        }).then(res => res.json()).then(({ topics, failed }) => {
            if (failed)
                showNotificationBox('Failed', 'The content may not be currently available.');
            else
                displayTopics(topics);
        }).catch(err => {
            showNotificationBox('Error', 'An error occured. Try again later.');
        });
    });
});

closeIcon.addEventListener('click', () => {
    toggleTermSelectionBox('hide');
});