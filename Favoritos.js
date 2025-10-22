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
        
        // Si hace clic en FAVORITOS y ya está en favoritos
        if (href === 'favoritos.html' && currentPage.includes('favoritos')) {
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
        // Si hace clic en MUJER y ya está en mujer
        else if (href === 'mujer.html' && currentPage.includes('mujer')) {
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

// =============================
// FUNCIONALIDAD DE FAVORITOS
// =============================

const favoriteCards = document.querySelectorAll('.favorite-card');
const removeBtns = document.querySelectorAll('.remove-favorite');

// Click en tarjeta de favorito (ir al producto)
favoriteCards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Solo si NO se hace click en el botón de eliminar
        if (!e.target.closest('.remove-favorite')) {
            const productName = card.querySelector('.favorite-name').textContent;
            console.log(`Producto clickeado: ${productName}`);
            // Aquí puedes redirigir a la página del producto
            // window.location.href = `producto.html?name=${productName}`;
        }
    });
});

// Eliminar de favoritos
removeBtns.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita que se active el click del card
        
        const card = btn.closest('.favorite-card');
        const productName = card.querySelector('.favorite-name').textContent;
        
        // Animación de salida
        card.style.opacity = '0';
        card.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            card.remove();
            
            // Si no quedan favoritos, mostrar mensaje
            const remainingCards = document.querySelectorAll('.favorite-card');
            if (remainingCards.length === 0) {
                document.querySelector('.favorites-grid').innerHTML = `
                    <div class="empty-favorites">
                        <h3>No tienes productos favoritos</h3>
                        <a href="Inicio.html">Explorar productos</a>
                    </div>
                `;
            }
            
            console.log(`${productName} eliminado de favoritos`);
        }, 300);
    });
});

// =============================
// MODAL DE BÚSQUEDA
// =============================

// Productos de ejemplo para la búsqueda
const productos = [
    { id: 1, nombre: 'Jacket Oversize Fit', precio: 1099, imagen: '/Recursos/jacketcart.png' },
    { id: 2, nombre: 'Sudadera Oversize Fit', precio: 1099, imagen: '/Recursos/jacketred.png' },
    { id: 3, nombre: 'Sudadera Loose Fit', precio: 1224, imagen: '/Recursos/producto1.jpeg' },
    { id: 4, nombre: 'Pants Relaxed Fit', precio: 1599, imagen: '/Recursos/producto2.jpeg' },
    { id: 5, nombre: 'Pants Cargo', precio: 1799, imagen: '/Recursos/producto4.jpeg' },
    { id: 6, nombre: 'Chamarra Vintage', precio: 2499, imagen: '/Recursos/producto5.jpeg' },
    { id: 7, nombre: 'Lentes Carrera', precio: 899, imagen: '/Recursos/producto6.jpeg' },
    { id: 8, nombre: 'Denim Jacket', precio: 1224, imagen: '/Recursos/PHombre1.jpeg' },
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
                <div class="search-result-price">${producto.precio.toLocaleString('es-MX', {minimumFractionDigits: 2})}</div>
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
                <span class="search-tag">Sudaderas</span>
                <span class="search-tag">Chamarra</span>
                <span class="search-tag">Pants</span>
                <span class="search-tag">Jacket</span>
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
                <span class="search-tag">Sudaderas</span>
                <span class="search-tag">Chamarra</span>
                <span class="search-tag">Pants</span>
                <span class="search-tag">Accesorios</span>
                <span class="search-tag">Denim</span>
                <span class="search-tag">Oversize</span>
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