<script>
  import NPageHeader from '$lib/components/ui/NPageHeader.svelte'
  import NCard from '$lib/components/ui/NCard.svelte'
  import NButton from '$lib/components/ui/NButton.svelte'
  import NBadge from '$lib/components/ui/NBadge.svelte'
  import NAlert from '$lib/components/ui/NAlert.svelte'
  import NProgress from '$lib/components/ui/NProgress.svelte'
  import NTabs from '$lib/components/ui/NTabs.svelte'
  import NToggle from '$lib/components/ui/NToggle.svelte'
  import NCheckbox from '$lib/components/ui/NCheckbox.svelte'
  import NRadioGroup from '$lib/components/ui/NRadioGroup.svelte'
  import NInput from '$lib/components/ui/NInput.svelte'
  import NSelect from '$lib/components/ui/NSelect.svelte'
  import NDateInput from '$lib/components/ui/NDateInput.svelte'
  import NModal from '$lib/components/ui/NModal.svelte'
  import NAvatar from '$lib/components/ui/NAvatar.svelte'
  import NDropdown from '$lib/components/ui/NDropdown.svelte'
  import NDropdownItem from '$lib/components/ui/NDropdownItem.svelte'
  import { notify } from '$lib/notify'

  const tabs = [
    { value: 'buttons', label: 'Кнопки', icon: 'grid' },
    { value: 'inputs', label: 'Поля', icon: 'form' },
    { value: 'feedback', label: 'Обратная связь', icon: 'bell' },
    { value: 'data', label: 'Данные', icon: 'barChart' },
  ]

  let tab = $state('buttons')
  let toggle1 = $state(true)
  let toggle2 = $state(false)
  let check1 = $state(true)
  let check2 = $state(false)
  let radio = $state('daily')
  let text = $state('')
  let sel = $state('')
  let date = $state('')
  let modal = $state(false)
</script>

<svelte:head><title>Компоненты · NightingaleUI</title></svelte:head>

