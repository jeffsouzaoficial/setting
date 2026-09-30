// ===== Setting — Versão 2: a agenda na tela =====

// PARTE 1: o fichário, com as fichas escritas direto dentro dele
const pacientes = [
  { nome: "Anna Karenina", whatsapp: "5531998974563", dia: "segunda", horario: "10:00", duracao: 50, valor: 150, ativo: true },
  { nome: "Sherlock Holmes", whatsapp: "5545991556784", dia: "terça", horario: "15:00", duracao: 50, valor: 150, ativo: true },
  { nome: "Machado de Assis", whatsapp: "5541988743212", dia: "quarta", horario: "08:00", duracao: 50, valor: 150, ativo: true },
  { nome: "Lima Barreto", whatsapp: "5598987456542", dia: "quinta", horario: "17:00", duracao: 50, valor: 150, ativo: true },
  { nome: "Dom Casmurro", whatsapp: "5538997121454", dia: "sexta", horario: "14:00", duracao: 50, valor: 150, ativo: true }
];

// PARTE 2: os elementos da tela, guardados uma vez só
const seletorDia = document.querySelector("#filtro-dia");
const listaAgenda = document.querySelector("#agenda");
const textoFaturamento = document.querySelector("#faturamento");
const textoMinutos = document.querySelector("#minutos");
const textoPacientes = document.querySelector("#total-pacientes");

const campoNome = document.querySelector("#campo-nome");
const campoWhatsapp = document.querySelector("#campo-whatsapp");
const campoDia = document.querySelector("#campo-dia");
const campoHorario = document.querySelector("#campo-horario");
const campoValor = document.querySelector("#campo-valor");
const botaoCadastrar = document.querySelector("#botao-cadastrar");


// PARTE 3: a triagem — só os pacientes ativos
let ativos = [];

// PARTE 4: máquina que devolve os pacientes de um dia
function pacientesDoDia(dia) {
  if (dia === "todos") {
    return ativos;
  }

  return ativos.filter(function (paciente) {
    return paciente.dia === dia;
  });
}

// PARTE 5: máquina que mostra uma lista de pacientes na tela
function mostrarAgenda(lista) {
  if (lista.length === 0) {
    listaAgenda.innerHTML = "<li>Nenhum paciente neste dia.</li>";
    return;
  }

  const itens = lista.map(function (paciente) {
    const link = "https://wa.me/" + paciente.whatsapp;
    return "<li>" + paciente.dia + " às " + paciente.horario + " — " + paciente.nome +
      ' <a href="' + link + '" target="_blank">WhatsApp</a></li>';
  });

  listaAgenda.innerHTML = itens.join("");
}

// PARTE 6: o resumo da semana
function atualizarTela() {
  ativos = pacientes.filter(function (paciente){
    return paciente.ativo === true;
  });

const faturamento = ativos.reduce(function (soma, paciente) {
  return soma + paciente.valor;
}, 0);

const minutos = ativos.reduce(function (soma, paciente) {
  return soma + paciente.duracao;
}, 0);

mostrarAgenda(pacientesDoDia(seletorDia.value));


textoFaturamento.textContent = "💰 Faturamento semanal: R$ " + faturamento.toFixed(2);

textoMinutos.textContent = "⏱️ Tempo de atendimento: " + minutos + " minutos por semana";

textoPacientes.textContent = "👥 Pacientes ativos: " + ativos.length;

}
// PARTE 7: quando o usuário escolhe um dia, a agenda muda
seletorDia.addEventListener("change", function () {
  const lista = pacientesDoDia(seletorDia.value);
  mostrarAgenda(lista);
});

// PARTE 8: ao abrir a página, mostra a semana inteira
atualizarTela();


// PARTE 9: cadastrar um paciente novo
botaoCadastrar.addEventListener("click", function () {
  const novoPaciente = {
    nome: campoNome.value,
    whatsapp: campoWhatsapp.value,
    dia: campoDia.value,
    horario: campoHorario.value,
    duracao: 50,
    valor: Number(campoValor.value),
    ativo: true
  };

  pacientes.push(novoPaciente);
  atualizarTela();
});