<template>
  <svg viewBox="0 0 300 250" role="img" :aria-label="descricao" class="mapa">
    <rect
      x="8"
      y="8"
      width="284"
      height="234"
      rx="14"
      class="mapa__pergaminho"
    />

    <path d="M92 196 L134 138 L176 196 Z" class="mapa__relevo" />
    <path d="M158 196 L196 152 L234 196 Z" class="mapa__relevo mapa__relevo--claro" />

    <path
      d="M48 202 C 92 198, 74 166, 118 158 S 196 150, 236 122"
      class="mapa__trilha"
      fill="none"
    />

    <circle cx="48" cy="202" r="10" class="mapa__partida" />
    <path d="M43.5 197.5 L52.5 206.5 M52.5 197.5 L43.5 206.5" class="mapa__marca" />

    <g class="mapa__bandeira">
      <path d="M236 122 L236 88" class="mapa__mastro" />
      <path d="M236 90 L264 98 L236 106 Z" class="mapa__flamula" />
    </g>

    <g class="mapa__dado" transform="translate(78 68) rotate(-8)">
      <path d="M0 -26 L22.5 -13 L22.5 13 L0 26 L-22.5 13 L-22.5 -13 Z" class="mapa__dadoCorpo" />
      <path d="M-13 -8 L13 -8 L0 15 Z" class="mapa__dadoFace" />
      <path d="M-13 -8 L0 -26 L13 -8 M-13 -8 L-22.5 13 M13 -8 L22.5 13" class="mapa__dadoAresta" />
    </g>
  </svg>
</template>

<script setup lang="ts">
const descricao =
  'Mapa de aventura com uma trilha pontilhada que sai de um ponto de partida, atravessa montanhas e chega a uma bandeira, ao lado de um dado de vinte faces.';
</script>

<style scoped>
.mapa {
  display: block;
  width: 100%;
  height: auto;
}

.mapa__pergaminho {
  fill: var(--surface);
  stroke: var(--border);
  stroke-width: var(--border-width);
}

.mapa__relevo {
  fill: var(--primary);
  opacity: 0.18;
}

.mapa__relevo--claro {
  opacity: 0.3;
}

.mapa__trilha {
  stroke: var(--primary);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-dasharray: 1 11;
}

.mapa__partida {
  fill: var(--accent);
  stroke: var(--border);
  stroke-width: 2;
}

.mapa__marca {
  stroke: var(--accent-ink);
  stroke-width: 2;
  stroke-linecap: round;
}

.mapa__mastro {
  stroke: var(--ink);
  stroke-width: 3;
  stroke-linecap: round;
}

.mapa__flamula {
  fill: var(--accent);
  stroke: var(--border);
  stroke-width: 2;
  stroke-linejoin: round;
}

.mapa__dadoCorpo {
  fill: var(--surface);
  stroke: var(--ink);
  stroke-width: 2.5;
  stroke-linejoin: round;
}

.mapa__dadoFace {
  fill: var(--primary);
  opacity: 0.22;
}

.mapa__dadoAresta {
  stroke: var(--ink);
  stroke-width: 2;
  fill: none;
  stroke-linejoin: round;
}
</style>
