<template>
  <div>
    <PageHeader
      title="Components"
      summary="Vue 3 comes with (at least) two
    new built-in components worth mentioning: Teleport and Suspense. Teleport allows moving a
    template from one DOM element to another conditionally (e.g., writing a modal’s logic and markup
    in one component but appending it further up the DOM tree when open). Suspense (experimental) allows conditional group-rendering of nested async dependencies."
      icon="vue"
    />

    <fieldset class="border-2 border-gray-800 rounded p-4 mb-8">
      <legend class="text-xl">Teleport</legend>

      <Teleport to="body">
        <div
          v-if="modalIsOpen"
          class="fixed z-999 w-full h-full bg-black flex items-center flex-col justify-center"
        >
          <h3 class="text-2xl font-bold mb-4">You’ve been teleported.</h3>
          <p class="mb-6 max-w-lg text-center">
            This modal was prepended to the
            <code class="font-mono bg-gray-800 rounded py-1 px-2">body</code>
            tag using
            <code class="font-mono bg-gray-800 rounded py-1 px-2"
              >Teleport</code
            >
            and delivered directly to your eyeballs.
          </p>
          <button
            class="text-nuxt border-2 border-nuxt font-bold px-3 py-1 rounded"
            @click="modalIsOpen = false"
          >
            Close
          </button>
        </div>
      </Teleport>
      <button
        class="text-nuxt border-2 border-nuxt font-bold px-3 py-1 rounded"
        @click="modalIsOpen = true"
      >
        Open Modal
      </button>
    </fieldset>

    <fieldset class="border-2 border-gray-800 rounded p-4 mb-8">
      <legend class="text-xl">Suspense</legend>

      <Suspense>
        <template #default>
          <div class="flex gap-4 flex-wrap">
            <SuspensiblePokemonCard
              :pokemon-id="pokemonIds[0]"
              :timeout="1000"
            />
            <SuspensiblePokemonCard
              :pokemon-id="pokemonIds[1]"
              :timeout="2000"
            />
            <SuspensiblePokemonCard
              :pokemon-id="pokemonIds[2]"
              :timeout="3000"
            />
          </div>
        </template>

        <template #fallback> Loading... </template>
      </Suspense>

      <button
        class="text-nuxt border-2 border-nuxt font-bold px-3 py-1 rounded block mt-4"
        @click="changePokemon"
      >
        Change Pokémon
      </button>
    </fieldset>

    <fieldset class="border-2 border-gray-800 rounded p-4 mb-8">
      <legend class="text-xl">V-bind: Style</legend>
      <button
        class="text-nuxt border-2 border-nuxt font-bold px-3 py-1 rounded block v-bind"
        @click="changeColor"
      >
        Change Color
      </button>
    </fieldset>
  </div>
</template>

<script setup>
const modalIsOpen = ref(false);

const color = ref("#00DC82");
function changeColor() {
  const colors = [
    "#dc2626",
    "#ea580c",
    "#16a34a",
    "#0891b2",
    "#9333ea",
    "#e11d48",
  ];

  color.value = colors[Math.floor(Math.random() * 6)];
}

const pokemonIds = ref([4, 5, 6]);
function changePokemon() {
  pokemonIds.value = [
    Math.floor(Math.random() * 999),
    Math.floor(Math.random() * 999),
    Math.floor(Math.random() * 999),
  ];
}
</script>

<style>
.v-bind {
  border-color: v-bind(color);
  color: v-bind(color);
}
</style>
