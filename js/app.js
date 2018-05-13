(function() {

  // const data = {
  //   full_name: 'owner/repository',
  //   language: 'JavaScript',
  //   stargazers_count: 250,
  //   forks: 19,
  //   description: 'What the project is about',
  //   html_url: ''
  // };

  

  const app = {
    apiURL: `https://talaikis.com/api/quotes/random/`,
    quoteTemplate: document.querySelector('.quote')
  }

  app.updateQuotes = function(quote) {
    document.querySelector('.quote').textContent = "\"" +quote.quote+"\"";
  }

  app.getQuotes = function() {
    let networkReturned = false;
    if ('caches' in window) {
      caches.match("sw-precache-v9").then(function(response) {
        if (response) {
          response.json().then(function(quote) {
            console.log('From cache...')
            if(!networkReturned) {
              app.updateQuotes(quote);
            }
          });
        }
      });
    }

    fetch(app.apiURL)
    .then(response => response.json())
    .then(function(quote) {
      // caches.match("sw-precache-v9").then(function(cache) {
      //   cache.add("Hi");
      // });
      console.log('From server...')
      app.updateQuotes(quote)
      networkReturned = true;
    }).catch(function(err) {
      // Error :(
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    app.getQuotes()
    const refreshButton = document.querySelector('.refresh');
    refreshButton.addEventListener('click', app.getQuotes)
  })

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
     .register('service-worker.js')
     .then(function() { 
        console.log('Service Worker Registered'); 
      });
  }
})()