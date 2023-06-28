<template>
  <div>
    <PageHeader
      title="New Components"
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
        <!-- Default slot of Suspense must be a single node. -->
        <div class="flex gap-4 flex-wrap">
          <figure
            v-if="charmander?.id"
            class="border-2 border-gray-900 rounded flex flex-col justify-center items-center w-[200px] h-[200px]"
          >
            <img
              v-if="charmander?.sprites?.front_default"
              :src="charmander?.sprites?.front_default"
              :alt="charmander.name"
              width="96"
              height="96"
            />
            <figcaption class="p-2 font-bold capitalize w-content">
              {{ charmander.name }}
            </figcaption>
          </figure>
          <figure
            v-if="charmeleon?.id"
            class="border-2 border-gray-900 rounded flex flex-col justify-center items-center w-[200px] h-[200px]"
          >
            <img
              v-if="charmeleon?.sprites?.front_default"
              :src="charmeleon?.sprites?.front_default"
              :alt="charmeleon.name"
              width="96"
              height="96"
            />
            <figcaption class="p-2 font-bold capitalize w-content">
              {{ charmeleon.name }}
            </figcaption>
          </figure>
          <figure
            v-if="charizard?.id"
            class="border-2 border-gray-900 rounded flex flex-col justify-center items-center w-[200px] h-[200px]"
          >
            <img
              v-if="charizard?.sprites?.front_default"
              :src="charizard?.sprites?.front_default"
              :alt="charizard.name"
              width="96"
              height="96"
            />
            <figcaption class="p-2 font-bold capitalize w-content">
              {{ charizard.name }}
            </figcaption>
          </figure>
        </div>

        <!-- Loading state will be shown until all async dependencies have resolved -->
        <template #fallback> Loading... </template>
      </Suspense>
    </fieldset>
  </div>
</template>

<script setup>
const modalIsOpen = ref(false);

const [{ data: charmander }, { data: charmeleon }] = await Promise.all([
  useFetch("https://pokeapi.co/api/v2/pokemon/charmander"),
  useFetch("https://pokeapi.co/api/v2/pokemon/charmeleon"),
]);
</script>
