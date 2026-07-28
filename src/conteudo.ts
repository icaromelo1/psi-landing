import { atendimento, identidade } from 'src/configuracaoSite';

export type Linguagem = 'padrao' | 'simples';
export type TextoVariavel = string | { padrao: string; simples: string };

export function escolherTexto(texto: TextoVariavel, linguagem: Linguagem): string {
  return typeof texto === 'string' ? texto : texto[linguagem];
}

export const navegacao = [
  { rotulo: 'Para quem é', ancora: '#publicos' },
  { rotulo: 'Como funciona', ancora: '#como-funciona' },
  { rotulo: 'Sobre mim', ancora: '#sobre' },
  { rotulo: 'Responsáveis', ancora: '#responsaveis' },
  { rotulo: 'Dúvidas', ancora: '#duvidas' },
];

export const inicio = {
  sobrancelha: 'Psicoterapia online · TCC e Terapia do Esquema',
  titulo: {
    padrao: 'Até quem salva o mundo precisa de {apoio}.',
    simples: 'Terapia online para quem precisa de {apoio}.',
  } satisfies TextoVariavel,
  descricao: {
    padrao: `Terapia direta, sem enrolação, para pessoas LGBT+, neurodivergentes, com deficiência e fãs de cultura pop. Atendimento ${atendimento.faixaEtaria}.`,
    simples: `Atendimento online de psicologia. Para pessoas LGBT+, neurodivergentes, com deficiência e fãs de cultura pop. ${atendimento.faixaEtaria}.`,
  } satisfies TextoVariavel,
  publicos: ['LGBT+', 'Neurodivergências', 'PCD', 'Cultura pop'],
};

export const publicos = {
  titulo: 'Para quem é',
  introducao: {
    padrao:
      'Nenhum desses grupos é um nicho de marketing aqui. São pessoas cuja experiência eu estudo, respeito e não trato como problema a ser corrigido.',
    simples: 'Estas são as pessoas que eu atendo. Você não precisa se explicar comigo.',
  } satisfies TextoVariavel,
  itens: [
    {
      nome: 'Pessoas LGBT+',
      texto: {
        padrao:
          'Você não vai gastar sessão explicando o básico sobre identidade de gênero ou orientação sexual, nem se defender de julgamento.',
        simples:
          'Eu já entendo sobre identidade de gênero e orientação sexual. Você não precisa explicar. Eu não julgo.',
      } satisfies TextoVariavel,
    },
    {
      nome: 'Pessoas neurodivergentes',
      texto: {
        padrao:
          'Sessões previsíveis, comunicação direta e espaço para stims. Autismo, TDAH e afins não são o problema a ser tratado.',
        simples:
          'As sessões seguem sempre a mesma estrutura. Eu falo de forma direta. Você pode se mexer como precisar.',
      } satisfies TextoVariavel,
    },
    {
      nome: 'Pessoas com deficiência',
      texto: {
        padrao:
          'Combinamos os ajustes de que você precisa antes da primeira sessão: legendas, ritmo, pausas, formato do material.',
        simples:
          'Antes da primeira sessão, você me diz do que precisa: legendas, pausas, mais tempo. A gente combina.',
      } satisfies TextoVariavel,
    },
    {
      nome: 'Fãs de cultura pop',
      texto: {
        padrao:
          'Games, animes, RPG e quadrinhos entram na conversa quando ajudam a nomear o que você sente. Não é distração.',
        simples:
          'Você pode falar de jogos, animes e histórias que gosta. Isso ajuda a explicar o que você sente.',
      } satisfies TextoVariavel,
    },
  ],
};

