import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(process.env.VUE_ROUTER_BASE),
  routes: [{ path: '/', component: () => import('src/pages/PaginaInicial.vue') }],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' };
    return { top: 0 };
  },
});

export default router;
