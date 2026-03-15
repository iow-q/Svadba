const jsonFilePath = '/templates/shaper_helixultimate/json/grey/grey_data.json';

const scriptURL = 'https://script.google.com/macros/s/AKfycbzWyEAmqpTCNlpF8fUr9XKyUjiHrt-Aabvxz3tgc5ccOsy4J9_R-7yry2YWDQ97S_va/exec';

const form = document.forms['rsvp'];
const form2 = document.forms['question'];
const null_value = '0';


function submityes() {
    let quantity = document.getElementById('quantity');
    quantity.style.background = '#fff';
    quantity.style.border = '1px solid rgba(0, 0, 0, 0.15)';
    document.getElementById('rsvp_errors').style.display = 'none';
    document.getElementById('rsvp_null').style.display = 'none';
    const FormNew = new FormData(form);
    FormNew.append('Form', 'rsvp-yes');
    const null_value = '0';
    const textbox_all = form.querySelectorAll('input[type="text"]');
    // Проверяем заполнение текстовых полей
    for (let box of textbox_all) {
        if (!box.value) {
            document.getElementById('rsvp_null').style.display = 'block';
            return false; // Остановить проверку и выйти из функции
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
    quantity.style.background = '#fff';
    quantity.style.border = '1px solid rgba(0, 0, 0, 0.15)';
    document.getElementById('rsvp_errors').style.display = 'none';
    document.getElementById('rsvp_null').style.display = 'none';

    const FormNew = new FormData(form);
    FormNew.append('Form', 'rsvp-no');
    const null_value = '0';
    const textbox_all = form.querySelectorAll('input[type="text"]');
    // Проверяем заполнение текстовых полей
    for (let box of textbox_all) {
        if (!box.value) {
            document.getElementById('rsvp_null').style.display = 'block';
            return false; // Остановить проверку и выйти из функции
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
        // Добавляем значение чекбокса к строке с разделителем запятая
        checkboxValues += checkbox.value;
        // Добавляем запятую, если это не последний элемент
        if (index < checkboxes.length - 1) {
            checkboxValues += ', ';
        }
    });
    const null_value = '0';
    FormNew.append('Form', 'question');
    FormNew.append('Предпочтения в еде', checkboxValues); //заменить на название столбца в таблице гугл

    const textbox_all = form2.querySelectorAll('input[type="text"]');
    // Проверяем заполнение текстовых полей
    for (let box of textbox_all) {
        if (!box.value) {
            document.getElementById('answ_null').style.display = 'block';
            return false; // Остановить проверку и выйти из функции
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


// Массив с месяцами на русском
const months = [
    'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
    'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'
];

document.addEventListener('DOMContentLoaded', function() {
    // Получаем контейнер для монохромной темы
    const monochromeContainer = document.getElementById('grey');
    // Получаем кнопки для смены темы
    const lightThemeBtn = document.getElementById('light-theme-btn');
    const greenThemeBtn = document.getElementById('green-theme-btn');
    const blueThemeBtn = document.getElementById('blue-theme-btn');
    const purpleThemeBtn = document.getElementById('purple-theme-btn');

    // Изначально устанавливаем тему из localStorage, если есть, или ставим светлую по умолчанию.
    let currentTheme = localStorage.getItem('theme') || 'white-gray';
    setTheme(currentTheme);

    // Обработчики событий для кнопок смены темы
    lightThemeBtn.addEventListener('click', () => {
        setTheme('white-gray');
        localStorage.setItem('theme', 'white-gray');
    });

    greenThemeBtn.addEventListener('click', () => {
        setTheme('yellow-green');
        localStorage.setItem('theme', 'yellow-green');
    });
    blueThemeBtn.addEventListener('click', () => {
        setTheme('blue');
        localStorage.setItem('theme', 'blue');
    });
    purpleThemeBtn.addEventListener('click', () => {
        setTheme('purple');
        localStorage.setItem('theme', 'purple');
    });

    // Функция для установки темы
    function setTheme(theme) {
        monochromeContainer.classList.remove('yellow-green-theme');
        monochromeContainer.classList.remove('white-gray-theme');
        monochromeContainer.classList.remove('blue-theme');
        monochromeContainer.classList.remove('purple-theme');
        if (theme === 'white-gray') {
            monochromeContainer.classList.add('white-gray-theme');
        } else if (theme === 'yellow-green') {
            monochromeContainer.classList.add('yellow-green-theme');
        } else if (theme === 'blue') {
            monochromeContainer.classList.add('blue-theme');
        } else if (theme === 'purple') {
            monochromeContainer.classList.add('purple-theme');
        }
    }
});


// Функция для загрузки данных из JSON файла
fetch(jsonFilePath)
    .then(response => response.json())
    .then(data => {
        // Получаем значения чекбоксов из JSON
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

        // Получаем элементы блоков, которые нужно скрыть/показать
        const detailsSection = document.getElementById('details');
        const dresscodeSection = document.getElementById('dresscode');
        const rsvpSection = document.getElementById('rsvp');
        const questionsSection = document.getElementById('questions');
        const planSection = document.getElementById('plan');
     


        // Функция для скрытия/показа блока
        const toggleSection = (element, show) => {
            element.style.display = show ? '' : 'none';
        };

        // Скрываем или показываем блоки в зависимости от значений в JSON
        toggleSection(detailsSection, showDetails);
        toggleSection(dresscodeSection, showDresscode && (showDresscodeColors || separateDresscode));
        toggleSection(rsvpSection, showRsvp);
        toggleSection(questionsSection, showQuestions);
        toggleSection(planSection, showTimeline);
     


        // Разделяем дату на день, месяц и год
        const dateParts = data.date.split('-');
        const day = dateParts[2];
        const monthNumberWithZero = dateParts[1]; // Получаем номер месяца c 0 в начале (напр. 01, 07 и т.д.)
        const monthNumber = parseInt(dateParts[1], 10); // Получаем номер месяца
        const year = dateParts[0].slice(-2); // Последние два символа года
        const fullYear = dateParts[0]; // Полное число года
        const dayOfWeek = data.dayOfWeek;
    const timeArParts = data.time.guestsArrival.split(':');
         const timeArPartsOne = timeArParts[0];
         // Используем массив для получения месяца словом
        const monthName = months[monthNumber - 1]; // Месяца начинаются с 0, поэтому вычитаем 1

        
        document.getElementById('date-main').innerHTML = `<p class="date-mainn__number">${day}</p>
							<p class="date-mainn__month">${monthNumberWithZero}</p>
							<p class="date-mainn__month">${year}</p>`;
							
							
       document.getElementById('date-text').innerHTML = `<p>${day} ${monthName}</p>
								<p>${fullYear} ГОДА</p>`;
								
			//	 document.getElementById('date-text-time').innerHTML = `<p>${dayOfWeek}</p>
			//					<p>${timeArPartsOne} ЧАСОВ</p>`;
			
			 document.getElementById('date-text-time').innerHTML = `<p>${dayOfWeek}</p>
							<p>${data.time.guestsArrival}</p>`;

        // Дата свадьбы для блоков
/* 
        document.getElementById('wedding-date').textContent = `${day} ${monthName} ${year}`;
        document.getElementById('wedding_day').textContent = data.date;
        document.getElementById('day-week-wedding-date').textContent = data.dayOfWeek;


    */    // Имена
        document.getElementById('full-names').textContent = `${data.names.groom} и ${data.names.bride}`;
        document.getElementById('groom').textContent = `${data.names.groom} и `;
        document.getElementById('bride').textContent = data.names.bride;

        // Приветственный текст
        document.getElementById('welcome-text').textContent = data.texts.welcome;

        // Динамическое добавление блоков для деталей
        const detailsContainer = document.getElementById('details-container'); // Это контейнер, куда будут добавляться блоки с деталями
        detailsContainer.innerHTML = ''; // Очищаем контейнер перед добавлением

        data.texts.details.forEach((detailText, index) => {
            // Создаем новый блок для каждой детали
            const detailBlock = document.createElement('div');
            detailBlock.classList.add('text-detailss__peragraf'); // Можно добавить свой класс, чтобы стилизовать блоки
            detailBlock.innerHTML = `<p class="detail-text">${detailText}</p>`; // Добавляем текст детали
            detailsContainer.appendChild(detailBlock); // Добавляем блок в контейнер
         
        });

        // Время
        document.getElementById('guests-arrival').textContent = `СБОР ГОСТЕЙ В ${data.time.guestsArrival}`;
        document.getElementById('registration-time').textContent = `НАЧАЛО В ${data.time.registrationStart}`;
        

const registrationPlace = document.getElementById('place-one');
const banquetPlace = document.getElementById('place-two');
const banquetTime = document.getElementById('banquet-time');
banquetTime.textContent = `НАЧАЛО В ${data.time.banquetStart}`;
const registrationTitle = document.getElementById('registration-title');
        // Места
        if (data.placesMode === 1) {
            // Если 1 место
            banquetPlace.style.display = 'none'; 
            registrationPlace.style.display = 'block';  
            registrationTitle.style.display = 'none';  
            
            document.getElementById('registration-name').textContent = data.places.banquet.name;
            document.getElementById('registration-address').textContent = data.places.banquet.address;
        } else if (data.placesMode === 2) {
            // Если 2 места
            banquetPlace.style.display = 'block'; 
            registrationPlace.style.display = 'block'; 
            banquetTime.style.display = 'none'; 
            document.getElementById('registration-name').textContent = data.places.registration.name;
            document.getElementById('registration-address').textContent = data.places.registration.address;
             document.getElementById('banquet-time2').textContent = `НАЧАЛО В ${data.time.banquetStart}`;
            document.getElementById('banquet-title').textContent = data.texts.banquetTitle;
            registrationTitle.textContent = data.texts.registrationTitle;
            document.getElementById('banquet-name').textContent = data.places.banquet.name;
        document.getElementById('banquet-address').textContent = data.places.banquet.address;
        }



        //Дата RSVP
        document.querySelector('.rsvp__text').textContent = `Пожалуйста, подтвердите ваше присутствие на нашем празднике до ${data.rsvpDate} любым удобным для вас способом или заполните форму ниже:`;

        //  Блок Опрос
        const questionForm = document.getElementById('question');
        questionForm.innerHTML = ''; // Очищаем форму перед заполнением

        data.questions.forEach((question, index) => {
            const questionString = document.createElement('p');
            questionString.classList.add('question__string');
            const label = document.createElement('label');
            label.classList.add('question__label-input');
            label.classList.add('opros-grup-title');
            label.textContent = question.label;
            questionString.appendChild(label);

            if (question.type === 'radio' || question.type === 'checkbox') {
                // Для радио и чекбоксов
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
                    input.value = option.value;
          
        if (question.type === 'radio' && optionIndex === 0) {  // Если это первая радиокнопка, отмечаем ее
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
                // Для текстового поля
                const input = document.createElement('input');
                input.type = 'text';
                input.name = question.label;
                input.classList.add('question__input')
                input.required = true;
                questionString.appendChild(input);
            }
            questionForm.appendChild(questionString);
        });

        // После добавления всех элементов формы, добавляем кнопку "Подтвердить"
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
        submitButton.classList.add('personn__button');
        submitButton.textContent = 'Подтвердить';
         submitButton.onclick =  function (){
          submitquestion();
           return false;
          };
        submitButtonContainer.appendChild(submitButton);
        questionForm.appendChild(submitButtonContainer);


        // Получение контейнера для таймлайна
        const timelineBlock = document.querySelector('.timetable__block');
        timelineBlock.innerHTML = ''; // Очищаем старый контент

        //Создание стартовой линии
        const lineStart = document.createElement('img');
        lineStart.src = `/images/sites/timeline/lines-1/line-start.svg`;
        lineStart.alt = 'линия';
        lineStart.classList.add('timetable__line-start');
        timelineBlock.appendChild(lineStart);

        //   Генерация grid-template-areas для больших экранов
        let gridTemplateAreas = '';
        let textLine1 = '';
        let lineLine = '';
        let textLine2 = '';

        data.timeline.forEach((item, index) => {
            if (index % 2 === 0) {
                textLine1 += `text-${item.icon} `
                lineLine += `line-${item.icon} `
                textLine2 += `${item.icon} `
            } else {
                textLine1 += `${item.icon} `
                lineLine += `line-${item.icon} `
                textLine2 += `text-${item.icon} `
            }
        });

        gridTemplateAreas = `"${textLine1.trim()}" "${lineLine.trim()}" "${textLine2.trim()}"`;

        if (window.innerWidth > 750) {
            // Динамическое задание grid-template-columns
            const columnWidth = getComputedStyle(timelineBlock).getPropertyValue('grid-template-columns').split(' ')[0].replace('px', '');
            const numberOfTimeLineItems = data.timeline.length;
            timelineBlock.style.gridTemplateColumns = `repeat(${numberOfTimeLineItems}, ${columnWidth}px)`;
            timelineBlock.style.gridTemplateAreas = gridTemplateAreas;
        } else {

            //   Генерация grid-template-areas для маленьких экранов
            let gridTemplateAreasSmall = '';
            let numberOfTimeLineItems = data.timeline.length;

            for (let i = 0; i < numberOfTimeLineItems; i++) {
                const item = data.timeline[i];
                if (i % 2 === 0) {
                    gridTemplateAreasSmall += `"${item.icon} line-${item.icon} text-${item.icon}" `;
                } else {
                    gridTemplateAreasSmall += `"text-${item.icon} line-${item.icon} ${item.icon}" `;
                }

            }


            const rowHeight = getComputedStyle(timelineBlock).getPropertyValue('grid-template-rows').split(' ')[0].replace('px', '');
            timelineBlock.style.gridTemplateRows = `repeat(${numberOfTimeLineItems}, ${rowHeight}px)`;
            timelineBlock.style.gridTemplateAreas = gridTemplateAreasSmall;

        }

        //  Установка grid-area для стартовой линии
        const firstItemIcon = data.timeline[0].icon;
        const lineStartElement = document.querySelector('.timetable__line-start');
        lineStartElement.style.gridArea = `line-${firstItemIcon}`;

        // Перебираем данные и создаем элементы
        data.timeline.forEach((item, index) => {

            // Создаем текстовый блок
            const textBlock = document.createElement('p');
            textBlock.classList.add('timetable__text', `timetable__text_about_${item.icon}`);
            textBlock.innerHTML = `${item.title} <br/> ${item.time}`
            timelineBlock.appendChild(textBlock);

            // Создаем иконку
            const icon = document.createElement('img');
            icon.src = `/images/sites/timeline/icons-1/${item.icon}.svg`;
            icon.alt = item.icon;
            icon.classList.add('timetable__pic', `timetable__pic_visual_${item.icon}`);
            timelineBlock.appendChild(icon);

            // Создаем линию, если это не первый и не последний элемент
            if (index > 0 && index < data.timeline.length - 1) {
                const line = document.createElement('img');
                line.src = `/images/sites/timeline/lines-1/line-center.svg`;
                line.alt = 'линия';
                line.classList.add('timetable__line', `timetable__line_center_${item.icon}`);
                timelineBlock.appendChild(line);
            }


        });
        //Создание конечной линии
        const lineEnd = document.createElement('img');
        lineEnd.src = `/images/sites/timeline/lines-1/line-end.svg`;
        lineEnd.alt = 'линия';
        lineEnd.classList.add('timetable__line-end');
        timelineBlock.appendChild(lineEnd);
        //Установка grid-area для конечной линии
        const lastItemIcon = data.timeline[data.timeline.length - 1].icon;
        const lineEndElement = document.querySelector('.timetable__line-end');
        lineEndElement.style.gridArea = `line-${lastItemIcon}`;
        
        // Обрабатываем цвета дресс-кода
        const dresscodeColorsContainer = document.querySelector('.dresscode__colors');

        // Очищаем старые цвета
        if (dresscodeColorsContainer) {
            dresscodeColorsContainer.innerHTML = '';

            const colors = data.texts.dresscodeColors;

            document.getElementById('dresscode__description').textContent = data.texts.dresscode;

            if (colors)
                if (colors) {
                    const colorCount = Object.keys(colors).length;

                    const screenWidth = window.innerWidth;
                    const circleSize = Math.max((screenWidth / colorCount) - 30, 20); // Ensure min size 20px

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
