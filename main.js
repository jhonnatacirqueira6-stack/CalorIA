// minimal main.js kept for compatibility
(function(){
  window.isPremium = function(){ return localStorage.getItem('premium') === 'true'; };
  // keep search memory API if present
  window.searchAPI = window.searchAPI || {"getAll": ()=> JSON.parse(localStorage.getItem('calor_searches')||'[]'), "add": (q)=>{const a=JSON.parse(localStorage.getItem('calor_searches')||'[]');a.unshift({q:q,at:Date.now()});localStorage.setItem('calor_searches',JSON.stringify(a.slice(0,50)));} };
})();
