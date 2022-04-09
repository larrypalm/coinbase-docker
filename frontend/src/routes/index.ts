export async function getAllUsers() {
    const response = await fetch('http://localhost:4000/api');
    return await response.json();
}

interface Params {
    code: string,
    secret: string
}

export async function getCallback(params: Params) { 
    const { code, secret } = params;
    const response = await fetch(
        `http://localhost:4000/callback?code=${code}&secret=${secret}`,
        {
            method: 'POST'
        }
    );
    return await response.json();
}

export async function getSecrets() { 
    const response = await fetch(`http://localhost:4000/secrets`);
    return await response.json();
}

// ?code=${code}&state=${state}