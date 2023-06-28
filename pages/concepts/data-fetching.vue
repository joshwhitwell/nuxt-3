<template>
  <div>
    <PageHeader
      title="Data Fetching"
      summary="As with Nuxt 2, there are multiple ways of handling data fetching in a component: $fetch, useFetch, and useAsyncData. These map more or less to the $http module, and fetch and asyncData hooks in Nuxt 2 respectively."
      icon="nuxt"
    />

    <section class="py-8">
      <h2 class="text-2xl mb-6">
        <code class="font-mono bg-gray-800 rounded py-1 px-2">$fetch</code>
      </h2>

      <ul class="list-disc list-outside pl-5 flex flex-col gap-y-2 mb-6">
        <li>A simple http module built on top of the native fetch API</li>
        <li>
          Good for client-side only, user-driven interactions such as making
          network requests when clicking a button
        </li>
        <li>
          Does not benefit from network call duplication prevention, caching, or
          navigation prevention with Suspense
        </li>
      </ul>

      <figure
        v-if="bulbasaur?.id"
        class="border-2 border-gray-900 rounded flex flex-col justify-center items-center w-[200px] h-[200px]"
      >
        <img
          v-if="bulbasaur?.sprites?.front_default"
          :src="bulbasaur?.sprites?.front_default"
          :alt="bulbasaur.name"
          width="96"
          height="96"
        />
        <figcaption class="p-2 font-bold capitalize w-content">
          {{ bulbasaur.name }}
        </figcaption>
      </figure>
      <button
        v-else
        class="text-nuxt border-2 border-nuxt font-bold px-3 py-1 rounded"
        @click="getBulbasaur"
      >
        $fetch
      </button>
    </section>

    <section class="py-8">
      <h2 class="text-2xl mb-6">
        <code class="font-mono bg-gray-800 rounded py-1 px-2">useFetch</code>
      </h2>

      <ul class="list-disc list-outside pl-5 flex flex-col gap-y-2 mb-6">
        <li>
          A lightweight wrapper for useAsyncData that leverages $fetch under the
          hood
        </li>
        <li>
          Basic way to perform server-side data fetching that does not require
          additional logic
        </li>
        <li>
          Practically equivalent to
          <code class="font-mono bg-gray-800 rounded py-1 px-2"
            >useAsyncData(url, () => $fetch(url))</code
          >
        </li>
      </ul>

      <figure
        v-if="ivysaur?.id"
        class="border-2 border-gray-900 rounded flex flex-col justify-center items-center w-[200px] h-[200px]"
      >
        <img
          v-if="ivysaur?.sprites?.front_default"
          :src="ivysaur?.sprites?.front_default"
          :alt="ivysaur.name"
          width="96"
          height="96"
        />
        <figcaption class="p-2 font-bold capitalize w-content">
          {{ ivysaur.name }}
        </figcaption>
      </figure>
    </section>

    <section class="py-8">
      <h2 class="text-2xl mb-6">
        <code class="font-mono bg-gray-800 rounded py-1 px-2"
          >useAsyncData</code
        >
      </h2>

      <ul class="list-disc list-outside pl-5 flex flex-col gap-y-2 mb-6">
        <li>More robust way of fetching data server-side</li>
        <li>Allows additional logic pre- and post- data-fetching</li>
        <li>
          Practically equivalent to
          <code class="font-mono bg-gray-800 rounded py-1 px-2"
            >useAsyncData(url, () => $fetch(url))</code
          >
        </li>
      </ul>

      <figure
        v-if="
          pokemonFromQuery?.id ||
          pokemonFromQueryPending ||
          pokemonFromQueryError
        "
        class="border-2 border-gray-900 rounded flex flex-col justify-center items-center w-[200px] h-[200px] mb-4"
      >
        <span
          v-if="pokemonFromQueryPending"
          class="animate-ping w-2 h-2 rounded-full bg-nuxt opacity-75"
        ></span>
        <template v-else>
          <img
            v-if="pokemonFromQuery?.sprites?.front_default"
            :src="pokemonFromQuery?.sprites?.front_default"
            :alt="pokemonFromQuery.name"
            width="96"
            height="96"
          />
          <figcaption class="p-2 font-bold capitalize w-content">
            {{
              !queryPokemon
                ? "No query"
                : pokemonFromQuery?.name || pokemonFromQueryError?.statusCode
            }}
          </figcaption>
        </template>
      </figure>

      <button
        class="text-nuxt border-2 border-nuxt font-bold px-3 py-1 rounded"
        @click="changePokemon"
      >
        Change Pokémon
      </button>
    </section>
  </div>
</template>

<script setup>
// $fetch
const bulbasaur = ref(null);
async function getBulbasaur() {
  try {
    const data = await $fetch("https://pokeapi.co/api/v2/pokemon/bulbasaur");

    if (data?.id) {
      bulbasaur.value = data;
    }
  } catch (e) {}
}

// useFetch
// Notice that useFetch always wraps the response in an additional data layer.
const { data: ivysaur } = await useFetch(
  "https://pokeapi.co/api/v2/pokemon/ivysaur"
);

// useAsyncData
const route = useRoute();
const router = useRouter();
const queryPokemon = computed(() => {
  return route?.query?.pokemon;
});
function changePokemon() {
  router.push({ query: { pokemon: Math.floor(Math.random() * 999) } });
}
const {
  data: pokemonFromQuery,
  error: pokemonFromQueryError,
  pending: pokemonFromQueryPending,
} = await useAsyncData(
  "pokemonFromQuery",
  // Callback allows us to transform the request or response before returning.
  () => $fetch(`https://pokeapi.co/api/v2/pokemon/${route?.query?.pokemon}`),
  { watch: [queryPokemon] }
);
</script>
