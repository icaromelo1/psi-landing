<template>
  <component :is="nivel">
    {{ partes.antes }}<span v-if="partes.destaque" class="destaque">{{ partes.destaque }}</span
    >{{ partes.depois }}
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{ texto: string; nivel?: 'h1' | 'h2' }>(), {
  nivel: 'h2',
});

const partes = computed(() => {
  const encontrado = props.texto.match(/^(.*?)\{(.+?)\}(.*)$/s);
  if (!encontrado) return { antes: props.texto, destaque: '', depois: '' };
  return { antes: encontrado[1], destaque: encontrado[2], depois: encontrado[3] };
});
</script>

<style scoped>
.destaque {
  background-image: var(--rainbow);
  background-repeat: no-repeat;
  background-size: 100% 4px;
  background-position: 0 100%;
  padding-bottom: 5px;
  white-space: nowrap;
}
</style>
