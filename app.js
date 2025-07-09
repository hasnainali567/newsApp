const apiKey = 'd1d259b725bf481ab193014b77f5f36e'; // 🔑 Replace with your actual NewsAPI key
const newsContainer = document.getElementById('news-container');
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');

async function fetchNews(query = '') {
  const endpoint = query
    ? `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&pageSize=6&apiKey=${apiKey}`
    : `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    if (data.status === 'ok') {
      displayNews(data.articles);
    } else {
      newsContainer.innerHTML = `<p class="text-danger">Failed to load news. ${data.message}</p>`;
    }
  } catch (error) {
    newsContainer.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
  }
}

function displayNews(articles) {
  newsContainer.innerHTML = ''; // Clear previous
  if (articles.length === 0) {
    newsContainer.innerHTML = '<p class="text-center text-muted">No articles found.</p>';
    return;
  }

  articles.forEach(article => {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';

    col.innerHTML = `
      <div class="card h-100">
        <img src="${article.urlToImage || 'https://via.placeholder.com/350x200'}" class="card-img-top" alt="News Image">
        <div class="card-body">
          <h5 class="card-title">${article.title}</h5>
          <p class="card-text">${article.description || 'No description available.'}</p>
          <a href="${article.url}" target="_blank" class="btn btn-primary">Read More</a>
        </div>
      </div>
    `;
    newsContainer.appendChild(col);
  });
}

// Event: Search Button
searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  fetchNews(query);
});

// Fetch top headlines on load
fetchNews();
