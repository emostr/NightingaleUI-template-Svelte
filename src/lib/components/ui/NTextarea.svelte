<script>
  import { cn } from '$lib/cn'

  let {
    value = $bindable(''),
    label = '',
    placeholder = '',
    hint = '',
    error = '',
    rows = 4,
    disabled = false,
    class: className = '',
  } = $props()

  let fieldClass = $derived(
    cn(
      'w-full bg-surface-2 text-ink text-sm border px-3 py-2.5 resize-y transition-colors',
      'placeholder:text-faint outline-none',
      error ? 'border-danger focus:border-danger' : 'border-line focus:border-accent',
      disabled ? 'opacity-50 pointer-events-none' : '',
    ),
  )
</script>

<div class={className}>
  {#if label}<span class="ng-label text-muted block mb-1.5">{label}</span>{/if}
  <textarea {value} {rows} {placeholder} {disabled} class={fieldClass} oninput={(e) => (value = e.currentTarget.value)}
  ></textarea>
  {#if error}
    <p class="text-xs text-danger mt-1.5">{error}</p>
  {:else if hint}
    <p class="text-xs text-faint mt-1.5">{hint}</p>
  {/if}
</div>
