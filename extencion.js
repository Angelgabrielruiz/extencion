document.getElementById('clickMe').addEventListener('click', async () => {
  const searchQuery = document.getElementById('searchQuery').value.trim();

  if (!searchQuery) {
    document.getElementById('mensaje').textContent = 'Por favor, ingresa un termino de busqueda.';
    return;
  }

  const apiKey = '6ef52ea126165a0e40cca90d090409625f1bd02f2cc206f3db3009c776bce18e';
  const url = `https://serpapi.com/search?engine=google&q=${encodeURIComponent(searchQuery)}&api_key=${apiKey}`;

  console.log('Enviando solicitud a:', url);

  try {
    const response = await fetch(url);
    const data = await response.json();
  
    console.log('Respuesta completa:', data);
  
    if (data && data.organic_results && data.organic_results.length > 0) {
      const resultadosHTML = data.organic_results
        .filter(result => result && result.title && result.link) // solo los que tienen título y link
        .map(result => `
          <div style="margin-bottom: 10px;">
            <p><strong>${result.title}</strong></p>
            <p><a href="${result.link}" target="_blank">Ver más</a></p>
          </div>
        `)
        .join('');
  
      document.getElementById('mensaje').innerHTML = resultadosHTML || 'No se encontraron resultados válidos.';
    } else {
      document.getElementById('mensaje').textContent = 'No se encontraron resultados.';
    }
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('mensaje').textContent = `Error al realizar la búsqueda: ${error.message}`;
  }
  
});
