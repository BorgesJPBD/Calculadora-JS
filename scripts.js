// pega os elementos da página
const tela = document.getElementById('tela');
const teclas = document.querySelector('.teclas');
const btnIgual = document.getElementById('igual');
const btnLimpar = document.getElementById('limpar');

// guardamos a expressão como texto, ex: "12+3*4"
let expressao = "";

// quando clicar em qualquer botão com data-valor, adiciona na expressão
teclas.addEventListener('click', (e) => {
  const botao = e.target;
  const valor = botao.getAttribute('data-valor');
  if (!valor) return; // ignorar cliques em C e =

  expressao += valor;
  tela.value = expressao;
});

// limpar tudo (C)
btnLimpar.addEventListener('click', () => {
  expressao = "";
  tela.value = "";
});

// calcular (=)
btnIgual.addEventListener('click', () => {
  try {
    // eval é a forma mais simples para começar (apenas para estudos locais)
    const resultado = eval(expressao || "0");
    tela.value = resultado;
    expressao = String(resultado);
  } catch (err) {
    tela.value = "Erro";
    expressao = "";
  }
});
