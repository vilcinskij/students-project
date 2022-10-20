let studentForm = document.querySelector('#student-form');
let studentsList = document.querySelector('#students-list');

function changeRangeOutput() {
  let itKnowledgeInput = document.querySelector('#student-it-knowledge');
  let itKnowledgeOutput = document.querySelector('#it-knowledge-output');
  
  itKnowledgeInput.addEventListener('input', () => {
    itKnowledgeOutput.textContent = itKnowledgeInput.value;
  });
}

changeRangeOutput();

studentForm.addEventListener('submit', (event) => {
  event.preventDefault();

  let elements = event.target.elements;

  let name = elements.name.value;
  let surname = elements.surname.value;
  let age = elements.age.value;
  let phone = elements.phone.value;
  // let email = elements['student-email'].value;
  let email = elements.email.value;
  let itKnowledge = elements['it-knowledge'].value;
  // let group = document.querySelector('[name="group"]:checked');
  let group = elements.group.value;
  let interests = document.querySelectorAll('[name="interest"]:checked');

  let inputErrorMessages = event.target.querySelectorAll('.input-error-message');
  inputErrorMessages.forEach(message => message.remove());

  let requiredInputs = event.target.querySelectorAll('.required');
  let formIsValid = true;

  requiredInputs.forEach(input => {
    input.classList.remove('input-error');

    if (!input.value) {
      formIsValid = false;
      checkInputData(input, 'This field is required.');
    } else if (input.name === 'name') {
      if (input.value.length < 3) {
        formIsValid = false;
        let errorText = 'Name is too short. At least 3 symbols is required.'
        checkInputData(input, errorText);
      }
    } else if (input.name === 'surname') {
      if (input.value.length < 3) {
        formIsValid = false;
        checkInputData(input, 'Surname is too short. At least 3 symbols is required.');
      }
    } else if (input.name === 'phone') {
      if (input.value.length < 9 || input.value.length > 12) {
        formIsValid = false;
        checkInputData(input, 'Phone number is invalid.');
      }
    } else if (input.name === 'age') {
      if (input.value < 0) {
        formIsValid = false;
        checkInputData(input, 'Age cannot be a negative number.');
      } else if (input.value > 120) {
        formIsValid = false;
        checkInputData(input, 'Age cannot be more then 120 years.');

      }
    } else if (input.name === 'email') {
      if (input.value.length < 9 || !input.value.includes('@') || !input.value.includes('.')) {
        formIsValid = false;
        checkInputData(input, 'Email is incorrect.');
      }
    }
  });

  if (!formIsValid) {
    let errorMessage = 'Some fields are missing...';
    renderAlertMessage(errorMessage, 'color-red');
    return;
  }

  let studentItem = document.createElement('div');
  studentItem.classList.add('student-item');

  let nameElement = document.createElement('p');
  nameElement.innerHTML = `<strong>Name:</strong> ${name}`;

  let surnameElement = document.createElement('p');
  surnameElement.innerHTML = `<strong>Surname:</strong> ${surname}`;

  let ageElement = document.createElement('p');
  ageElement.innerHTML = `<strong>Age:</strong> ${age}`;

  let emailElement = document.createElement('p');
  emailElement.innerHTML = `<strong>Email:</strong> <span class="hidden-area">****</span>`;

  let phoneElement = document.createElement('p');
  phoneElement.innerHTML = `<strong>Phone:</strong> <span class="hidden-area">****</span>`;

  let itKnowledgeElement = document.createElement('p');
  itKnowledgeElement.innerHTML = `<strong>IT knowledge:</strong> ${itKnowledge}`;

  let groupElement = document.createElement('p');
  groupElement.innerHTML = `<strong>Group:</strong> ${group}`;

  let interestWrapperElement = document.createElement('div');
  interestWrapperElement.classList.add('interest-wrapper');

  let interestTitleElement = document.createElement('h3');
  interestTitleElement.textContent = 'Interests:';

  let interestListElement = document.createElement('ul');

  interests.forEach(interest => {
    let interestItem = document.createElement('li');
    interestItem.textContent = interest.value;
    interestListElement.append(interestItem);
  });

  interestWrapperElement.append(interestTitleElement, interestListElement);

  let privateInfoButton = document.createElement('button');
  privateInfoButton.textContent = 'Show personal info';
  privateInfoButton.classList.add('private-info-button', 'show');

  let dataHidden = true;

  privateInfoButton.addEventListener('click', () => {
    let privateEmail = emailElement.querySelector('.hidden-area');
    let privatePhone = phoneElement.querySelector('.hidden-area');

    if (dataHidden) {
      privateEmail.textContent = email;
      privatePhone.textContent = phone;
      privateInfoButton.textContent = 'Hide personal info';
    } else {
      privateEmail.textContent = '****';
      privatePhone.textContent = '****';
      privateInfoButton.textContent = 'Show personal info';
    }
    
    dataHidden = !dataHidden;
  });

  let removeStudentButton = document.createElement('button');
  removeStudentButton.textContent = 'Remove student';

  removeStudentButton.addEventListener('click', () => {
    studentItem.remove();
    let removedStudentText = `Student (${name} ${surname}) successfully removed.`;
    renderAlertMessage(removedStudentText);
  });

  studentItem.append(nameElement, surnameElement, ageElement, emailElement, phoneElement, itKnowledgeElement, groupElement, interestWrapperElement, privateInfoButton, removeStudentButton);
  studentsList.prepend(studentItem);

  let createdStudentText = `Student created (${name} ${surname})`;
  renderAlertMessage(createdStudentText);

  // 3. Kontaktų forma turi išsivalyti.
  event.target.reset();
  localStorage.clear();
});

function renderAlertMessage(text, elementClass) {
  let alertMessage = document.querySelector('#alert-message');
  alertMessage.textContent = text;

  if (elementClass) {
    alertMessage.classList.add(elementClass);
  }

  setTimeout(() => {
    alertMessage.textContent = '';
    alertMessage.classList.remove(elementClass);
  }, 5000);
}

function checkInputData(input, text) {
  let inputErrorMessage = document.createElement('span');
  inputErrorMessage.classList.add('input-error-message', 'color-red');
  input.classList.add('input-error');
  input.after(inputErrorMessage);
  inputErrorMessage.textContent = text;
}

let nameInput = document.getElementById('student-name');
let surnameInput = document.getElementById('student-surname');
let ageInput = document.getElementById('student-age');
let phoneInput = document.getElementById('student-phone');
let emailInput = document.getElementById('student-email');
let itKnowledgeInput = document.getElementById('student-it-knowledge');


function populateSimpleInput(input) {
  let oldStorageValue = localStorage.getItem(input.id);
  if (oldStorageValue !== null) {
    input.value = oldStorageValue;
  }

  input.addEventListener('input', (event) => {
    let storageKey = event.target.id;
    let storageValue = event.target.value;
    localStorage.setItem(storageKey, storageValue);
  });
}

populateSimpleInput(nameInput);
populateSimpleInput(surnameInput);
populateSimpleInput(ageInput);
populateSimpleInput(phoneInput);
populateSimpleInput(emailInput);
populateSimpleInput(itKnowledgeInput);