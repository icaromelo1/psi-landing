export type IdTema = 'c1' | 'c2' | 'c3' | 'c4' | 'c5' | 'e1' | 'e2' | 'e3' | 'e4' | 'e5';

export const parDeTemas: { claro: IdTema; escuro: IdTema } = {
  claro: 'c5',
  escuro: 'e4',
};

export const identidade = {
  nome: 'Nome Sobrenome',
  titulo: 'Psicólogo',
  crp: 'CRP 00/000000',
  formacao: 'Graduação em Psicologia — Instituição',
  especializacoes: [
    'Formação em Terapia Cognitivo-Comportamental',
    'Formação em Terapia do Esquema',
  ],
};

export const contatos = {
  whatsapp: {
    numero: '5500000000000',
    mensagem: 'Olá! Vim pelo site e gostaria de saber mais sobre os atendimentos.',
  },
  instagram: 'https://instagram.com/usuario',
  email: 'contato@exemplo.com.br',
};

export const atendimento = {
  duracaoSessao: '50 minutos',
  plataforma: 'Google Meet',
  faixaEtaria: 'dos 12 aos 60 anos',
  prazoResposta: '24 horas',
};

export function linkWhatsapp(): string {
  const texto = encodeURIComponent(contatos.whatsapp.mensagem);
  return `https://wa.me/${contatos.whatsapp.numero}?text=${texto}`;
}
