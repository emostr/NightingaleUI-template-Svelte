<script>
  import NIcon from './NIcon.svelte'

  let {
    value = $bindable(''),
    label = '',
    options = [],
    placeholder = 'Выберите…',
    hint = '',
    disabled = false,
  } = $props()

  let normalized = $derived(options.map((o) => (typeof o === 'object' ? o : { value: o, label: String(o) })))
</script>

<div>
  {#if label}<span class="ng-label text-muted block mb-1.5">{label}</span>{/if}
  <div class="relative">
    <select
      bind:value
      {disabled}
      class="w-full h-11 bg-surface-2 text-ink text-sm border border-line focus:border-accent outline-none px-3 pr-9 appearance-none cursor-pointer transition-colors disabled:opacity-50"
    >
      <option value="" disabled>{placeholder}</option>
      {#each normalized as o (o.value)}
        <option value={o.value}>{o.label}</option>
      {/each}
    </select>
    <NIcon name="chevronDown" size={16} class="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
  </div>
  {#if hint}<p class="text-xs text-faint mt-1.5">{hint}</p>{/if}
</div>
