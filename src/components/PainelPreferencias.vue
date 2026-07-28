<template>
  <div class="preferencias">
    <button
      ref="botaoAbrir"
      class="preferencias__gatilho"
      :aria-expanded="aberto"
      aria-controls="painel-preferencias"
      @click="alternar"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" class="preferencias__icone">
        <path d="M4 7h4m4 0h8M4 12h10m4 0h2M4 17h6m4 0h6" />
        <circle cx="10" cy="7" r="2.4" />
        <circle cx="16" cy="12" r="2.4" />
        <circle cx="12" cy="17" r="2.4" />
      </svg>
      {{ rotulos.preferencias }}
    </button>

    <div
      v-show="aberto"
      id="painel-preferencias"
      ref="painel"
      class="preferencias__painel"
      role="group"
      :aria-label="rotulos.preferencias"
      @keydown.esc="fechar"
    >
      <fieldset>
        <legend>{{ rotulos.tamanhoTexto }}</legend>
        <div class="preferencias__opcoes">
          <button
            v-for="opcao in tamanhos"
            :key="opcao.valor"
            :class="{ ativo: tamanhoTexto === opcao.valor }"
            :aria-pressed="tamanhoTexto === opcao.valor"
            @click="tamanhoTexto = opcao.valor"
          >
            {{ opcao.rotulo }}
          </button>
        </div>
      </fieldset>

      <fieldset>
        <legend>{{ rotulos.tema }}</legend>
        <div class="preferencias__opcoes">
          <button
            v-for="opcao in modos"
            :key="opcao.valor"
            :class="{ ativo: modo === opcao.valor }"
            :aria-pressed="modo === opcao.valor"
            @click="modo = opcao.valor"
          >
            {{ opcao.rotulo }}
          </button>
        </div>
      </fieldset>

      <fieldset>
        <legend>{{ rotulos.linguagem }}</legend>
        <div class="preferencias__opcoes">
          <button
            :class="{ ativo: linguagem === 'padrao' }"
            :aria-pressed="linguagem === 'padrao'"
            @click="linguagem = 'padrao'"
          >
            Padrão
          </button>
          <button
            :class="{ ativo: linguagem === 'simples' }"
            :aria-pressed="linguagem === 'simples'"
            @click="linguagem = 'simples'"
          >
            Simples
          </button>
        </div>
      </fieldset>

      <label class="preferencias__interruptor">
        <input v-model="fonteLegivel" type="checkbox" />
        {{ rotulos.fonteLegivel }}
      </label>

      <label class="preferencias__interruptor">
        <input v-model="animacoes" type="checkbox" />
        {{ rotulos.animacoes }}
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';
import {
  usePreferenciasLeitura,
  type Modo,
  type TamanhoTexto,
} from 'src/composables/usePreferenciasLeitura';
import { rotulos } from 'src/conteudo';

const { modo, tamanhoTexto, animacoes, linguagem, fonteLegivel } = usePreferenciasLeitura();

const aberto = ref(false);
const botaoAbrir = ref<HTMLButtonElement>();
const painel = ref<HTMLDivElement>();

const tamanhos: Array<{ valor: TamanhoTexto; rotulo: string }> = [
  { valor: 'pequeno', rotulo: 'A−' },
  { valor: 'normal', rotulo: 'A' },
  { valor: 'grande', rotulo: 'A+' },
];

const modos: Array<{ valor: Modo; rotulo: string }> = [
  { valor: 'claro', rotulo: 'Claro' },
  { valor: 'escuro', rotulo: 'Escuro' },
  { valor: 'automatico', rotulo: 'Automático' },
];

async function alternar() {
  aberto.value = !aberto.value;
  if (!aberto.value) return;
  await nextTick();
  painel.value?.querySelector('button')?.focus();
}

function fechar() {
  aberto.value = false;
  botaoAbrir.value?.focus();
}
</script>

<style scoped>
.preferencias {
  position: fixed;
  right: var(--s-4);
  bottom: var(--s-4);
  z-index: 30;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--s-3);
}

.preferencias__gatilho {
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
  min-height: 48px;
  padding: var(--s-3) var(--s-4);
  background: var(--surface);
  color: var(--ink);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  font-size: 0.88rem;
  font-weight: 700;
}

.preferencias__icone {
  width: 20px;
  height: 20px;
  flex: none;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
}

.preferencias__painel {
  order: -1;
  width: min(300px, calc(100vw - var(--s-7)));
  background: var(--surface);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: var(--s-5);
  display: grid;
  gap: var(--s-4);
}

.preferencias__painel fieldset {
  border: none;
}

.preferencias__painel legend {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--ink-soft);
  margin-bottom: var(--s-2);
}

.preferencias__opcoes {
  display: flex;
  gap: var(--s-2);
  flex-wrap: wrap;
}

.preferencias__opcoes button {
  flex: 1;
  min-width: 64px;
  min-height: 44px;
  padding: var(--s-2) var(--s-3);
  background: transparent;
  color: var(--ink);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius);
  font-size: 0.88rem;
  font-weight: 700;
}

.preferencias__opcoes button.ativo {
  background: var(--accent);
  color: var(--accent-ink);
}

.preferencias__interruptor {
  display: flex;
  align-items: center;
  gap: var(--s-3);
  font-size: 0.9rem;
  min-height: 44px;
  cursor: pointer;
}

.preferencias__interruptor input {
  width: 24px;
  height: 24px;
  accent-color: var(--primary);
  cursor: pointer;
}

@media (max-width: 560px) {
  .preferencias__gatilho span {
    display: none;
  }
}
</style>
