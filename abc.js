
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
    <div class="overlay">
        <p data-lang-en="Anara - 135 points on the Duolingo test, got into 4 universities and received a huge discount of $312,000, chose Rovan University" data-lang-ru="Анара - 135 баллов по тесту Duolingo, поступила в 4 ВУЗа и получила огромную скидку в размере 312 000$, выбрала Rovan University">Анара - 135 баллов по тесту Duolingo, поступила в 4 ВУЗы и получила огромную скидку в размере 312 000$, выбрала Rovan University</p>
    </div>
</div>
<div class="gallery-item">
    <img src=".image/student11.jpg" alt="Student 11">
    <div class="overlay">
        <p data-lang-en="Kanibek - a student who received a visa at 31 years old and got into Saint Francis College for the Bachelor's Degree program" data-lang-ru="Каныбек - студент который получил визу в 31 год и поступил в Saint Francis College по программе Bachelor's Degree">Каныбек - студент который получил визу в 31 год и поступил в Saint Francis College по программе Bachelor's Degree</p>
    </div>
</div>
<div class="gallery-item">
    <img src=".image/student10.jpg" alt="Student 10">
    <div class="overlay">
        <p data-lang-en="Adilet - got into the Master's program at National Louis University in Chicago" data-lang-ru="Адилет - поступил на магистратуру в National Louis University, который находится в Чикаго">Адилет - поступил на магистратуру в National Louis University, который находится в Чикаго</p>
    </div>
</div>
<div class="gallery-item">
    <img src=".image/student12.jpg" alt="Student 12">
    <div class="overlay">
        <p data-lang-en="Baibol - got into Roosevelt University with a $6,000 discount, Business Management faculty" data-lang-ru="Байбол - поступил в Roosevelt University со скидкой $6.000, факультет бизнес-управление">Байбол - поступил в Roosevelt University со скидкой $6.000, факультет бизнес-управление</p>
    </div>
</div>
<div class="gallery-item">
    <img src=".image/student13.jpg" alt="Student 13">
    <div class="overlay">
        <p data-lang-en="Meeting of our students in America" data-lang-ru="Встреча наших студентов в Америке">Встреча наших студентов в Америке</p>
    </div>
</div>
<div class="gallery-item">
    <img src=".image/student16.jpg" alt="Student 16">
    <div class="overlay">
        <p data-lang-en="Milana - Got 140 points on Duolingo, got into 11 universities and received discounts over $858,000" data-lang-ru="Милана - Получила 140 баллов по Duolingo, поступила в 11 университетов и получила скидки более 858000$">Милана - Получила 140 баллов по Duolingo, поступила в 11 университетов и получила скидки более 858000$</p>
    </div>
</div>
<div class="gallery-item">
    <img src=".image/student17.jpg" alt="Student 17">
    <div class="overlay">
        <p data-lang-en="Nursultan - 25 years old, got into the Master's program at Westcliff University in Los Angeles" data-lang-ru="Нурсултан - 25 лет поступил на магистратуру в Лос-Анджелес, Westcliff university">Нурсултан - 25 лет поступил на магистратуру в Лос-Анджелес, Westcliff university</p>
    </div>
</div>
<div class="gallery-item">
    <img src=".image/student18.jpg" alt="Student 18">
    <div class="overlay">
        <p data-lang-en="Nurbek - previously had a visa denial, worked as a Duolingo teacher at Elite Academy" data-lang-ru="Нурбек - получал отказ ранее в визе, работал в Elite Academy преподавателем Duolingo">Нурбек - получал отказ ранее в визе, работал в Elite Academy преподавателем Duolingo</p>
    </div>
</div>
<div class="gallery-item">
    <img src=".image/student19.jpg" alt="Student 19">
    <div class="overlay">
        <p data-lang-en="Aftandil - previously had his visa rejected, but with us the visa process went smoothly on the first attempt" data-lang-ru="Афтандиль - Ранее виза была отклонена, но с нами визовый процесс прошел успешно с первой попытки">Афтандиль - Ранее виза была отклонена, но с нами визовый процесс прошел успешно с первой попытки</p>
    </div>
</div>
<div class="gallery-item">
    <img src=".image/student5.jpg" alt="Student 5">
    <div class="overlay">
        <p data-lang-en="Nurislam" data-lang-ru="Нурислам">Нурислам</p>
    </div>
</div>
<div class="gallery-item">
    <img src=".image/student6.jpg" alt="Student 6">
    <div class="overlay">
        <p data-lang-en="Eldar" data-lang-ru="Эльдар">Эльдар</p>
    </div>
