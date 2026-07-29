<script>
  import { cn } from '$lib/cn'

  let { value = $bindable(''), options = [], label = '', inline = false } = $props()

  let normalized = $derived(options.map((o) => (typeof o === 'object' ? o : { value: o, label: String(o) })))
</script>

<div>
  {#if label}<span class="ng-label text-muted block mb-2">{label}</span>{/if}
  <div class={inline ? 'flex flex-wrap gap-x-6 gap-y-2' : 'flex flex-col gap-2'}>
    {#each normalized as o (o.value)}
      <button
        type="button"
        onclick={() => (value = o.value)}
        class="inline-flex items-center gap-2.5 cursor-pointer select-none"
      >
        <span
          class={cn(
            'w-5 h-5 border flex items-center justify-center transition-colors shrink-0',
            value === o.value ? 'border-accent' : 'border-line-strong',
          )}
        >
          {#if value === o.value}<span class="w-2.5 h-2.5 bg-accent"></span>{/if}
        </span>
        <span class="text-sm text-ink">{o.label}</span>
      </button>
    {/each}
  </div>
</div>
