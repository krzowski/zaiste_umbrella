export function createSession(credentials: object) {
  return fetch('/api/sign_in', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify(credentials)
  })
}

export function deleteSession() {
  return fetch('/api/sign_out', {
    method: 'delete'
  })
}
