export function deleteSession() {
  return fetch('/api/sign_out', {
    method: 'delete'
  })
}
