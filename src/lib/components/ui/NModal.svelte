<script>
  import { fade } from 'svelte/transition'
  import { cubicOut } from 'svelte/easing'
  import { portal } from '$lib/actions/portal'
  import { cn } from '$lib/cn'
  import NIcon from './NIcon.svelte'

  let { open = $bindable(false), title = '', subtitle = '', size = 'md', footer, children } = $props()

  const sizes = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' }

  function close() {
    open = false
  }

  function backdropClose(node) {
    const fn = () => close()
    node.addEventListener('click', fn)
    return {
      destroy() {
        node.removeEventListener('click', fn)
      },
    }
  }

  function panelTransition(node, { duration = 240 } = {}) {
    return {
      duration,
      easing: cubicOut,
      css: (t) => {
        const e = 1 - t
        return `opacity: ${t}; transform: translateY(${16 * e}px) scale(${0.98 + 0.02 * t})`
      },
    }
  }

  $effect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  })
</script>

{#if open}
  <div use:portal class="fixed inset-0 z-[100] flex items-start justify-center p-4 sm:p-8 overflow-y-auto">
    <div class="fixed inset-0 bg-black/60 backdrop-blur-[2px]" use:backdropClose transition:fade={{ duration: 200 }}></div>
    <div
      role="dialog"
      aria-modal="true"
      transition:panelTransition
      class={cn(
        'relative w-full bg-surface border border-line border-l-[3px] border-l-accent shadow-2xl mt-8 sm:mt-16',
        sizes[size] || sizes.md,
      )}
    >
      <header class="flex items-start justify-between gap-4 px-6 py-4 border-b border-line">
        <div class="min-w-0">
          <h3 class="text-lg font-bold text-ink truncate">{title}</h3>
          {#if subtitle}<p class="text-sm text-muted mt-0.5">{subtitle}</p>{/if}
        </div>
        <button onclick={close} class="shrink-0 -mr-1 p-1 text-muted hover:text-danger transition-colors cursor-pointer">
          <NIcon name="close" size={20} />
        </button>
      </header>

      <div class="px-6 py-5">{@render children?.()}</div>

      {#if footer}
        <footer class="flex items-center justify-end gap-2 px-6 py-4 border-t border-line bg-surface-2/40">
          {@render footer(close)}
        </footer>
      {/if}
    </div>
  </div>
{/if}
