document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('mobile_btn');
  var menu = document.getElementById('mobile_menu');
  if (btn && menu) {
    btn.addEventListener('click', function () {
      menu.classList.toggle('active');
      var i = btn.querySelector('i'); if (i) i.classList.toggle('fa-x');
    });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { menu.classList.remove('active'); }); });
  }
  // filtro do índice do blog
  var chips = document.querySelectorAll('.chip-filter');
  var cards = document.querySelectorAll('.blog-card');
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      chips.forEach(function (x) { x.classList.remove('on'); }); c.classList.add('on');
      var f = c.dataset.filter;
      cards.forEach(function (k) { k.style.display = (f === 'all' || k.dataset.grp === f) ? '' : 'none'; });
    });
  });
  var s = document.getElementById('blog-search');
  if (s) s.addEventListener('input', function () {
    var q = s.value.toLowerCase();
    cards.forEach(function (k) { k.style.display = k.textContent.toLowerCase().indexOf(q) > -1 ? '' : 'none'; });
  });
});
