export default function fetchApi(endpoint, method, body) {
    return fetch(endpoint, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }) 
}