export const comoFunciona = {
  titulo: 'Como funciona',
  abordagens: [
    {
      nome: 'Terapia Cognitivo-Comportamental (TCC)',
      texto: {
        padrao:
          'Investiga a ligação entre o que você pensa, sente e faz. O trabalho é prático: identificar padrões que atrapalham e testar formas diferentes de responder a eles.',
        simples:
          'A TCC estuda como seus pensamentos afetam o que você sente e faz. Você aprende a perceber pensamentos que atrapalham e a reagir de outro jeito.',
      } satisfies TextoVariavel,
    },
    {
      nome: 'Terapia do Esquema',
      texto: {
        padrao:
          'Vai à raiz: os padrões formados na infância e adolescência que ainda hoje moldam como você se vê e se relaciona. Útil quando a mesma dor se repete há anos.',
        simples:
          'A Terapia do Esquema olha para coisas que aconteceram na sua infância. Ela ajuda quando o mesmo problema se repete há muito tempo.',
      } satisfies TextoVariavel,
    },
  ],
  tituloEtapas: 'A primeira sessão, passo a passo',
  etapas: [
    {
      nome: 'Você manda uma mensagem',
      texto: {
        padrao: `Conta em poucas linhas o que está buscando. Respondo em até ${atendimento.prazoResposta} com os horários livres e o valor da sessão.`,
        simples: `Escreva para mim o que você procura. Eu respondo em até ${atendimento.prazoResposta}. Envio os horários e o preço.`,
      } satisfies TextoVariavel,
    },
    {
      nome: 'Conversamos por vídeo',
      texto: {
        padrao: `${atendimento.duracaoSessao} pelo ${atendimento.plataforma}. Você recebe o link no dia anterior e não precisa instalar nada.`,
        simples: `A conversa dura ${atendimento.duracaoSessao} e acontece pelo ${atendimento.plataforma}. Eu envio o link um dia antes. Você não precisa instalar programa.`,
      } satisfies TextoVariavel,
    },
    {
      nome: 'Você decide o próximo passo',
      texto: {
        padrao:
          'No fim eu explico como seria a continuidade. Você responde depois, com calma, sem compromisso de seguir.',
        simples:
          'No fim eu explico como seria continuar. Você não precisa decidir na hora. Pode dizer não.',
      } satisfies TextoVariavel,
    },
  ],
};

export const sobre = {
  titulo: 'Sobre mim',
  paragrafos: [
    {
      padrao: `Sou ${identidade.nome}, psicólogo inscrito no ${identidade.crp}. Atendo online, com TCC e Terapia do Esquema.`,
      simples: `Meu nome é ${identidade.nome}. Sou psicólogo, registro ${identidade.crp}. Atendo pela internet.`,
    } satisfies TextoVariavel,
    {
      padrao:
        'Escolhi atender estes públicos porque conheço de perto o desgaste de precisar traduzir a própria vida antes de conseguir falar do que dói. Aqui essa parte já está resolvida.',
      simples:
        'Eu atendo estas pessoas porque sei que é cansativo ter que explicar sua vida antes de falar do seu problema. Comigo você não precisa fazer isso.',
    } satisfies TextoVariavel,
  ],
  credenciaisTitulo: 'Formação',
};

export const responsaveis = {
  titulo: 'Para pais e responsáveis',
  paragrafos: [
    {
      padrao:
        'Adolescentes a partir de 12 anos são atendidos com o consentimento de quem é responsável por eles. O primeiro contato costuma ser de vocês.',
      simples:
        'Eu atendo adolescentes a partir de 12 anos. O responsável precisa autorizar. Em geral o responsável fala comigo primeiro.',
    } satisfies TextoVariavel,
    {
      padrao:
        'O conteúdo das sessões é sigiloso, inclusive de vocês. É essa garantia que faz o adolescente falar de verdade. As exceções são as previstas em lei: risco à vida dele ou de outra pessoa. Nesses casos vocês são informados.',
      simples:
        'O que o adolescente fala na sessão é segredo. Eu não conto para vocês. Só aviso vocês se houver risco de vida para ele ou para outra pessoa. Isso é regra da profissão.',
    } satisfies TextoVariavel,
    {
      padrao:
        'Combinamos encontros periódicos de devolutiva, em que falo sobre o processo e o que vocês podem fazer em casa, sem expor o que foi dito em sessão.',
      simples:
        'De vez em quando eu converso com vocês. Eu falo como está indo o tratamento e o que vocês podem fazer em casa. Eu não repito o que foi dito na sessão.',
    } satisfies TextoVariavel,
  ],
};

