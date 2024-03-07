// Get the architect's projects with the API

// Placeholder to store the fetched data from the API, initialized with null.
let cachedData = null

export async function fetchProjects() {
    if (!cachedData) {
        const response = await fetch("http://localhost:5678/api/works")
        const data = await response.json()
        cachedData = data
    }
    return cachedData
    // return data
}

// Get the architect's projects categories with the API

export async function fetchCategories() {
    const response = await fetch("http://localhost:5678/api/categories")
    const data = await response.json()
    return data
}