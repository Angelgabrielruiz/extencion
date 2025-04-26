window.addEventListener('DOMContentLoaded', async () => {
    const query = localStorage.getItem('busqueda');
  
    if (!query) {
      document.getElementById('mensaje').textContent = 'No se proporcionó una búsqueda.';
      return;
    }
  
    const apiKey = '6ef52ea126165a0e40cca90d090409625f1bd02f2cc206f3db3009c776bce18e';
    const url = `https://serpapi.com/search?engine=google&q=${encodeURIComponent(query)}&api_key=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data && data.organic_results && data.organic_results.length > 0) {
        const resultadosHTML = data.organic_results
          .filter(result => result && result.title && result.link)
          .map(result => `
            <div class="resultado">
              <strong>${result.title}</strong><br>
              <a href="${result.link}" target="_blank">Ver más</a>
            </div>
          `)
          .join('');
  
        document.getElementById('mensaje').innerHTML = resultadosHTML;
      } else {
        document.getElementById('mensaje').textContent = 'No se encontraron resultados.';
      }
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('mensaje').textContent = `Error al realizar la búsqueda: ${error.message}`;
    }
  });
  