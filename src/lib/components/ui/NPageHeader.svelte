<script>
  let { title, subtitle = '', actions } = $props()
</script>

<div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
  <div>
    <div class="w-10 h-1 bg-accent mb-3"></div>
    <h1 class="text-2xl sm:text-3xl font-extrabold text-ink tracking-normal">{title}</h1>
    {#if subtitle}<p class="text-muted mt-1 text-sm">{subtitle}</p>{/if}
  </div>
  {#if actions}
    <div class="flex items-center gap-2 shrink-0">{@render actions()}</div>
  {/if}
</div>
