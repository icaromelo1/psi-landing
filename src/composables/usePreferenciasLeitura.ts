import { ref, watchEffect } from 'vue';
import { parDeTemas } from 'src/configuracaoSite';
import type { Linguagem } from 'src/conteudo';

export type Modo = 'claro' | 'escuro' | 'automatico';
export type TamanhoTexto = 'pequeno' | 'normal' | 'grande';

const CHAVE = 'preferencias-leitura';
const ESCALAS: Record<TamanhoTexto, string> = {
  pequeno: '0.9',
  normal: '1',
  grande: '1.18',
};

interface PreferenciasSalvas {
  modo: Modo;
  tamanhoTexto: TamanhoTexto;
  animacoes: boolean;
  linguagem: Linguagem;
  fonteLegivel: boolean;
}

function prefereEscuro(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function prefereMenosMovimento(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function ler(): Partial<PreferenciasSalvas> {
  try {
    return JSON.parse(localStorage.getItem(CHAVE) ?? '{}') as Partial<PreferenciasSalvas>;
  } catch {
    return {};
  }
}

const salvas = typeof window === 'undefined' ? {} : ler();

const modo = ref<Modo>(salvas.modo ?? 'automatico');
const tamanhoTexto = ref<TamanhoTexto>(salvas.tamanhoTexto ?? 'normal');
const animacoes = ref<boolean>(salvas.animacoes ?? !prefereMenosMovimento());
const linguagem = ref<Linguagem>(salvas.linguagem ?? 'padrao');
const fonteLegivel = ref<boolean>(salvas.fonteLegivel ?? false);

const escuroDoSistema = ref(typeof window === 'undefined' ? false : prefereEscuro());

if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (evento) => {
    escuroDoSistema.value = evento.matches;
  });

  watchEffect(() => {
    const escuroAtivo = modo.value === 'escuro' || (modo.value === 'automatico' && escuroDoSistema.value);
    const raiz = document.documentElement;

    raiz.dataset.theme = escuroAtivo ? parDeTemas.escuro : parDeTemas.claro;
    raiz.dataset.fonteLegivel = fonteLegivel.value ? 'sim' : 'nao';
    raiz.dataset.animacoes = animacoes.value ? 'sim' : 'nao';
    raiz.style.setProperty('--escala-texto', ESCALAS[tamanhoTexto.value]);

    localStorage.setItem(
      CHAVE,
      JSON.stringify({
        modo: modo.value,
        tamanhoTexto: tamanhoTexto.value,
        animacoes: animacoes.value,
        linguagem: linguagem.value,
        fonteLegivel: fonteLegivel.value,
      } satisfies PreferenciasSalvas),
    );
  });
}

export function usePreferenciasLeitura() {
  return { modo, tamanhoTexto, animacoes, linguagem, fonteLegivel };
}
