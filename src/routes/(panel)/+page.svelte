<script>
  import NPageHeader from '$lib/components/ui/NPageHeader.svelte'
  import NTile from '$lib/components/ui/NTile.svelte'
  import NCard from '$lib/components/ui/NCard.svelte'
  import NButton from '$lib/components/ui/NButton.svelte'
  import NBadge from '$lib/components/ui/NBadge.svelte'
  import NBarChart from '$lib/components/ui/NBarChart.svelte'
  import NProgress from '$lib/components/ui/NProgress.svelte'
  import NAvatar from '$lib/components/ui/NAvatar.svelte'
  import NIcon from '$lib/components/ui/NIcon.svelte'
  import { notify } from '$lib/notify'
  import { cn } from '$lib/cn'

  const stats = [
    { label: 'Выручка', value: '₽ 4.82M', icon: 'card', delta: '+12.4%', trend: 'up', solid: true },
    { label: 'Пользователи', value: '12 480', icon: 'users', delta: '+3.1%', trend: 'up' },
    { label: 'Заказы', value: '2 314', icon: 'box', delta: '+8.7%', trend: 'up' },
    { label: 'Возвраты', value: '48', icon: 'refresh', delta: '-1.9%', trend: 'down' },
  ]

  const chart = [
    { label: 'Пн', value: 42 },
    { label: 'Вт', value: 58 },
    { label: 'Ср', value: 36 },
    { label: 'Чт', value: 71 },
    { label: 'Пт', value: 89, active: true },
    { label: 'Сб', value: 64 },
    { label: 'Вс', value: 51 },
  ]

  const channels = [
    { label: 'Прямые', value: 68, variant: 'accent' },
    { label: 'Поиск', value: 52, variant: 'success' },
    { label: 'Соцсети', value: 37, variant: 'warning' },
    { label: 'Реклама', value: 21, variant: 'danger' },
  ]

  const activity = [
    { name: 'Анна Ковалёва', action: 'создала заказ #2314', time: '5 мин', color: 'success' },
    { name: 'Дмитрий Орлов', action: 'обновил профиль', time: '18 мин', color: 'accent' },
    { name: 'Мария Зайцева', action: 'оставила отзыв', time: '42 мин', color: 'warning' },
    { name: 'Игорь Соколов', action: 'отменил подписку', time: '1 ч', color: 'danger' },
    { name: 'Ольга Белова', action: 'зарегистрировалась', time: '2 ч', color: 'accent' },
  ]

  const dotColor = { success: 'bg-success', accent: 'bg-accent', warning: 'bg-warning', danger: 'bg-danger' }
</script>

<svelte:head><title>Дашборд · NightingaleUI</title></svelte:head>

<div>
  <NPageHeader title="Дашборд" subtitle="Сводка за последние 7 дней">
    {#snippet actions()}
      <NButton variant="secondary" icon="download" size="sm">Экспорт</NButton>
      <NButton variant="primary" icon="plus" size="sm" onclick={() => notify.success('Виджет добавлен')}>Виджет</NButton>
    {/snippet}
  </NPageHeader>

  <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
    {#each stats as s (s.label)}
      <NTile {...s} />
    {/each}
  </div>

  <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
    <NCard class="xl:col-span-2" title="Активность за неделю" subtitle="Количество событий по дням">
      {#snippet actions()}
        <NBadge variant="success" dot>+18%</NBadge>
      {/snippet}
      <NBarChart data={chart} height={240} />
    </NCard>

    <NCard title="Источники трафика">
      {#snippet footer()}
        <div class="flex items-center justify-between text-sm">
          <span class="text-muted">Конверсия</span>
          <span class="font-bold text-ink">4.62%</span>
        </div>
      {/snippet}
      <div class="space-y-4">
        {#each channels as c (c.label)}
          <NProgress value={c.value} variant={c.variant} label={c.label} showValue />
        {/each}
      </div>
    </NCard>
  </div>

  <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
    <NCard class="xl:col-span-2" title="Последняя активность" subtitle="Действия пользователей в реальном времени" padding={false}>
      {#snippet footer()}
        <a href="/users" class="text-sm text-accent font-semibold hover:underline inline-flex items-center gap-1">
          Все пользователи <NIcon name="arrowRight" size={15} />
        </a>
      {/snippet}
      <div class="divide-y divide-line">
        {#each activity as a, i (i)}
          <div class="flex items-center gap-3 px-5 py-3.5 hover:bg-surface-2 transition-colors">
            <NAvatar name={a.name} size={36} />
            <div class="flex-1 min-w-0">
              <p class="text-sm text-ink truncate"><span class="font-semibold">{a.name}</span> {a.action}</p>
            </div>
            <span class={cn('w-2 h-2 shrink-0', dotColor[a.color])}></span>
            <span class="text-xs text-faint whitespace-nowrap">{a.time}</span>
          </div>
        {/each}
      </div>
    </NCard>

    <div class="space-y-4">
      <NTile label="Нагрузка сервера" value="63%" icon="activity" delta={null} solid />
      <NCard title="Хранилище">
        <div class="space-y-3">
          <NProgress value={72} variant="accent" label="Диск" showValue />
          <NProgress value={45} variant="warning" label="База данных" showValue />
          <NProgress value={88} variant="danger" label="Резервные копии" showValue />
        </div>
      </NCard>
    </div>
  </div>
</div>