</div>
<div class="gallery-item">
    <img src=".image/student7.jpg" alt="Saadat">
    <div class="overlay">
        <p data-lang-en="Asyl" data-lang-ru="Асыл">Асыл</p>
    </div>
</div>
<div class="gallery-item">
    <img src=".image/student8.jpg" alt="Medina">
    <div class="overlay">
        <p data-lang-en="Medina" data-lang-ru="Медина">Медина</p>
    </div>
</div>
<div class="gallery-item">
    <img src=".image/student9.jpg" alt="Aziret">
    <div class="overlay">
        <p data-lang-en="Aziret" data-lang-ru="Азирет">Азирет</p>
    </div>
</div>
<div class="gallery-item">
    <img src=".image/student14.jpg" alt="Student 14">
    <div class="overlay">
        <p data-lang-en="Aydana" data-lang-ru="Айдана">Айдана</p>
    </div>
</div>
<div class="gallery-item">
    <img src=".image/student15.jpg" alt="Student 15">
    <div class="overlay">
        <p data-lang-en="Isa" data-lang-ru="Иса">Иса</p>
    </div>
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

  // Добавление обработчика события для закрытия при клике на оверлей
  overlay.addEventListener('click', function(event) {
    // Проверяем, был ли клик сделан на самом оверлее (а не внутри попапа)
    if (event.target === overlay) {
      closeUniversityInfo(overlayId);
    }
  });
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




if (window.innerWidth <= 984) {
  document.body.innerHTML = `
    <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
      <img src=".image/logo1.png" alt="Логотип" style="width: 150px; margin-bottom: 20px;">
      <h1>Сайт недоступен на мобильных устройствах и планшетах</h1>
      <p>Пожалуйста, посетите нас с компьютера или ноутбука для лучшего опыта.</p>
    </div>
  `;
  document.body.style.backgroundColor = "#f4f4f4";
}





  // Функция для отправки данных на сервер


  document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault();

    // Получаем данные с формы
    let formData = {
      name: document.querySelector("input[type='text']").value,
      age: document.querySelector("input[type='number']").value,
      englishLevel: document.querySelector("input[list='english-levels']").value,
      region: document.querySelector("input[list='regions']").value,
      phone: document.querySelector("input[type='tel']").value
    };

    // Данные для отправки в AmoCRM
    const amoData = {
      name: formData.name,
      custom_fields_values: [
        { field_id: '12345', values: [{ value: formData.age }] },
        { field_id: '67890', values: [{ value: formData.englishLevel }] },
        { field_id: '11223', values: [{ value: formData.region }] },
        { field_id: '44556', values: [{ value: formData.phone }] }
      ]
    };

    // Отправка данных через API
    fetch('https://your-amocrm-api-endpoint.com/api/v4/leads', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(amoData)
    })
    .then(response => response.json())
    .then(data => {
      alert('Заявка успешно отправлена!');
      toggleForm();  // Закрыть форму после отправки
    })
    .catch(error => {
      console.error('Ошибка при отправке данных:', error);
      alert('Ошибка при отправке данных. Попробуйте снова.');
    });
  });



  // интро 
  document.addEventListener("DOMContentLoaded", function () {
    const introOverlay = document.querySelector(".intro-overlay");
    const logo = document.querySelector(".logo");
  
    // Этап 1: Увеличение логотипа
    setTimeout(() => {
      logo.style.transform = "scale(3)"; // Логотип увеличивается
      logo.style.opacity = "0"; // Логотип исчезает
    }, 1000); // Задержка перед началом анимации
  
    // Этап 2: Исчезновение фона
    setTimeout(() => {
      introOverlay.style.opacity = "0"; // Фон исчезает
      introOverlay.style.visibility = "hidden"; // Скрываем блок
    }, 2000); // Полное исчезновение через 3 секунды
  });
  




  window.addEventListener("load", function () {
    // Убираем загрузочный экран
    document.getElementById("loading-screen").style.display = "none";
    // Показываем основной сайт
    document.getElementById("main-content").style.display = "block";
  });





// Функция переключения языка
function switchLanguage(lang) {
  // Находим все элементы с атрибутами data-lang
  const elements = document.querySelectorAll("[data-lang-en], [data-lang-ru]");

  elements.forEach((el) => {
    // Берем значение из соответствующего атрибута (например, data-lang-ru или data-lang-en)
    const text = el.getAttribute(`data-lang-${lang}`);
    if (text) {
      el.textContent = text; // Обновляем текст элемента
    }
  });
}




