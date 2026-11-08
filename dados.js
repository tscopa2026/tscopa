/* ============================================================
   DADOS DA COPA  -  é SÓ ESTE ARQUIVO que você precisa editar.
   (Ou use o modo editor: abra o site com #editor no endereço.)

   JOGOS: uma linha por jogo, sempre entre aspas e com vírgula no fim:
     ["data", "CASA", "FORA", gols casa, gols fora, "quem fez gol da casa", "quem fez gol do fora"]

   - Jogo ainda não realizado:   ["07/10","FRA","BRA"],
   - Jogo realizado:             ["07/10","FRA","BRA",2,1],
   - Com os autores dos gols:    ["07/10","FRA","BRA",2,1,"Neto 2","Maria"],
       "Neto 2" = Neto fez 2 gols.  "Neto 2, Ana" = Neto fez 2 e Ana fez 1.
       Se ninguém fez gol daquele lado, use "" (aspas vazias).
   - Os ARTILHEIROS são somados SOZINHOS a partir desses nomes.
   - Gol contra não precisa ser lançado.
   - Próxima rodada: copie uma linha e mude data e times.
   - CARTÕES (opcional): no fim da linha, um bloco com quem levou cartão:
       ["07/10","FRA","BRA",4,2,"Reni 2","Wesley",{am1:"Reni, Nuno", am2:"Rael", vm1:"", vm2:""}]
       am1 = amarelos da casa | am2 = amarelos do fora | vm1 = vermelhos da casa | vm2 = vermelhos do fora
       (se ninguém fez gol de um lado, use "" no lugar dos autores)
   ============================================================ */
