<script>
  let { points = [], width = 100, height = 32, area = true } = $props()

  let geo = $derived.by(() => {
    if (points.length < 2) return { line: '', fill: '' }
    const min = Math.min(...points)
    const max = Math.max(...points)
    const span = max - min || 1
    const step = width / (points.length - 1)
    const coords = points.map((p, i) => {
      const x = i * step
      const y = height - ((p - min) / span) * (height - 4) - 2
      return [x, y]
    })
    const line = coords.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
    const fill = `${line} L${width},${height} L0,${height} Z`
    return { line, fill }
  })
</script>

<svg viewBox="0 0 {width} {height}" {width} {height} preserveAspectRatio="none" class="overflow-visible">
  {#if area}<path d={geo.fill} fill="var(--ng-accent)" opacity="0.14" />{/if}
  <path d={geo.line} fill="none" stroke="var(--ng-accent)" stroke-width="2" vector-effect="non-scaling-stroke" />
</svg>
