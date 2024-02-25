/**
 * Project Name: Notification Box
 * Author: Noorul Misbah
 * Version: 1.2.0
 * Last Updated: 21th November, 2023 
 * 
 * Copyright 2023 Noorul Misbah
 */

function createNotificationBox() {
    boxContainer.setAttribute('id', 'notification-box-container');
    boxTitle.setAttribute('id', 'box-title');
    boxContent.setAttribute('id', 'box-content');
    boxButton.setAttribute('id', 'close-box-button');
    pageOverlay.setAttribute('id', 'page-overlay');

    boxButton.innerText = 'Close';

    boxContainer.appendChild(boxTitle);
    boxContainer.appendChild(boxContent);
    boxContainer.appendChild(boxButton);

    pageOverlay.appendChild(boxContainer);
    pageBody.appendChild(pageOverlay);
}

function showNotificationBox(title, content) {
    pageOverlay.style.opacity = boxContainer.style.opacity = '1';
    pageOverlay.style.zIndex = boxContainer.style.zIndex = 1;
    boxTitle.innerText = title || 'Notification';
    boxContent.innerText = content || ' ';
}

const boxContainer = document.createElement('div');
const boxTitle = document.createElement('p');
const boxContent = document.createElement('p');
const boxButton = document.createElement('button');
const pageOverlay = document.createElement('div');
const pageBody = document.querySelector('body');

createNotificationBox();

boxButton.addEventListener('click', () => {
    pageOverlay.style.opacity = boxContainer.style.opacity = '0';
    pageOverlay.style.zIndex = boxContainer.style.zIndex = -1;
});