/**
 * COPA TS - Palpites da rodada + contagem de acessos
 * Cole este código em: Planilha Google > Extensões > Apps Script.
 * Depois: Implantar > Nova implantação > Tipo "App da Web"
 *   - Executar como: Eu
 *   - Quem pode acessar: Qualquer pessoa
 * Copie o endereço que termina em /exec e cole em dados.js (palpites: { url: "..." }).
 * Ao mudar o código, faça "Implantar > Gerenciar implantações > editar > Nova versão".
 */
const ABA_PALPITES = 'Palpites';
const ABA_ACESSOS = 'Acessos';

function aba_(nome, cabecalho) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let s = ss.getSheetByName(nome);
  if (!s) { s = ss.insertSheet(nome); s.appendRow(cabecalho); }
  return s;
}
function limpa_(v) {               // evita que o texto vire fórmula na planilha
  v = String(v || '').slice(0, 400);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function doPost(e) {
  const p = e.parameter || {};
  if (p.tipo === 'acesso') {
    aba_(ABA_ACESSOS, ['data_hora', 'visitante', 'aba']).appendRow([new Date(), limpa_(p.vid), limpa_(p.aba)]);
  } else if (p.tipo === 'palpite') {
    aba_(ABA_PALPITES, ['data_hora', 'rodada', 'nome', 'autoriza_nome', 'visitante', 'palpites'])
      .appendRow([new Date(), limpa_(p.rodada), limpa_(p.nome), p.autoriza === 'sim' ? 'sim' : 'nao', limpa_(p.vid), limpa_(p.palpites)]);
    CacheService.getScriptCache().remove('palpites');
  }
  return ContentService.createTextOutput('ok');
}

// O site lê os palpites por aqui. Nomes só aparecem para quem autorizou.
function doGet() {
  const cache = CacheService.getScriptCache();
  let json = cache.get('palpites');
  if (!json) {
    const s = aba_(ABA_PALPITES, ['data_hora', 'rodada', 'nome', 'autoriza_nome', 'visitante', 'palpites']);
    const linhas = s.getDataRange().getValues().slice(1);
    const ultimo = {};                                  // um palpite por visitante e rodada (vale o mais recente)
    linhas.forEach(l => { ultimo[l[4] + '|' + l[1]] = l; });
    const lista = Object.keys(ultimo).map(k => {
      const l = ultimo[k]; let itens = [];
      try { itens = JSON.parse(l[5]); } catch (err) {}
      return { r: String(l[1]), n: l[3] === 'sim' ? String(l[2]).replace(/^'/, '') : '', i: itens };
    });
    json = JSON.stringify({ ok: true, palpites: lista });
    if (json.length < 90000) cache.put('palpites', json, 60);
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}
