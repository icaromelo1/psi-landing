<template>
  <section class="inicio">
    <div class="inicio__texto">
      <p class="sobrancelha">{{ inicio.sobrancelha }}</p>

      <TituloDestacado nivel="h1" :texto="titulo" class="inicio__titulo" />

      <p class="inicio__descricao">{{ descricao }}</p>

      <ul class="inicio__publicos">
        <li v-for="publico in inicio.publicos" :key="publico">{{ publico }}</li>
      </ul>

      <div class="inicio__acoes">
        <BotaoWhatsapp />
        <span class="inicio__alternativos">
          <a :href="contatos.instagram" target="_blank" rel="noopener">{{ rotulos.instagram }}</a>
          <a :href="`mailto:${contatos.email}`">{{ rotulos.email }}</a>
        </span>
      </div>

      <p class="inicio__credencial">
        {{ identidade.nome }} · {{ identidade.titulo }} · {{ identidade.crp }}
      </p>
    </div>

    <IlustracaoMapa class="inicio__ilustracao" />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BotaoWhatsapp from 'src/components/BotaoWhatsapp.vue';
import IlustracaoMapa from 'src/components/IlustracaoMapa.vue';
import TituloDestacado from 'src/components/TituloDestacado.vue';
import { usePreferenciasLeitura } from 'src/composables/usePreferenciasLeitura';
import { contatos, identidade } from 'src/configuracaoSite';
import { escolherTexto, inicio, rotulos } from 'src/conteudo';

const { linguagem } = usePreferenciasLeitura();

const titulo = computed(() => escolherTexto(inicio.titulo, linguagem.value));
const descricao = computed(() => escolherTexto(inicio.descricao, linguagem.value));
</script>

<style scoped>
.inicio {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
  gap: var(--s-7);
  align-items: center;
  padding: var(--s-9) 0;
}

.inicio__titulo {
  max-width: 20ch;
  margin: var(--s-3) 0 var(--s-4);
}

.sobrancelha {
  font-family: var(--font-eyebrow);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--primary);
}

.inicio__descricao {
  font-size: 1.08rem;
  color: var(--ink-soft);
  max-width: 52ch;
  margin-bottom: var(--s-5);
}

.inicio__publicos {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-2);
  list-style: none;
  margin-bottom: var(--s-6);
}

.inicio__publicos li {
  font-size: 0.84rem;
  font-weight: 700;
  color: var(--primary);
  border: var(--border-width) solid var(--primary);
  border-radius: var(--radius);
  padding: var(--s-1) var(--s-3);
}

.inicio__acoes {
  display: flex;
  align-items: center;
  gap: var(--s-6);
  flex-wrap: wrap;
}

.inicio__alternativos {
  display: flex;
  gap: var(--s-4);
  font-weight: 700;
  font-size: 0.95rem;
}

.inicio__alternativos a {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 var(--s-1);
}

.inicio__credencial {
  margin-top: var(--s-6);
  font-size: 0.85rem;
  color: var(--ink-soft);
}

.inicio__ilustracao {
  width: 100%;
  max-width: 340px;
  justify-self: center;
}

@media (max-width: 780px) {
  .inicio {
    grid-template-columns: 1fr;
    padding: var(--s-7) 0;
  }

  .inicio__ilustracao {
    grid-row: 1;
    max-width: 220px;
  }
}
</style>
