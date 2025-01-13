
function toggleForm() {
  const overlay = document.getElementById('overlay'); // Затемнение
  const formContainer = document.getElementById('form-container'); // Форма
  
  // Проверяем, скрыта ли форма
  const isHidden = overlay.style.display === 'none' || overlay.style.display === '';

  // Переключаем видимость
  overlay.style.display = isHidden ? 'block' : 'none';
  formContainer.style.display = isHidden ? 'block' : 'none';
}





// Обработка перехода по ссылкам навигации
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
      e.preventDefault(); // Отменить стандартное действие ссылки
      const targetId = link.getAttribute('href').replace('#', ''); // Получить ID целевого элемента
      const targetElement = document.getElementById(targetId); // Найти элемент

      if (targetElement) {
          // Прокрутка к элементу
          targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
          });

          // Удаляем активный класс у всех ссылок
          document.querySelectorAll('.nav-link').forEach(nav => {
              nav.classList.remove('active');
          });

          // Добавляем активный класс текущей ссылке
          link.classList.add('active');
      }
  });
});

// Отслеживание текущего положения на странице
window.addEventListener('scroll', () => {
  document.querySelectorAll('.nav-link').forEach(link => {
      const targetId = link.getAttribute('href').replace('#', '');
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
          const rect = targetElement.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // Проверка, виден ли элемент в текущей области
          if (rect.top >= 0 && rect.top <= windowHeight / 2) {
              // Активируем ссылку в навигации
              document.querySelectorAll('.nav-link').forEach(nav => {
                  nav.classList.remove('active');
              });
              link.classList.add('active');
          }
      }
  });
});





// Универсальный карусель для слайдов университетов
let currentIndex = 0;
const track = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.card');
const leftButton = document.querySelector('.nav-button.left');
const rightButton = document.querySelector('.nav-button.right');
const carouselContainer = document.querySelector('.carousel-container'); // Контейнер карусели

function updateSlide() {
    const cardWidth = cards[0].offsetWidth + 20; // Ширина карточки + отступ
    const visibleCards = Math.floor(carouselContainer.offsetWidth / cardWidth); // Количество видимых карточек
    const maxIndex = Math.max(0, cards.length - visibleCards); // Максимальный индекс

    // Ограничиваем индекс
    currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));

    // Обновляем позицию трека
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    // Отключаем кнопки, если больше нельзя двигаться
    leftButton.disabled = currentIndex === 0;
    rightButton.disabled = currentIndex === maxIndex;
}

function nextSlide() {
    const cardWidth = cards[0].offsetWidth + 20; // Ширина карточки + отступ
    const visibleCards = Math.floor(carouselContainer.offsetWidth / cardWidth); // Количество видимых карточек
    const maxIndex = Math.max(0, cards.length - visibleCards); // Максимальный индекс

    if (currentIndex < maxIndex) {
        currentIndex++;
        updateSlide();
    }
}

function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlide();
    }
}

// Инициализация
updateSlide();

// Обновляем при изменении размеров окна
window.addEventListener('resize', updateSlide);


// Карусель для колледжей
let currentIndexColleges = 0;
const trackColleges = document.querySelector('#colleges .carousel-track');
const cardsColleges = document.querySelectorAll('#colleges .card');
const leftButtonColleges = document.querySelector('#colleges .nav-button.left');
const rightButtonColleges = document.querySelector('#colleges .nav-button.right');

function updateSlideColleges() {
    const width = cardsColleges[0].offsetWidth + 20; // ширина карточки + отступ
    trackColleges.style.transform = `translateX(-${currentIndexColleges * width}px)`;

    leftButtonColleges.classList.toggle('disabled', currentIndexColleges === 0);
    rightButtonColleges.classList.toggle('disabled', currentIndexColleges === cardsColleges.length - 1);
}

function nextSlideColleges() {
    if (currentIndexColleges < cardsColleges.length - 1) {
        currentIndexColleges++;
        updateSlideColleges();
    }
}

function prevSlideColleges() {
    if (currentIndexColleges > 0) {
        currentIndexColleges--;
        updateSlideColleges();
    }
}

updateSlideColleges();

// Анимация появления элементов
document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".info-item");

    items.forEach((item, index) => {
        setTimeout(() => {
            if (index % 2 === 0) {
                item.classList.add("slide-in-left");
            } else {
                item.classList.add("slide-in-right");
            }
        }, index * 200); // Задержка между элементами - 200 мс
    });
});

