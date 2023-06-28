<template>
  <div>
    <PageHeader
      title="Overview"
      summary="This presentation is intended to provide a general overview of new features available in Nuxt 3 and Vue 3. It is not intended to be an exhaustive survey of all Nuxt 3 and Vue 3 features, for which you should consult the official documentation."
      icon="both"
    />
    <section class="py-8">
      <h2 class="text-2xl mb-6">What’s new?</h2>

      <ul class="list-disc list-outside pl-5 flex flex-col gap-y-2 mb-6">
        <li>
          Vue 3 (Composition API / script setup, Teleport, Fragments, v-bind in
          SFC style tags)
        </li>
        <li>
          Nitro server engine (create server-side API routes, i.e. enables
          monolithic / full-stack development within Nuxt)
        </li>
        <li>
          Bundling with Vite (really fast HMR and probably other benefits)
        </li>
        <li>
          Auto-importing of all components, composables, and utils (including
          reactivity APIs and lifecycle hooks from Vue 3)
        </li>
        <li>
          Other features for nerds (new rendering modes: Universal, Hybrid,
          Edge)
        </li>
        <li>
          “Zero-config” Typescript support (I’ll believe it when I see it)
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup></script>
