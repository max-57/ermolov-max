const magneticQuery = '(min-width: 840px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
const clamp = (distance: number) => Math.max(-14, Math.min(14, distance))

export default defineNuxtPlugin(({ vueApp }) => {
  const teardown = new WeakMap<HTMLElement, () => void>()

  vueApp.directive<HTMLElement, number>('magnetic', {
    mounted(element, { value = 0.3 }) {
      const media = window.matchMedia(magneticQuery)
      let center: { x: number; y: number } | undefined
      let frame = 0
      element.classList.add('magnetic-hover')

      const reset = () => {
        cancelAnimationFrame(frame)
        center = undefined
        element.style.removeProperty('--magnetic-shift')
        element.style.removeProperty('--magnetic-rotation')
      }

      const move = (event: PointerEvent) => {
        if (!media.matches || event.pointerType === 'touch') return
        if (!center) {
          const rect = element.getBoundingClientRect()
          center = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
        }
        const x = clamp((event.clientX - center.x) * value)
        const y = clamp((event.clientY - center.y) * value)
        const angle = Math.hypot(x, y)
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(() => {
          element.style.setProperty('--magnetic-shift', `${x}px ${y}px`)
          element.style.setProperty('--magnetic-rotation', angle ? `${-y} ${x} 0 ${angle}deg` : 'none')
        })
      }

      element.addEventListener('pointermove', move)
      element.addEventListener('pointerleave', reset)
      element.addEventListener('pointercancel', reset)
      media.addEventListener('change', reset)
      teardown.set(element, () => {
        reset()
        element.removeEventListener('pointermove', move)
        element.removeEventListener('pointerleave', reset)
        element.removeEventListener('pointercancel', reset)
        media.removeEventListener('change', reset)
        element.classList.remove('magnetic-hover')
      })
    },
    beforeUnmount(element) {
      teardown.get(element)?.()
      teardown.delete(element)
    },
  })
})
