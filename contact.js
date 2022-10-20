let initialData = [
    {
        name: 'John',
        surname: 'Doe',
        age: 30,
        phone: 124578795,
        email: 'name@surname.com',
        itKnowledge: 8,
        group: 'feu 5',
        interest: ['JavaScript', 'PHP']
    },
    {
        name: 'John',
        surname: 'Doe',
        age: 21,
        phone: 58454884784,
        email: 'name@surname.com',
        itKnowledge: 8,
        group: 'feu 3',
        interest: ['C++', 'Java']
    },
    {
        name: 'Petras',
        surname: 'Petraitis',
        age: 20,
        phone: 4578963214,
        email: 'name@surname.com',
        itKnowledge: 8,
        group: 'feu 4',
        interest: ['Python', 'PHP']
    },
    {
        name: 'Jonas',
        surname: 'Jonaitis',
        age: 24,
        phone: 4545454545,
        email: 'name@surname.com',
        itKnowledge: 8,
        group: 'feu 5',
        interest: []
    },
]

// console.table(initialData)


let studentForm = document.querySelector('#student-form');
let studentList = document.querySelector('#student-list');
let createMessage = document.querySelector('.create-message')

changeRangeOutput()

studentForm.addEventListener('submit', event => {
    event.preventDefault();

    let elements = event.target.elements;
    let name = elements.name.value;
    let surname = elements.surname.value;
    let age = elements.age.value;
    let phone = elements.phone.value;
    let email = elements['student-email'].value;
    let itKnowledge = elements['it-knowledge'].value;
    // let group = document.querySelector('[name="group"]:checked');
    let group = elements.group.value;
    let interests = document.querySelectorAll('[name="interest"]:checked');


    let inputErrorMessages = event.target.querySelectorAll('.input-error-message');
    inputErrorMessages.forEach(message => message.remove())

    let requiredInputs = event.target.querySelectorAll('.required');
    let formIsValid = true;


    requiredInputs.forEach(input => {
        input.classList.remove('input-error')

        // console.dir(input.name)

        if (!input.value) {
            formIsValid = false;

            let messageText = 'This field is required';
            checkInput(input, messageText)
        } else if (input.name === 'name') {
            if (input.value.length < 3) {
                formIsValid = false;

                let messageText = 'Name is too short. At least 3 symbols is required.';
                checkInput(input, messageText)
            }
        } else if (input.name === 'surname') {
            if (input.value.length < 3) {
                formIsValid = false;

                let messageText = 'Surname is too short. At least 3 symbols is required.';
                checkInput(input, messageText)
            }
        } else if (input.name === 'phone') {
            if (input.value.length < 8 || input.value.length > 12) {
                formIsValid = false;

                let messageText = 'Phone number is invalid.';
                checkInput(input, messageText);
            }
        } else if (input.name === 'age') {
            if (input.value < 0) {
                formIsValid = false;

                let messageText = 'Age can\'t be a negative number.';
                checkInput(input, messageText);
            } else if (input.value > 120) {
                formIsValid = false;

                let messageText = 'Age can\'t be more then 120 years.';
                checkInput(input, messageText);
            }
        } else if (input.name === 'email') {
            if (input.value.length < 9 || !input.value.includes('@') || !input.value.includes('.')) {
                formIsValid = false;

                let messageText = 'Email is incorrect.';
                checkInput(input, messageText);
            }
        }
    })

    if (!formIsValid) {
        return
    }
    let studentItem = document.createElement('div');
    studentItem.classList = 'student-item';

    let nameElement = document.createElement('p');
    nameElement.innerHTML = `Name: ${name}`;

    let surnameElement = document.createElement('p');
    surnameElement.innerHTML = `Surname: ${surname}`;

    let ageElement = document.createElement('p');
    ageElement.innerHTML = `Age: ${age}`;

    let emailElement = document.createElement('p');
    emailElement.innerHTML = `Email: <span class="hidden-area">****</span>`;

    let phoneElement = document.createElement('p');
    phoneElement.innerHTML = `Phone: <span class="hidden-area">****</span>`

    let itKnowledgeElement = document.createElement('p');
    itKnowledgeElement.innerHTML = `IT Knowledge: ${itKnowledge}`;

    let groupElement = document.createElement('p');
    groupElement.innerHTML = `Group: ${group}`;

    let interestWrapperElement = document.createElement('div');
    interestWrapperElement.classList.add('interest-wrapper');

    let interestTitleElement = document.createElement('h3');
    interestTitleElement.textContent = 'Interests:';

    let interestsList = document.createElement('ul');
    interests.forEach(interest => {
        let interestsListItem = document.createElement('li');
        interestsListItem.textContent = interest.value;
        interestsList.append(interestsListItem)

    })

    let studentDeleteButton = document.createElement('button');
    studentDeleteButton.textContent = 'Delete student';
    studentDeleteButton.classList.add('button', 'delete-button');
    studentDeleteButton.addEventListener('click', () => {
        studentItem.remove();
        let removedStudentText = `Student ${name} ${surname} successfully removed`
        renderAlertMessage(removedStudentText)
    })

    let privateInfoButton = document.createElement('button');
    let privateData = true;
    privateInfoButton.textContent = 'Show personal info';
    privateInfoButton.classList.add('button', 'private-info-button');

    privateInfoButton.addEventListener('click', () => {
        let privateEmail = emailElement.querySelector('.hidden-area');
        let privatePhone = phoneElement.querySelector('.hidden-area');

        if (privateData) {
            privateEmail.textContent = email;
            privatePhone.textContent = phone;
            privateInfoButton.textContent = 'Hide personal info';
        } else {
            privateEmail.textContent = '****';
            privatePhone.textContent = '****';
            privateInfoButton.textContent = 'Show personal info';
        }
        privateData = !privateData;
    })

    interestWrapperElement.append(interestTitleElement, interestsList)
    studentItem.append(nameElement, surnameElement, ageElement, emailElement, phoneElement, itKnowledgeElement, groupElement, interestWrapperElement, privateInfoButton, studentDeleteButton,)
    studentList.prepend(studentItem);

    let createdStudentText = `Student ${name} ${surname} added`
    renderAlertMessage(createdStudentText);

    changeRangeOutput();
    event.target.reset();
    localStorage.clear()
})

