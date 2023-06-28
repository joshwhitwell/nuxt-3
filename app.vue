<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-24 md:py-44">
    <div class="grid md:grid-cols-10 gap-x-8 gap-y-12">
      <aside class="md:col-start-1 md:col-end-3">
        <nav>
          <ul class="flex flex-col gap-y-3">
            <li>
              <NuxtLink to="/">Overview</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/concepts/composition-api"
                >Composition API</NuxtLink
              >
              <ul class="text-gray-500 pl-4">
                <li>Props</li>
                <li>Ref</li>
                <li>Computed</li>
                <li>Provide</li>
                <li>Custom Composables</li>
              </ul>
            </li>
            <li>
              <NuxtLink to="/concepts/data-fetching">Data Fetching</NuxtLink>
              <ul class="text-gray-500 pl-4">
                <li>$fetch</li>
                <li>useFetch</li>
                <li>useAsyncData</li>
              </ul>
            </li>
          </ul>
        </nav>
      </aside>
      <main class="md:col-start-3 md:col-end-10">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup>
const { mouseX, mouseY } = useMouseTracker();

provide(
  "providedDependency",
  "This message was provided by app.vue and injected into this component directly."
);
provide("appMousePosition", { mouseX, mouseY });

useHead({
  title: "Nuxt 3",
  meta: [
    { name: "description", content: "A demo site for learning about Nuxt 3." },
  ],
  bodyAttrs: {
    class: "bg-black text-gray-200 font-sans antialiased",
  },
});
</script>
