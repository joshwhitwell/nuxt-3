<template>
  <figure
    v-if="pokemon?.id"
    class="border-2 border-gray-900 rounded flex flex-col justify-center items-center w-[200px] h-[200px]"
  >
    <span
      v-if="pending"
      class="animate-ping w-2 h-2 rounded-full bg-nuxt opacity-75"
    ></span>
    <template v-else>
      <img
        v-if="pokemon?.sprites?.front_default"
        :src="pokemon?.sprites?.front_default"
        :alt="pokemon.name"
        width="96"
        height="96"
      />
      <figcaption class="p-2 font-bold capitalize w-content">
        {{ pokemon?.name || error?.statusCode }}
      </figcaption>
    </template>
  </figure>
</template>

<script setup>
const props = defineProps({
  pokemonId: {
    type: [String, Number],
    required: true,
  },
  timeout: {
    type: Number,
    default: 1000,
  },
});

const pokemonId = computed(() => {
  return props.pokemonId;
});

const {
  data: pokemon,
  pending,
  error,
} = await useAsyncData(
  `pokemon-${pokemonId.value}`,
  async () => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, props.timeout);
    });
    return $fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId.value}`);
  },
  { watch: [pokemonId] }
);
</script>
