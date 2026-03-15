document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item, .options-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
 toggle.textContent = '+'; // Устанавливаем плюсы на старте

        question.addEventListener('click', () => {
                item.classList.toggle('active');
                 if (item.classList.contains('active')) {
                toggle.textContent = '-';
                } else {
                toggle.textContent = '+';
            }

        });
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.all-prices-mobile', {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: -20,
        loop: false, // Отключаем бесконечную прокрутку
        initialSlide: 1,  // Указываем второй слайд как начальный
       
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
});


 document.addEventListener('DOMContentLoaded', function() {
      const reviewSwiper = new Swiper('.review-imgs', {
          slidesPerView: 'auto',
          spaceBetween: -30,
          centeredSlides: true,
          loop: true,
          pagination: { // Добавляем пагинацию
      el: '.swiper-pagination2', // Указываем контейнер для пагинации
      clickable: true // Разрешаем кликать по точкам
    },
          breakpoints: {
          768: {
            spaceBetween: -20
          }
          
          }
          
        });
    });
    
    