const URL = `${import.meta.env.VITE_BASE_URL}/species`

const baseHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
}

export async function getAll() {
    const response = await fetch(URL)
    const data = await response.json()

    return data
}

export async function create(payload) {
    const body = JSON.stringify(payload)

    const response = await fetch(URL, { method: 'POST', headers: baseHeaders, body })

    const data = await response.json()
    return data
}

export async function update(payload) {
    const body = JSON.stringify(payload)
    const response = await fetch(`${URL}/${payload.id}`, { method: 'PUT', headers: baseHeaders, body })
    const data = await response.json()

    return data
}
