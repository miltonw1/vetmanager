const API_URL = import.meta.env.VITE_BASE_URL;

export async function updateUser(id, data, token) {
	const response = await fetch(`${API_URL}/users/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(data),
	});

	return response.json();
}

export async function updatePassword(id, data, token) {
	const response = await fetch(`${API_URL}/users/${id}/password`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(data),
	});

	return response.json();
}

export async function getUserById(id, token) {
	const response = await fetch(`${API_URL}/users/${id}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});

	return response.json();
}
