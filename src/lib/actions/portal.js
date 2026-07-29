export function portal(node, target = 'body') {
  const host = typeof target === 'string' ? document.querySelector(target) : target
  host?.appendChild(node)
  return {
    destroy() {
      node.parentNode?.removeChild(node)
    },
  }
}