export const politicas = {
  titulo: 'Combinados do atendimento',
  introducao: {
    padrao: 'Tudo o que costuma gerar dúvida, dito antes de você perguntar.',
    simples: 'Estas são as regras. Elas valem para todo mundo.',
  } satisfies TextoVariavel,
  itens: [
    {
      nome: 'Remarcação',
      texto: 'Avisando com 24 horas de antecedência, remarcamos sem custo.',
    },
    {
      nome: 'Cancelamento',
      texto: 'Cancelamentos com menos de 24 horas são cobrados, salvo emergências.',
    },
    {
      nome: 'Atraso',
      texto: 'A sessão termina no horário previsto, mesmo que comece atrasada.',
    },
    {
      nome: 'Sigilo',
      texto:
        'Tudo o que você diz é sigiloso. As únicas exceções são as previstas no Código de Ética do Psicólogo.',
    },
    {
      nome: 'Plataforma',
      texto: `As sessões acontecem pelo ${atendimento.plataforma}, em link individual enviado antes de cada encontro.`,
    },
    {
      nome: 'Valor',
      texto: 'Combinado no primeiro contato, junto dos horários disponíveis.',
    },
  ],
};

export const duvidas = {
  titulo: 'Dúvidas frequentes',
  itens: [
    {
      pergunta: 'Preciso ter um diagnóstico para começar?',
      resposta: {
        padrao:
          'Não. Muita gente chega sem diagnóstico e sem saber nomear o que sente — descobrir isso já faz parte do trabalho.',
        simples: 'Não precisa. Muita gente começa sem saber o que tem. Nós descobrimos juntos.',
      } satisfies TextoVariavel,
    },
    {
      pergunta: 'E se eu travar e não souber o que falar?',
      resposta: {
        padrao:
          'Acontece bastante e não é problema. Quando o silêncio pesa, eu conduzo com perguntas.',
        simples: 'Tudo bem. Se você não souber o que dizer, eu faço perguntas para ajudar.',
      } satisfies TextoVariavel,
    },
    {
      pergunta: 'Terapia online funciona tanto quanto presencial?',
      resposta: {
        padrao:
          'Para a maior parte das demandas, sim — é uma modalidade reconhecida pelo Conselho Federal de Psicologia. Se eu avaliar que o seu caso pede outro formato ou outro profissional, eu digo com clareza.',
        simples:
          'Sim, na maioria dos casos. O Conselho Federal de Psicologia permite atendimento online. Se eu achar que você precisa de outro tipo de ajuda, eu falo.',
      } satisfies TextoVariavel,
    },
    {
      pergunta: 'Você atende por convênio ou plano de saúde?',
      resposta: {
        padrao:
          'O atendimento é particular. Emito recibo para você solicitar reembolso ao seu plano ou declarar no imposto de renda.',
        simples:
          'Não atendo por plano de saúde. Você paga direto. Eu envio recibo para você pedir reembolso.',
      } satisfies TextoVariavel,
    },
    {
      pergunta: 'Com que frequência são as sessões?',
      resposta: {
        padrao:
          'Em geral semanais, no mesmo horário. Combinamos outro ritmo se fizer mais sentido para o seu caso.',
        simples: 'Normalmente uma vez por semana, sempre no mesmo dia e horário.',
      } satisfies TextoVariavel,
    },
  ],
};

export const chamada = {
  titulo: {
    padrao: 'Vamos começar?',
    simples: 'Quer marcar uma sessão?',
  } satisfies TextoVariavel,
  descricao: {
    padrao: 'A primeira mensagem costuma ser a parte mais difícil. Depois dela, fica mais leve.',
    simples: 'Mande uma mensagem no WhatsApp. Eu respondo e explico como funciona.',
  } satisfies TextoVariavel,
};

export const rotulos = {
  whatsapp: 'Chamar no WhatsApp',
  instagram: 'Instagram',
  email: 'E-mail',
  pularParaConteudo: 'Pular para o conteúdo',
  preferencias: 'Preferências de leitura',
  fecharPreferencias: 'Fechar preferências',
  tamanhoTexto: 'Tamanho do texto',
  tema: 'Tema',
  animacoes: 'Animações',
  linguagem: 'Linguagem',
  fonteLegivel: 'Fonte de alta legibilidade',
};
