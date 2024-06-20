const BASE_URL = import.meta.env.VITE_BASE_URL;
const URL = `${import.meta.env.VITE_BASE_URL}/history`;

const baseHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
}

export async function getAll(id) {
    const response = await fetch(`${BASE_URL}/pets/${id}/history`, { method: 'GET', headers: baseHeaders })
    const data = await response.json()
    console.log(`${BASE_URL}/pets/${id}/history`)
    console.log(data)
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
