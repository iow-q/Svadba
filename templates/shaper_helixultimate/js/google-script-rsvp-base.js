const scriptURL = 'https://script.google.com/macros/s/AKfycbzWyEAmqpTCNlpF8fUr9XKyUjiHrt-Aabvxz3tgc5ccOsy4J9_R-7yry2YWDQ97S_va/exec'

  const form = document.forms['rsvp'];
  const form2 = document.forms['question'];
  const null_value = '0';
 function submityes(){
 let quantity = document.getElementById('quantity');
quantity.style.background = '#fff';
  quantity.style.border = '1px solid rgba(0, 0, 0, 0.15)';
  document.getElementById('rsvp_errors').style.display='none';
  document.getElementById('rsvp_null').style.display='none';
 const FormNew = new FormData(form);
    FormNew.append('Form', 'rsvp-yes');
const null_value = '0';
    const textbox_all = form.querySelectorAll('input[type="text"]');
     // Проверяем заполнение текстовых полей
    for (let box of textbox_all) {
        if (!box.value) {
            document.getElementById('rsvp_null').style.display='block';
            return false; // Остановить проверку и выйти из функции
            null_value='1';
        }
        }
       if (null_value == 0) {
        if ((Number.isInteger(Number(quantity.value)))&&(Number(quantity.value)<=10)&&(Number(quantity.value)>=1)) {
    fetch(scriptURL, { method: 'POST', body: FormNew})
      .then(response => console.log('Success!', response))
      .catch(error => console.error('Error!', error.message))
      
      var textboxesall = document.querySelectorAll('input[type="text"]');
    textboxesall.forEach(function(text) {
        text.value = '';
    });
    document.getElementById('rsvp_container').style.display='none';
 document.getElementById('rsvp-answ-yes').style.display='block';
  }
  else{
  quantity.style.background = '#ff65001c';
  quantity.style.border = '1px solid #ff6500';
  document.getElementById('rsvp_errors').style.display='block';
  }
 }
    }
    
  

    
 

  function submitno(){
  let quantity = document.getElementById('quantity');
  quantity.style.background = '#fff';
  quantity.style.border = '1px solid rgba(0, 0, 0, 0.15)';
  document.getElementById('rsvp_errors').style.display='none';
  document.getElementById('rsvp_null').style.display='none';
 
 const FormNew = new FormData(form);
    FormNew.append('Form', 'rsvp-no');
const null_value = '0';
    const textbox_all = form.querySelectorAll('input[type="text"]');
     // Проверяем заполнение текстовых полей
    for (let box of textbox_all) {
        if (!box.value) {
        document.getElementById('rsvp_null').style.display='block';
                        return false; // Остановить проверку и выйти из функции
            null_value='1';
        }
        }
       if (null_value == 0) {
 if ((Number.isInteger(Number(quantity.value)))&&(Number(quantity.value)<=10)&&(Number(quantity.value)>=1)) {
    fetch(scriptURL, { method: 'POST', body: FormNew})
      .then(response => console.log('Success!', response))
      .catch(error => console.error('Error!', error.message))
       var textboxesall = document.querySelectorAll('input[type="text"]');
    textboxesall.forEach(function(text) {
        text.value = '';
    });
 document.getElementById('rsvp_container').style.display='none';
 document.getElementById('rsvp-answ-no').style.display='block';
    
           }
  else{
  quantity.style.background = '#ff65001c';
  quantity.style.border = '1px solid #ff6500';
  document.getElementById('rsvp_errors').style.display='block';
  }
 }
 }
 
  function submitquestion(){
    document.getElementById('answ_good').style.display='none';
     document.getElementById('answ_null').style.display='none';
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
      FormNew.append('Предпочтения в еде', checkboxValues);//заменить на название столбца в таблице гугл
   
    const textbox_all = form2.querySelectorAll('input[type="text"]');
     // Проверяем заполнение текстовых полей
    for (let box of textbox_all) {
        if (!box.value) {
            document.getElementById('answ_null').style.display='block';
            return false; // Остановить проверку и выйти из функции
            null_value='1';
        }
        }
       if (null_value == 0) {
    fetch(scriptURL, { method: 'POST', body: FormNew})
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
   
      document.getElementById('answ_good').style.display='block';
      }}
 
