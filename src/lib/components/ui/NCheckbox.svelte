<script>
  import { cn } from '$lib/cn'
  import NIcon from './NIcon.svelte'

  let { checked = $bindable(false), label = '', disabled = false } = $props()

  function toggle() {
    if (!disabled) checked = !checked
  }
</script>

<button
  type="button"
  {disabled}
  onclick={toggle}
  class={cn('flex w-fit items-center gap-2.5 select-none', disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer')}
>
  <span
    class={cn(
      'w-5 h-5 border flex items-center justify-center transition-colors shrink-0',
      checked ? 'bg-accent border-accent text-on-accent' : 'bg-surface-2 border-line-strong',
    )}
  >
    {#if checked}<NIcon name="check" size={14} stroke={3} />{/if}
  </span>
  {#if label}<span class="text-sm text-ink">{label}</span>{/if}
</button>
