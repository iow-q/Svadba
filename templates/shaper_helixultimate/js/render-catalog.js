(function(){
  // Глобальный флаг: не инициализировать повторно
  if (window.__wowCatalogInited) return;
  window.__wowCatalogInited = true;

  // helpers
  function el(tag, cls){ var n=document.createElement(tag); if(cls) n.className=cls; return n; }
  function normBase(u){ return (u || '').replace(/\/?$/, '/'); }

  function bootstrap(){
    var grid = document.getElementById('design-items');
    if (!grid) return; // не на этой странице

    // защита от повторной инициализации конкретного контейнера
    if (grid.dataset.inited === '1') return;
    grid.dataset.inited = '1';

    fetch('/templates/shaper_helixultimate/json/catalog-wedding.json', { cache:'no-store' })
      .then(function(r){ if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); })
      .then(function(data){
        var items = Array.isArray(data.items) ? data.items : [];
        var priceFrom = data.priceFrom || 'от 2500р';
        var BASE = normBase(data.baseUrl);
        var tagLabels = data.tagLabels || {};

        // ---- Панель фильтра (выпадающий список) ----
        var oldBar = document.querySelector('.design-filterbar');
        if (oldBar && oldBar.parentNode) oldBar.parentNode.removeChild(oldBar);

        var bar = el('div', 'design-filterbar'); 
        var label = el('label', 'design-filterbar-label');
        label.textContent = 'Фильтр по стилю: ';
        label.htmlFor = 'design-filter-select';

        var select = el('select', 'design-filterbar-select');
        select.id = 'design-filter-select';

        // Опция «Все»
        var optAll = document.createElement('option');
        optAll.value = '';
        optAll.textContent = 'Все стили';
        select.appendChild(optAll);

        // Опции по словарю
        Object.keys(tagLabels).forEach(function(key){
          var opt = document.createElement('option');
          opt.value = key;
          opt.textContent = tagLabels[key];
          select.appendChild(opt);
        });

        // Кнопка сброса
        var clearBtn = el('button', 'design-filterbar-clear');
        clearBtn.type='button';
        clearBtn.textContent = 'Сбросить';
        clearBtn.addEventListener('click', function(){
          select.value = '';
          render(items);
        });

        bar.appendChild(label);
        bar.appendChild(select);
        bar.appendChild(clearBtn);

        // Вставляем панель ПЕРЕД гридом
        var catalogBlock = document.getElementById('design-catalog') || grid.parentNode;
        catalogBlock.parentNode.insertBefore(bar, catalogBlock);

        // ---- Рендер карточек ----
        function render(list){
          var frag = document.createDocumentFragment();
          list.forEach(function(it){
            if (!it || !it.name || !it.img) return;

            var wrap = el('div', 'design-item');
            wrap.setAttribute('data-image', it.img);
            wrap.setAttribute('data-name', it.name);

            var topWrap;
            if (it.slug) {
              topWrap = el('a', 'design-link');
              topWrap.target = '_blank'; topWrap.rel = 'noopener';
              topWrap.href = BASE + it.slug;
            } else {
              topWrap = el('div', 'design-link');
            }

            var imgBox = el('div', 'design-item-img');
            var img = el('img');
            img.loading = 'lazy';
            img.width = 300; img.height = 501;
            img.src = it.img;
            img.alt = it.name;
            imgBox.appendChild(img);

            var nameEl = el('div', 'design-item-name'); nameEl.textContent = it.name;
            var priceEl = el('div', 'design-item-price'); priceEl.textContent = it.price || priceFrom;

            topWrap.appendChild(imgBox);
            topWrap.appendChild(nameEl);
            topWrap.appendChild(priceEl);

            var btns = el('div', 'design-item-buttons');

            var demoWrap = el('div', 'button-white-green-main');
            if (it.slug) {
              var demoA = el('a', 'demo-link'); demoA.target='_blank'; demoA.rel='noopener';
              demoA.href = BASE + it.slug; demoA.textContent = 'Демо-версия';
              demoWrap.appendChild(demoA);
            } else {
              demoWrap.style.display = 'none';
            }

            // Кнопка "Заказать"
            var orderWrap = el('div'); 
            orderWrap.setAttribute('onclick','openboxvip(this)'); // Вызывает функцию из order-info.js
            var orderBtn = el('button','button-green-main'); 
            orderBtn.type='button'; 
            orderBtn.textContent='Заказать';
            orderWrap.appendChild(orderBtn);

            btns.appendChild(demoWrap);
            btns.appendChild(orderWrap);

            wrap.appendChild(topWrap);
            wrap.appendChild(btns);

            frag.appendChild(wrap);
          });
          grid.innerHTML = '';
          grid.appendChild(frag);
        }

        // --- обработчик селекта ---
        select.addEventListener('change', function(){
          var t = select.value;
          if (!t) return render(items);
          var filtered = items.filter(function(it){
            var tags = Array.isArray(it.tags) ? it.tags : [];
            return tags.includes(t);
          });
          render(filtered);
        });

        // первичный рендер
        render(items);
      })
      .catch(function(err){
        console.error('Catalog render error:', err);
      });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bootstrap);
  else bootstrap();
})();