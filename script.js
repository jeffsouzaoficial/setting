// ===== Setting — Versão 4: a agenda na tela =====

// PARTE 1: o fichário, com as fichas escritas direto dentro dele
const pacientesIniciais = [
  { nome: "Anna Karenina", whatsapp: "5531998974563", dia: "segunda", horario: "10:00", duracao: 50, valor: 150, ativo: true },
  { nome: "Sherlock Holmes", whatsapp: "5545991556784", dia: "terça", horario: "15:00", duracao: 50, valor: 150, ativo: true },
  { nome: "Machado de Assis", whatsapp: "5541988743212", dia: "quarta", horario: "08:00", duracao: 50, valor: 150, ativo: true },
  { nome: "Lima Barreto", whatsapp: "5598987456542", dia: "quinta", horario: "17:00", duracao: 50, valor: 150, ativo: true },
  { nome: "Dom Casmurro", whatsapp: "5538997121454", dia: "sexta", horario: "14:00", duracao: 50, valor: 150, ativo: true }
];

let pacientes = pacientesIniciais;

const pacientesSalvos = localStorage.getItem("pacientes");
//se houver um fichário guardado no cofre, use-o.
if (pacientesSalvos !== null) {
  pacientes = JSON.parse(pacientesSalvos);
}

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

const listaFeriados = document.querySelector('#lista-feriados');

// PARTE 3: 
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

// PARTE 6: máquina que atualiza a tela inteira
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

  const ocupado = ativos.some(function (paciente) {
    return paciente.dia === novoPaciente.dia && paciente.horario === novoPaciente.horario;
  });

  if (ocupado) {
    alert("Esse horário já está ocupado.");
    return;
  }

  pacientes.push(novoPaciente);
  salvarPacientes();
  atualizarTela();
});

// PARTE 10: guarda o fichário no cofre
//"pego o fichário, transformo em texto e guardo no cofre, na gaveta chamada pacientes."
function salvarPacientes() {
  localStorage.setItem("pacientes", JSON.stringify(pacientes));
}

// PARTE 12: máquina que transforma "2026-01-01" em "01/01/2026"
function formatarData(dataAmericana) {
  const partes = dataAmericana.split("-");
  return partes[2] + "/" + partes[1] + "/" + partes[0];
}

// PARTE 13: máquina que descobre o dia da semana de uma data
const diasDaSemana = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

function diaDaSemana(dataAmericana) {
  const data = new Date(dataAmericana + "T12:00:00");
  const numero = data.getDay();
  return diasDaSemana[numero];
}


// PARTE 11: buscar os feriados na internet
//async na frente, avisando: "esta máquina vai esperar coisas".
async function buscarFeriados() {
  //O await faz o JavaScript esperar a resposta chegar.
  const resposta = await fetch("https://brasilapi.com.br/api/feriados/v1/2026");
  const feriados = await resposta.json();
  const itens = feriados.map(function (feriado) {
    return "<li>" + formatarData(feriado.date) + " (" + diaDaSemana(feriado.date) + ") — " + feriado.name + "</li>";
  });

  listaFeriados.innerHTML = itens.join("");
}

buscarFeriados();