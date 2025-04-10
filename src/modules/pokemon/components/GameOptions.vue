<template>
  <section class="mt-5 flex flex-col justify-center items-center">
    <button v-for="{ name, id } in options" :key="id" :class="[
      'special-button capitalize disabled:shadow-none disabled:bg-gray-600 disabled:cursor-auto',
      {
        correct: id === correctAnswer && blockSelection,
        incorrect: id !== correctAnswer && blockSelection,
      },
    ]" @click="$emit('selectedOption', id)" :disabled="blockSelection">
      {{ name }}
    </button>
  </section>
</template>

<script setup lang="ts">
import type { Pokemon } from '../interfaces';

interface Props {
  options: Pokemon[];
  blockSelection: boolean;
  correctAnswer: number;
}

defineProps<Props>();

defineEmits<{
  selectedOption: [id: number];
}>();


</script>

<style></style>
