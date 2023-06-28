<template>
  <div>
    <PageHeader title="Data fetching" summary="As with Nuxt 2, there are multiple ways of handling data fetching in a component: $fetch, useFetch, and useAsyncData. These map more or less to the $http module, and fetch and asyncData hooks in Nuxt 2 respectively." icon="nuxt"/>
  </div>

  <section class="py-8">
    <h2 class="text-2xl mb-6"><code class="font-mono bg-gray-800 rounded py-1 px-2">$fetch</code></h2>
    
    <ul class="list-disc list-outside pl-5 flex flex-col gap-y-2 mb-6">
      <li class="mr-1">A simple http module built on top of the native fetch API</li>
      <li class="mr-1">Good for client-side only, user-driven interactions such as making network requests when clicking a button</li>
      <li>Does not benefit from network call duplication prevention, caching, or navigation prevention with Suspense</li>
    </ul>

    <figure v-if="bulbasaur?.id" class="border-2 border-gray-900 rounded flex flex-col justify-center items-center w-[200px] h-[200px]">
      <img v-if="bulbasaur?.sprites?.front_default" :src="bulbasaur?.sprites?.front_default" :alt="bulbasaur.name" width="96" height="96">
      <figcaption class="p-2 font-bold capitalize w-content">{{ bulbasaur.name }}</figcaption>
    </figure>
    <button v-else @click="getBulbasaur" class="text-[#00DC82] border-2 border-[#00DC82] font-bold px-3 py-1 rounded">$fetch</button>
  </section>

  <section class="py-8">
      <h2 class="text-2xl mb-6"><code class="font-mono bg-gray-800 rounded py-1 px-2">useFetch</code></h2>
    
      <ul class="list-disc list-outside pl-5 flex flex-col gap-y-2 mb-6">
        <li class="mr-1">A lightweight wrapper for useAsyncData that leverages $fetch under the hood</li>
        <li class="mr-1">Basic way to perform server-side data fetching that does not require additional logic</li>
        <li>Practically equivalent to <code class="font-mono bg-gray-800 rounded py-1 px-2">useAsyncData(url, () => $fetch(url))</code></li>
      </ul>

      <figure v-if="ivysaur?.id" class="border-2 border-gray-900 rounded flex flex-col justify-center items-center w-[200px] h-[200px]">
        <img v-if="ivysaur?.sprites?.front_default" :src="ivysaur?.sprites?.front_default" :alt="ivysaur.name" width="96" height="96">
        <figcaption class="p-2 font-bold capitalize w-content">{{ ivysaur.name }}</figcaption>
      </figure>
    </section>

    <section class="py-8">
      <h2 class="text-2xl mb-6"><code class="font-mono bg-gray-800 rounded py-1 px-2">useAsyncData</code></h2>

      <ul class="list-disc list-outside pl-5 flex flex-col gap-y-2 mb-6">
        <li class="mr-1">More robust way of fetching data server-side</li>
        <li class="mr-1">Allows additional logic pre- and post- data-fetching</li>
        <li>Practically equivalent to <code class="font-mono bg-gray-800 rounded py-1 px-2">useAsyncData(url, () => $fetch(url))</code></li>
      </ul>

      <figure v-if="pokemonFromQuery?.id || pokemonFromQueryError" class="border-2 border-gray-900 rounded flex flex-col justify-center items-center w-[200px] h-[200px] mb-4">
        <img v-if="pokemonFromQuery?.sprites?.front_default" :src="pokemonFromQuery?.sprites?.front_default" :alt="pokemonFromQuery.name" width="96" height="96">
        <figcaption class="p-2 font-bold capitalize w-content">{{ pokemonFromQuery?.name || pokemonFromQueryError?.statusCode }}</figcaption>
      </figure>

      <button @click="changePokemon" class="text-[#00DC82] border-2 border-[#00DC82] font-bold px-3 py-1 rounded">Change Pokémon</button>
    </section>
</template>

<script setup>
// $fetch
const bulbasaur = ref(null)
async function getBulbasaur() {
  try {
    const data = await $fetch('https://pokeapi.co/api/v2/pokemon/bulbasaur')

    if (data?.id) {
      bulbasaur.value = data
    }
  } catch (e) {

  }
}

// useFetch
// notice that useFetch always wraps the response in an additional data layer
const { data: ivysaur } = await useFetch('https://pokeapi.co/api/v2/pokemon/ivysaur')

// useAsyncData
const route = useRoute()
const router = useRouter();
const queryPokemon = computed(() => {
  return route?.query?.pokemon
})
function changePokemon() {
  router.push({ query: { pokemon: Math.floor(Math.random() * 999) } });
}
const { data: pokemonFromQuery, error: pokemonFromQueryError } = await useAsyncData('pokemonFromQuery', () =>
  $fetch(`https://pokeapi.co/api/v2/pokemon/${route?.query?.pokemon}`
), { watch: [queryPokemon]})
</script>
