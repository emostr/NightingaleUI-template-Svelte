<script>
  import { cn } from '$lib/cn'

  let {
    title = '',
    subtitle = '',
    accent = false,
    padding = true,
    class: className = '',
    header,
    actions,
    footer,
    children,
  } = $props()
</script>

<section class={cn('bg-surface border border-line', accent ? 'border-l-[3px] border-l-accent' : '', className)}>
  {#if title || subtitle || header || actions}
    <header class="flex items-start justify-between gap-4 px-5 py-4 border-b border-line">
      {#if title || subtitle || header}
        <div class="min-w-0">
          {#if header}
            {@render header()}
          {:else}
            <h3 class="text-[15px] font-bold text-ink truncate">{title}</h3>
            {#if subtitle}<p class="text-xs text-muted mt-0.5">{subtitle}</p>{/if}
          {/if}
        </div>
      {/if}
      {#if actions}
        <div class="shrink-0 flex items-center gap-2">{@render actions()}</div>
      {/if}
    </header>
  {/if}
  <div class={padding ? 'p-5' : ''}>
    {@render children?.()}
  </div>
  {#if footer}
    <footer class="px-5 py-3 border-t border-line bg-surface-2/40">{@render footer()}</footer>
  {/if}
</section>
