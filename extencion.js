document.getElementById('clickMe').addEventListener('click', () => {
  const searchQuery = document.getElementById('searchQuery').value.trim();

  if (!searchQuery) {
    document.getElementById('mensaje').textContent = 'Por favor, ingresa un termino de búsqueda.';
    return;
  }

  // Guardar la búsqueda en localStorage y redirigir
  localStorage.setItem('busqueda', searchQuery);
  window.open( 'resultados.html','_blank');
});
