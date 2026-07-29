<script>
  import { cn } from '$lib/cn'
  import NIcon from './NIcon.svelte'

  let {
    value = $bindable(''),
    label = '',
    type = 'text',
    placeholder = '',
    hint = '',
    error = '',
    icon = '',
    disabled = false,
    required = false,
    class: className = '',
  } = $props()

  let fieldClass = $derived(
    cn(
      'w-full h-11 bg-surface-2 text-ink text-sm border transition-colors',
      'placeholder:text-faint outline-none',
      icon ? 'pl-10 pr-3' : 'px-3',
      error ? 'border-danger focus:border-danger' : 'border-line focus:border-accent',
      disabled ? 'opacity-50 pointer-events-none' : '',
    ),
  )
</script>

<div class={className}>
  {#if label}
    <span class="ng-label text-muted block mb-1.5">
      {label}
      {#if required}<span class="text-accent">*</span>{/if}
    </span>
  {/if}
  <div class="relative">
    {#if icon}
      <NIcon name={icon} size={17} class="absolute left-3 top-1/2 -translate-y-1/2 text-faint pointer-events-none" />
    {/if}
    <input
      {type}
      {value}
      {placeholder}
      {disabled}
      class={fieldClass}
      oninput={(e) => (value = e.currentTarget.value)}
    />
  </div>
  {#if error}
    <p class="text-xs text-danger mt-1.5">{error}</p>
  {:else if hint}
    <p class="text-xs text-faint mt-1.5">{hint}</p>
  {/if}
</div>
