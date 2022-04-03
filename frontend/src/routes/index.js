export async function getAllUsers() {
    const response = await fetch('http://localhost:4000/api');
    return await response.json();
}