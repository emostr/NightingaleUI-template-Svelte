<script>
  import NPageHeader from '$lib/components/ui/NPageHeader.svelte'
  import NCard from '$lib/components/ui/NCard.svelte'
  import NTile from '$lib/components/ui/NTile.svelte'
  import NButton from '$lib/components/ui/NButton.svelte'
  import NBarChart from '$lib/components/ui/NBarChart.svelte'
  import NSparkline from '$lib/components/ui/NSparkline.svelte'
  import NBadge from '$lib/components/ui/NBadge.svelte'
  import NProgress from '$lib/components/ui/NProgress.svelte'

  const months = [
    { label: 'Янв', value: 320 },
    { label: 'Фев', value: 410 },
    { label: 'Мар', value: 380 },
    { label: 'Апр', value: 520 },
    { label: 'Май', value: 610 },
    { label: 'Июн', value: 540 },
    { label: 'Июл', value: 720, active: true },
  ]

  const spark = [
    [12, 18, 15, 22, 19, 28, 24, 31, 27, 35],
    [40, 32, 36, 28, 30, 22, 26, 18, 20, 14],
    [8, 12, 10, 16, 14, 20, 24, 22, 28, 34],
  ]

  const cards = [
    { label: 'Сессии', value: '48 210', delta: '+9.2%', pts: spark[0] },
    { label: 'Отказы', value: '24.6%', delta: '-2.1%', pts: spark[1] },
    { label: 'Ср. время', value: '3м 42с', delta: '+0.4%', pts: spark[2] },
  ]

  const regions = [
    { name: 'Москва', value: 42, users: '5 240' },
    { name: 'Санкт-Петербург', value: 28, users: '3 480' },
    { name: 'Новосибирск', value: 14, users: '1 720' },
    { name: 'Екатеринбург', value: 9, users: '1 120' },
    { name: 'Прочие', value: 7, users: '920' },
  ]
</script>

<svelte:head><title>Аналитика · NightingaleUI</title></svelte:head>

<div>
  <NPageHeader title="Аналитика" subtitle="Детальная статистика проекта">
    {#snippet actions()}
      <NButton variant="secondary" icon="calendar" size="sm">Июль 2026</NButton>
      <NButton variant="primary" icon="download" size="sm">Отчёт</NButton>
    {/snippet}
  </NPageHeader>

  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
    {#each cards as s, i (i)}
      <NCard>
        <div class="flex items-start justify-between">
          <div>
            <div class="ng-label text-muted">{s.label}</div>
            <div class="text-2xl font-extrabold text-ink mt-1">{s.value}</div>
          </div>
          <NBadge variant="accent">{s.delta}</NBadge>
        </div>
        <div class="mt-3">
          <NSparkline points={s.pts} width={240} height={40} />
        </div>
      </NCard>
    {/each}
  </div>

  <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
    <NCard class="xl:col-span-2" title="Выручка по месяцам" subtitle="Тысячи рублей">
      <NBarChart data={months} height={260} />
    </NCard>
    <NCard title="Ключевые показатели">
      <div class="space-y-4">
        <NTile solid label="Всего дохода" value="₽ 3.5M" icon="card" delta={null} />
        <div class="grid grid-cols-2 gap-3">
          <div class="border border-line p-3">
            <div class="ng-label text-muted">LTV</div>
            <div class="text-lg font-bold text-ink mt-1">₽ 8 420</div>
          </div>
          <div class="border border-line p-3">
            <div class="ng-label text-muted">CAC</div>
            <div class="text-lg font-bold text-ink mt-1">₽ 1 240</div>
          </div>
        </div>
      </div>
    </NCard>
  </div>

  <NCard title="География пользователей" subtitle="Распределение по регионам">
    <div class="space-y-4">
      {#each regions as r (r.name)}
        <div class="flex items-center gap-4">
          <div class="w-40 shrink-0 text-sm font-semibold text-ink">{r.name}</div>
          <div class="flex-1"><NProgress value={r.value} variant="accent" /></div>
          <div class="w-16 text-right text-sm text-muted tabular-nums">{r.value}%</div>
          <div class="w-20 text-right text-sm font-semibold text-ink tabular-nums hidden sm:block">{r.users}</div>
        </div>
      {/each}
    </div>
  </NCard>
</div>