<div>
  <NPageHeader title="Компоненты" subtitle="Библиотека элементов интерфейса NightingaleUI" />

  <NTabs bind:value={tab} {tabs} class="mb-6" />

  {#if tab === 'buttons'}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <NCard title="Варианты">
        <div class="flex flex-wrap gap-2.5">
          <NButton variant="primary">Основная</NButton>
          <NButton variant="secondary">Вторичная</NButton>
          <NButton variant="subtle">Мягкая</NButton>
          <NButton variant="ghost">Призрак</NButton>
          <NButton variant="danger">Удалить</NButton>
        </div>
      </NCard>

      <NCard title="Размеры и состояния">
        <div class="flex flex-wrap items-center gap-2.5 mb-4">
          <NButton size="sm">Small</NButton>
          <NButton size="md">Medium</NButton>
          <NButton size="lg">Large</NButton>
        </div>
        <div class="flex flex-wrap items-center gap-2.5">
          <NButton icon="plus">С иконкой</NButton>
          <NButton iconRight="arrowRight" variant="secondary">Далее</NButton>
          <NButton loading>Загрузка</NButton>
          <NButton disabled>Выключена</NButton>
        </div>
      </NCard>

      <NCard title="Значки (Badges)">
        <div class="flex flex-wrap gap-2">
          <NBadge>Neutral</NBadge>
          <NBadge variant="accent">Accent</NBadge>
          <NBadge variant="success" dot>Активен</NBadge>
          <NBadge variant="warning" dot>Ожидание</NBadge>
          <NBadge variant="danger" dot>Ошибка</NBadge>
          <NBadge variant="info">Инфо</NBadge>
        </div>
      </NCard>

      <NCard title="Аватары и меню">
        <div class="flex items-center gap-4">
          <NAvatar name="Стив Джобс" size={48} />
          <NAvatar name="Анна Ковалёва" size={48} />
          <NAvatar name="Дмитрий Орлов" size={48} square={false} />
          <NDropdown align="left">
            {#snippet trigger(toggle)}
              <NButton variant="secondary" iconRight="chevronDown" onclick={toggle}>Действия</NButton>
            {/snippet}
            <NDropdownItem icon="edit">Редактировать</NDropdownItem>
            <NDropdownItem icon="download">Экспорт</NDropdownItem>
            <div class="my-1 border-t border-line"></div>
            <NDropdownItem icon="trash" danger>Удалить</NDropdownItem>
          </NDropdown>
        </div>
      </NCard>
    </div>
  {:else if tab === 'inputs'}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <NCard title="Текстовые поля">
        <div class="space-y-4">
          <NInput bind:value={text} label="Имя" placeholder="Введите имя" icon="user" />
          <NInput label="E-mail" placeholder="mail@example.com" icon="mail" hint="Мы продаем Ваш email нашим прекрасным рекламодателям" />
          <NInput label="Пароль" type="password" placeholder="••••••••" icon="lock" error="Слишком короткий пароль" />
          <NSelect bind:value={sel} label="Роль" options={['Администратор', 'Редактор', 'Наблюдатель']} />
          <NDateInput bind:value={date} label="Дата" hint="Я календарь переверну" />
        </div>
      </NCard>

      <NCard title="Переключатели и флажки">
        <div class="space-y-5">
          <div class="space-y-3">
            <NToggle bind:checked={toggle1} label="Push-уведомления" />
            <NToggle bind:checked={toggle2} label="Двухфакторная аутентификация" />
            <NToggle checked={false} label="Отключено" disabled />
          </div>
          <div class="border-t border-line pt-4 space-y-3">
            <NCheckbox bind:checked={check1} label="Принять условия" />
            <NCheckbox bind:checked={check2} label="Подписаться на рассылку и продать свои данные" />
          </div>
          <div class="border-t border-line pt-4">
            <NRadioGroup
              bind:value={radio}
              label="Частота отчётов"
              options={[
                { value: 'daily', label: 'Ежедневно' },
                { value: 'weekly', label: 'Еженедельно' },
                { value: 'monthly', label: 'Ежемесячно' },
              ]}
            />
          </div>
        </div>
      </NCard>
    </div>
  {:else if tab === 'feedback'}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <NCard title="Уведомления (inline)">
        <div class="space-y-3">
          <NAlert variant="info" title="Информация">Новая версия панели уже доступна.</NAlert>
          <NAlert variant="success" title="Успех">Изменения сохранены.</NAlert>
          <NAlert variant="warning" title="Внимание" closable>Срок действия ключа истекает через 3 дня.</NAlert>
          <NAlert variant="danger" title="Ошибка">Не удалось подключиться к серверу.</NAlert>
        </div>
      </NCard>

      <NCard title="Всплывающие окна">
        <p class="text-sm text-muted mb-4">На базе sweetalert2-neutral</p>
        <div class="flex flex-wrap gap-2.5">
          <NButton size="sm" onclick={() => notify.success('Готово!')}>Success</NButton>
          <NButton size="sm" variant="danger" onclick={() => notify.error('Что-то пошло не так')}>Error</NButton>
          <NButton size="sm" variant="secondary" onclick={() => notify.warning('Проверьте данные')}>Warning</NButton>
          <NButton size="sm" variant="subtle" onclick={() => notify.toast('Сохранено в черновики', { icon: 'info' })}>Toast</NButton>
          <NButton size="sm" variant="secondary" onclick={() => (modal = true)}>Модалка</NButton>
        </div>
      </NCard>
    </div>
  {:else}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <NCard title="Прогресс">
        <div class="space-y-4">
          <NProgress value={82} variant="accent" label="Загрузка" showValue />
          <NProgress value={55} variant="success" label="Синхронизация" showValue />
          <NProgress value={30} variant="warning" label="Обработка" showValue />
          <NProgress value={12} variant="danger" label="Ошибки" showValue />
        </div>
      </NCard>
      <NCard title="Карточка с акцентом" accent subtitle="border-l вариант">
        <p class="text-sm text-muted">С акцентной полосой</p>
        <div class="flex gap-2 mt-4">
          <NBadge variant="accent">v1.0</NBadge>
          <NBadge variant="success" dot>стабильно</NBadge>
        </div>
      </NCard>
    </div>
  {/if}

  <NModal bind:open={modal} title="Заголовок окна" subtitle="Подзаголовок окна">
    <p class="text-sm text-muted">
      Модальное окно. Открывается по центру, затемняет фон, закрывается по клику вне области или крестику
    </p>
    <NInput label="Комментарий" placeholder="Оставьте заметку…" class="mt-4" />
    {#snippet footer(close)}
      <NButton variant="ghost" onclick={close}>Отмена</NButton>
      <NButton
        onclick={() => {
          close()
          notify.success('Сохранено')
        }}>Сохранить</NButton
      >
    {/snippet}
  </NModal>
</div>
