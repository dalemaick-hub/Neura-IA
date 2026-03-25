(function () {
  try {
    var key = "neura-reloaded";
    var reloaded = sessionStorage.getItem(key);
    if (!reloaded) {
      sessionStorage.setItem(key, "true");
      window.location.reload(true);
    }
  } catch (e) {}
})();
