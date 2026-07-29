<script>
  import NPageHeader from '$lib/components/ui/NPageHeader.svelte'
  import NCard from '$lib/components/ui/NCard.svelte'
  import NButton from '$lib/components/ui/NButton.svelte'
  import NAlert from '$lib/components/ui/NAlert.svelte'
  import { notify } from '$lib/notify'

  async function doConfirm() {
    const ok = await notify.confirm({
      title: 'Удалить проект?',
      text: 'Все связанные данные будут потеряны.',
      confirmText: 'Удалить',
      danger: true,
    })
    notify[ok ? 'success' : 'info'](ok ? 'Проект удалён' : 'Отменено')
  }

  async function doPrompt() {
    const name = await notify.prompt({
      title: 'Новая папка',
      inputLabel: 'Название',
      placeholder: 'Без названия',
    })
    if (name) notify.toast(`Создано: ${name}`)
  }
</script>

<svelte:head><title>Уведомления · NightingaleUI</title></svelte:head>

<div>
  <NPageHeader title="Уведомления" subtitle="Всплывающие окна на базе sweetalert2-neutral" />

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <NCard title="Таймерные попапы" subtitle="Появляются сверху, исчезают сами">
      <div class="flex flex-wrap gap-2.5">
        <NButton icon="check" onclick={() => notify.success('Операция выполнена')}>Success</NButton>
        <NButton variant="danger" icon="close" onclick={() => notify.error('Произошла ошибка', { text: 'Попробуйте позже.' })}>Error</NButton>
        <NButton variant="secondary" icon="alert" onclick={() => notify.warning('Требуется внимание')}>Warning</NButton>
        <NButton variant="subtle" icon="info" onclick={() => notify.info('Доступно обновление')}>Info</NButton>
      </div>
    </NCard>

    <NCard title="Тосты" subtitle="Уголок экрана, компактные">
      <div class="flex flex-wrap gap-2.5">
        <NButton variant="secondary" onclick={() => notify.toast('Сохранено')}>Успех</NButton>
        <NButton variant="secondary" onclick={() => notify.toast('Скопировано в буфер', { icon: 'info' })}>Инфо</NButton>
        <NButton variant="secondary" onclick={() => notify.toast('Проверьте соединение', { icon: 'warning' })}>Внимание</NButton>
        <NButton variant="secondary" onclick={() => notify.toast('Не удалось', { icon: 'error' })}>Ошибка</NButton>
      </div>
    </NCard>

    <NCard title="Диалоги" subtitle="Требуют ответа пользователя">
      <div class="flex flex-wrap gap-2.5">
        <NButton variant="danger" icon="trash" onclick={doConfirm}>Confirm (удаление)</NButton>
        <NButton variant="secondary" icon="edit" onclick={doPrompt}>Prompt (ввод)</NButton>
      </div>
    </NCard>

    <NCard title="Встроенные уведомления">
      <div class="space-y-3">
        <NAlert variant="info">Панель работает в демо-режиме — данные не сохраняются.</NAlert>
        <NAlert variant="success" title="Синхронизировано" closable>Последнее обновление: только что.</NAlert>
        <NAlert variant="danger" title="Ошибка соединения">Проверьте настройки сети.</NAlert>
      </div>
    </NCard>
  </div>
</div>
