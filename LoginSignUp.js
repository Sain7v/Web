// ==================== MENÚ HAMBURGUESA ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLeft = document.querySelector('.nav-left');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLeft.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un enlace
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLeft.classList.remove('active');
        });
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
        if (!navLeft.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navLeft.classList.remove('active');
        }
    });
}

// ==================== NAVBAR ====================
const searchBtn = document.querySelector('.icon-btn[aria-label="Buscar"]');
const userBtn = document.querySelector('.icon-btn[aria-label="Usuario"]');
const cartBtn = document.querySelector('.icon-btn[aria-label="Carrito"]');
const favBtn = document.querySelector('.icon-btn[aria-label="Favoritos"]');

searchBtn.addEventListener('click', () => {
    console.log('Búsqueda clickeada');
    openSearchModal();
});

userBtn.addEventListener('click', () => {
    console.log('Ya estás en la página de login');
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

cartBtn.addEventListener('click', () => {
    console.log('Carrito clickeado');
    window.location.href = 'carrito.html';
});

favBtn.addEventListener('click', () => {
    console.log('Favoritos clickeado');
    window.location.href = 'favoritos.html';
});

// ==================== FORMULARIO LOGIN/SIGNUP ====================
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const imagePanel = document.getElementById('imagePanel');
const formContainer = document.getElementById('formContainer');
const submitBtn = document.getElementById('submitBtn');
const authForm = document.getElementById('authForm');

let isLoginMode = false;

loginBtn.addEventListener('click', () => {
    if (!isLoginMode) {
        imagePanel.classList.add('move-right');
        formContainer.classList.add('move-left');
        
        loginBtn.classList.add('active');
        signupBtn.classList.remove('active');
        
        submitBtn.textContent = 'Login';
        isLoginMode = true;
    }
});

signupBtn.addEventListener('click', () => {
    if (isLoginMode) {
        imagePanel.classList.remove('move-right');
        formContainer.classList.remove('move-left');
        
        signupBtn.classList.add('active');
        loginBtn.classList.remove('active');
        
        submitBtn.textContent = 'Sign Up';
        isLoginMode = false;
    }
});

authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (isLoginMode) {
        console.log('Login:', { email, password });
        alert('Iniciando sesión...');
        // window.location.href = 'Inicio.html';
    } else {
        console.log('Sign Up:', { email, password });
        alert('Creando cuenta...');
        // window.location.href = 'Inicio.html';
    }
});

// ==================== MODAL DE BÚSQUEDA ====================
const productos = [
    { id: 1, nombre: 'Sudadera Loose Fit', precio: 1224, imagen: '/Recursos/producto1.jpeg' },
    { id: 2, nombre: 'Pants Relaxed Fit', precio: 1599, imagen: '/Recursos/producto2.jpeg' },
    { id: 3, nombre: 'Sudadera Oversize Fit', precio: 1099, imagen: '/Recursos/producto3.jpeg' },
    { id: 4, nombre: 'Pants Cargo', precio: 1799, imagen: '/Recursos/producto4.jpeg' },
    { id: 5, nombre: 'Chamarra Vintage', precio: 2499, imagen: '/Recursos/producto5.jpeg' },
    { id: 6, nombre: 'Lentes Carrera', precio: 899, imagen: '/Recursos/producto6.jpeg' },
    { id: 7, nombre: 'Denim Jacket', precio: 1224, imagen: '/Recursos/hombre-producto1.jpg' },
    { id: 8, nombre: 'Jacket Oversize Fit', precio: 1099, imagen: '/Recursos/hombre-producto3.jpg' },
];

const searchModal = document.getElementById('searchModal');
const searchClose = document.getElementById('searchClose');
const searchInput = document.getElementById('searchInput');
const searchBtnModal = document.getElementById('searchBtnModal');
const searchResults = document.getElementById('searchResults');

function openSearchModal() {
    searchModal.classList.add('active');
    searchInput.focus();
}

function closeSearchModal() {
    searchModal.classList.remove('active');
    searchInput.value = '';
    showSuggestions();
}

searchClose.addEventListener('click', closeSearchModal);

searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) closeSearchModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchModal.classList.contains('active')) {
        closeSearchModal();
    }
});

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
            </div>
        </div>
    `;
    addTagListeners();
}

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

function addTagListeners() {
    document.querySelectorAll('.search-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            searchInput.value = tag.textContent;
            performSearch();
        });
    });
}

function goToProduct(id) {
    alert(`Ir al producto ${id}`);
    // window.location.href = `producto.html?id=${id}`;
}

searchBtnModal.addEventListener('click', performSearch);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') performSearch();
});

searchInput.addEventListener('input', () => {
    if (searchInput.value.length >= 2) performSearch();
    else if (searchInput.value.length === 0) showSuggestions();
});

showSuggestions();
addTagListeners();