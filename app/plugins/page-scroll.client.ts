export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()
  const positions = new Map<string, { left: number; top: number }>()
  const key = (path: string) => path.replace(/\/+$/, '') || '/'

  router.beforeEach((to, from) => {
    if (from.matched.length && key(to.path) !== key(from.path)) {
      positions.set(key(from.path), { left: window.scrollX, top: window.scrollY })
    }
  })

  nuxtApp.hook('app:mounted', () => {
    const scrollAfterRender = router.options.scrollBehavior
    if (!scrollAfterRender) return

    router.options.scrollBehavior = async (to, from, savedPosition) => {
      const returningPosition = to.hash ? undefined : positions.get(key(to.path))
      // Let Nuxt wait for the destination page to finish rendering.
      const position = await scrollAfterRender(to, from, savedPosition ?? returningPosition ?? null)
      return position && { ...position, behavior: 'instant' }
    }
  })
})
