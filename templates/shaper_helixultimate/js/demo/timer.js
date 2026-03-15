// Глобальная переменная для интервала, чтобы его можно было остановить из разных мест
var timerInterval = null;
// Глобальная переменная для отслеживания попыток инициализации
var initializeClockAttempts = 0;
var maxInitializeAttempts = 5; // Максимальное количество попыток инициализации

// Функция для отображения заглушек (--) в таймере
function displayTimerPlaceholders(clockId) {
    var clock = document.getElementById(clockId);
    if (!clock) return;
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');
    if (daysSpan) daysSpan.innerHTML = '--';
    if (hoursSpan) hoursSpan.innerHTML = '--';
    if (minutesSpan) minutesSpan.innerHTML = '--';
    if (secondsSpan) secondsSpan.innerHTML = '--';
    // Можно также сбросить подписи (день, час...) или скрыть их
     try {
        document.getElementById('resultdays').innerHTML = 'дней';
        document.getElementById('resulthours').innerHTML = 'часов';
        document.getElementById('resultminutes').innerHTML = 'минут';
        document.getElementById('resultseconds').innerHTML = 'секунд';
    } catch (e) { /* Игнорируем, если элементы еще не готовы */ }
}

function hideMenu(){
    // Убедимся, что элемент существует перед обращением к style
    var header = document.getElementById('sp-header');
    if (header) {
        header.style.display = 'none';
    }
}

function initializeClock(id){
    console.log(`Попытка инициализации таймера #${initializeClockAttempts + 1}`); // Лог для отладки

    var weddingDayElement = document.getElementById('wedding_day');
    var clockElement = document.getElementById(id); // 'clockdiv'

    // Проверяем наличие основных элементов
    if (!weddingDayElement || !clockElement) {
        console.warn("Не найдены элементы #wedding_day или #" + id + ". Инициализация отложена.");
        // Повторная попытка, если элементы еще не загрузились
        if (initializeClockAttempts < maxInitializeAttempts) {
            initializeClockAttempts++;
            setTimeout(() => initializeClock(id), 1000); // Повторить через 1 секунду
        } else {
            console.error("Не удалось найти элементы для таймера после " + maxInitializeAttempts + " попыток.");
            displayTimerPlaceholders(id); // Показать заглушки, если все попытки провалились
        }
        return; // Выход, если элементы не найдены
    }

    var dateStr = weddingDayElement.innerHTML.trim();

    // Проверяем, есть ли дата
    if (!dateStr) {
        console.warn("#wedding_day еще пуст. Повторная попытка...");
        displayTimerPlaceholders(id); // Показываем заглушки
        if (initializeClockAttempts < maxInitializeAttempts) {
            initializeClockAttempts++;
            setTimeout(() => initializeClock(id), 1000); // Повторить через 1 секунду
        } else {
             console.error("Дата в #wedding_day не появилась после " + maxInitializeAttempts + " попыток.");
             // Можно отобразить сообщение об ошибке пользователю
        }
        return; // Выход, если дата пуста
    }

    var time = "00:00"; // Значение по умолчанию
    var timezoneOffset = 0; // Значение по умолчанию

    try {
        var timeElement = document.getElementById('wedding_time');
        if (timeElement && timeElement.innerHTML.trim()) { // Проверяем, что элемент есть и не пустой
            time = timeElement.innerHTML.trim();
        }
    } catch (error) {
        console.warn("Ошибка при получении времени свадьбы, используется значение по умолчанию (00:00)", error);
    }

    try {
        var timezoneElement = document.getElementById('timezone_offset');
        if (timezoneElement && timezoneElement.innerHTML.trim()) { // Проверяем, что элемент есть и не пустой
            let parsedOffset = parseInt(timezoneElement.innerHTML.trim(), 10);
            if (!isNaN(parsedOffset)) { // Убедимся, что результат парсинга - число
                 timezoneOffset = parsedOffset;
            }
        }
    } catch (error) {
        console.warn("Ошибка при получении часового пояса, используется значение по умолчанию (0)", error);
    }

    var endtime = new Date(`${dateStr}T${time}:00`); // Формируем дату с временем

    // --- КЛЮЧЕВАЯ ПРОВЕРКА на NaN ---
    if (isNaN(endtime.getTime())) {
        console.warn(`Получена невалидная дата: "${dateStr}T${time}:00". Повторная попытка...`);
        displayTimerPlaceholders(id); // Показываем заглушки
        if (initializeClockAttempts < maxInitializeAttempts) {
            initializeClockAttempts++;
            setTimeout(() => initializeClock(id), 1000); // Повторить через 1 секунду
        } else {
             console.error("Не удалось создать валидную дату для таймера после " + maxInitializeAttempts + " попыток.");
             // Можно отобразить сообщение об ошибке пользователю
        }
        return; // Выход, если дата невалидна
    }
    // --- Конец проверки на NaN ---

    // Если дошли сюда, дата валидна, применяем смещение часового пояса
    var localOffset = new Date().getTimezoneOffset(); // Смещение в минутах
    var totalOffset = timezoneOffset - localOffset;
    endtime.setMinutes(endtime.getMinutes() + totalOffset);

    console.log("Дата для таймера успешно установлена:", endtime); // Лог для отладки

    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');
    const timerTitle = clock.closest('.timer')?.querySelector('p'); // Используем optional chaining ?. на случай, если .timer не найден

    function updateClock(){
        var t = getTimeRemaining(endtime);

        // Еще одна проверка на NaN на всякий случай внутри updateClock
        if (isNaN(t.total)) {
             console.error("Ошибка расчета времени (NaN) в updateClock. Остановка таймера.");
             displayTimerPlaceholders(id);
             if (timerInterval) {
                clearInterval(timerInterval);
             }
             return;
        }


        var l = getTimeLabel (t); // Обновляем подписи (день, час...)

        daysSpan.innerHTML = Math.abs(t.days);
        hoursSpan.innerHTML = ('0' + Math.abs(t.hours)).slice(-2); // Добавим ведущий ноль для часов < 10
        minutesSpan.innerHTML = ('0' + Math.abs(t.minutes)).slice(-2); // Добавим ведущий ноль для минут < 10
        secondsSpan.innerHTML = ('0' + Math.abs(t.seconds)).slice(-2); // Добавим ведущий ноль для секунд < 10

        if (timerTitle) { // Проверяем, что timerTitle найден
             if(t.total <=0) {
                timerTitle.textContent = "Мы женаты уже:";
             } else {
                 // Можно вернуть исходный заголовок, если нужно
                 // timerTitle.textContent = "До свадьбы осталось:"; // Или какой там был по умолчанию
             }
        }

        // Логика переключения на подсчет времени *после* свадьбы (уже есть и выглядит нормально)
        // if(t.total<=0){
        //     clearInterval(timeinterval); // Очистка старого интервала не нужна, т.к. логика ниже
        // }

        // Эта часть кода с повторным setInterval внутри updateClock избыточна и может привести к утечкам.
        // Достаточно одного интервала, который будет работать и до, и после события.
        // Просто меняем заголовок и используем Math.abs для значений.
    }

    // Очищаем предыдущий интервал (если он был запущен при неудачной попытке, хотя return должен был предотвратить это)
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    updateClock(); // Первый вызов, чтобы отобразить сразу
    timerInterval = setInterval(updateClock, 1000); // Запускаем интервал
}

