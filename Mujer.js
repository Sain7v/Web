// =============================
// MENÚ HAMBURGUESA RESPONSIVE
// =============================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLeft = document.querySelector('.nav-left');

// Toggle menú hamburguesa
hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.toggle('active');
    navLeft.classList.toggle('active');
});

// Cerrar menú al hacer click en un link
const menuLinks = document.querySelectorAll('.nav-menu a');
menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        const currentPage = window.location.pathname;
        
        // Cerrar el menú móvil
        hamburger.classList.remove('active');
        navLeft.classList.remove('active');
        
        // Si hace clic en MUJER y ya está en la página de mujer
        if (href === 'mujer.html' && currentPage.includes('mujer')) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        // Si hace clic en INICIO y ya está en inicio
        else if (href === 'Inicio.html' && currentPage.includes('Inicio')) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        // Si hace clic en HOMBRE y ya está en hombre
        else if (href === 'hombre.html' && currentPage.includes('hombre')) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
});

// Cerrar menú al hacer click fuera de él
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        const isClickInsideMenu = navLeft.contains(e.target);
        const isClickOnHamburger = hamburger.contains(e.target);
        
        if (!isClickInsideMenu && !isClickOnHamburger && navLeft.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLeft.classList.remove('active');
        }
    }
});

// Cerrar menú al cambiar el tamaño de la ventana (de móvil a escritorio)
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navLeft.classList.remove('active');
    }
});

// =============================
// FUNCIONALIDAD NAVBAR
// =============================

const searchBtn = document.querySelector('.icon-btn[aria-label="Buscar"]');
const userBtn = document.querySelector('.icon-btn[aria-label="Usuario"]');
const cartBtn = document.querySelector('.icon-btn[aria-label="Carrito"]');
const favBtn = document.querySelector('.icon-btn[aria-label="Favoritos"]');

// Evento para el botón de búsqueda
searchBtn.addEventListener('click', () => {
    console.log('Búsqueda clickeada');
    openSearchModal();
});

// Evento para el botón de usuario
userBtn.addEventListener('click', () => {
    console.log('Usuario clickeado');
    window.location.href = 'LoginSignUp.html';
});

// Evento para el botón de carrito
cartBtn.addEventListener('click', () => {
    console.log('Carrito clickeado');
    window.location.href = 'carrito.html';
});

// Evento para el botón de favoritos
favBtn.addEventListener('click', () => {
    console.log('Favoritos clickeado');
    window.location.href = 'favoritos.html';
});

// =============================
// FUNCIONALIDAD PRODUCTOS
// =============================

const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.addEventListener('click', () => {
        const productName = card.querySelector('.product-name').textContent;
        console.log(`Producto clickeado: ${productName}`);
        // Aquí puedes redirigir a la página del producto
        // window.location.href = `producto.html?name=${productName}`;
    });
});

// =============================
// FUNCIONALIDAD CATEGORÍAS
// =============================

const categoryCards = document.querySelectorAll('.category-card');

categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const categoryName = card.querySelector('.category-name').textContent;
        console.log(`Categoría clickeada: ${categoryName}`);
        // Aquí puedes redirigir a la página de la categoría
        // window.location.href = `categoria.html?name=${categoryName}`;
    });
});

// =============================
// MODAL DE BÚSQUEDA
// =============================

// Productos de ejemplo para la búsqueda (sección mujer)
const productos = [
    { id: 1, nombre: 'Camisole Top', precio: 1224, imagen: '/Recursos/CamisoleTop.jpeg' },
    { id: 2, nombre: 'Twist-detail Dress', precio: 1599, imagen: '/Recursos/Twist.jpeg' },
    { id: 3, nombre: 'Satin Dress with Low-Cut Back', precio: 1099, imagen: '/Recursos/Satin.jpeg' },
    { id: 4, nombre: 'Sudadera Loose Fit', precio: 1224, imagen: '/Recursos/producto1.jpeg' },
    { id: 5, nombre: 'Pants Relaxed Fit', precio: 1599, imagen: '/Recursos/producto2.jpeg' },
    { id: 6, nombre: 'Sudadera Oversize Fit', precio: 1099, imagen: '/Recursos/producto3.jpeg' },
    { id: 7, nombre: 'Pants Cargo', precio: 1799, imagen: '/Recursos/producto4.jpeg' },
    { id: 8, nombre: 'Chamarra Vintage', precio: 2499, imagen: '/Recursos/producto5.jpeg' },
    { id: 9, nombre: 'Lentes Carrera', precio: 899, imagen: '/Recursos/producto6.jpeg' },
];

