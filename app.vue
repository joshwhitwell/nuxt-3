<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-44">
    <div class="grid grid-cols-10 gap-x-8">
      <aside class="col-start-1 col-end-3">
        <nav>
          <ul>
            <li>
              <NuxtLink to="/">Overview</NuxtLink>
            </li>
          </ul>
        </nav>
      </aside>
      <main class="col-start-3 col-end-10">
        <NuxtPage />
      </main >
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Nuxt 3',
  meta: [
    { name: 'description', content: 'A demo site for learning about Nuxt 3.' }
  ],
  bodyAttrs: {
    class: 'bg-black text-gray-200 font-sans antialiased'
  },
})
</script>
