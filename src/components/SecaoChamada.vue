<template>
  <section class="chamada">
    <TituloDestacado :texto="titulo" />
    <p class="chamada__descricao">{{ descricao }}</p>

    <div class="chamada__acoes">
      <BotaoWhatsapp />
      <span class="chamada__alternativos">
        <a :href="contatos.instagram" target="_blank" rel="noopener">{{ rotulos.instagram }}</a>
        <a :href="`mailto:${contatos.email}`">{{ rotulos.email }}</a>
      </span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BotaoWhatsapp from 'src/components/BotaoWhatsapp.vue';
import TituloDestacado from 'src/components/TituloDestacado.vue';
import { usePreferenciasLeitura } from 'src/composables/usePreferenciasLeitura';
import { contatos } from 'src/configuracaoSite';
import { chamada, escolherTexto, rotulos } from 'src/conteudo';

const { linguagem } = usePreferenciasLeitura();

const titulo = computed(() => escolherTexto(chamada.titulo, linguagem.value));
const descricao = computed(() => escolherTexto(chamada.descricao, linguagem.value));
</script>

<style scoped>
.chamada {
  background: var(--surface);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: var(--s-8) var(--s-6);
  text-align: center;
}

.chamada__descricao {
  color: var(--ink-soft);
  margin: var(--s-3) auto var(--s-6);
  max-width: 46ch;
}

.chamada__acoes {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--s-6);
  flex-wrap: wrap;
}

.chamada__alternativos {
  display: flex;
  gap: var(--s-4);
  font-weight: 700;
  font-size: 0.95rem;
}

.chamada__alternativos a {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 var(--s-1);
}
</style>
