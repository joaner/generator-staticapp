if(typeof document !== "undefined") {
  (function(nowtime) {
    nowtime.textContent = (new Date()).toLocaleString()
  })(document.getElementById('nowtime'));
}
