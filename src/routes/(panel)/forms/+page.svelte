<script>
  import NPageHeader from '$lib/components/ui/NPageHeader.svelte'
  import NCard from '$lib/components/ui/NCard.svelte'
  import NButton from '$lib/components/ui/NButton.svelte'
  import NInput from '$lib/components/ui/NInput.svelte'
  import NTextarea from '$lib/components/ui/NTextarea.svelte'
  import NSelect from '$lib/components/ui/NSelect.svelte'
  import NDateInput from '$lib/components/ui/NDateInput.svelte'
  import NToggle from '$lib/components/ui/NToggle.svelte'
  import NCheckbox from '$lib/components/ui/NCheckbox.svelte'
  import NRadioGroup from '$lib/components/ui/NRadioGroup.svelte'
  import { notify } from '$lib/notify'

  const emptyForm = {
    name: '',
    email: '',
    company: '',
    country: '',
    birthday: '',
    bio: '',
    plan: 'pro',
    newsletter: true,
    terms: false,
  }

  let form = $state({ ...emptyForm })

  async function submit() {
    if (!form.terms) {
      notify.warning('Примите условия использования')
      return
    }
    notify.success('Профиль сохранён', { text: 'Все изменения применены.' })
  }

  async function reset() {
    const ok = await notify.confirm({
      title: 'Сбросить форму?',
      text: 'Введённые данные будут очищены.',
      confirmText: 'Сбросить',
      danger: true,
    })
    if (ok) {
      form = { ...emptyForm }
      notify.toast('Форма очищена', { icon: 'info' })
    }
  }
</script>

<svelte:head><title>Формы · NightingaleUI</title></svelte:head>

<div>
  <NPageHeader title="Формы" subtitle="Компоновка полей и валидация" />

  <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
    <div class="xl:col-span-2 space-y-6">
      <NCard accent title="Профиль" subtitle="Основные данные аккаунта">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NInput bind:value={form.name} label="Имя" placeholder="Иван Иванов" icon="user" required />
          <NInput bind:value={form.email} label="E-mail" type="email" placeholder="mail@example.com" icon="mail" required />
          <NInput bind:value={form.company} label="Компания" placeholder="ООО «Тмыв денег»" icon="box" />
          <NSelect bind:value={form.country} label="Страна" options={['Россия', 'Беларусь', 'Украина', 'Казахстан']} />
          <NDateInput bind:value={form.birthday} label="Дата рождения" hint="Я календарь я календарь я календарь я календарь" />
        </div>
        <div class="mt-4">
          <NTextarea bind:value={form.bio} label="О себе" placeholder="Коротко о себе…" rows={4} hint="Максимум 240 символов" />
        </div>
      </NCard>

      <NCard title="Предпочтения">
        {#snippet footer()}
          <div class="flex items-center justify-end gap-2">
            <NButton variant="ghost" onclick={reset}>Сбросить</NButton>
            <NButton icon="check" onclick={submit}>Сохранить</NButton>
          </div>
        {/snippet}
        <div class="space-y-5">
          <NRadioGroup
            bind:value={form.plan}
            label="Тарифный план"
            inline
            options={[
              { value: 'free', label: 'Бесплатный' },
              { value: 'pro', label: 'Pro' },
              { value: 'team', label: 'Команда' },
            ]}
          />
          <div class="border-t border-line pt-5 space-y-3">
            <NToggle bind:checked={form.newsletter} label="Получать новости и обновления" />
            <NCheckbox bind:checked={form.terms} label="Я принимаю условия использования" />
          </div>
        </div>
      </NCard>
    </div>

    <div class="space-y-6">
      <NCard title="Состояния полей">
        <div class="space-y-4">
          <NInput label="Обычное" placeholder="Введите текст" />
          <NInput label="С подсказкой" placeholder="user@mail.com" hint="Используется для входа" />
          <NInput label="С ошибкой" value="123" error="Минимум 8 символов" />
          <NInput label="Отключено" value="Только чтение" disabled />
        </div>
      </NCard>

      <NCard title="Предпросмотр" subtitle="Живые данные формы">
        <pre class="text-xs text-muted bg-surface-2 border border-line p-3 overflow-x-auto">{JSON.stringify(form, null, 2)}</pre>
      </NCard>
    </div>
  </div>
</div>
