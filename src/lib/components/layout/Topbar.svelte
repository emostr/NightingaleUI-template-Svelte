<script>
  import { themeState, toggleTheme } from '$lib/theme.svelte.js'
  import { notify } from '$lib/notify'
  import NIcon from '$lib/components/ui/NIcon.svelte'
  import NAvatar from '$lib/components/ui/NAvatar.svelte'
  import NDropdown from '$lib/components/ui/NDropdown.svelte'
  import NDropdownItem from '$lib/components/ui/NDropdownItem.svelte'

  let { ontoggleSidebar } = $props()

  async function logout() {
    const ok = await notify.confirm({
      title: 'Выйти из аккаунта?',
      text: 'Текущая сессия будет завершена.',
      confirmText: 'Выйти',
      danger: true,
    })
    if (ok) notify.toast('Вы вышли из аккаунта', { icon: 'info' })
  }
</script>

<header class="sticky top-0 z-30 h-16 bg-bg/85 backdrop-blur border-b border-line flex items-center gap-3 px-4 sm:px-6">
  <button
    onclick={ontoggleSidebar}
    class="lg:hidden h-9 w-9 flex items-center justify-center text-muted hover:text-ink cursor-pointer"
  >
    <NIcon name="menu" size={22} />
  </button>

  <div class="relative hidden sm:block w-full max-w-xs">
    <NIcon name="search" size={17} class="absolute left-3 top-1/2 -translate-y-1/2 text-faint pointer-events-none" />
    <input
      type="text"
      placeholder="Поиск…"
      class="w-full h-9 bg-surface-2 border border-line focus:border-accent outline-none pl-9 pr-3 text-sm text-ink placeholder:text-faint transition-colors"
    />
  </div>

  <div class="flex-1"></div>

  <button
    onclick={toggleTheme}
    title={themeState.theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
    class="h-9 w-9 flex items-center justify-center text-muted hover:text-ink hover:bg-surface-2 transition-colors cursor-pointer"
  >
    <NIcon name={themeState.theme === 'dark' ? 'sun' : 'moon'} size={19} />
  </button>

  <NDropdown align="right" width={320}>
    {#snippet trigger(toggle)}
      <button
        onclick={toggle}
        class="relative h-9 w-9 flex items-center justify-center text-muted hover:text-ink hover:bg-surface-2 transition-colors cursor-pointer"
      >
        <NIcon name="bell" size={19} />
        <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent ring-2 ring-bg"></span>
      </button>
    {/snippet}
    <div class="px-3.5 py-2 ng-label text-faint border-b border-line">Уведомления</div>
    <div class="max-h-72 overflow-y-auto">
      <div class="px-3.5 py-3 hover:bg-surface-2 border-b border-line/60 cursor-pointer">
        <div class="text-sm text-ink font-semibold">Новый пользователь</div>
        <div class="text-xs text-muted mt-0.5">Анна Ковалёва зарегистрировалась · 5 мин назад</div>
      </div>
      <div class="px-3.5 py-3 hover:bg-surface-2 border-b border-line/60 cursor-pointer">
        <div class="text-sm text-ink font-semibold">Отчёт готов</div>
        <div class="text-xs text-muted mt-0.5">Экспорт за июль завершён · 1 ч назад</div>
      </div>
      <div class="px-3.5 py-3 hover:bg-surface-2 cursor-pointer">
        <div class="text-sm text-ink font-semibold">Обновление системы</div>
        <div class="text-xs text-muted mt-0.5">Версия 1.4.0 установлена · вчера</div>
      </div>
    </div>
  </NDropdown>

  <div class="w-px h-6 bg-line mx-1 hidden sm:block"></div>

  <NDropdown align="right" width={240}>
    {#snippet trigger(toggle)}
      <button onclick={toggle} class="flex items-center gap-2 pl-1 pr-2 h-9 hover:bg-surface-2 transition-colors cursor-pointer">
        <NAvatar name="Стив Джобс" src="/ProfileIcon.svg" size={30} />
        <NIcon name="chevronDown" size={15} class="text-faint hidden sm:block" />
      </button>
    {/snippet}
    <div class="px-3.5 py-2.5 border-b border-line">
      <div class="text-sm font-bold text-ink">Стив Джобс</div>
      <div class="text-xs text-muted">stevejobs@example.com</div>
    </div>
    <NDropdownItem icon="user">Профиль</NDropdownItem>
    <NDropdownItem icon="settings">Настройки</NDropdownItem>
    <div class="my-1 border-t border-line"></div>
    <NDropdownItem icon="logout" danger onclick={logout}>Выйти</NDropdownItem>
  </NDropdown>
</header>
