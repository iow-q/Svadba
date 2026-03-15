/* === ФУНКЦИИ ОТКРЫТИЯ ОКОН (ВАШ КОД) === */
function openboxvip(button) {
    const designItem = button.closest('.design-item');
    const designImage = designItem.getAttribute('data-image');
    const designName = designItem.getAttribute('data-name');
    const boxWindow = document.getElementById("box-window");
    const selectedImage = document.getElementById("selected-design-image");
    const selectedName = document.getElementById("selected-design-name");
    const designInput = document.getElementById('design-name');
    
    setInitialMinDate();
    
    selectedImage.src = designImage;
    selectedName.textContent = designName;
    designInput.textContent = designName;
    designInput.value = designName;

    selectedImage.style.display = 'block';
    selectedName.style.display = 'inline-block';

    boxWindow.style.display = "block";
    document.getElementById("box-window-in").style.display = "block";
    document.getElementById("box-window-in2").style.display = "none";
    
    const boxWindowVip = document.getElementById("box-window-vip");
    if (boxWindowVip) boxWindowVip.style.display = "none";
}

function openboxindiv(button) {
    const designInput = document.getElementById('design-name-indiv');
    if(designInput) designInput.value ='Индивидуальный';
    const boxWindow = document.getElementById("box-window");

    setInitialMinDate();

    boxWindow.style.display = "block";
    document.getElementById("box-window-in").style.display = "none";
    document.getElementById("box-window-in2").style.display = "none";
    const boxWindowVip = document.getElementById("box-window-vip");
    if (boxWindowVip) boxWindowVip.style.display = "block";
}

function closeWindow() {
    document.getElementById("box-window").style.display = "none";
}

/* === ВАЛИДАЦИЯ И ДАТА === */
function setInitialMinDate() {
    const dateInputs = document.querySelectorAll('input[name="date"]');
    const currentDate = new Date();
    const minDate = new Date(currentDate);
    minDate.setDate(minDate.getDate() + 7);
    const minDateString = minDate.toISOString().split('T')[0];
    dateInputs.forEach(input => input.setAttribute('min', minDateString));
}

function checkData(form){
    let flag=true;
    const dateInput = form.querySelector('input[name="date"]');
    const phoneInput = form.querySelector('input[name="phone-number"]');
    const privacyCheck = form.querySelector('#privacy-check');

    if(dateInput) {
        const currentDate = new Date();
        const selectedDate = new Date(dateInput.value);
        const minDate = new Date(currentDate);
        minDate.setDate(minDate.getDate() + 7);
        if (selectedDate < minDate) {
            alert("Введите верную дату вашей свадьбы (минимум через 7 дней).");
            return false;
        }
    }

    if(phoneInput) {
        const phoneValue = phoneInput.value;
        if (!/^[+]?[0-9()\s-]{10,15}$/.test(phoneValue)) {
            alert("Введите верный номер телефона");
            return false;
        }
    }
    
    if (privacyCheck && !privacyCheck.checked) {
        alert("Пожалуйста, подтвердите согласие с политикой конфиденциальности.");
        return false;
    }
    return flag;
}

/* === ЛОГИКА === */
$(document).ready(function() {
    
    // 1. ТЕЛЕГРАМ
    function toggleTelegram() {
        var selected = $('input[name="communication"]:checked').val();
        if (selected === 'telegram') {
            $('#telegram-nick-block').slideDown();
        } else {
            $('#telegram-nick-block').slideUp();
        }
    }
    $('input[name="communication"]').change(toggleTelegram);
    toggleTelegram();

    // 2. ОТПРАВКА
    $("#mail-submit").click(function(event) {
        event.preventDefault();
        const form = document.querySelector('#modalForm');
        if(checkData(form)){
            var btn = $(this);
            btn.prop('disabled', true).text('Отправка...');
            sendAjaxForm('modalForm', '/action_ajax_form.php', function(){
                btn.prop('disabled', false).text('Отправить');
            });
        }
    });

    $("#mail-submit-indiv").click(function(event) {
        event.preventDefault();
        const form = document.querySelector('#modalForm-indiv');
        if(checkData(form)){
             var btn = $(this);
             btn.prop('disabled', true).text('Отправка...');
             sendAjaxForm('modalForm-indiv', '/action_ajax_form.php', function(){
                 btn.prop('disabled', false).text('Отправить');
             });
        }
    });
});

function sendAjaxForm(ajax_form_id, url, onComplete) {
    $.ajax({
        url: url,
        type: "POST",
        dataType: "json",
        data: $("#" + ajax_form_id).serialize(),
        success: function(response) {
            if(onComplete) onComplete();
            
            if(response.status === 'ok'){
                if(response.order_id) $('#final-order-id').text(response.order_id);
                if(response.brief_link) $('#brief-link-btn').attr('href', response.brief_link);

                $("#box-window-in").hide();
                $("#box-window-vip").hide();
                $("#box-window-in2").show();
                
                // Если была ошибка БД, выведем в консоль
                if(response.db_debug) console.warn('DB Warning:', response.db_debug);

                document.getElementById(ajax_form_id).reset();
            } else {
                alert('Ошибка: ' + response.message);
            }
        },
        error: function(xhr, status, error) {
            if(onComplete) onComplete();
            
            // Пытаемся показать реальный текст ошибки
            let msg = "Неизвестная ошибка";
            if (xhr.responseText) {
                // Если сервер вернул HTML с ошибкой, попробуем вырезать текст ошибки PHP
                msg = xhr.responseText.substring(0, 500); // Берем первые 500 символов
            } else if (error) {
                msg = error;
            }
            
            console.error('SERVER ERROR:', xhr.responseText);
            alert('ОШИБКА СЕРВЕРА:\n' + msg);
        }
    });
}