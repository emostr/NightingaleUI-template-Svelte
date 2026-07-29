<script>
  import { goto } from '$app/navigation'
  import NInput from '$lib/components/ui/NInput.svelte'
  import NButton from '$lib/components/ui/NButton.svelte'
  import NCheckbox from '$lib/components/ui/NCheckbox.svelte'
  import { notify } from '$lib/notify'

  let email = $state('stevejobs@example.com')
  let password = $state('')
  let remember = $state(true)
  let loading = $state(false)

  function submit(e) {
    e.preventDefault()
    loading = true
    setTimeout(() => {
      loading = false
      notify.toast('Вход выполнен', { icon: 'success' })
      goto('/')
    }, 900)
  }
</script>

<svelte:head><title>Вход · NightingaleUI</title></svelte:head>

<div class="min-h-screen grid lg:grid-cols-2 bg-bg">
  <div class="hidden lg:flex flex-col justify-between p-12 bg-accent text-on-accent relative overflow-hidden">
    <div class="absolute -right-16 -top-16 w-72 h-72 border-[24px] border-on-accent/10"></div>
    <div class="absolute right-20 bottom-24 w-40 h-40 bg-on-accent/10"></div>
    <div class="flex items-center gap-2.5 relative">
      <span class="w-9 h-9 bg-on-accent flex items-center justify-center">
        <span class="w-4 h-4 bg-accent"></span>
      </span>
      <span class="text-xl font-extrabold tracking-normal">NightingaleUI</span>
    </div>
    <div class="relative">
      <h1 class="text-4xl font-extrabold leading-tight tracking-normal">Панель<br />управления</h1>
      <p class="mt-4 text-on-accent/80 max-w-sm">Шаблон дашборда администратора</p>
    </div>
    <div class="relative text-sm text-on-accent/70">© 2026 NightingaleUI</div>
  </div>

  <div class="flex items-center justify-center p-6 sm:p-12">
    <div class="w-full max-w-sm ng-enter">
      <div class="lg:hidden flex items-center gap-2.5 mb-8">
        <span class="w-8 h-8 bg-accent flex items-center justify-center">
          <span class="w-3.5 h-3.5 bg-bg"></span>
        </span>
        <span class="font-extrabold text-ink">Nightingale<span class="text-accent">UI</span></span>
      </div>

      <div class="w-10 h-1 bg-accent mb-4"></div>
      <h2 class="text-2xl font-extrabold text-ink tracking-normal">С возвращением</h2>
      <p class="text-muted text-sm mt-1 mb-8">Войдите, чтобы продолжить работу</p>

      <form class="space-y-4" onsubmit={submit}>
        <NInput bind:value={email} label="E-mail" type="email" placeholder="mail@example.com" icon="mail" />
        <NInput bind:value={password} label="Пароль" type="password" placeholder="••••••••" icon="lock" />
        <div class="flex items-center justify-between">
          <NCheckbox bind:checked={remember} label="Запомнить меня" />
          <a href="#" class="text-sm text-accent font-semibold hover:underline">Забыли пароль?</a>
        </div>
        <NButton type="submit" block size="lg" {loading} iconRight="arrowRight">Войти</NButton>
      </form>

      <div class="flex items-center gap-3 my-6">
        <div class="flex-1 h-px bg-line"></div>
        <span class="text-xs text-faint uppercase tracking-normal">или</span>
        <div class="flex-1 h-px bg-line"></div>
      </div>

      <NButton variant="secondary" block icon="user" onclick={() => goto('/')}>Продолжить как гость</NButton>

      <p class="text-center text-sm text-muted mt-8">
        Нет аккаунта?
        <a href="#" class="text-accent font-semibold hover:underline">Регистрация</a>
      </p>
    </div>
  </div>
</div>
