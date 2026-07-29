<script>
  import { cn } from '$lib/cn'
  import NIcon from './NIcon.svelte'

  let { variant = 'info', title = '', closable = false, onclose, children } = $props()

  const map = {
    info: { border: 'border-l-info', icon: 'info', tint: 'text-info' },
    success: { border: 'border-l-success', icon: 'checkCircle', tint: 'text-success' },
    warning: { border: 'border-l-warning', icon: 'alert', tint: 'text-warning' },
    danger: { border: 'border-l-danger', icon: 'alert', tint: 'text-danger' },
  }
  let conf = $derived(map[variant] || map.info)
</script>

<div class={cn('flex items-start gap-3 bg-surface border border-line border-l-[3px] px-4 py-3', conf.border)}>
  <NIcon name={conf.icon} size={20} class={cn(conf.tint, 'shrink-0 mt-0.5')} />
  <div class="min-w-0 flex-1">
    {#if title}<p class="font-bold text-ink text-sm">{title}</p>{/if}
    <div class={cn('text-sm text-muted', title ? 'mt-0.5' : '')}>{@render children?.()}</div>
  </div>
  {#if closable}
    <button class="shrink-0 text-faint hover:text-danger transition-colors cursor-pointer" onclick={onclose}>
      <NIcon name="close" size={16} />
    </button>
  {/if}
</div>
