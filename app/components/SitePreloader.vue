<script setup lang="ts">
interface LottieAnimation {
  addEventListener(event: 'data_failed', listener: () => void): void
  destroy(): void
}

interface LottiePlayer {
  loadAnimation(options: {
    container: HTMLElement
    renderer: 'svg'
    loop: false
    autoplay: true
    path: string
    rendererSettings: { preserveAspectRatio: string }
  }): LottieAnimation
}

const logo = ref<HTMLElement | null>(null)
const visible = ref(true)
let timer: number | undefined
let script: HTMLScriptElement | undefined
let animation: LottieAnimation | undefined

function dismiss() {
  visible.value = false
  window.clearTimeout(timer)
  if (script) {
    script.onload = null
    script.onerror = null
    script.remove()
    script = undefined
  }
  const current = animation
  animation = undefined
  current?.destroy()
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    dismiss()
    return
  }

  const lottieWindow = window as Window & { lottie?: LottiePlayer }
  const play = () => {
    if (!visible.value || !logo.value || !lottieWindow.lottie) {
      dismiss()
      return
    }

    try {
      animation = lottieWindow.lottie.loadAnimation({
        container: logo.value,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: '/Logo_animation.json',
        rendererSettings: { preserveAspectRatio: 'xMidYMid slice' },
      })
      animation.addEventListener('data_failed', dismiss)
      window.clearTimeout(timer)
      timer = window.setTimeout(dismiss, 3630)
    } catch {
      dismiss()
    }
  }

  if (lottieWindow.lottie) {
    play()
    return
  }

  timer = window.setTimeout(dismiss, 3630)
  script = document.createElement('script')
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js'
  script.async = true
  script.onload = play
  script.onerror = dismiss
  document.head.append(script)
})

onBeforeUnmount(dismiss)
</script>

<template>
  <div v-if="visible" id="preloader" aria-hidden="true">
    <div id="lottie-logo" ref="logo" />
  </div>
</template>

<style scoped>
#preloader { pointer-events: none; }

@media (prefers-reduced-motion: reduce) {
  #preloader { display: none; }
}
</style>
