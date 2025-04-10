<template>
  <section class="mt-5">
    <img v-if="showPokemon" :src="pokemonImage" alt="Pokemon Random Picture" class="fade-in" />
    <img v-else :src="pokemonImage" alt="Pokemon Random Picture" class="brightness-0" />
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  pokemonId: number;
  showPokemon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showPokemon: false
});

const pokemonImage = computed(() => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.pokemonId}.svg`
});

</script>

<style lang="scss" scoped>
img {
  height: 200px;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
}
</style>
