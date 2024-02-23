////////////////////////////////////////////////////////////////////////////
// initializes and launches the main final function //
///////////////////////////////////////////////////////////////////////////

import { fetchProjects, fetchCategories } from "./config.js"
import { generateAndFilter, addListenerSendLogin, logAdminOut, toggleModal, generateModalGallery, deleteProject  } from "./script.js"

// async function fetchAndGenerateCategories() {
//     try {
//         const categories = await fetchCategories()
//         if (categories) {
//             generateCategoriesForm(categories)
//         }
//     } catch (error) {
//         console.error("An Error occured while fetching the categories")
//     }
// }
// fetchAndGenerateCategories()

// Fetch the data using the fetchProjects function
async function fetchDataAndGenerate() {
    try {
        const projects = await fetchProjects()
        if (projects) {
            // Call the generateProjects function and pass the fetched data directly
            generateAndFilter(projects)
            addListenerSendLogin()
            logAdminOut()
            toggleModal()
            generateModalGallery(projects)
            deleteProject()
            // checkImageUrl()

            // fillModalForm(projects)
            
        }
        // addPhotos()
    } catch (error) {
        console.error("An Error occurred while fetching the data:", error)
    }
}

// Call the function to initiate the data fetching
fetchDataAndGenerate()


// postFormData(event)

