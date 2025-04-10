import { computed, onMounted, ref } from 'vue';
import { GameStatus, type Pokemon, type PokemonListResponse } from '../interfaces';
import { pokemonApi } from '../api/pokemonApi';
import confetti from 'canvas-confetti';

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const pokemons = ref<Pokemon[]>([]);
  const pokemonsOptions = ref<Pokemon[]>([]);
  const randomPokemon = computed(() => {
    const randomIndex = Math.floor(Math.random() * pokemonsOptions.value.length);

    return pokemonsOptions.value[randomIndex] || 'No Pokemon finded';
  });
  const isLoading = computed(() => pokemons.value.length === 0);
  const isAnswered = ref<boolean>(false);

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

  const getNextRound = (howMany: number = 4) => {
    isAnswered.value = false;
    gameStatus.value = GameStatus.Playing;
    pokemonsOptions.value = pokemons.value.slice(0, howMany);
    pokemons.value.splice(0, howMany);
  };

  const checkAnswer = (id: number) => {
    isAnswered.value = true;
    const hasWon = randomPokemon.value.id === id;
    if (hasWon) {
      gameStatus.value = GameStatus.Won;
      confetti({
        particleCount: 3000,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2,
        },
      });
    }

    gameStatus.value = GameStatus.Lost;
  };

  onMounted(async () => {
    isAnswered.value = false;
    await new Promise((r) => setTimeout(r, 1500));

    pokemons.value = await getPokemons();

    getNextRound();
  });

  return {
    gameStatus,
    isLoading,
    pokemonsOptions,
    randomPokemon,
    isAnswered,

    //Methods
    getNextRound,
    checkAnswer,
  };
};
