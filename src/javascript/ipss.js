(function () {
  var Q = [
    ["Esvaziamento incompleto", "No último mês, com que frequência você teve a sensação de não esvaziar completamente a bexiga após terminar de urinar?"],
    ["Frequência", "No último mês, com que frequência você teve que urinar novamente em menos de 2 horas após ter urinado?"],
    ["Intermitência", "No último mês, com que frequência você notou que parou e recomeçou várias vezes ao urinar?"],
    ["Urgência", "No último mês, com que frequência você achou difícil adiar o ato de urinar?"],
    ["Jato fraco", "No último mês, com que frequência você notou o jato urinário fraco?"],
    ["Esforço", "No último mês, com que frequência você teve que fazer força para começar a urinar?"]
  ];
  var OPT = ["Nenhuma vez", "Menos de 1 vez em 5", "Menos da metade das vezes", "Cerca de metade das vezes", "Mais da metade das vezes", "Quase sempre"];
  var NOC = ["Nenhuma", "1 vez", "2 vezes", "3 vezes", "4 vezes", "5 vezes ou mais"];
  var QOL = ["Ótimo", "Muito bom", "Bom", "Misto (nem satisfeito nem aborrecido)", "Insatisfeito", "Muito insatisfeito", "Péssimo"];
  var box = document.getElementById('ipss-form'); if (!box) return;
  function group(name, title, text, opts) {
    var h = '<fieldset class="ipss-q"><legend><b>' + title + '</b><span>' + text + '</span></legend><div class="ipss-opts">';
    opts.forEach(function (o, i) { h += '<label><input type="radio" name="' + name + '" value="' + i + '"><em>' + o + '</em></label>'; });
    return h + '</div></fieldset>';
  }
  var html = '';
  Q.forEach(function (q, i) { html += group('q' + i, (i + 1) + '. ' + q[0], q[1], OPT); });
  html += group('q6', '7. Noctúria', 'No último mês, quantas vezes, em média, você acordou à noite para urinar (da hora de dormir até a hora de levantar pela manhã)?', NOC);
  html += group('qol', 'Qualidade de vida', 'Se você tivesse que passar o resto da vida com os sintomas urinários que tem agora, como se sentiria?', QOL);
  html += '<div class="ipss-actions"><button type="button" id="ipss-calc" class="btn-enviar">Calcular resultado</button> <button type="button" id="ipss-reset" class="btn-outline" style="cursor:pointer;background:none">Limpar</button></div><div id="ipss-result" aria-live="polite"></div>';
  box.innerHTML = html;
  document.getElementById('ipss-calc').onclick = function () {
    var total = 0, miss = false;
    for (var i = 0; i < 7; i++) {
      var c = box.querySelector('input[name=q' + i + ']:checked');
      if (!c) { miss = true; break; } total += +c.value;
    }
    var out = document.getElementById('ipss-result');
    if (miss) { out.className = 'ipss-res warn'; out.innerHTML = 'Responda todas as 7 perguntas para calcular o escore.'; return; }
    var cat, cls, msg;
    if (total <= 7) { cat = 'Sintomas leves'; cls = 'ok'; msg = 'Seus sintomas são leves. Mesmo assim, se algo incomoda, converse com um urologista.'; }
    else if (total <= 19) { cat = 'Sintomas moderados'; cls = 'mid'; msg = 'Recomenda-se avaliação com um urologista para investigar a causa e discutir tratamento.'; }
    else { cat = 'Sintomas graves'; cls = 'bad'; msg = 'Recomenda-se avaliação urológica em breve. Procure atendimento imediato se não conseguir urinar, tiver febre ou sangue na urina.'; }
    var q = box.querySelector('input[name=qol]:checked');
    var qt = q ? '<p><b>Qualidade de vida:</b> ' + QOL[+q.value] + ' (' + q.value + '/6)</p>' : '';
    out.className = 'ipss-res ' + cls;
    out.innerHTML = '<div class="ipss-score">' + total + '<small>/35</small></div><div><h3>' + cat + '</h3><p>' + msg + '</p>' + qt +
      '<p class="ipss-note">Este resultado é apenas informativo e não substitui a consulta médica.</p>' +
      '<a class="btn-wa" href="https://wa.me/5562984857621?text=Olá,%20fiz%20o%20IPSS%20(escore%20' + total + ')%20e%20quero%20agendar%20consulta" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> Agendar uma consulta</a></div>';
    out.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };
  document.getElementById('ipss-reset').onclick = function () {
    box.querySelectorAll('input').forEach(function (i) { i.checked = false; });
    document.getElementById('ipss-result').innerHTML = ''; document.getElementById('ipss-result').className = '';
  };
})();
