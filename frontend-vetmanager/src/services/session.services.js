const URL = `${import.meta.env.VITE_BASE_URL}/session/login/`

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