const BASE_URL = import.meta.env.VITE_BASE_URL;
const URL = `${import.meta.env.VITE_BASE_URL}/history`;

const baseHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
}

const fileHeaders = {
    'Content-Type': 'multipart/form-data'
}

//`${BASE_URL}/pets/${id}/history`
export async function getAll(id) {
    const response = await fetch(`${BASE_URL}/pets/${id}/history`, { method: 'GET', headers: baseHeaders })
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

//http://localhost:3001/pets/1/history/3/images

export async function uploadImage(petId, historyId, image) {
    const url = `${BASE_URL}/pets/${petId}/history/${historyId}/images`
    const body = new FormData()
    body.append("file", image)
    const response = await fetch(url, { method: 'POST', body })

    return response.ok
}

