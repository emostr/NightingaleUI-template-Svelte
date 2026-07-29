<script>
  import NPageHeader from '$lib/components/ui/NPageHeader.svelte'
  import NCard from '$lib/components/ui/NCard.svelte'
  import NButton from '$lib/components/ui/NButton.svelte'
  import NBadge from '$lib/components/ui/NBadge.svelte'
  import NTable from '$lib/components/ui/NTable.svelte'
  import NAvatar from '$lib/components/ui/NAvatar.svelte'
  import NInput from '$lib/components/ui/NInput.svelte'
  import NSelect from '$lib/components/ui/NSelect.svelte'
  import NModal from '$lib/components/ui/NModal.svelte'
  import NDropdown from '$lib/components/ui/NDropdown.svelte'
  import NDropdownItem from '$lib/components/ui/NDropdownItem.svelte'
  import { notify } from '$lib/notify'

  const columns = [
    { key: 'user', label: 'Пользователь' },
    { key: 'role', label: 'Роль' },
    { key: 'status', label: 'Статус' },
    { key: 'joined', label: 'Регистрация' },
    { key: 'actions', label: '', align: 'right', width: '56px' },
  ]

  const statusMap = {
    active: { variant: 'success', label: 'Активен' },
    pending: { variant: 'warning', label: 'Ожидание' },
    blocked: { variant: 'danger', label: 'Заблокирован' },
  }

  let users = $state([
    { id: 1, name: 'Анна Ковалёва', email: 'anna@example.com', role: 'Администратор', status: 'active', joined: '12.03.2024' },
    { id: 2, name: 'Дмитрий Орлов', email: 'dmitry@example.com', role: 'Редактор', status: 'active', joined: '28.05.2024' },
    { id: 3, name: 'Мария Зайцева', email: 'maria@example.com', role: 'Наблюдатель', status: 'pending', joined: '03.07.2024' },
    { id: 4, name: 'Игорь Соколов', email: 'igor@example.com', role: 'Редактор', status: 'blocked', joined: '19.01.2024' },
    { id: 5, name: 'Ольга Белова', email: 'olga@example.com', role: 'Наблюдатель', status: 'active', joined: '22.06.2024' },
    { id: 6, name: 'Павел Морозов', email: 'pavel@example.com', role: 'Администратор', status: 'active', joined: '08.02.2024' },
  ])

  let query = $state('')
  let roleFilter = $state('')
  let modal = $state(false)

  let filtered = $derived(
    users.filter(
      (u) =>
        (u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase())) &&
        (!roleFilter || u.role === roleFilter),
    ),
  )

  async function remove(u) {
    const ok = await notify.confirm({
      title: `Удалить ${u.name}?`,
      text: 'Пользователь будет удалён без возможности восстановления.',
      confirmText: 'Удалить',
      danger: true,
    })
    if (ok) {
      users = users.filter((x) => x.id !== u.id)
      notify.toast('Пользователь удалён', { icon: 'success' })
    }
  }

  function create() {
    modal = false
    notify.success('Пользователь приглашён')
  }
</script>

<svelte:head><title>Пользователи · NightingaleUI</title></svelte:head>

<div>
  <NPageHeader title="Пользователи" subtitle="Управление участниками и правами доступа">
    {#snippet actions()}
      <NButton variant="primary" icon="plus" size="sm" onclick={() => (modal = true)}>Добавить</NButton>
    {/snippet}
  </NPageHeader>

  <NCard padding={false}>
    {#snippet header()}
      <div class="flex flex-col sm:flex-row gap-3 w-full">
        <div class="w-full sm:max-w-xs">
          <NInput bind:value={query} placeholder="Поиск по имени или почте…" icon="search" />
        </div>
        <div class="w-full sm:w-48">
          <NSelect bind:value={roleFilter} placeholder="Все роли" options={['Администратор', 'Редактор', 'Наблюдатель']} />
        </div>
      </div>
    {/snippet}
    {#snippet footer()}
      <div class="flex items-center justify-between text-sm">
        <span class="text-muted">Показано {filtered.length} из {users.length}</span>
        <div class="flex items-center gap-1">
          <NButton variant="ghost" size="sm" icon="chevronLeft" />
          <span class="px-2 text-muted">1 / 1</span>
          <NButton variant="ghost" size="sm" icon="chevronRight" />
        </div>
      </div>
    {/snippet}

    <NTable {columns} rows={filtered}>
      {#snippet cell(row, key)}
        {#if key === 'user'}
          <div class="flex items-center gap-3">
            <NAvatar name={row.name} size={36} />
            <div>
              <div class="font-semibold text-ink">{row.name}</div>
              <div class="text-xs text-muted">{row.email}</div>
            </div>
          </div>
        {:else if key === 'role'}
          <NBadge variant="neutral">{row.role}</NBadge>
        {:else if key === 'status'}
          <NBadge variant={statusMap[row.status].variant} dot>{statusMap[row.status].label}</NBadge>
        {:else if key === 'joined'}
          <span class="text-muted text-sm">{row.joined}</span>
        {:else if key === 'actions'}
          <NDropdown align="right">
            <NDropdownItem icon="edit">Редактировать</NDropdownItem>
            <NDropdownItem icon="mail">Написать</NDropdownItem>
            <div class="my-1 border-t border-line"></div>
            <NDropdownItem icon="trash" danger onclick={() => remove(row)}>Удалить</NDropdownItem>
          </NDropdown>
        {:else}
          {row[key]}
        {/if}
      {/snippet}
    </NTable>
  </NCard>

  <NModal bind:open={modal} title="Новый пользователь" subtitle="Отправьте приглашение по e-mail">
    <div class="space-y-4">
      <NInput label="Имя" placeholder="Иван Иванов" icon="user" />
      <NInput label="E-mail" placeholder="mail@example.com" icon="mail" />
      <NSelect label="Роль" options={['Администратор', 'Редактор', 'Наблюдатель']} />
    </div>
    {#snippet footer(close)}
      <NButton variant="ghost" onclick={close}>Отмена</NButton>
      <NButton icon="mail" onclick={create}>Пригласить</NButton>
    {/snippet}
  </NModal>
</div>
