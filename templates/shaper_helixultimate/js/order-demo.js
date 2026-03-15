

document.addEventListener('DOMContentLoaded', function () {
    const designItemsContainer = document.querySelector('.block-design .design-items');

    if (window.innerWidth <= 768) {
        if (designItemsContainer) {
            // Создаем контейнер для swiper
            const swiperWrapper = document.createElement('div');
            swiperWrapper.classList.add('swiper');
            const swiperContainer = document.createElement('div');
            swiperContainer.classList.add('swiper-wrapper');
            designItemsContainer.parentNode.insertBefore(swiperWrapper, designItemsContainer);
            swiperWrapper.appendChild(swiperContainer)

            const designItems = designItemsContainer.querySelectorAll('.design-item');
            designItems.forEach(item => {
                const slide = document.createElement('div');
                slide.classList.add('swiper-slide');
                slide.appendChild(item);
                swiperContainer.appendChild(slide);

            });

            // Создаем элементы для пагинации и навигации
            const pagination = document.createElement('div');
            pagination.classList.add('swiper-pagination');
            swiperWrapper.appendChild(pagination);


            // Инициализируем Swiper
            new Swiper(swiperWrapper, {
                slidesPerView: 1.2,
                spaceBetween: 20,
                centeredSlides: true,
               loop:true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                 breakpoints: {
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
            
                },
            });

            // Скрываем исходный контейнер
            designItemsContainer.style.display = 'none';

        }
    }
});