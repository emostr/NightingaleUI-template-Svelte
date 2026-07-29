<script>
  import { page } from '$app/state'
  import { fade, fly } from 'svelte/transition'
  import { cubicOut } from 'svelte/easing'
  import Sidebar from '$lib/components/layout/Sidebar.svelte'
  import Topbar from '$lib/components/layout/Topbar.svelte'

  let { children } = $props()
  let sidebarOpen = $state(false)

  function overlayClose(node) {
    const fn = () => (sidebarOpen = false)
    node.addEventListener('click', fn)
    return {
      destroy() {
        node.removeEventListener('click', fn)
      },
    }
  }
</script>

<div class="min-h-screen flex bg-bg">
  {#if sidebarOpen}
    <div use:overlayClose transition:fade={{ duration: 200 }} class="fixed inset-0 z-30 bg-black/60 lg:hidden"></div>
  {/if}

  <Sidebar open={sidebarOpen} onclose={() => (sidebarOpen = false)} />

  <div class="flex-1 min-w-0 flex flex-col">
    <Topbar ontoggleSidebar={() => (sidebarOpen = !sidebarOpen)} />

    <main class="flex-1 p-4 sm:p-6 lg:p-8">
      <div class="view-stack">
        {#key page.url.pathname}
          <div class="view-cell" in:fly={{ y: 10, duration: 250, delay: 130, easing: cubicOut }} out:fade={{ duration: 120 }}>
            {@render children()}
          </div>
        {/key}
      </div>
    </main>

    <footer class="border-t border-line px-4 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
      <p class="text-xs text-faint">NightingaleUI</p>
      <div class="flex items-center gap-4 text-xs text-faint">
        <a href="#" class="hover:text-ink transition-colors">Документация</a>
        <a href="#" class="hover:text-ink transition-colors">Поддержка</a>
        <span>v1.0.1</span>
      </div>
    </footer>
  </div>
</div>

<style>
  .view-stack {
    display: grid;
  }
  .view-cell {
    grid-area: 1 / 1;
  }
</style>
