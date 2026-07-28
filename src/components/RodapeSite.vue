<template>
  <footer class="rodape">
    <div class="rodape__interno">
      <div>
        <p class="rodape__nome">{{ identidade.nome }}</p>
        <p class="rodape__crp">{{ identidade.titulo }} · {{ identidade.crp }}</p>
      </div>

      <nav class="rodape__contatos" aria-label="Formas de contato">
        <a :href="link">{{ rotulos.whatsapp }}</a>
        <a :href="contatos.instagram" target="_blank" rel="noopener">{{ rotulos.instagram }}</a>
        <a :href="`mailto:${contatos.email}`">{{ contatos.email }}</a>
      </nav>
    </div>

    <p class="rodape__aviso">
      Este site é informativo e não substitui atendimento psicológico ou médico. Em caso de crise,
      ligue para o CVV no 188, 24 horas por dia, ou procure o pronto-socorro mais próximo.
    </p>
  </footer>
</template>

<script setup lang="ts">
import { contatos, identidade, linkWhatsapp } from 'src/configuracaoSite';
import { rotulos } from 'src/conteudo';

const link = linkWhatsapp();
</script>

<style scoped>
.rodape {
  border-top: var(--border-width) solid var(--border);
  padding: var(--s-7) 0 var(--s-8);
  margin-top: var(--s-8);
}

.rodape__interno {
  display: flex;
  justify-content: space-between;
  gap: var(--s-6);
  flex-wrap: wrap;
}

.rodape__nome {
  font-family: var(--font-display);
  font-weight: var(--display-weight);
  letter-spacing: var(--display-tracking);
  font-size: calc(1rem * var(--display-scale));
}

.rodape__crp {
  font-size: 0.88rem;
  color: var(--ink-soft);
  margin-top: var(--s-1);
}

.rodape__contatos {
  display: flex;
  gap: var(--s-5);
  flex-wrap: wrap;
  font-size: 0.92rem;
  font-weight: 700;
}

.rodape__contatos a {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
}

.rodape__aviso {
  margin-top: var(--s-6);
  padding-top: var(--s-5);
  border-top: 1px solid var(--border);
  font-size: 0.85rem;
  color: var(--ink-soft);
  max-width: var(--largura-leitura);
}
</style>
