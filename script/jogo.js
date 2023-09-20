var timeId = null; //Variavel que armazena a chamada da função timeout

function iniciaJogo() {
  //Recuperando a informação da URL completa
  var url = window.location.search;
  //Tratando a informação da url (tirando o ? e deixado só o value na variavel nivel_jogo)
  var nivel_jogo = url.replace("?", "");

  //variavel do tempo dos segundos para o cronometro
  var tempo_segundos = 0;

  if (nivel_jogo == 1) {
    //1° fácil 120 segundos
    tempo_segundos = 120;
  }

  if (nivel_jogo == 2) {
    //2° médio 60 segundos
    tempo_segundos = 60;
  }

  if (nivel_jogo == 3) {
    //3° difícil 30 segundos
    tempo_segundos = 30;
  }

  //Inserindo segundos no span
  document.getElementById("tempo_cronometro").innerHTML = tempo_segundos;

  //quantidade de balões
  var qtd_baloes = 60;

  cria_baloes(qtd_baloes);

  //imprimir a quantidade de baloes não estourados
  document.getElementById("balao-nao-estourado").innerHTML = qtd_baloes;

  //imprimir a quantidade de balões estourados
  document.getElementById("balao-estourado").innerHTML = 0;

  contagem_tempo(tempo_segundos + 1);
}

//Criar o decremento do cronometro
function contagem_tempo(segundos) {
  segundos = segundos - 1;

  if (segundos == -1) {
    clearTimeout(timeId); //para a execução da função do settimeout
    game_over(); //Função de fim de jogo
    return false;
  }

  document.getElementById("tempo_cronometro").innerHTML = segundos; //Iniciando o cronometro como decremento no elemento html

  timeId = setTimeout("contagem_tempo(" + segundos + ")", 1000); //função em jquery para iniciar o cronometro como decremento
}

function game_over() {
  alert("Fim de jogo, você não conseguiu estourar todos os balões!");
}

function cria_baloes(qtd_baloes) {
  for (i = 1; i <= qtd_baloes; i++) {
    var balao = document.createElement("img");
    balao.src = "imagens/balao_azul_pequeno.png";
    balao.id = "b" + i;
    balao.onclick = function () {
      estourar(this);
    };

    document.getElementById("conteudo-cenario").appendChild(balao);
  }
}

function estourar(e) {
  //função para modificar para o balao estourado

  var id_balao = e.id;

  document.getElementById(id_balao).src =
    "imagens/balao_azul_pequeno_estourado.png";

  pontuacao(-1);
}

function pontuacao(acao) {
  var balao_nao_estourado = document.getElementById(
    "balao-nao-estourado"
  ).innerHTML;

  var balao_estourado = document.getElementById("balao-estourado").innerHTML;

  balao_nao_estourado = parseInt(balao_nao_estourado);
  balao_estourado = parseInt(balao_estourado);

  balao_nao_estourado = balao_nao_estourado + acao;
  balao_estourado = balao_estourado - acao;

  document.getElementById("balao-nao-estourado").innerHTML =
    balao_nao_estourado;
  document.getElementById("balao-estourado").innerHTML = balao_estourado;

  status_jogo(balao_nao_estourado);
}

function status_jogo(balao_nao_estourado) {
  if (balao_nao_estourado == 0) {
    alert("PARABÉNS VOCÊ ESTOROU TODOS BALÕES ANTES DO TEMPO!");
    parar_jogo();
  }
}

function parar_jogo() {
  clearTimeout(timeId);
}
