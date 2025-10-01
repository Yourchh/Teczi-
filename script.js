document.addEventListener('DOMContentLoaded', () => {

    // --- SEPARAMOS LOS DATOS EN IMÁGENES Y VIDEOS ---
    const imageData = [
        { id: 1, title: 'Desarrollo Web Full-Stack', description: 'Aprende a crear aplicaciones web completas desde cero con React, Node.js y MongoDB.', imageSrc: 'https://galeria-teczi.s3.us-east-1.amazonaws.com/img1.png' },
        { id: 2, title: 'Diseño de UI/UX para Apps Móviles', description: 'Crea interfaces intuitivas y experiencias de usuario memorables con Figma.', imageSrc: 'https://galeria-teczi.s3.us-east-1.amazonaws.com/img2.png' },
        { id: 3, title: 'Introducción a Ciencia de Datos', description: 'Analiza datos y crea modelos predictivos usando Pandas, Matplotlib y Scikit-learn.', imageSrc: 'https://galeria-teczi.s3.us-east-1.amazonaws.com/img3.png' },
        { id: 4, title: 'Marketing Digital y SEO', description: 'Posiciona marcas en buscadores y gestiona campañas de marketing online efectivas.', imageSrc: 'https://galeria-teczi.s3.us-east-1.amazonaws.com/img4.png' },
        { id: 5, title: 'Ciberseguridad Esencial', description: 'Protege sistemas y redes de ataques maliciosos aprendiendo hacking ético.', imageSrc: 'https://galeria-teczi.s3.us-east-1.amazonaws.com/img5.png' }
    ];

    const videoData = [
        { id: 6, title: 'Demo: Creando una API RESTful', short_description: 'Observa el proceso de creación de una API con Node.js y Express en tiempo real.', videoSrc: 'https://galeria-teczi.s3.us-east-1.amazonaws.com/Teczi_Course_Ad_Video_Generation.mp4' },
        { id: 7, title: 'Caso de Éxito: E-commerce', short_description: 'Análisis de un proyecto real de e-commerce y las tecnologías utilizadas.', videoSrc: 'https://galeria-teczi.s3.us-east-1.amazonaws.com/Video_Generado_Listo.mp4' }
    ];

    // --- ELEMENTOS DEL DOM ---
    const carouselSlides = document.getElementById('carousel-slides');
    const carouselDots = document.getElementById('carousel-dots');
    const videoGrid = document.getElementById('video-grid');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    // Modal (sin cambios en la selección)
    const modal = document.getElementById('modal-viewer');
    const modalTitle = document.getElementById('modal-course-title');
    const modalDescription = document.getElementById('modal-course-description');
    const modalMediaContainer = document.getElementById('modal-media-container');
    const closeButton = document.querySelector('.close-button');

    let currentIndex = 0;

    // --- GENERACIÓN DINÁMICA DE CONTENIDO ---
    
    // 1. Crear el Carrusel
    function createCarousel() {
        imageData.forEach((item, index) => {
            // Crear el slide
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            slide.innerHTML = `
                <img src="${item.imageSrc}" alt="${item.title}">
                <div class="slide-caption">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            `;
            slide.addEventListener('click', () => openModal(item));
            carouselSlides.appendChild(slide);

            // Crear el dot
            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.setAttribute('data-index', index);
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
            });
            carouselDots.appendChild(dot);
        });
    }

    // 2. Crear la parrilla de videos
    function createVideoGrid() {
        videoData.forEach(item => {
            const card = document.createElement('div');
            card.className = 'video-card';
            card.innerHTML = `
                <video muted loop playsinline onmouseover="this.play()" onmouseout="this.pause()">
                    <source src="${item.videoSrc}" type="video/mp4">
                </video>
                <div class="card-content">
                    <h4>${item.title}</h4>
                </div>
            `;
            card.addEventListener('click', () => openModal(item));
            videoGrid.appendChild(card);
        });
    }

    // --- LÓGICA DEL CARRUSEL ---
    function updateCarousel() {
        const totalSlides = imageData.length;
        // Mover el contenedor de slides
        carouselSlides.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Actualizar el dot activo
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // --- LÓGICA DEL MODAL (Ahora más genérica) ---
    function openModal(item) {
        modalTitle.textContent = item.title;
        modalDescription.textContent = item.description || item.short_description; // Funciona para ambos tipos de datos
        modalMediaContainer.innerHTML = '';

        let mediaElement;
        // Decide si es un video (tiene videoSrc) o una imagen
        if (item.videoSrc) {
            mediaElement = document.createElement('video');
            mediaElement.src = item.videoSrc;
            mediaElement.controls = true;
            mediaElement.autoplay = true;
        } else {
            mediaElement = document.createElement('img');
            mediaElement.src = item.imageSrc;
            mediaElement.alt = item.title;
        }
        
        modalMediaContainer.appendChild(mediaElement);
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
        modalMediaContainer.innerHTML = '';
    }

    // --- EVENT LISTENERS ---
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % imageData.length;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + imageData.length) % imageData.length;
        updateCarousel();
    });

    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => (e.target === modal) && closeModal());
    document.addEventListener('keydown', (e) => (e.key === 'Escape') && closeModal());


    // --- INICIALIZACIÓN ---
    createCarousel();
    createVideoGrid();
    updateCarousel(); // Para poner el primer slide y dot en estado activo
});