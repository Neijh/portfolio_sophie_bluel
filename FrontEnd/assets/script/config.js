////////////////////////////////////////////////////////////////////////////
// Contains and retrieves all the data necessary for the operation of the site //
///////////////////////////////////////////////////////////////////////////
//get the architect's projects with the API

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