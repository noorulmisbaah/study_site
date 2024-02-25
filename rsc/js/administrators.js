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

function displaySubjects(data) {
    pageContent.innerHTML = data['classes'].map(currentClass => {
        return `
            <div class="classes">
                <p class="section-title"><span>${currentClass}</span> Subjects</p>
                <div class="subjects">
                    
                </div>
            </div>
            `
    }).join('');

    const subjectsContainer = document.querySelectorAll('.subjects');
    var subjects = [];

    for (var subject in data['subjects']) {
        subjects.push(data['subjects'][subject]);
    }

    for (var i = 0; i < subjects.length; i++) {
        subjectsContainer[i].innerHTML = subjects[i].map(subject => {
            return `
                <div class="subject-box">
                    <p>${subject}</p>
                </div>
            `
        }).join('');
    }
}

const manageStudentsButton = document.querySelector('.manage-students-button');
const pageContent = document.querySelector('.page-content');
const returnedData = JSON.parse(document.querySelector('[returned-data]').innerText);

displaySubjects(returnedData);

const classes = document.querySelectorAll('.classes');
const subjectBoxes = document.querySelectorAll('.subject-box');
const termButtons = document.querySelectorAll('.term-button');
const termSelectionBox = document.querySelector('.term-selection');
const selectedTermText = document.querySelector('.selected-term');
const closeIcon = document.querySelector('.term-selection img');
const selectedSubjectText = document.querySelector('.selected-subject-text');
const topicsSectionTitle = document.querySelector('.topics-section .section-title');
const subjectTopicsList = document.querySelector('.topics-section .content');

var selectedClass;
var selectedSubject;
var selectedTerm;

classes.forEach(currentClass => {
    currentClass.addEventListener('click', (arg) => {
        const classTitle = currentClass.querySelector('span').innerText;
        selectedClass = classTitle;
    });
});

manageStudentsButton.addEventListener('click', () => {
    const submitButton = document.querySelector('form button');
    submitButton.click();
});

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
            body: JSON.stringify({ selectedSubject, selectedClass, selectedTerm: selectedTerm.toLowerCase() }),
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