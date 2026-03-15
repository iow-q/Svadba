const jsonFilePath = '/templates/shaper_helixultimate/json/modern/modern_data.json';
const scriptURL = 'https://script.google.com/macros/s/AKfycbzWyEAmqpTCNlpF8fUr9XKyUjiHrt-Aabvxz3tgc5ccOsy4J9_R-7yry2YWDQ97S_va/exec';

const form = document.forms['rsvp'];
const form2 = document.forms['question'];
const null_value = '0';

function submityes() {
    let quantity = document.getElementById('quantity');
    document.getElementById('rsvp_errors').style.display = 'none';
    document.getElementById('rsvp_null').style.display = 'none';
    const FormNew = new FormData(form);
    FormNew.append('Form', 'rsvp-yes');
    const null_value = '0';
    const textbox_all = form.querySelectorAll('input[type="text"]');
    for (let box of textbox_all) {
        if (!box.value) {
            document.getElementById('rsvp_null').style.display = 'block';
            return false;
            null_value = '1';
        }
    }
    if (null_value == 0) {
        if ((Number.isInteger(Number(quantity.value))) && (Number(quantity.value) <= 10) && (Number(quantity.value) >= 1)) {
            fetch(scriptURL, {
                    method: 'POST',
                    body: FormNew
                })
                .then(response => console.log('Success!', response))
                .catch(error => console.error('Error!', error.message))

            var textboxesall = document.querySelectorAll('input[type="text"]');
            textboxesall.forEach(function(text) {
                text.value = '';
            });
            document.getElementById('rsvp_container').style.display = 'none';
            document.getElementById('rsvp-answ-yes').style.display = 'block';
        } else {
            quantity.style.background = '#e75e7442';
            quantity.style.border = '1px solid #ff0026';
            document.getElementById('rsvp_errors').style.display = 'block';
        }
    }
}

function submitno() {
    let quantity = document.getElementById('quantity');
    document.getElementById('rsvp_errors').style.display = 'none';
    document.getElementById('rsvp_null').style.display = 'none';

    const FormNew = new FormData(form);
    FormNew.append('Form', 'rsvp-no');
    const null_value = '0';
    const textbox_all = form.querySelectorAll('input[type="text"]');
    for (let box of textbox_all) {
        if (!box.value) {
            document.getElementById('rsvp_null').style.display = 'block';
            return false;
            null_value = '1';
        }
    }
    if (null_value == 0) {
        if ((Number.isInteger(Number(quantity.value))) && (Number(quantity.value) <= 10) && (Number(quantity.value) >= 1)) {
            fetch(scriptURL, {
                    method: 'POST',
                    body: FormNew
                })
                .then(response => console.log('Success!', response))
                .catch(error => console.error('Error!', error.message))
            var textboxesall = document.querySelectorAll('input[type="text"]');
            textboxesall.forEach(function(text) {
                text.value = '';
            });
            document.getElementById('rsvp_container').style.display = 'none';
            document.getElementById('rsvp-answ-no').style.display = 'block';

        } else {
            quantity.style.background = '#ff65001c';
            quantity.style.border = '1px solid #ff6500';
            document.getElementById('rsvp_errors').style.display = 'block';
        }
    }
}

function submitquestion() {
    document.getElementById('answ_good').style.display = 'none';
    document.getElementById('answ_null').style.display = 'none';
    const form2 = document.forms['question'];
    const FormNew = new FormData(form2);
    const checkboxes = form2.querySelectorAll('input[type="checkbox"]:checked');
    let checkboxValues = '';

    checkboxes.forEach((checkbox, index) => {
        checkboxValues += checkbox.value;
        if (index < checkboxes.length - 1) {
            checkboxValues += ', ';
        }
    });
    const null_value = '0';
    FormNew.append('Form', 'question');
    FormNew.append('Предпочтения в еде', checkboxValues);

    const textbox_all = form2.querySelectorAll('input[type="text"]');
    for (let box of textbox_all) {
        if (!box.value) {
            document.getElementById('answ_null').style.display = 'block';
            return false;
            null_value = '1';
        }
    }
    if (null_value == 0) {
        fetch(scriptURL, {
                method: 'POST',
                body: FormNew
            })
            .then(response => console.log('Success!', response))
            .catch(error => console.error('Error!', error.message))
        var textboxesall = document.querySelectorAll('input[type="text"]');
        textboxesall.forEach(function(text) {
            text.value = '';
        });
        var checkboxesall = document.querySelectorAll('input[type="checkbox"]');
        checkboxesall.forEach(function(check) {
            check.checked = false;
        });
        var allRadiobuttons = document.querySelectorAll('input[type="radio"]');
        allRadiobuttons.forEach(function(radioButton) {
            radioButton.checked = false;
        });

        document.getElementById('answ_good').style.display = 'block';
    }
}

const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