const searchModal = document.getElementById('searchModal');
const searchClose = document.getElementById('searchClose');
const searchInput = document.getElementById('searchInput');
const searchBtnModal = document.getElementById('searchBtnModal');
const searchResults = document.getElementById('searchResults');

// Abrir modal
function openSearchModal() {
    searchModal.classList.add('active');
    searchInput.focus();
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
}

// Cerrar modal
function closeSearchModal() {
    searchModal.classList.remove('active');
    searchInput.value = '';
    showSuggestions();
    // Restaurar scroll del body
    document.body.style.overflow = '';
}

searchClose.addEventListener('click', closeSearchModal);

// Cerrar al hacer click fuera del contenido
searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) closeSearchModal();
});

// Cerrar con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchModal.classList.contains('active')) {
        closeSearchModal();
    }
});

// Función de búsqueda
function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    if (query === '') {
        showSuggestions();
        return;
    }

    const resultados = productos.filter(p =>
        p.nombre.toLowerCase().includes(query)
    );

    if (resultados.length > 0) displayResults(resultados);
    else showNoResults(query);
}

// Mostrar resultados
function displayResults(resultados) {
    searchResults.innerHTML = resultados.map(producto => `
        <div class="search-result-item" onclick="goToProduct(${producto.id})">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="search-result-img">
            <div class="search-result-info">
                <div class="search-result-name">${producto.nombre}</div>
                <div class="search-result-price">$${producto.precio.toLocaleString('es-MX', {minimumFractionDigits: 2})}</div>
            </div>
        </div>
    `).join('');
}

// Sin resultados
function showNoResults(query) {
    searchResults.innerHTML = `
        <div class="no-results">
            No se encontraron resultados para "${query}"
        </div>
        <div class="search-suggestions">
            <h3>Intenta buscar:</h3>
            <div class="search-tags">
                <span class="search-tag">Vestidos</span>
                <span class="search-tag">Tops</span>
                <span class="search-tag">Blusas</span>
                <span class="search-tag">Pants</span>
            </div>
        </div>
    `;
    addTagListeners();
}

// Mostrar sugerencias
function showSuggestions() {
    searchResults.innerHTML = `
        <div class="search-suggestions">
            <h3>Búsquedas populares</h3>
            <div class="search-tags">
                <span class="search-tag">Vestidos</span>
                <span class="search-tag">Tops</span>
                <span class="search-tag">Blusas</span>
                <span class="search-tag">Pants</span>
                <span class="search-tag">Accesorios</span>
                <span class="search-tag">Satin</span>
            </div>
        </div>
    `;
    addTagListeners();
}

// Listeners para tags
function addTagListeners() {
    document.querySelectorAll('.search-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            searchInput.value = tag.textContent;
            performSearch();
        });
    });
}

// Simular navegación
function goToProduct(id) {
    console.log(`Ir al producto ${id}`);
    alert(`Ir al producto ${id}`);
    // window.location.href = `producto.html?id=${id}`;
}

// Eventos del modal de búsqueda
searchBtnModal.addEventListener('click', performSearch);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') performSearch();
});

// Búsqueda en tiempo real
searchInput.addEventListener('input', () => {
    if (searchInput.value.length >= 2) performSearch();
    else if (searchInput.value.length === 0) showSuggestions();
});

// Inicializar sugerencias
showSuggestions();
addTagListeners();