// Анимация при прокрутке (с использованием IntersectionObserver)
document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".info-item");
    const observerOptions = {
        threshold: 0.2 // Процент видимости элемента для запуска анимации
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                items.forEach((item, index) => {
                    setTimeout(() => {
                        if (index % 2 === 0) {
                            item.classList.add("slide-in-left");
                        } else {
                            item.classList.add("slide-in-right");
                        }
                    }, index * 200); // Задержка между элементами - 200 мс
                });
                // Отключаем наблюдатель после того, как элементы анимированы
                observer.disconnect();
            }
        });
    }, observerOptions);

    // Начинаем наблюдение за .info-block
    const infoBlock = document.querySelector(".info-block");
    if (infoBlock) {
        observer.observe(infoBlock);
    }
});






document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section, header"); // Включаем header
    const navLinks = document.querySelectorAll(".nav-links a");
  
    function updateActiveLink() {
      let currentSection = "";
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
  
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
          currentSection = section.getAttribute("id");
        }
      });
  
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").slice(1) === currentSection) {
          link.classList.add("active");
        }
      });
    }
  
    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink(); // Обновить активный элемент при загрузке
  });


  document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) { // Если прокрутили на 50px и больше
        header.classList.add("shrink-header");
      } else {
        header.classList.remove("shrink-header");
      }
    });
  });



  // Функция для проверки, видима ли секция на экране
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Функция для обновления активной ссылки
  function updateActiveLink() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");
  
    let currentSection = "";
  
    sections.forEach((section) => {
      if (isElementInViewport(section)) {
        currentSection = section.getAttribute("id");
      }
    });
  
    navLinks.forEach((link) => {
      link.classList.remove("active"); // Убираем активный класс с всех ссылок
      if (link.getAttribute("href").slice(1) === currentSection) {
        link.classList.add("active"); // Добавляем активный класс к текущей ссылке
      }
    });
  }
  
  // Слушатели событий для прокрутки и загрузки страницы
  window.addEventListener("scroll", updateActiveLink);
  window.addEventListener("DOMContentLoaded", updateActiveLink);

  
  window.addEventListener('DOMContentLoaded', () => {
    const lines = document.querySelectorAll('.line');
  
    // Плавное появление строк и их анимация
    lines.forEach((line, index) => {
      setTimeout(() => {
        line.classList.add('show');
      }, index * 500);  // Задержка 1 секунда для каждой строки
    });
  });
  


  document.addEventListener('DOMContentLoaded', () => {
    const textSection = document.querySelector('.text-section');
  
    // Добавляем класс для запуска анимации хайлайтера
    setTimeout(() => {
      textSection.classList.add('active');
    }, 500); // Задержка перед появлением хайлайтера
  
    // Убираем хайлайтер и показываем текст
    setTimeout(() => {
      textSection.classList.remove('active');
      textSection.classList.add('done');
    }, 2000); // Через 2 секунды хайлайтер исчезает, текст появляется
  });

  
  
  // Делаем текст видимым спустя 4 секунды после загрузки
window.addEventListener('DOMContentLoaded', () => {
  const textBottom = document.querySelector('.text-bottom');

  setTimeout(() => {
    textBottom.style.opacity = 1; // Плавно делаем текст видимым
  }, 2500); // Задержка в 4 секунды
});


document.addEventListener('DOMContentLoaded', () => {
  const logoBox = document.querySelector('.logo-box');
  const logoName = document.querySelector('.logo-name');

  setTimeout(() => {
    logoBox.classList.add('animate');
    logoName.classList.add('animate');
  }, 400);  // Анимация происходит через 1 секунду после загрузки
});



document.addEventListener('DOMContentLoaded', () => {
  const steps = document.querySelectorAll('.admission-step');
  const indicators = document.querySelectorAll('.admission-indicator');
  const prevBtn = document.getElementById('admission-prevBtn');
  const nextBtn = document.getElementById('admission-nextBtn');
  let currentStep = 0;

  function updateSteps() {
    steps.forEach((step, index) => {
      step.classList.toggle('active', index === currentStep);
      indicators[index].classList.toggle('active', index === currentStep);
    });
  }

  prevBtn.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      updateSteps();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
      currentStep++;
      updateSteps();
    }
  });

  // Добавляем обработчик для клика по индикаторам
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentStep = index; // Переход к шагу, соответствующему индикатору
      updateSteps();
    });
  });

  // Initialize the first step as active
  updateSteps();
});









