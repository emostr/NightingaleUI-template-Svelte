<script>
  import { cn } from '$lib/cn'
  import NIcon from './NIcon.svelte'

  let { label = '', value = '', icon = '', delta = null, trend = '', solid = false } = $props()

  let trendUp = $derived(trend === 'up')
  let trendClass = $derived(solid ? 'text-on-accent/85' : trendUp ? 'text-success' : 'text-danger')
</script>

<div
  class={cn(
    'relative overflow-hidden ng-tile-press border p-5 flex flex-col justify-between min-h-[128px]',
    solid ? 'bg-accent text-on-accent border-transparent' : 'bg-surface border-line hover:border-line-strong',
  )}
>
  <div class="flex items-start justify-between">
    <span class={cn('ng-label', solid ? 'text-on-accent/80' : 'text-muted')}>{label}</span>
    {#if icon}
      <NIcon name={icon} size={22} class={solid ? 'text-on-accent/70' : 'text-accent'} />
    {/if}
  </div>

  <div>
    <div class="text-3xl font-extrabold tracking-normal leading-none">{value}</div>
    {#if delta !== null}
      <div class={cn('flex items-center gap-1.5 mt-2 text-xs font-semibold', trendClass)}>
        <NIcon name={trendUp ? 'trendUp' : 'trendDown'} size={14} />
        <span>{delta}</span>
        <span class={cn(solid ? 'text-on-accent/60' : 'text-faint', 'font-normal')}>за 7 дней</span>
      </div>
    {/if}
  </div>
</div>
