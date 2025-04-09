import { computed, onMounted, ref } from 'vue';
import { GameStatus, type Pokemon, type PokemonListResponse } from '../interfaces';
import { pokemonApi } from '../api/pokemonApi';

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const pokemons = ref<Pokemon[]>([]);
  const pokemonsOptions = ref<Pokemon[]>([]);
  const randomPokemon = computed<string>(() => {
    const randomIndex = Math.floor(Math.random() * pokemonsOptions.value.length);

    return pokemonsOptions.value[randomIndex].name || 'No Pokemon finded';
  });
  const isLoading = computed(() => pokemons.value.length === 0);

  const getPokemons = async (): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonListResponse>('/?limit=151');

    const pokemonsArray = response.data.results.map((pokemon) => {
      const urlParts = pokemon.url.split('/') ?? 0;

      return {
        name: pokemon.name,
        id: +urlParts[urlParts.length - 2],
      };
    });

    return pokemonsArray.sort(() => Math.random() - 0.5);
  };

  const getPokemonsOptions = (howMany: number = 4) => {
    gameStatus.value = GameStatus.Playing;
    pokemonsOptions.value = pokemons.value.slice(0, howMany);
    pokemons.value.splice(0, howMany);
  };

  onMounted(async () => {
    await new Promise((r) => setTimeout(r, 1500));

    pokemons.value = await getPokemons();

    getPokemonsOptions();
  });

  return {
    gameStatus,
    isLoading,
    pokemonsOptions,
    randomPokemon,

    //Methods
    getPokemonsOptions,
  };
};
