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
   ============================================================ */
window.COPA = {
  ano: 2026,
  artilheiros: true,   // troque para true para mostrar a aba Artilheiros
 // ajustes: { JAP: -1 }, // ajuste manual de pontos (punição/bônus)
  times: {
    JAM: ["Jamaica"], HOL: ["Holanda"], BRA: ["Brasil"], ARG: ["Argentina"], FRA: ["França"],
    ESP: ["Espanha"], CRO: ["Croácia"], MEX: ["México"], NIG: ["Nigéria"], JAP: ["Japão"]
  },
  grupos: {
    A: ["JAM","HOL","BRA","ARG","FRA"],
    B: ["ESP","CRO","MEX","NIG","JAP"]
  },
  // ATENÇÃO: placares abaixo são PROVISÓRIOS (só para bater com a arte). Corrija.
  jogos: [
    ["26/09","BRA","ARG",1,1,"Wesley 1","Vinny 1"],
    ["26/09","CRO","MEX",1,1,"","Netto 1"],
    ["03/10","JAM","HOL",2,2,"João Matheus-23 1,David-4 1","Ruan-22 1,BG-1924 1"],
    ["03/10","JAP","ESP",0,2,"","Andrezão-7 1,Jean-10 1"],
    ["07/10","FRA","BRA"],
    ["07/10","NIG","CRO"],
    ["17/10","ARG","JAM"],
    ["17/10","MEX","JAP"],
    ["24/10","HOL","FRA"],
    ["24/10","ESP","NIG"],
    ["31/10","BRA","JAM"],
    ["31/10","CRO","JAP"],
    ["07/11","ARG","HOL"],
    ["07/11","MEX","ESP"],
    ["14/11","FRA","JAM"],
    ["14/11","NIG","JAP"],
    ["21/11","BRA","HOL"],
    ["21/11","CRO","ESP"],
    ["28/11","ARG","FRA"],
    ["28/11","MEX","NIG"]
  ],
  // FOTOS dos artilheiros (opcional): "Nome": "fotos/arquivo.jpg"
  fotos: {}
};
