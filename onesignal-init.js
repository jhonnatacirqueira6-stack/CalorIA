window.OneSignal = window.OneSignal || [];
OneSignal.push(function() {
  OneSignal.init({
    appId: "4f5a2575-9b06-4b20-a604-6d8ba7b1da82",
    allowLocalhostAsSecureOrigin: true,
    notifyButton: { enable: false }
  });
  OneSignal.on('subscriptionChange', function(isSubscribed) { console.log("subscriptionChange:", isSubscribed); });
  OneSignal.getUserId().then(function(userId) { if(userId){ fetch('/api/save-onesignal-id', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ playerId: userId }) }); } });
});