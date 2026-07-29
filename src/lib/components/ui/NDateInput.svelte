<script>
  import NIcon from './NIcon.svelte'

  let { value = $bindable(''), label = '', type = 'date', hint = '', disabled = false } = $props()

  let field = $state(null)

  function openPicker() {
    try {
      field?.showPicker?.()
    } catch {}
  }
</script>

<div>
  {#if label}<span class="ng-label text-muted block mb-1.5">{label}</span>{/if}
  <div class="relative group">
    <input
      bind:this={field}
      {type}
      {value}
      {disabled}
      class="ng-date w-full h-11 bg-surface-2 text-ink text-sm border border-line focus:border-accent outline-none pl-3 pr-10 transition-colors disabled:opacity-50 cursor-pointer"
      oninput={(e) => (value = e.currentTarget.value)}
    />
    <button
      type="button"
      tabindex="-1"
      onclick={openPicker}
      class="absolute right-0 top-0 h-11 w-10 flex items-center justify-center text-muted group-focus-within:text-accent hover:text-accent transition-colors cursor-pointer"
    >
      <NIcon name="calendar" size={17} />
    </button>
  </div>
  {#if hint}<p class="text-xs text-faint mt-1.5">{hint}</p>{/if}
</div>
