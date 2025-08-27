const display = document.getElementById('display');
const teclas = document.getElementById('teclas');
const btnIgual = document.getElementById('igual');
const btnC = document.getElementById('limpar');
const btnAC = document.getElementById('limparTudo');
const btnBack = document.getElementById('backspace');

let primeiro = null, operador = null, aguardandoSegundo = false, atual = '0';

const mostrar = (s) => display.textContent = s.replace('.', ',');
const toNumber = (s) => Number(s.replace(',', '.'));


const inputDigito = (d) => {
  if (aguardandoSegundo){ atual='0'; aguardandoSegundo=false; }
  if (atual==='0' && d!==',') atual=d; else atual+=d;
  if (d===',' && (atual.match(/,/g)||[]).length>1) atual=atual.replace(/,$/,'');
  mostrar(atual);
};


const setOperador = (op) => {
  if (operador && !aguardandoSegundo){
    atual = calcular(primeiro, atual, operador);
    mostrar(atual);
  }
  primeiro = atual;
  operador = op;          
  aguardandoSegundo = true;
};


const calcular = (a,b,op) => {
  const x = toNumber(a), y = toNumber(b);
  let r = 0;
  switch(op){
    case '+': r = x + y; break;
    case '-': r = x - y; break;
    case '*': r = x * y; break;
    case '/': r = (y === 0) ? NaN : x / y; break;
    default:  r = y;
  }
  return String(parseFloat(Number(r).toPrecision(12))).replace('.',',');
};


const igual = () => {
  if (!operador || aguardandoSegundo) return;
  atual = calcular(primeiro, atual, operador);
  primeiro = null; operador = null; aguardandoSegundo = false;
  mostrar(atual);
};

const limparEntrada = () => { atual='0'; mostrar(atual); };
const limparTudo = () => { primeiro=null; operador=null; aguardandoSegundo=false; atual='0'; mostrar(atual); };
const backspace = () => { if(aguardandoSegundo) return; atual = (atual.length<=1)?'0':atual.slice(0,-1); mostrar(atual); };
const inverter = () => { if(atual==='0') return; atual = atual.startsWith('-')?atual.slice(1):'-'+atual; mostrar(atual); };


teclas.addEventListener('click',(e) => {
  const b = e.target.closest('button'); if(!b) return;
  if (b.dataset.val) inputDigito(b.dataset.val);      
  else if (b.dataset.op) setOperador(b.dataset.op);   
  else if (b.dataset.action === 'invert') inverter(); 
});
btnIgual.addEventListener('click', igual);
btnC.addEventListener('click', limparEntrada);
btnAC.addEventListener('click', limparTudo);
btnBack.addEventListener('click', backspace);


window.addEventListener('keydown',(e) => {
  const k=e.key;
  if(/^\d$/.test(k)) inputDigito(k);
  else if(k===','||k==='.') inputDigito(',');
  else if(k==='+') setOperador('+');
  else if(k==='-') setOperador('-');
  else if(k==='*') setOperador('*');
  else if(k==='/') setOperador('/');
  else if(k==='Enter'||k==='='){ e.preventDefault(); igual(); }
  else if(k==='Backspace') backspace();
  else if(k==='Escape') limparTudo();
});

mostrar('0');
