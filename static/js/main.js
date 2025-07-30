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
        .filter(worker => 
            filter === "all" || 
            worker.role === filter || 
            (filter === "Mentor" && worker.role === "Mentora") || // Permite "Mentor" e "Mentora"
            (filter === "Participantes" && worker.role === "Participante")
        )
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
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 1,
});


// COMO O CHICO ENXERGA O MUNDO 

const getImages = async (num) => {
    const response = await fetch(`https://visao.pythonanywhere.com/imagenstransforma/${num}`);
    const data = await response.json();
    return data;
};

const renderImageChico = async () => {
    const images = await getImages(5);

    const container = document.querySelector('.chico-vision');
    container.innerHTML = '';

    images.forEach(image => {
        container.innerHTML += `
            <div class="swiper-slide">
                <img src="${image.url}" id="fotos-chico-vision" alt="Foto de exemplo do Chico">
            </div>
        `;
    });


    setTimeout(() => {
        const swiper = new Swiper('.swiper', {
            direction: 'horizontal',
            loop: true,
            loopedSlides: images.length >= 3 ? 3 : images.length, 
            autoplay: {
                delay: 3000,
            },
            slidesPerView: 1,
            slidesPerGroup: 1,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }, 100); // Pequeno delay para garantir que os slides foram renderizados
};

renderImageChico();



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

function carregarCodigo(button, caminho) {
  const container = button.nextElementSibling;

  if (container.innerHTML === '') {
    fetch(caminho)
      .then(response => response.text())
      .then(data => {
        container.innerHTML = data;
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