document.addEventListener('DOMContentLoaded', function() {



fetch(jsonFilePath)
    .then(response => response.json())
    .then(data => {
        const {
            showDresscodeColors,
            separateDresscode,
            showPinterestLink,
            showDresscodeColorsMen,
            menShowPinterestLink,
            showDresscodeColorsWomen,
            womenShowPinterestLink,
            showDetails,
            showRsvp,
            showTimeline,
            showQuestions,
            showDresscode
        } = data.checkboxes;

        const dateParts = data.date.split('-');
        const dayWithZero = dateParts[2];
        const day = parseInt(dateParts[2], 10);
        const monthNumberWithZero = dateParts[1];
        const monthNumber = parseInt(dateParts[1], 10);
        const year = dateParts[0].slice(-2);
        const fullYear = dateParts[0];
        const dayOfWeek = data.dayOfWeek.toLowerCase();
        const timeArParts = data.time.guestsArrival.split(':');
        const timeArPartsOne = timeArParts[0];
        const monthName = months[monthNumber - 1];

        document.getElementById('date-main').innerHTML = `<p class="date-main__number">${dayWithZero}</p><p class="date-main__month">${monthNumberWithZero}</p><p class="date-main__year">${year}</p>`;
        document.querySelector('.date-main-small').textContent = `${day} ${monthName} ${fullYear} года`;
        document.querySelector('.date-welcome').textContent = `${day} ${monthName} ${fullYear} года`;

        document.getElementById('wedding_day').textContent = data.date;
        document.getElementById('groom').textContent = data.names.groom;
        document.getElementById('bride').textContent = `& ${data.names.bride}`;
        document.getElementById('welcome-text').innerHTML = `${data.texts.welcome}`;

        const detailsContainer = document.getElementById('details-container');
        detailsContainer.innerHTML = '';
        data.texts.details.forEach((detailText, index) => {
            const detailBlock = document.createElement('div');
            detailBlock.innerHTML = `<p class="details__text">${detailText}</p>`;
            detailsContainer.appendChild(detailBlock);
        });

        const registrationPlace = document.getElementById('place-one');
        const banquetPlace = document.getElementById('place-two');
        const registrationTitle = document.getElementById('registration-title');

        if (data.placesMode === 1) {
            banquetPlace.style.display = 'none';
            registrationPlace.style.display = 'block';
            registrationTitle.textContent = data.texts.WhereTitle;
            document.getElementById('registration-name').textContent = data.places.banquet.name;
            document.getElementById('registration-address').textContent = data.places.banquet.address;
            document.getElementById('registration-time').textContent = `Начало в ${data.time.registrationStart}`;

        } else if (data.placesMode === 2) {
            banquetPlace.style.display = 'block';
            registrationPlace.style.display = 'block';
            document.getElementById('registration-name').textContent = data.places.registration.name;
            document.getElementById('registration-address').textContent = data.places.registration.address;
            document.getElementById('registration-time').textContent = `Начало в ${data.time.registrationStart}`;
            document.getElementById('banquet-time').textContent = `Начало в ${data.time.banquetStart}`;
            document.getElementById('banquet-title').textContent = data.texts.banquetTitle;
            registrationTitle.textContent = data.texts.registrationTitle;
            document.getElementById('banquet-name').textContent = data.places.banquet.name;
            document.getElementById('banquet-address').textContent = data.places.banquet.address;
        }

        document.querySelector('.rsvp__text').textContent = `Пожалуйста, подтвердите ваше присутствие на нашем празднике до ${data.rsvpDate} любым удобным для вас способом или заполните форму ниже:`;

        const questionForm = document.getElementById('question');
        data.questions.forEach((question, index) => {
            const questionString = document.createElement('p');
            questionString.classList.add('question__string');
            const label = document.createElement('label');
            label.classList.add('question__label-input');
            label.classList.add('opros-grup-title');
            label.textContent = question.label;
            questionString.appendChild(label);

            if (question.type === 'radio' || question.type === 'checkbox') {
                const fieldset = document.createElement('fieldset');
                fieldset.classList.add('question__string');
                fieldset.classList.add('options');
                question.options.forEach((option, optionIndex) => {
                    const optionLabel = document.createElement('label');
                    optionLabel.classList.add('question__label');
                    optionLabel.setAttribute('for', `${option.value}-${index}`);

                    const input = document.createElement('input');
                    input.classList.add('question__unvisible');
                    input.type = question.type;
                    input.name = question.label;
                    input.id = `${option.value}-${index}`;
                    input.value = option.value;
                    if (question.type === 'radio' && optionIndex === 0) {
                        input.checked = true;
                    }
                    optionLabel.appendChild(input);

                    const visibleInput = document.createElement('span');
                    visibleInput.classList.add('question__visible-' + question.type);
                    optionLabel.appendChild(visibleInput);

                    const textSpan = document.createElement('span');
                    textSpan.classList.add('question__text-span');
                    textSpan.textContent = option.text;
                    optionLabel.appendChild(textSpan);
                    fieldset.appendChild(optionLabel);
                });
                questionString.appendChild(fieldset);

            } else if (question.type === 'text') {
                const input = document.createElement('input');
                input.type = 'text';
                input.name = question.label;
                input.classList.add('question__input')
                input.required = true;
                questionString.appendChild(input);
            }
            questionForm.appendChild(questionString);
        });

        const submitButtonContainer = document.createElement('div');
        submitButtonContainer.style.textAlign = 'left';
        const answGood = document.createElement('div');
        answGood.id = "answ_good";
        answGood.classList.add('rsvp-message');
        answGood.style = "display:none;";
        answGood.textContent = "Спасибо, ваш ответ учтен. Не забудьте заполнить форму на каждого гостя";
        submitButtonContainer.appendChild(answGood);

        const answNull = document.createElement('div');
        answNull.id = "answ_null";
        answNull.classList.add('error-rsvp');
        answNull.style = "display:none; text-align: left;";
        answNull.textContent = "Заполните, пожалуйста, все поля.";
        submitButtonContainer.appendChild(answNull);

        const submitButton = document.createElement('button');
        submitButton.name = 'Принято';
        submitButton.classList.add('button');
        submitButton.classList.add('rsvp__button');
        submitButton.textContent = 'Подтвердить';
        submitButton.onclick = function() {
            submitquestion();
            return false;
        };
        submitButtonContainer.appendChild(submitButton);
        questionForm.appendChild(submitButtonContainer);


        const timelineBlock = document.querySelector('.timetable__block');
        timelineBlock.innerHTML = '';

        

       


        data.timeline.forEach((item, index) => {
              const planBlock = document.createElement('div');
              planBlock.classList.add('timetable__block-stroke');
              timelineBlock.appendChild(planBlock);
              
               const imgBlock = document.createElement('div');
              imgBlock.classList.add('timetable__block-img');
               planBlock.appendChild(imgBlock);
               
               const lineBlock = document.createElement('div');
              lineBlock.classList.add('timetable__block-line');
               planBlock.appendChild(lineBlock);

               const textBlock = document.createElement('div');
                textBlock.classList.add('timetable__block-texts');
                planBlock.appendChild(textBlock);
                
                const icon = document.createElement('img');
                icon.src = `/images/sites/modern/${item.icon}.svg`;
                icon.alt = item.icon;
                 icon.classList.add('dresscode__img');
                imgBlock.appendChild(icon);
                
               const timeDiv = document.createElement('div');
               timeDiv.classList.add('timetable__block-time')
               timeDiv.textContent = item.time;
                 textBlock.appendChild(timeDiv);
            
                const nameDiv = document.createElement('div');
                nameDiv.classList.add('timetable__block-name');
                nameDiv.textContent = item.title;
                textBlock.appendChild(nameDiv);
                
                const descrDiv = document.createElement('div');
                descrDiv.classList.add('timetable__block-descr');
                 descrDiv.innerHTML = item.descr;
               textBlock.appendChild(descrDiv);
                

              
            if (index === 0) {
                 const lineStart = document.createElement('img');
        lineStart.src = `/images/sites/modern/line-start.png`;
        lineStart.alt = 'линия';
        lineStart.classList.add('timetable__block-line');
              lineBlock.appendChild(lineStart);
            } else if (index === data.timeline.length - 1) {
                
        const lineEnd = document.createElement('img');
        lineEnd.src = `/images/sites/modern/line-end.png`;
        lineEnd.alt = 'линия';
        lineEnd.classList.add('timetable__block-line');
                lineBlock.appendChild(lineEnd);
            } else {
                 const lineCenter = document.createElement('img');
        lineCenter.src = `/images/sites/modern/line-center.png`;
        lineCenter.alt = 'линия';
        lineCenter.classList.add('timetable__block-line');
                 lineBlock.appendChild(lineCenter);
             }
        });

        const dresscodeColorsContainer = document.querySelector('.dresscode__colors');
        if (dresscodeColorsContainer) {
            dresscodeColorsContainer.innerHTML = '';
            const colors = data.texts.dresscodeColors;
            document.getElementById('dresscode__description').textContent = data.texts.dresscode;
            document.getElementById('dresscode__description_man').textContent = data.texts.dresscodeGendered.men.text;
            document.getElementById('dresscode__description_woman').textContent = data.texts.dresscodeGendered.women.text;

            if (colors) {
                const colorCount = Object.keys(colors).length;
                const screenWidth = window.innerWidth;
                const circleSize = Math.max((screenWidth / colorCount) - 30, 20);

                for (const colorKey in colors) {
                    if (colors.hasOwnProperty(colorKey)) {
                        const colorValue = colors[colorKey];
                        const colorCircle = document.createElement('div');
                        colorCircle.classList.add('dresscode__color');
                        colorCircle.style.backgroundColor = colorValue;
                        colorCircle.style.width = `${circleSize}px`;
                        colorCircle.style.height = `${circleSize}px`;
                        dresscodeColorsContainer.appendChild(colorCircle);
                    }
                }
            }
        }
    })
    .catch(error => console.error('Ошибка загрузки данных:', error));
});