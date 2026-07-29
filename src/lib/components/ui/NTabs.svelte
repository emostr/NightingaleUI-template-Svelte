<script>
  import { cn } from '$lib/cn'
  import NIcon from './NIcon.svelte'

  let { value = $bindable(''), tabs = [], class: className = '' } = $props()

  let normalized = $derived(tabs.map((t) => (typeof t === 'object' ? t : { value: t, label: String(t) })))
</script>

<div class={cn('flex items-stretch gap-1 border-b border-line overflow-x-auto', className)}>
  {#each normalized as t (t.value)}
    <button
      onclick={() => (value = t.value)}
      class={cn(
        'relative inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer',
        value === t.value ? 'text-ink' : 'text-muted hover:text-ink',
      )}
    >
      {#if t.icon}<NIcon name={t.icon} size={16} />{/if}
      {t.label}
      {#if t.badge != null}
        <span class="text-[10px] font-bold bg-surface-3 text-muted px-1.5 py-0.5">{t.badge}</span>
      {/if}
      {#if value === t.value}
        <span class="absolute left-0 right-0 -bottom-px h-0.5 bg-accent"></span>
      {/if}
    </button>
  {/each}
</div>
