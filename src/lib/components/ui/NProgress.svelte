<script>
  import { cn } from '$lib/cn'

  let { value = 0, max = 100, variant = 'accent', label = '', showValue = false, class: className = '' } = $props()

  const barColor = {
    accent: 'bg-accent',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
  }
  let pct = $derived(Math.max(0, Math.min(100, (value / max) * 100)))
</script>

<div class={className}>
  {#if label || showValue}
    <div class="flex items-center justify-between mb-1.5">
      {#if label}<span class="text-xs font-semibold text-muted">{label}</span>{/if}
      {#if showValue}<span class="text-xs font-bold text-ink tabular-nums">{Math.round(pct)}%</span>{/if}
    </div>
  {/if}
  <div class="h-2 w-full bg-surface-3 overflow-hidden">
    <div class={cn('h-full transition-[width] duration-500 ease-out', barColor[variant] || barColor.accent)} style="width: {pct}%"></div>
  </div>
</div>
