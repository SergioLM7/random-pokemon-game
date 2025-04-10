<template>
  <section v-if="isLoading || randomPokemon.id === null"
    class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="text-3xl">Wait, please</h1>

    <h3 class="animate-pulse">Loading Pokemon...</h3>
  </section>

  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <h3 class="capitalize font-bold animate-pulse">{{ gameStatus }}</h3>
    <h1 class="text-3xl">Which Pokemon is this?</h1>
    <div class="h-20">
      <button v-if="gameStatus !== GameStatus.Playing"
        class="bg-green-300 rounded-md p-1 mt-3 hover:cursor-pointer hover:bg-green-400 hover:font-bold"
        @click="getNextRound(4)">Play
        again!</button>
    </div>
    <PokemonPicture :pokemonId="randomPokemon.id" :showPokemon="gameStatus !== GameStatus.Playing" />

    <GameOptions :options="options" @selected-option="checkAnswer" :blockSelection="isAnswered"
      :correctAnswer="randomPokemon.id" />

  </section>

</template>

<script setup lang="ts">
import GameOptions from '../components/GameOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue'
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces';

const { randomPokemon, isLoading, gameStatus, pokemonsOptions: options, checkAnswer, isAnswered, getNextRound } = usePokemonGame();


</script>

<style></style>
