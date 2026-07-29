<script>
  import { cn } from '$lib/cn'
  import NIcon from './NIcon.svelte'

  let { icon = '', danger = false, onclick, children } = $props()
</script>

<button
  {onclick}
  class={cn(
    'w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-left transition-colors cursor-pointer',
    danger ? 'text-danger hover:bg-danger/10' : 'text-ink hover:bg-surface-2',
  )}
>
  {#if icon}<NIcon name={icon} size={16} class={danger ? '' : 'text-muted'} />{/if}
  {@render children?.()}
</button>
