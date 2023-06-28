<template>
  <div>
    <PageHeader
      title="Composition API"
      summary="Composition API is a new syntax for writing SFC components in Vue 3. The API uses imported functions called composables that are declared in the top-level scope of a component in place of declaring and exporting an options module."
      icon="vue"
    />

    <section class="py-8">
      <h2 class="text-2xl mb-6">Advantages</h2>

      <ul class="list-disc list-outside pl-5 flex flex-col gap-y-2 mb-6">
        <li>
          Greater ability to reuse code across components using
          <a
            href="https://vuejs.org/guide/reusability/composables.html"
            class="text-nuxt underline"
            >custom composables</a
          >
        </li>
        <li>
          More flexibility with code organization, e.g. around logical/business
          concerns, rather than strictly by type ("data", "computed", "methods")
          <a
            class="text-nuxt underline"
            href="https://vuejs.org/assets/composition-api-after.e3f2c350.png"
            >View example</a
          >
        </li>
        <li>
          Similar to React-like functional components, but composables are only
          called once when setup is executed and dependencies do not need to be
          explicitly declared (typically leading to fewer unnecessary renders
          and child updates)
        </li>
        <li>
          Does not preclude use options API in the same codebase, or even the
          same file
        </li>
      </ul>
    </section>

    <section class="py-8">
      <h2 class="text-2xl mb-6">Concepts Overview</h2>

      <ScriptSetupExample has-to-be-yes-or-no="Yes" maybe-anything="anything" />
    </section>
  </div>
</template>

<script setup></script>
