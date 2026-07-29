<script>
  import { cn } from '$lib/cn'

  let { checked = $bindable(false), label = '', disabled = false } = $props()

  function toggle() {
    if (!disabled) checked = !checked
  }
</script>

<button
  type="button"
  {disabled}
  onclick={toggle}
  class={cn('flex w-fit items-center gap-3 select-none', disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer')}
>
  <span
    class={cn(
      'relative inline-flex items-center w-12 h-6 px-1 border transition-colors duration-150 shrink-0',
      checked ? 'bg-accent border-accent' : 'bg-surface-2 border-line-strong',
    )}
  >
    <span
      class={cn(
        'w-4 h-4 transition-transform duration-200 ease-out',
        checked ? 'translate-x-6 bg-on-accent' : 'translate-x-0 bg-muted',
      )}
    ></span>
  </span>
  {#if label}<span class="text-sm text-ink">{label}</span>{/if}
</button>
