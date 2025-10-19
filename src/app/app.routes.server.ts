import { RenderMode, ServerRoute } from '@angular/ssr';

const TOTAL_POKEMONS = 10;

//TODO: Investigar como hacer el prerender en angular 20. Por ejemplo prerenderizar las 10 primeras paginas del listado de pokemon o alguna paginas de detalle de pokemon
export const serverRoutes: ServerRoute[] = [
  {
    path: 'pokemons/page/:page',
    renderMode: RenderMode.Prerender,
    getPrerenderParams() {
      const pages = ['1', '2', '3', '4', '5'];
      return Promise.resolve(pages.map((page) => ({page})));
    }
  },
  {
    path: 'pokemons/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return Array.from({ length: TOTAL_POKEMONS}, (_, index) => ({
        id: (index + 1).toString()
      }))
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];
