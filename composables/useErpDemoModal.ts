export function useErpDemoModal() {
  const open = useState("erp-demo-modal-open", () => false)

  const show = () => {
    open.value = true
  }

  const close = () => {
    open.value = false
  }

  return { open, show, close }
}
