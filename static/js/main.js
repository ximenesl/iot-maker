// MENU TOGGLE
const openMenu = () => {
    let menu = document.querySelector('.nav-menu')

    menu.classList.add('menu-opened')
}

const closeMenu = () => {
    let menu = document.querySelector('.nav-menu')

    menu.classList.remove('menu-opened')
}

const links = document.querySelectorAll('.nav-link')
links.forEach(link => link.addEventListener('click', closeMenu))

document.querySelector('.menu-opener').addEventListener('click', openMenu)
document.querySelector('.nav-close').addEventListener('click', closeMenu)

// BACKGROUND HEADER

window.addEventListener('scroll', () => {
    let header = document.querySelector('.header')

    if(window.scrollY >= 30){
        header.classList.add('background-header')
    } else{
        header.classList.remove('background-header')
    }
})


// WORKERS LIST

const workersContainer = document.querySelector(".workers-items");
const filterSelect = document.getElementById("filter");

// Definir o valor padrão do <select> como "Mentor"
filterSelect.value = "all";

// Função para renderizar os workers filtrados
function renderWorkers(filter = "all") {
    workersContainer.innerHTML = ""; // Limpa os trabalhadores atuais

    workers
        .filter(worker => {
            if (filter === "all") return true;
            if (filter === "Mentor") return worker.role === "Mentor" || worker.role === "Mentora";
            if (filter === "Monitor") return worker.role === "Monitor";
            if (filter === "Participantes") return worker.role === "Participante";
            return false;
        })
        .forEach(worker => {
            const workerDiv = document.createElement("div");
            workerDiv.classList.add("worker-item");

            workerDiv.innerHTML = `
                <div class="worker-img" style="background-image: url('${worker.image}');"></div>
                <h4>${worker.name}</h4>
                <h5>${worker.role}</h5>
                <div class="worker-social">
                    <a href="${worker.linkedin}" target="_blank" class="linkedin-icon">
                        <i class='bx bxl-linkedin-square'></i>
                    </a>
                    <a href="${worker.github}" target="_blank" class="github-icon">
                        <i class='bx bxl-github'></i>
                    </a>
                </div>
            `;

            workersContainer.appendChild(workerDiv);
        });
}

// Evento para filtrar ao selecionar uma opção no <select>
filterSelect.addEventListener("change", (event) => {
    renderWorkers(event.target.value);
});

// Renderiza apenas os trabalhadores "Mentor" no carregamento inicial
renderWorkers("all");


// SCROLL REVEAL

const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400
})

sr.reveal('.img-banner, .how-it-item', {origin: 'left'})
sr.reveal('.banner-title, .where-it-item', {origin: 'right'})
sr.reveal('.section3-items, .workers-items, .techs-items, .footer-content, .btn-saiba-mais', { interval: 100 })
sr.reveal('#chico', {origin: 'bottom'})


// SWIPPER

const swiperFotos = new Swiper('.fotos-swiper', {
    direction: 'horizontal',
    loop: true,
    loopedSlides: 3, 
    slidesPerView: 1,
    slidesPerGroup: 1,
      autoplay: {
        delay: 3000,
    },
    navigation: {
        nextEl: '.fotos-swiper-button-next',
        prevEl: '.fotos-swiper-button-prev',
    },
});

const projetosSwiper = new Swiper('.projetos-swiper', {
  loop: false,
  simulateTouch: false,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 1,
  noSwiping: true,
  noSwipingClass: 'codigo-nao-deslizar',
});



// SCROOLL SECTIONS

const sections = document.querySelectorAll('section[id]');


function scrollActive() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 60; // Ajusta altura do header
        const sectionId = section.getAttribute('id');

        const navLink = document.querySelector('.nav-menu a[href="#' + sectionId + '"]');

        if (navLink) { // Verifica se o elemento existe antes de manipular
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active-link');
            } else {
                navLink.classList.remove('active-link');
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);

// Adiciona scroll suave ao clicar no menu
links.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 50,
                behavior: 'smooth'
            });
        }
    });
});


function toggleCodigo(button) {
  const pre = button.nextElementSibling;
  if (pre.classList.contains("hidden")) {
    pre.classList.remove("hidden");
    button.textContent = "Esconder código";
  } else {
    pre.classList.add("hidden");
    button.textContent = "Ver código";
  }
}

function escaparHTML(texto) {
  return texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function carregarCodigo(button, caminho) {
  const container = button.nextElementSibling;

  if (container.innerHTML === '') {
    fetch(caminho)
      .then(response => response.text())
      .then(data => {
        const codigoEscapado = escaparHTML(data);
        container.innerHTML = `<pre class="codigo-bloco">${codigoEscapado}</pre>`;
        container.classList.remove('hidden');
        button.textContent = 'Esconder código';
      })
      .catch(error => {
        container.innerHTML = '<pre class="codigo-bloco">Erro ao carregar o código.</pre>';
        container.classList.remove('hidden');
        button.textContent = 'Esconder código';
      });
  } else {
    container.classList.toggle('hidden');
    button.textContent = container.classList.contains('hidden') ? 'Ver código' : 'Esconder código';
  }
}


