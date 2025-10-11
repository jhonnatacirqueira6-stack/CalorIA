// main.js - handles premium button and simple persistent search memory
(function(){
  const stripeLink = "https://buy.stripe.com/3cI14m6dsb3zbl14Br53O01";
  const btn = document.getElementById('premium-btn');
  if(btn){
    btn.addEventListener('click', ()=> { window.location.href = stripeLink; });
  }

  // expose a helper to check premium status
  window.isPremium = function(){ return localStorage.getItem('premium') === 'true'; };

  // Example: restore/search memory (simple API to store last searches)
  window.searchAPI = {
    getAll: ()=> JSON.parse(localStorage.getItem('calor_searches') || '[]'),
    add: (q)=>{
      const arr = JSON.parse(localStorage.getItem('calor_searches') || '[]');
      arr.unshift({q:q, at: Date.now()});
      // keep last 50
      localStorage.setItem('calor_searches', JSON.stringify(arr.slice(0,50)));
    }
  };

  // When page loads, you can use searchAPI.getAll() to restore UI state
  console.log('Premium?', window.isPremium());
  console.log('Search memory entries:', window.searchAPI.getAll().length);
})();