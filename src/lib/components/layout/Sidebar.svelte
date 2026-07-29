<script>
  import { page } from '$app/state'
  import { cn } from '$lib/cn'
  import NIcon from '$lib/components/ui/NIcon.svelte'
  import NAvatar from '$lib/components/ui/NAvatar.svelte'
  import NBadge from '$lib/components/ui/NBadge.svelte'

  let { open = false, onclose } = $props()

  const sections = [
    {
      title: 'Обзор',
      links: [
        { to: '/', label: 'Дашборд', icon: 'dashboard' },
        { to: '/analytics', label: 'Аналитика', icon: 'barChart' },
      ],
    },
    {
      title: 'Управление',
      links: [
        { to: '/users', label: 'Пользователи', icon: 'users', badge: '128' },
        { to: '/tables', label: 'Таблицы', icon: 'table' },
        { to: '/forms', label: 'Формы', icon: 'form' },
      ],
    },
    {
      title: 'Интерфейс',
      links: [
        { to: '/components', label: 'Компоненты', icon: 'grid' },
        { to: '/notifications', label: 'Уведомления', icon: 'bell' },
        { to: '/settings', label: 'Настройки', icon: 'settings' },
      ],
    },
  ]
</script>

<aside
  class={cn(
    'fixed lg:sticky top-0 left-0 z-40 h-screen w-64 shrink-0 bg-bg border-r border-line flex flex-col transition-transform duration-200 lg:translate-x-0',
    open ? 'translate-x-0' : '-translate-x-full',
  )}
>
  <div class="h-16 flex items-center gap-2.5 px-5 border-b border-line shrink-0">
    <span class="w-8 h-8 bg-accent flex items-center justify-center shrink-0">
      <span class="w-3.5 h-3.5 bg-bg"></span>
    </span>
    <div class="leading-tight">
      <div class="font-extrabold text-ink tracking-normal">Nightingale<span class="text-accent">UI</span></div>
    </div>
  </div>

  <nav class="flex-1 overflow-y-auto px-3 py-4 space-y-6">
    {#each sections as sec (sec.title)}
      <div>
        <div class="ng-label text-faint px-3 mb-1.5">{sec.title}</div>
        {#each sec.links as link (link.to)}
          <a
            href={link.to}
            onclick={onclose}
            class={cn(
              'group flex items-center gap-3 px-3 py-2.5 text-sm border-l-2 transition-colors',
              page.url.pathname === link.to
                ? 'text-ink bg-surface-2 border-accent font-semibold'
                : 'text-muted border-transparent hover:text-ink hover:bg-surface-2',
            )}
          >
            <NIcon name={link.icon} size={18} class="shrink-0" />
            <span class="flex-1">{link.label}</span>
            {#if link.badge}<NBadge variant="accent">{link.badge}</NBadge>{/if}
          </a>
        {/each}
      </div>
    {/each}
  </nav>

  <div class="border-t border-line p-3 shrink-0">
    <a href="/settings" onclick={onclose} class="flex items-center gap-3 p-2 hover:bg-surface-2 transition-colors">
      <NAvatar name="Стив Джобс" src="/ProfileIcon.svg" size={38} />
      <div class="min-w-0 flex-1 leading-tight">
        <div class="text-sm font-bold text-ink truncate">Стив Джобс</div>
        <div class="text-[11px] text-accent font-semibold uppercase tracking-normal">Администратор</div>
      </div>
      <NIcon name="chevronRight" size={16} class="text-faint" />
    </a>
  </div>
</aside>