// галерея 
const gallery = document.getElementById('gallery');
const showMoreButton = document.getElementById('show-more');
const hideMoreButton = document.getElementById('hide-more');

const additionalPhotos = `
    <div class="gallery-item">
        <img src=".image/student20.jpg" alt="Student 20">
        <div class="overlay"><p>Анара - 135 баллов по тесту Duolingo, поступила в 4 ВУЗа и получила огромную скидку в размере 312 000$, выбрала Rovan University</p></div>
    </div>
    <div class="gallery-item">
        <img src=".image/student11.jpg" alt="Student 11">
        <div class="overlay"><p>Каныбек - студент который получил визу в 31 год и поступил в Saint Francis College по программе Bachelor's Degree</p></div>
    </div>
    <div class="gallery-item">
        <img src=".image/student10.jpg" alt="Student 10">
        <div class="overlay"><p>Адилет</p></div>
    </div>
    <div class="gallery-item">
        <img src=".image/student5.jpg" alt="Student 5">
        <div class="overlay"><p>Нурислам</p></div>
    </div>
    <div class="gallery-item">
        <img src=".image/student6.jpg" alt="Student 6">
        <div class="overlay"><p>Эльдар</p></div>
    </div>
    <div class="gallery-item">
        <img src=".image/student7.jpg" alt="Саадат">
        <div class="overlay"><p>Асыл</p></div>
    </div>
    <div class="gallery-item">
        <img src=".image/student8.jpg" alt="Медина">
        <div class="overlay"><p>Медина</p></div>
    </div>
    <div class="gallery-item">
        <img src=".image/student9.jpg" alt="Азирет">
        <div class="overlay"><p>Азирет</p></div>
    </div>
    <div class="gallery-item">
        <img src=".image/student12.jpg" alt="Student 12">
        <div class="overlay"><p>Ислам</p></div>
    </div>
    <div class="gallery-item">
        <img src=".image/student13.jpg" alt="Student 13">
        <div class="overlay"><p>Встреча наших студентов в Америке</p></div>
    </div>
    <div class="gallery-item">
        <img src=".image/student14.jpg" alt="Student 14">
        <div class="overlay"><p>Айдана</p></div>
    </div>
    <div class="gallery-item">
        <img src=".image/student15.jpg" alt="Student 15">
        <div class="overlay"><p>Иса</p></div>
    </div>
    <div class="gallery-item">
        <img src=".image/student16.jpg" alt="Student 16">
        <div class="overlay"><p>Милана</p></div>
    </div>
    <div class="gallery-item">
        <img src=".image/student17.jpg" alt="Student 17">
        <div class="overlay"><p>Курманбек</p></div>
    </div>
    <div class="gallery-item">
        <img src=".image/student18.jpg" alt="Student 18">
        <div class="overlay"><p>Влада</p></div>
    </div>
    <div class="gallery-item">
        <img src=".image/student19.jpg" alt="Student 19">
        <div class="overlay"><p>Афтандиль</p></div>
    </div>`;

showMoreButton.addEventListener('click', () => {
    gallery.insertAdjacentHTML('beforeend', additionalPhotos);
    showMoreButton.style.display = 'none';
    hideMoreButton.style.display = 'inline-block';
});

hideMoreButton.addEventListener('click', () => {
    const additionalItems = gallery.querySelectorAll('.gallery-item:nth-child(n+5)');
    additionalItems.forEach(item => item.remove());
    hideMoreButton.style.display = 'none';
    showMoreButton.style.display = 'inline-block';
});





// НОВОССТИ
document.querySelectorAll('.toggle-text').forEach(button => {
  button.addEventListener('click', () => {
      const description = button.previousElementSibling;
      const hiddenText = description.querySelector('.hidden-text');

      if (hiddenText.style.display === 'none') {
          hiddenText.style.display = 'inline';
          button.textContent = 'Скрыть';
      } else {
          hiddenText.style.display = 'none';
          button.textContent = 'Читать больше';
      }
  });
});







function openUniversityInfo(overlayId) {
  const overlay = document.getElementById(overlayId);
  const popup = overlay.querySelector('.info-popup');

  document.body.appendChild(overlay);

  overlay.style.display = 'block';
  setTimeout(() => popup.classList.add('active'), 10);
}

