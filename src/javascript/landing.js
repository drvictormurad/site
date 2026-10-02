(function () {
  // Fecha o menu mobile ao clicar em um link
  document.querySelectorAll('#mobile_menu a').forEach(function (a) {
    a.addEventListener('click', function () {
      document.getElementById('mobile_menu').classList.remove('active');
      var i = document.querySelector('#mobile_btn i'); if (i) i.classList.remove('fa-x');
    });
  });

  // Faixa de atendimento (troca automática)
  var slides = document.querySelectorAll('.slide-fino');
  var dotsBox = document.querySelector('.dots-fino');
  if (slides.length) {
    var cur = 0, timer;
    slides.forEach(function (_, i) {
      var b = document.createElement('button'); b.setAttribute('aria-label', 'Slide ' + (i + 1));
      b.addEventListener('click', function () { go(i); start(); });
      dotsBox.appendChild(b);
    });
    var dots = dotsBox.querySelectorAll('button');
    function go(n) {
      slides[cur].classList.remove('on'); dots[cur].classList.remove('on');
      cur = n; slides[cur].classList.add('on'); dots[cur].classList.add('on');
    }
    function start() { clearInterval(timer); timer = setInterval(function () { go((cur + 1) % slides.length); }, 5500); }
    go(0); start();
  }

  // Formulário de contato (envio por e-mail via FormSubmit)
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var st = document.getElementById('form-status'), btn = form.querySelector('.btn-enviar');
      var fd = new FormData(form);
      if (fd.get('_honey')) return;
      var data = {}; fd.forEach(function (v, k) { data[k] = v; });
      btn.disabled = true; st.className = ''; st.textContent = 'Enviando...';
      fetch(form.dataset.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(data) })
        .then(function (r) { return r.json(); })
        .then(function (j) {
          if (j.success === 'true' || j.success === true) {
            st.className = 'ok'; st.textContent = 'Mensagem enviada! Entraremos em contato em breve.'; form.reset();
          } else { throw new Error(j.message || 'erro'); }
        })
        .catch(function () {
          st.className = 'err';
          st.textContent = 'Não foi possível enviar agora. Por favor, fale conosco pelo WhatsApp.';
        })
        .finally(function () { btn.disabled = false; });
    });
  }

  // Animações de entrada (se a biblioteca estiver carregada)
  if (window.ScrollReveal) {
    var sr = ScrollReveal();
    sr.reveal('.sec-head', { distance: '24px', duration: 800, origin: 'bottom' });
    sr.reveal('.sobre-wrap', { distance: '30px', duration: 900, origin: 'bottom' });
    sr.reveal('.destaque-item', { distance: '24px', duration: 700, origin: 'bottom', interval: 120 });
    sr.reveal('.form-card', { distance: '30px', duration: 800, origin: 'bottom' });
  }
})();
