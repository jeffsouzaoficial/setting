// ===== Setting — Versão 1: as fichas dos pacientes =====

// PASSO 1: as fichas (objetos)
const anna = {
  nome: "Anna Karenina",
  whatsapp: "5531998974563",
  dia: "segunda",
  horario: "10:00",
  duracao: 50,
  valor: 150,
  ativo: true
};

const sherlock = {
  nome: "Sherlock Holmes",
  whatsapp: "5545991556784",
  dia: "terça",
  horario: "15:00",
  duracao: 50,
  valor: 150,
  ativo: true
};

const machado = {
  nome: "Machado de Assis",
  whatsapp: "5541988743212",
  dia: "quarta",
  horario: "08:00",
  duracao: 50,
  valor: 150,
  ativo: true
};

const lima = {
  nome: "Lima Barreto",
  whatsapp: "5598987456542",
  dia: "quinta",
  horario: "17:00",
  duracao: 50,
  valor: 150,
  ativo: true
};

const dom = {
  nome: "Dom Casmurro",
  whatsapp: "5538997121454",
  dia: "sexta",
  horario: "14:00",
  duracao: 50,
  valor: 150,
  ativo: false
};

// PASSO 2: o fichário (array de objetos)
const pacientes = [anna, sherlock, machado, lima, dom];

// PASSO 3: folhear o fichário e mostrar a agenda
console.log("📅 AGENDA DA SEMANA");
console.log("Pacientes: " + pacientes.length);

let faturamentoSemanal = 0;

//"para cada paciente de pacientes, faça o que está entre as chaves".
for (const paciente of pacientes) {
  const linkWhats = "https://wa.me/" + paciente.whatsapp;

  console.log(paciente.dia + " às " + paciente.horario + " — " + paciente.nome);
  console.log("   WhatsApp: " + linkWhats);

  faturamentoSemanal = faturamentoSemanal + paciente.valor;
}

// PASSO 4: o resultado do acumulador
console.log("💰 Faturamento semanal: R$ " + faturamentoSemanal.toFixed(2));