// Функции getTimeRemaining и getTimeLabel остаются без изменений
// ... (скопируй сюда свои функции getTimeRemaining и getTimeLabel)
function getTimeRemaining(endtime){
 // ... твой код getTimeRemaining ...
  var t = endtime.getTime() - new Date().getTime();
 return {
        'total': t,
        'days': Math.floor(t / (1000 * 60 * 60 * 24)),
        'hours': Math.floor((t / (1000 * 60 * 60)) % 24),
        'minutes': Math.floor((t / (1000 * 60)) % 60),
        'seconds': Math.floor((t / 1000) % 60)
    };
}

function getTimeLabel ( props ) {
  // ... твой код getTimeLabel ...
    const {days, hours, minutes, seconds} = props;

    var resultdays = `${renderdays(Math.abs(days), ['день', 'дня', 'дней'])}`;
    var resulthours = `${renderhours(Math.abs(hours), ['час', 'часа', 'часов'])}`;
    var resultminutes = `${renderminutes(Math.abs(minutes), ['минута', 'минуты', 'минут'])}`;
    var resultseconds = `${renderseconds(Math.abs(seconds), ['секунда', 'секунды', 'секунд'])}`;

    // Добавим проверки на существование элементов перед записью в innerHTML
    var elDays = document.getElementById('resultdays');
    var elHours = document.getElementById('resulthours');
    var elMinutes = document.getElementById('resultminutes');
    var elSeconds = document.getElementById('resultseconds');

    if(elDays) elDays.innerHTML = resultdays;
    if(elHours) elHours.innerHTML = resulthours;
    if(elMinutes) elMinutes.innerHTML = resultminutes;
    if(elSeconds) elSeconds.innerHTML = resultseconds;


    function renderdays (n, text_forms) {
        var m = Math.abs(n) % 100; var n1 = m % 10;
        if (m > 10 && m < 20) { return text_forms[2]; }
        if (n1 > 1 && n1 < 5) { return text_forms[1]; }
        if (n1 === 1) { return text_forms[0]; }
        return text_forms[2];
    }
    function renderhours (n, text_forms) {
        var m = Math.abs(n) % 100; var n1 = m % 10;
        if (m > 10 && m < 20) { return text_forms[2]; }
        if (n1 > 1 && n1 < 5) { return text_forms[1]; }
        if (n1 === 1) { return text_forms[0]; }
        return text_forms[2];
    }
    function renderminutes (n, text_forms) {
        var m = Math.abs(n) % 100; var n1 = m % 10;
        if (m > 10 && m < 20) { return text_forms[2]; }
        if (n1 > 1 && n1 < 5) { return text_forms[1]; }
        if (n1 === 1) { return text_forms[0]; }
        return text_forms[2];
    }
    function renderseconds (n, text_forms) {
        var m = Math.abs(n) % 100; var n1 = m % 10;
        if (m > 10 && m < 20) { return text_forms[2]; }
        if (n1 > 1 && n1 < 5) { return text_forms[1]; }
        if (n1 === 1) { return text_forms[0]; }
        return text_forms[2];
    }
}


// --- Инициализация после загрузки страницы ---
window.addEventListener('load', (event) => {
    // Сбрасываем счетчик попыток при каждой загрузке страницы
    initializeClockAttempts = 0;
    // Начинаем процесс инициализации
    initializeClock('clockdiv');
});