function closeUniversityInfo(overlayId) {
  const overlay = document.getElementById(overlayId);
  const popup = overlay.querySelector('.info-popup');

  popup.classList.remove('active');
  setTimeout(() => (overlay.style.display = 'none'), 300);
}








// карта 
function showMap() {
  const mapContainer = document.querySelector('.map-container');
  mapContainer.classList.add('active');
}




// /*
// snowFlurry JS - version 2.0
// Copyright Ð’Â© 2015 S.W. Clough (https://www.html5andbeyond.com)
// Licensed Under MIT
// */
// (function ($) {
//   $.fn.snowFlurry = function (options) {
//     var s = $.extend({
//       maxSize: 5,
//       numberOfFlakes: 25,
//       minSpeed: 10,
//       maxSpeed: 15,
//       color: '#fff',
//       timeout: 0
//     }, options);
//     var windowWidth = $(window).innerWidth(),
//       WidthArray = [],
//       DelayArray = [],
//       animateArray = [],
//       flakeSize = [],
//       snowInterval;
//     if (s.maxSize <= 10) {
//       for (var i = 1; i < s.maxSize; i++) {
//         flakeSize.push(i);
//       }
//     } else {
//       for (var i = 1; i < 10; i++) {
//         flakeSize.push(i);
//       }
//     }
//     for (var i = 0; i < windowWidth - 20; i++) {
//       WidthArray.push(i);
//     }
//     for (var i = 0; i < s.numberOfFlakes; i++) {
//       $('<div class="sf-snow-flake"></div>').appendTo('body');
//     }
//     for (var i = 0; i < 10; i++) {
//       DelayArray.push(i);
//     }
//     for (var i = s.minSpeed; i < s.maxSpeed; i++) {
//       animateArray.push(i);
//     }
//     function getRandomFlakeSize() {
//       var item = flakeSize[Math.floor(Math.random() * flakeSize.length)];
//       return item;
//     }
//     function getRandomPosition() {
//       var item = WidthArray[Math.floor(Math.random() * WidthArray.length)];
//       return item;
//     }
//     function getRandomDelay() {
//       var item = DelayArray[Math.floor(Math.random() * DelayArray.length)];
//       return item * 1000;
//     }
//     function getRandomAnimation() {
//       var item = animateArray[Math.floor(Math.random() * animateArray.length)];
//       return item * 1000;
//     }
//     $('.sf-snow-flake').each(function () {
//       var elem = $(this);
//       elem.attr('data-speed', getRandomAnimation());
//       elem.attr('data-delay', getRandomDelay());
//       var elemSpeed = elem.attr('data-speed'),
//         elemDelay = elem.attr('data-delay');
//       var flakeSize = getRandomFlakeSize();
//       elem.css({
//         'width': flakeSize,
//         'height': flakeSize,
//         'border-radius': flakeSize / 2,
//         'background-color': s.color,
//         'box-shadow': '0 0 2px 1px' + s.color
//       })
//       function activateAnim() {
//         setTimeout(function () {
//           elem.css('left', getRandomPosition());
//           elem.addClass('sf-snow-anim');
//           elem.css('transition', 'top ' + elemSpeed / 1000 + 's linear');
//           setTimeout(function () {
//             elem.css('transition', '');
//             elem.removeClass('sf-snow-anim');
//           }, elemSpeed);
//         }, elemDelay);
//       }
//       if (device.mobile() || device.tablet() || Modernizr.touch || $('html').hasClass('no-csstransitions')) { } else if (device.desktop()) {
//         activateAnim();
//         snowInterval = setInterval(function () {
//           activateAnim();
//         }, +elemDelay + +elemSpeed);
//       }
//       if (s.timeout != 0) {
//         setTimeout(function () {
//           clearInterval(snowInterval);
//           $('.sf-snow-flake').fadeOut(1500, function () {
//             $(this).remove();
//           })
//         }, s.timeout * 1000);
//       }
//     });
//   };
// }(jQuery));
// jQuery(document).ready(function ($) {
//   $(document).snowFlurry({
//     maxSize: 10,
//     numberOfFlakes: 100,
//     minSpeed: 10,
//     maxSpeed: 20,
//     color: '#fff',
//     timeout: 0
//   });
// });