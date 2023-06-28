<template>
  <fieldset class="border-2 border-gray-800 rounded p-4 mb-8">
    <legend class="text-xl">Props</legend>

    <p class="mb-4">
      <code class="font-mono bg-gray-800 rounded py-1 px-2">maybeAnything</code>
      <!-- Inside of templates the values of refs do not need to be unpacked. -->
      could be anything but it is a {{ typeof maybeAnything }}.
    </p>
    <p class="mb-4">
      <code class="font-mono bg-gray-800 rounded py-1 px-2">
        <code class="font-mono bg-gray-800 rounded py-1 px-2"
          >hasToBeYesOrNo</code
        ></code
      >
      must be “Yes” or “No” and it is “{{ hasToBeYesOrNo }}.”
    </p>

    <p class="mb-4">
      <span
        >Computed
        <code class="font-mono bg-gray-800 rounded py-1 px-2"
          >maybeAnything</code
        >: </span
      >{{ computedMaybeAnything }}
    </p>
  </fieldset>

  <fieldset class="border-2 border-gray-800 rounded p-4 mb-8">
    <legend class="text-xl">Ref and Computed</legend>
    <div class="mb-8">
      <p class="mb-4"><span>Ref Count: </span>{{ count }}</p>
      <button
        class="text-nuxt border-2 border-nuxt font-bold px-3 py-1 rounded mr-2"
        @click="count++"
      >
        Increment with Event Handler
      </button>
      <button
        class="text-nuxt border-2 border-nuxt font-bold px-3 py-1 rounded"
        @click="incrementCount"
      >
        Increment with Method
      </button>
    </div>

    <div class="mb-8">
      <p class="mb-4"><span>State Count: </span>{{ state.count }}</p>
      <button
        class="text-nuxt border-2 border-nuxt font-bold px-3 py-1 rounded mr-2"
        @click="state.count++"
      >
        Increment with State Event Handler
      </button>
      <button
        class="text-nuxt border-2 border-nuxt font-bold px-3 py-1 rounded"
        @click="incrementStateCount"
      >
        Increment with State Method
      </button>
    </div>

    <p class="mb-4"><span>Computed Total: </span>{{ totalCount }}</p>
  </fieldset>

  <fieldset
    v-if="providedDependency"
    class="border-2 border-gray-800 rounded p-4 mb-8"
  >
    <legend class="text-xl">Provide & Inject</legend>
    <p>{{ providedDependency }}</p>
  </fieldset>

  <fieldset class="border-2 border-gray-800 rounded p-4">
    <legend class="text-xl">Custom Composables</legend>
    <p>
      Mouse position computed in ScriptSetupExample.vue: {{ mouseX }}
      {{ mouseY }}
    </p>
    <p>
      Mouse position computed in app.vue: {{ appMousePosition?.mouseX }}
      {{ appMousePosition?.mouseY }}
    </p>
  </fieldset>
</template>

<!-- The setup attribute indicates this component should be compiled with Composition API.  -->
<script setup>
// Props are defined using the defineProps() hook.
// We can assign the return value of defineProps to a reactive variable and reference in script.
// Note that the props variable cannot be destructured or reactivity is lost.
const props = defineProps({
  maybeAnything: {
    type: [String, Number, Object, Array, Function, Boolean, Date, Symbol],
    default: null,
  },
  hasToBeYesOrNo: {
    type: String,
    required: true,
    validator(hasToBeYesOrNo) {
      return ["Yes", "No"].includes(hasToBeYesOrNo);
    },
  },
});
// Computed refs are written identically as in Vue 2 except declared at the top-level scope.
const computedMaybeAnything = computed(() => {
  return props.maybeAnything;
});

// The ref() function replaces the data prop for creating reactive state.
const count = ref(0);
// When accessed inside script a refs value must be get/set through the value property.
function incrementCount() {
  count.value++;
}

// Any value type can be a ref; nested arrays and objects will observe deep reactivity.
const state = ref({
  count: 0,
});
// When updating nested state, we still need to first access the value property from the top level object.
function incrementStateCount() {
  state.value.count++;
}

// Computed refs are written identically as in Vue 2 except declared at the top-level scope.
const totalCount = computed(() => {
  return count.value + state.value.count;
});

// Lifecyle hooks can be declared at the top-level scope.
onMounted(() => {
  console.log(`This code is run when the component was mounted.`);
});

// Reactive dependencies can be injected from anywhere up the component tree (see app.vue).
const providedDependency = inject("providedDependency");
const appMousePosition = inject("appMousePosition");

// State can be initialized from reusable custom composables.
const { mouseX, mouseY } = useMouseTracker();
</script>
