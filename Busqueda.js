// Productos de ejemplo para la búsqueda
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

// Abrir modal
function openSearchModal() {
    searchModal.classList.add('active');
    searchInput.focus();
}

// Cerrar modal
function closeSearchModal() {
    searchModal.classList.remove('active');
    searchInput.value = '';
    showSuggestions();
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
                <span class="search-tag">Sudaderas</span>
                <span class="search-tag">Chamarra</span>
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
    alert(`Ir al producto ${id}`);
    // window.location.href = `producto.html?id=${id}`;
}

// Eventos
searchBtnModal.addEventListener('click', performSearch);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') performSearch();
});

// Búsqueda en tiempo real
searchInput.addEventListener('input', () => {
    if (searchInput.value.length >= 2) performSearch();
    else if (searchInput.value.length === 0) showSuggestions();
});

// Inicializar
showSuggestions();
addTagListeners();
