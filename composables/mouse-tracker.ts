export function useMouseTracker() {
  // Self-contained state managed by the composable.
  const mouseX = ref(0);
  const mouseY = ref(0);

  // Mutator for component state.
  function update(event: any) {
    mouseX.value = event.pageX;
    mouseY.value = event.pageY;
  }

  // Lifecycle hooks will be executed on the component where the composable is called.
  onMounted(() => window.addEventListener("mousemove", update));
  onUnmounted(() => window.removeEventListener("mousemove", update));

  // Return the composable managed state.
  return { mouseX, mouseY };
}
