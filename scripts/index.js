import { fetchData } from "./fetchData.js";

const form = document.querySelector('.form');
const formBtnPrev = document.querySelector('.form__btn-prev');
const formBtnNext = document.querySelector('.form__btn-next');
const formBtnSubmit = document.querySelector('.form__btn-submit');
const formTime = document.querySelector('.form__time');
const formFieldsetType = document.querySelector('.form__fieldset__type');
const formFieldsetDate = document.querySelector('.form__fieldset--date');
const formFieldsetClient = document.querySelector('.form__fieldset--client');
const formFieldsets = [formFieldsetType, formFieldsetDate, formFieldsetClient];


let currentStep = 0;

const data = await fetchData();  
console.log('data: ', data);
const dataToWrite = {
  dataType: {},
  day: '',
  time: '',
};
  //Создаем функцию которая рендерит кнопки на странице
const createRadioBtns = (wrapper, name, data) => {
  wrapper.textContent = '';

  data.forEach(item => {
    const radioDiv = document.createElement('div');
    radioDiv.className = 'radio';

    const radioInput = document.createElement('input');
    radioInput.className = 'radio__input';
    radioInput.type = 'radio';
    radioInput.name = name;
    radioInput.id = item.value;
    radioInput.value = item.value;

    const radioLabel = document.createElement('label');
    radioInput.className = 'radio__input';
    radioInput.htmlFor = item.value;
    radioInput.textContent = item.title;

    radioDiv.append (radioInput, radioLabel);
    wrapper.append (radioDiv);
  });
};

const updateFieldsetVisibility = () => {
  for (let i = 0; i < formFieldsets.length; i++) {
    if (i === currentStep) {
      formFieldsets[i].classList.add('form__fieldset--active');
    } else {
      formFieldsets[i].classList.remove('form__fieldset--active');
    }
  }

  if (currentStep === 0) {
    formBtnPrev.style.display = 'none';
    formBtnNext.style.display = '';
    formBtnSubmit.style.display = 'none';
  } else if (currentStep === formFieldsets.length - 1) {
    formBtnPrev.style.display = '';
    formBtnNext.style.display = 'none';
    formBtnSubmit.style.display = 'block';
  } else {
    formBtnPrev.style.display = '';
    formBtnNext.style.display = '';
    formBtnSubmit.style.display = 'none';
  }
};

const createFormTime = () => {
  formTime.style.display = 'block';
}

// При взаимодействии с инпутами в форме, разблокируем кнопку
const handleInputForm = ({ currentTarget, target }) => {
  if (currentTarget.type.value && currentStep === 0) {
    formBtnNext.disabled = false;

    //createFormMonth()
    //createFormDay()
  }

  if (currentStep === 1) {
    if (currentTarget.day.value && target.name === 'day') {

      createFormTime()
    }

    if (currentTarget.day.value && currentTarget.time.value && target.name === 'time') {
      formBtnNext.disabled = false;
    } else {
      formBtnNext.disabled = true;
    }
  }

  if (currentStep === 2) {
    const inputs = formFieldsetClient.querySelectorAll('.form__input');
    let allFilled = true; 

    //перебираем все инпуты, и если хоть 1 не заполнен, то formBtnSubmit = disabled;
    inputs.forEach(input => {
      if (input.value.trim() === '') {
        allFilled = false;
      }
    });

    formBtnSubmit.disabled = !allFilled;
  }
}

const renderTypeFieldset = () => {
  createRadioBtns
}

const init = () => {
  formBtnNext.disabled = true;

  formBtnNext.addEventListener('click', () => {
    if (currentStep < formFieldsets.length - 1) {
      currentStep += 1;
      updateFieldsetVisibility();
      formBtnNext.disabled = true;
      formBtnSubmit.disabled = true;
    }
  });
  
  formBtnPrev.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep -= 1;
      updateFieldsetVisibility();
      formBtnNext.disabled = false;
    }
  });
  
  form.addEventListener('input', handleInputForm)
  
  updateFieldsetVisibility();
  renderTypeFieldset();
};

init();