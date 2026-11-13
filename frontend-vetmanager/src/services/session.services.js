const BASE_URL = `${import.meta.env.VITE_BASE_URL}`
const URL = `${BASE_URL}/session/login/`

const baseHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
}


export async function login(payload) {
    const body = JSON.stringify(payload)

    const response = await fetch(URL, { method: 'POST', headers: baseHeaders, body })

    const data = await response.json()
    return data
}

export async function forgotPassword(payload) {
    const response = await fetch(`${BASE_URL}/session/forgot-password`, {
        method: 'POST',
        headers: baseHeaders,
        body: JSON.stringify(payload),
    })

    const data = await response.json().catch(() => ({}))
    return { ok: response.ok, status: response.status, data }
}

export async function resetPassword(payload) {
    const response = await fetch(`${BASE_URL}/session/reset-password`, {
        method: 'POST',
        headers: baseHeaders,
        body: JSON.stringify(payload),
    })

    const data = await response.json().catch(() => ({}))
    return { ok: response.ok, status: response.status, data }
}
