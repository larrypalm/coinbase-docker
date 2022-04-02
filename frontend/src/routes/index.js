export async function getAllUsers() {
    const response = await fetch('/api');
    return await response.json();
}