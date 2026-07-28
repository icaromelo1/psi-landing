<template>
  <section id="sobre" class="sobre">
    <div>
      <h2>{{ sobre.titulo }}</h2>

      <p v-for="(paragrafo, indice) in sobre.paragrafos" :key="indice" class="sobre__paragrafo">
        {{ escolherTexto(paragrafo, linguagem) }}
      </p>
    </div>

    <aside class="sobre__credenciais">
      <h3>{{ sobre.credenciaisTitulo }}</h3>
      <ul>
        <li>{{ identidade.formacao }}</li>
        <li v-for="especializacao in identidade.especializacoes" :key="especializacao">
          {{ especializacao }}
        </li>
        <li class="sobre__crp">{{ identidade.crp }}</li>
      </ul>
    </aside>
  </section>
</template>

<script setup lang="ts">
import { usePreferenciasLeitura } from 'src/composables/usePreferenciasLeitura';
import { identidade } from 'src/configuracaoSite';
import { escolherTexto, sobre } from 'src/conteudo';

const { linguagem } = usePreferenciasLeitura();
</script>

<style scoped>
.sobre {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: var(--s-7);
  align-items: start;
}

.sobre__paragrafo {
  margin-top: var(--s-4);
  max-width: var(--largura-leitura);
  color: var(--ink-soft);
}

.sobre__credenciais {
  background: var(--surface);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: var(--s-5);
}

.sobre__credenciais h3 {
  margin-bottom: var(--s-3);
}

.sobre__credenciais ul {
  list-style: none;
  display: grid;
  gap: var(--s-2);
  font-size: 0.94rem;
  color: var(--ink-soft);
}

.sobre__crp {
  font-weight: 700;
  color: var(--primary);
}

@media (max-width: 780px) {
  .sobre {
    grid-template-columns: 1fr;
  }
}
</style>
