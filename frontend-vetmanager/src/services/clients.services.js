const URL = `${import.meta.env.VITE_BASE_URL}/clients`

export async function getAll() {
    const response = await fetch(URL)
    const data = await response.json()

    return data
}

export async function create(payload) {
    const response = await fetch(URL, { method: 'POST', body: JSON.stringify(payload) })
    const data = await response.json()

    return data
}

export async function update(payload) {
    const response = await fetch(`${URL}/${payload.id}`, { method: 'PUT', body: JSON.stringify(payload) })
    const data = await response.json()

    return data
}
