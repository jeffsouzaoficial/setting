


const ativos = pacientes.filter(function (paciente){
  return paciente.ativo === true;
});

console.log(ativos);

const pacienteDeTerca = pacientes.filter(function (pacienteTerca){
  return pacienteTerca.dia === "terça";
});

console.log(pacienteDeTerca);


//--------------

const frases = pacientes.map(function (paciente) {
  return paciente.dia + "às" + paciente.horario + "—" + paciente.nome;
});

console.log(frases);

const links = pacientes.map(function (paciente) {
  return "https://wa.me/" + paciente.whatsapp;
});

console.log(links);


//-------

const total = pacientes.reduce(function (soma, paciente) {
  return soma + paciente.valor
}, 0);

console.log(total);


const duracaoTempo = pacientes.reduce(function(soma, paciente) {
  return soma + paciente.duracao
}, 0);

console.log(duracaoTempo);



const ativos = pacientes.filter(function (paciente) {
  return paciente.ativo === true;
});

console.log(ativos);

const total = ativos.reduce(function (soma, paciente) {
  return soma + paciente.valor
}, 0);

console.log(total);