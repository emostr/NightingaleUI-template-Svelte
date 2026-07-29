<script>
  import { onMount } from 'svelte'
  import { cubicOut } from 'svelte/easing'
  import { portal } from '$lib/actions/portal'
  import NIcon from './NIcon.svelte'

  let { align = 'right', width = 200, trigger, children } = $props()

  let open = $state(false)
  let triggerEl = $state(null)
  let menuEl = $state(null)
  let pos = $state({ top: 0, left: 0, origin: 'top' })

  function toggleOpen() {
    open = !open
  }
  function close() {
    open = false
  }

  function place() {
    if (!triggerEl) return
    const r = triggerEl.getBoundingClientRect()
    const vh = window.innerHeight
    const vw = window.innerWidth
    const gap = 6
    const menuH = menuEl?.offsetHeight || 0
    const below = vh - r.bottom
    const flip = below < menuH + gap && r.top > below

    let left = align === 'right' ? r.right - width : r.left
    left = Math.max(8, Math.min(left, vw - width - 8))

    pos = {
      top: flip ? r.top - gap - menuH : r.bottom + gap,
      left,
      origin: flip ? 'bottom' : 'top',
    }
  }

  $effect(() => {
    if (open && menuEl) {
      place()
      const id = requestAnimationFrame(place)
      return () => cancelAnimationFrame(id)
    }
  })

  onMount(() => {
    function onDocClick(e) {
      if (triggerEl?.contains(e.target) || menuEl?.contains(e.target)) return
      close()
    }
    function onScroll() {
      if (open) close()
    }
    function onKey(e) {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('click', onDocClick)
    window.addEventListener('scroll', onScroll, true)
    window.addEventListener('resize', close)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onDocClick)
      window.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('resize', close)
      document.removeEventListener('keydown', onKey)
    }
  })

  function closeOnClick(node) {
    const fn = () => close()
    node.addEventListener('click', fn)
    return {
      destroy() {
        node.removeEventListener('click', fn)
      },
    }
  }

  function ddTransition(node, { duration = 140 } = {}) {
    return {
      duration,
      easing: cubicOut,
      css: (t) => `opacity: ${t}; transform: scale(${0.97 + 0.03 * t}) translateY(${-4 * (1 - t)}px)`,
    }
  }
</script>

<div bind:this={triggerEl} class="inline-block">
  {#if trigger}
    {@render trigger(toggleOpen)}
  {:else}
    <button onclick={toggleOpen} class="p-2 text-muted hover:text-ink hover:bg-surface-2 transition-colors cursor-pointer">
      <NIcon name="more" size={18} />
    </button>
  {/if}
</div>

{#if open}
  <div
    bind:this={menuEl}
    use:portal
    use:closeOnClick
    transition:ddTransition
    class="fixed z-120 bg-surface border border-line shadow-2xl py-1"
    style="top: {pos.top}px; left: {pos.left}px; width: {width}px; transform-origin: {pos.origin}"
  >
    {@render children?.()}
  </div>
{/if}
