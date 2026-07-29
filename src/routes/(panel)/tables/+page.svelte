<script>
  import NPageHeader from '$lib/components/ui/NPageHeader.svelte'
  import NCard from '$lib/components/ui/NCard.svelte'
  import NTable from '$lib/components/ui/NTable.svelte'
  import NBadge from '$lib/components/ui/NBadge.svelte'
  import NButton from '$lib/components/ui/NButton.svelte'
  import NCheckbox from '$lib/components/ui/NCheckbox.svelte'
  import NProgress from '$lib/components/ui/NProgress.svelte'
  import { cn } from '$lib/cn'

  const orderCols = [
    { key: 'id', label: '№', width: '80px' },
    { key: 'customer', label: 'Клиент' },
    { key: 'total', label: 'Сумма', align: 'right' },
    { key: 'status', label: 'Статус' },
    { key: 'date', label: 'Дата', align: 'right' },
  ]

  const orders = [
    { id: '#2314', customer: 'Анна Ковалёва', total: '₽ 12 400', status: 'paid', date: '20.07.2026' },
    { id: '#2313', customer: 'Дмитрий Орлов', total: '₽ 3 250', status: 'processing', date: '20.07.2026' },
    { id: '#2312', customer: 'Мария Зайцева', total: '₽ 8 900', status: 'shipped', date: '19.07.2026' },
    { id: '#2311', customer: 'Игорь Соколов', total: '₽ 1 100', status: 'refunded', date: '19.07.2026' },
    { id: '#2310', customer: 'Ольга Белова', total: '₽ 24 800', status: 'paid', date: '18.07.2026' },
  ]

  const orderStatus = {
    paid: { variant: 'success', label: 'Оплачен' },
    processing: { variant: 'warning', label: 'В обработке' },
    shipped: { variant: 'info', label: 'Отправлен' },
    refunded: { variant: 'danger', label: 'Возврат' },
  }

  const projectCols = [
    { key: 'check', label: '', width: '48px' },
    { key: 'name', label: 'Проект' },
    { key: 'progress', label: 'Прогресс', width: '200px' },
    { key: 'lead', label: 'Ответственный' },
  ]

  let projects = $state([
    { id: 1, name: 'Редизайн панели', progress: 82, lead: 'А. Ковалёва', done: false },
    { id: 2, name: 'API v2', progress: 46, lead: 'Д. Орлов', done: false },
    { id: 3, name: 'Мобильное приложение', progress: 100, lead: 'М. Зайцева', done: true },
    { id: 4, name: 'Документация', progress: 23, lead: 'О. Белова', done: false },
  ])
</script>

<svelte:head><title>Таблицы · NightingaleUI</title></svelte:head>

<div>
  <NPageHeader title="Таблицы" subtitle="Варианты представления табличных данных">
    {#snippet actions()}
      <NButton variant="secondary" icon="filter" size="sm">Фильтры</NButton>
      <NButton variant="secondary" icon="download" size="sm">Экспорт</NButton>
    {/snippet}
  </NPageHeader>

  <div class="space-y-6">
    <NCard title="Последние заказы" subtitle="Стандартная таблица" padding={false}>
      <NTable columns={orderCols} rows={orders}>
        {#snippet cell(row, key)}
          {#if key === 'id'}
            <span class="font-mono text-muted">{row.id}</span>
          {:else if key === 'customer'}
            <span class="font-semibold text-ink">{row.customer}</span>
          {:else if key === 'total'}
            <span class="font-bold text-ink tabular-nums">{row.total}</span>
          {:else if key === 'status'}
            <NBadge variant={orderStatus[row.status].variant} dot>{orderStatus[row.status].label}</NBadge>
          {:else if key === 'date'}
            <span class="text-muted text-sm">{row.date}</span>
          {:else}
            {row[key]}
          {/if}
        {/snippet}
      </NTable>
    </NCard>

    <NCard title="Проекты" subtitle="Таблица с чекбоксами и прогрессом" padding={false}>
      <NTable columns={projectCols} rows={projects}>
        {#snippet cell(row, key)}
          {#if key === 'check'}
            <NCheckbox bind:checked={row.done} />
          {:else if key === 'name'}
            <span class={cn('font-semibold', row.done ? 'text-faint line-through' : 'text-ink')}>{row.name}</span>
          {:else if key === 'progress'}
            <div class="flex items-center gap-2">
              <NProgress value={row.progress} variant={row.progress === 100 ? 'success' : 'accent'} class="flex-1" />
              <span class="text-xs font-bold text-muted tabular-nums w-9 text-right">{row.progress}%</span>
            </div>
          {:else if key === 'lead'}
            <span class="text-muted text-sm">{row.lead}</span>
          {:else}
            {row[key]}
          {/if}
        {/snippet}
      </NTable>
    </NCard>
  </div>
</div>
