import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pokemon-page',
  imports: [],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit{

  // Alternativa a ActivatedRoute

  //   ```app.config.ts
  // provideRouter(routes, withComponentInputBinding())
  // ```

  //  withComponentInputBinding: permite recibir los parametros en el input

  // si la ruta es {path:'pokemon/:id'}
  // en el componente se agregaga asi:

  // id = input() // señal

  private pokemonsService = inject(PokemonsService);
  private route = inject(ActivatedRoute);

  public pokemon = signal<Pokemon | null>(null);

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if(!id) return;

    this.pokemonsService.loadPokemon(id).subscribe(this.pokemon.set);
  }

}
