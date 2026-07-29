<script>
  import { themeState, toggleTheme, setAccent, ACCENTS } from '$lib/theme.svelte.js'
  import { cn } from '$lib/cn'
  import NPageHeader from '$lib/components/ui/NPageHeader.svelte'
  import NCard from '$lib/components/ui/NCard.svelte'
  import NButton from '$lib/components/ui/NButton.svelte'
  import NInput from '$lib/components/ui/NInput.svelte'
  import NToggle from '$lib/components/ui/NToggle.svelte'
  import NTabs from '$lib/components/ui/NTabs.svelte'
  import NIcon from '$lib/components/ui/NIcon.svelte'
  import NAvatar from '$lib/components/ui/NAvatar.svelte'
  import { notify } from '$lib/notify'

  const tabs = [
    { value: 'appearance', label: 'Оформление', icon: 'palette' },
    { value: 'account', label: 'Аккаунт', icon: 'user' },
    { value: 'security', label: 'Безопасность', icon: 'lock' },
  ]

  let tab = $state('appearance')
  let prefs = $state({ animations: true, tooltips: true })
  let security = $state({ twoFa: true, sessions: true, alerts: false })
</script>

<svelte:head><title>Настройки · NightingaleUI</title></svelte:head>

<div>
  <NPageHeader title="Настройки" subtitle="Персонализация панели и аккаунта" />

  <NTabs bind:value={tab} {tabs} class="mb-6" />

  {#if tab === 'appearance'}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <NCard title="Тема">
        <div class="grid grid-cols-2 gap-3">
          <button
            onclick={() => themeState.theme !== 'dark' && toggleTheme()}
            class={cn(
              'border p-4 text-left transition-colors ng-tile-press cursor-pointer',
              themeState.theme === 'dark' ? 'border-accent' : 'border-line hover:border-line-strong',
            )}
          >
            <div class="flex items-center justify-between mb-3">
              <NIcon name="moon" size={20} class="text-accent" />
              {#if themeState.theme === 'dark'}<NIcon name="checkCircle" size={18} class="text-accent" />{/if}
            </div>
            <div class="font-bold text-ink text-sm">Тёмная</div>
            <div class="text-xs text-muted">Приоритетная</div>
          </button>
          <button
            onclick={() => themeState.theme !== 'light' && toggleTheme()}
            class={cn(
              'border p-4 text-left transition-colors ng-tile-press cursor-pointer',
              themeState.theme === 'light' ? 'border-accent' : 'border-line hover:border-line-strong',
            )}
          >
            <div class="flex items-center justify-between mb-3">
              <NIcon name="sun" size={20} class="text-accent" />
              {#if themeState.theme === 'light'}<NIcon name="checkCircle" size={18} class="text-accent" />{/if}
            </div>
            <div class="font-bold text-ink text-sm">Светлая</div>
            <div class="text-xs text-muted">Дополнительная</div>
          </button>
        </div>
      </NCard>

      <NCard title="Акцентный цвет">
        <div class="grid grid-cols-3 gap-3">
          {#each ACCENTS as a (a.id)}
            <button
              onclick={() => setAccent(a.id)}
              style="background: {a.hex}"
              class={cn(
                'relative h-16 border-2 transition-all ng-tile-press cursor-pointer flex items-end p-2',
                themeState.accent === a.id ? 'border-ink' : 'border-transparent hover:border-line-strong',
              )}
            >
              <span class="text-[11px] font-bold text-white mix-blend-difference">{a.label}</span>
              {#if themeState.accent === a.id}
                <NIcon name="check" size={18} stroke={3} class="absolute top-2 right-2 text-white mix-blend-difference" />
              {/if}
            </button>
          {/each}
        </div>
      </NCard>

      <NCard title="Интерфейс" class="lg:col-span-2">
        <div class="divide-y divide-line">
          <div class="flex items-center justify-between py-3">
            <div>
              <div class="font-semibold text-ink text-sm">Анимации</div>
              <div class="text-xs text-muted">Переходы и эффекты движения</div>
            </div>
            <NToggle bind:checked={prefs.animations} />
          </div>
          <div class="flex items-center justify-between py-3">
            <div>
              <div class="font-semibold text-ink text-sm">Подсказки</div>
              <div class="text-xs text-muted">Всплывающие подсказки при наведении</div>
            </div>
            <NToggle bind:checked={prefs.tooltips} />
          </div>
        </div>
      </NCard>
    </div>
  {:else if tab === 'account'}
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <NCard title="Аватар" class="lg:col-span-1">
        <div class="flex flex-col items-center text-center gap-4 py-2">
          <NAvatar name="Стив Джобс" src="/ProfileIcon.svg" size={88} />
          <div>
            <div class="font-bold text-ink">Стив Джобс</div>
            <div class="text-xs text-muted">Администратор</div>
          </div>
          <NButton variant="secondary" size="sm" icon="download">Загрузить фото</NButton>
        </div>
      </NCard>
      <NCard title="Личные данные" class="lg:col-span-2" accent>
        {#snippet footer()}
          <div class="flex justify-end">
            <NButton icon="check" onclick={() => notify.success('Данные обновлены')}>Сохранить</NButton>
          </div>
        {/snippet}
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NInput label="Имя" value="Стив" icon="user" />
          <NInput label="Фамилия" value="Джобс" />
          <NInput label="E-mail" value="stevejobs@example.com" icon="mail" />
          <NInput label="Телефон" value="+7 900 000-00-00" />
        </div>
      </NCard>
    </div>
  {:else}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <NCard title="Смена пароля">
        {#snippet footer()}
          <div class="flex justify-end">
            <NButton icon="lock" onclick={() => notify.success('Пароль изменён')}>Обновить пароль</NButton>
          </div>
        {/snippet}
        <div class="space-y-4">
          <NInput label="Текущий пароль" type="password" placeholder="••••••••" icon="lock" />
          <NInput label="Новый пароль" type="password" placeholder="••••••••" icon="lock" hint="Минимум 8 символов" />
          <NInput label="Повторите пароль" type="password" placeholder="••••••••" icon="lock" />
        </div>
      </NCard>
      <NCard title="Безопасность">
        <div class="divide-y divide-line">
          <div class="flex items-center justify-between py-3">
            <div>
              <div class="font-semibold text-ink text-sm">Двухфакторная аутентификация</div>
              <div class="text-xs text-muted">Дополнительная защита входа</div>
            </div>
            <NToggle bind:checked={security.twoFa} />
          </div>
          <div class="flex items-center justify-between py-3">
            <div>
              <div class="font-semibold text-ink text-sm">Активные сессии</div>
              <div class="text-xs text-muted">Выход при подозрительной активности</div>
            </div>
            <NToggle bind:checked={security.sessions} />
          </div>
          <div class="flex items-center justify-between py-3">
            <div>
              <div class="font-semibold text-ink text-sm">Оповещения о входе</div>
              <div class="text-xs text-muted">Письмо при новом устройстве</div>
            </div>
            <NToggle bind:checked={security.alerts} />
          </div>
        </div>
      </NCard>
    </div>
  {/if}
</div>
