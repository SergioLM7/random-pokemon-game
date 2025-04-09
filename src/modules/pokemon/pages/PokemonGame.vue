<template>
  <section v-if="isLoading" class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="text-3xl">Wait, please</h1>

    <h3 class="animate-pulse">Loading Pokemon...</h3>
  </section>

  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="text-3xl">Which Pokemon is this?</h1>
    <h3>{{ randomPokemon }}</h3>

    <PokemonPicture :pokemonId="randomPokemon.id" />

    <GameOptions />

  </section>

</template>

<script setup lang="ts">
import GameOptions from '../components/GameOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue'
import { usePokemonGame } from '../composables/usePokemonGame';

const { randomPokemon, isLoading } = usePokemonGame();

</script>

<style></style>
