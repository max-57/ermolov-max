<script setup lang="ts">
interface LottieAnimation {
  addEventListener(event: 'data_failed' | 'complete', listener: () => void): void
  setSpeed(speed: number): void
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

const route = useRoute()
const logo = useTemplateRef<HTMLElement>('logo')
const visible = ref(false)
let timer: number | undefined
let startTimer: number | undefined
let script: HTMLScriptElement | undefined
let animation: LottieAnimation | undefined
let stopped = false

function dismiss() {
  stopped = true
  visible.value = false
  window.clearTimeout(timer)
  window.clearTimeout(startTimer)
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

watch(() => route.path, dismiss)

onMounted(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (motion.matches) return
  try {
    if (sessionStorage.getItem('max-portfolio-intro')) return
    sessionStorage.setItem('max-portfolio-intro', 'seen')
  } catch {
    // The intro still works when session storage is disabled.
  }
  const lottieWindow = window as Window & { lottie?: LottiePlayer }

  const play = async () => {
    if (stopped || motion.matches || !lottieWindow.lottie) return
    window.clearTimeout(timer)
    visible.value = true
    await nextTick()
    if (stopped || !logo.value) return

    try {
      animation = lottieWindow.lottie.loadAnimation({
        container: logo.value,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: '/Logo_animation.json',
        rendererSettings: { preserveAspectRatio: 'xMidYMid meet' },
      })
      animation.setSpeed(1.2)
      animation.addEventListener('data_failed', dismiss)
      animation.addEventListener('complete', dismiss)
      timer = window.setTimeout(dismiss, 3600)
    } catch {
      dismiss()
    }
  }

  startTimer = window.setTimeout(() => {
    if (lottieWindow.lottie) {
      void play()
      return
    }
    script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js'
    script.async = true
    script.onload = play
    script.onerror = dismiss
    document.head.append(script)
    timer = window.setTimeout(dismiss, 1800)
  }, 200)
})

onBeforeUnmount(dismiss)
</script>

<template>
  <div v-if="visible" class="site-signature" aria-hidden="true">
    <div ref="logo" />
  </div>
</template>

<style scoped>
.site-signature {
  position: fixed;
  inset: 0;
  z-index: 4;
  display: grid;
  place-items: center;
  pointer-events: none;
}
.site-signature > div {
  width: clamp(9rem, 27vw, 16rem);
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(ellipse, #121313 44%, #121313ed 61%, transparent 74%);
}
@media (prefers-reduced-motion: reduce) {
  .site-signature { display: none; }
}
</style>