function changeRangeOutput() {
    let itKnowledgeInput = document.querySelector('#student-it-knowledge');
    let itKnowledgeOutput = document.querySelector('#student-it-knowledge-output');
    itKnowledgeOutput.textContent = itKnowledgeInput.value;
    itKnowledgeInput.addEventListener('input', () => itKnowledgeOutput.textContent = itKnowledgeInput.value)
}

function renderAlertMessage(message) {
    let studentCreateMessage = document.createElement('p');
    studentCreateMessage.textContent = message;
    studentCreateMessage.classList = 'new-student-message'
    createMessage.append(studentCreateMessage);
    setTimeout(() => {
        studentCreateMessage.remove()
    }, 3000)
}

function checkInput(input, messageText) {
    let inputErrorMessage = document.createElement('span');
    inputErrorMessage.classList.add('input-error-message');
    input.classList.add('input-error');
    input.after(inputErrorMessage);
    inputErrorMessage.textContent = messageText;
}

let nameInput = document.querySelector('#student-name');
let surnameInput = document.querySelector('#student-surname');
let ageInput = document.querySelector('#student-age');
let phoneInput = document.querySelector('#student-phone');
let emailInput = document.querySelector('#student-email');
let itKnowledgeInput = document.querySelector('#student-it-knowledge');



function populateSimpleInput(input) {
    input.value = localStorage.getItem(input.id);
    
    input.addEventListener('input', (event) => {
        localStorage.setItem(event.target.id, event.target.value)
    })
}

populateSimpleInput(nameInput)
populateSimpleInput(surnameInput)
populateSimpleInput(ageInput)
populateSimpleInput(phoneInput)
populateSimpleInput(emailInput)
populateSimpleInput(itKnowledgeInput)
