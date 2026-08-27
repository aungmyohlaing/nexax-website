export function useReveal() {
  let observer: IntersectionObserver | null = null

  const bind = (root?: ParentNode | null) => {
    if (!import.meta.client) return
    if (!observer) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            entry.target.classList.add("is-visible")
            observer?.unobserve(entry.target)
          }
        },
        { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
      )
    }

    const scope = root ?? document
    scope.querySelectorAll(".reveal:not(.is-visible)").forEach((node) => {
      observer?.observe(node)
    })
  }

  onMounted(() => {
    bind()
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })

  return { bind }
}
