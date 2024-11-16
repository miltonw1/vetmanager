const URL = `${import.meta.env.VITE_BASE_URL}/clients`

const baseHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
}

function getAuthHeaders() {
    const token = localStorage.getItem('token')
    return {
        ...baseHeaders,
        Authorization: `Bearer ${token}`,
    };
}

export async function getAll() {
    const response = await fetch(URL, {
        headers: getAuthHeaders(),
    });
    const data = await response.json();
    return data;
}
export async function create(payload) {
    const body = JSON.stringify(payload);

    const response = await fetch(URL, {
        method: 'POST',
        headers: getAuthHeaders(),
        body,
    });

    const data = await response.json();
    return data;
}

export async function update(payload) {
    const body = JSON.stringify(payload);

    const response = await fetch(`${URL}/${payload.id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body,
    });

    const data = await response.json();
    return data;
}