window.COPA = {
  ano: 2026,
  cartoes: { amarelos: 3, vermelhoSuspende: true }, // 3 amarelos = 1 jogo de suspensão; zera no mata-mata
  // SORTEIO: só se, depois de todos os critérios, houver empate e você sortear. Ex.: sorteio: ["BRA","ARG"] (BRA fica na frente)
  sorteio: [],
  // PLANILHA DE CARTÕES (Google Sheets "publicada na web" em formato CSV). Deixe "" para não usar.
  // Colunas: data | time | jogador | cartao (amarelo ou vermelho) | qtd.  Veja o arquivo GUIA-PLANILHAS.txt
  planilhaCartoes: "https://docs.google.com/spreadsheets/d/12JSv8JzVo-1m0eT2RpkYwR2wa16CZb8nDnf-d05R9CQ",
  // PALPITES DA RODADA + CONTAGEM DE ACESSOS: cole aqui o endereço do Apps Script (arquivo apps-script-palpites.gs). Vazio = desligado.
  palpites: { url: "", ativo: true },
  // GOOGLE ANALYTICS (opcional): código no formato "G-XXXXXXXXXX". Vazio = desligado.
  analytics: "",
  artilheiros: true,
 // ajustes: { JAP: -1 }, // ajuste manual de pontos (punição/bônus)
  times: {
    JAM: ["Jamaica"], HOL: ["Holanda"], BRA: ["Brasil"], ARG: ["Argentina"], FRA: ["França"],
    ESP: ["Espanha"], CRO: ["Croácia"], MEX: ["México"], NIG: ["Nigéria"], JAP: ["Japão"]
  },
  grupos: {
    A: ["JAM","HOL","BRA","ARG","FRA"],
    B: ["ESP","CRO","MEX","NIG","JAP"]
  },
  jogos: [
    ["26/09","BRA","ARG",1,1,"Wesley 1","Vinny 1"],
    ["26/09","CRO","MEX",1,1,"","Netto 1"],
    ["03/10","JAM","HOL",2,2,"João Matheus-23 1,David-4 1","Ruan-22 1,BG-1924 1"],
    ["03/10","JAP","ESP",0,2,"","Andrezão-7 1,Jean-10 1"],
    ["07/10","FRA","BRA",4,2,"Reni-10 2,Nuno 1,Nilson 1","Wesley 1, Rael 1"],
    ["07/10","NIG","CRO",1,2,"Rafa-23 1","Diogo-10 2"],
    ["17/10","ARG","JAM",2,3,"Lucas Siqueiar 1, Vinny 1","Helinho 2, Luiz 1"],
    ["17/10","MEX","JAP",2,1,"Danilo 1, Índio 1","Phall Maia 1"],
    ["24/10","HOL","FRA",1,5,"Jó Gol 1","Brown 2,Cassinho 1,Nuno 1, P. Vinicius 1"],
    ["24/10","ESP","NIG",3,5,"Andrezão-7 1,Jean-10 1,Wellington 1","Dultra 2, Yure Alberto 2,Guto 1"],
    ["31/10","BRA","JAM",1,11,"Eddy 1","Luiz 5,Toka 3,Jey 2,Guthyerre 1"],
    ["31/10","CRO","JAP",1,3,"Tonygol 1","Edu 1,Marcelinho 1,Hugo 1"],
    ["07/11","ARG","HOL",3,2,"Popó 1,Josué 1, Douglas 1","Jó Gol 1, Elias 1"],
    ["07/11","MEX","ESP",2,2,"Danilo 1, Jhon 1","Giboia 1, Wellington 1"],
    ["14/11","FRA","JAM"],
    ["14/11","NIG","JAP"],
    ["21/11","BRA","HOL"],
    ["21/11","CRO","ESP"],
    ["28/11","ARG","FRA"],
    ["28/11","MEX","NIG"]
  ],
  // MATA-MATA: os times entram sozinhos quando a fase de grupos terminar.
  // a / b: "1A" = 1º do Grupo A | "VJ1" = vencedor do J1 | "PSF1" = perdedor da SF1 | ou o código do time (ex.: "BRA")
  // Resultado: acrescente x, y (gols), p1, p2 (pênaltis, se empatar), g1, g2 (autores) e am1, am2, vm1, vm2 (cartões).
  // Exemplo: {id:"J1", fase:"Quartas de final", d:"05/12", h:"09h00", a:"1A", b:"4B", x:2, y:1, g1:"Neto 2", g2:"Ana"},
  matamata: [
    {id:"J1", fase:"Quartas de final", d:"05/12", h:"09h00", a:"1A", b:"4B"},
    {id:"J2", fase:"Quartas de final", d:"05/12", h:"10h30", a:"2A", b:"3B"},
    {id:"J3", fase:"Quartas de final", d:"05/12", h:"14h30", a:"1B", b:"4A"},
    {id:"J4", fase:"Quartas de final", d:"05/12", h:"16h00", a:"2B", b:"3A"},
    {id:"SF1", fase:"Semifinais", d:"12/12", h:"", a:"VJ1", b:"VJ2"},
    {id:"SF2", fase:"Semifinais", d:"12/12", h:"", a:"VJ3", b:"VJ4"},
    {id:"TER", fase:"Disputa de 3º lugar", d:"19/12", h:"", a:"PSF1", b:"PSF2"},
    {id:"FIN", fase:"Grande Final", d:"19/12", h:"", a:"VSF1", b:"VSF2"}
  ],
  // FOTOS dos artilheiros (opcional): "Nome": "fotos/arquivo.jpg"
  fotos: {
     "Reni-10": "fotos/reni-10.png",
	  "Nuno": "fotos/nuno.png",
	  "Luiz": "fotos/luiz-Jamaica.png",
	  "Rael": "fotos/rael_brasil.png",
  "Guthyerre": "fotos/gutierre-Jamaica.png",
  "Helinho": "fotos/Helinho-jamaica.png",
  "Toka": "fotos/toka-jamaica.png",
	  "Nilson": "fotos/Nilson-frança.png",
  "P. Vinicius": "fotos/pv-frança.png",
  "Cassinho": "fotos/cassinho-França.png",
  "Brown": "fotos/brown-frança.png",
	  "Elias": "fotos/elias-Holanda.png",
	  "Wellington": "fotos/Wellington-espanha.jpg.png",
  }
};
