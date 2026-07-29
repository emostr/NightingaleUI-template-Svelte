<script>
  import { cn } from '$lib/cn'

  let { name = '', src = '', size = 40, square = true } = $props()

  let initials = $derived(
    name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase())
      .join(''),
  )
</script>

<span
  class={cn(
    'inline-flex items-center justify-center overflow-hidden bg-accent text-on-accent font-bold shrink-0',
    square ? '' : 'rounded-full',
  )}
  style="width: {size}px; height: {size}px; font-size: {size * 0.38}px"
>
  {#if src}
    <img {src} alt={name} class="w-full h-full object-cover" />
  {:else}
    {initials}
  {/if}
</span>
