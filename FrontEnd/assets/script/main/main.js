////////////////////////////////////////////////////////////////////////////
// initializes and launches the main final function //
///////////////////////////////////////////////////////////////////////////

import { fetchProjects } from "../data/projects.js"
// import { generateAndFilter, addListenerSendLogin, logAdminOut, toggleModal, generateModalGallery, deleteProject, categoriesForm } from "./script.js"
import { generateProjects } from "./script.js"
// async function fetchAndGenerateCategories() {
//     try {
//         const categories = await fetchCategories()
//         if (categories) {
//             categoriesForm(categories)
//         }
//     } catch (error) {
//         console.error("An Error occured while fetching the categories", error)
//     }
// }
// fetchAndGenerateCategories()
// // Call the function to initiate the data fetching
// fetchDataAndGenerate()

// Fetch the data using the fetchProjects function
async function fetchDataAndGenerate() {
    try {
        const projects = await fetchProjects()

        generateProjects(projects)
        // if (projects) {
            // Call the generateProjects function and pass the fetched data directly
            



            // addListenerSendLogin()
            // logAdminOut()
            // toggleModal()
            // deleteProject()
            // generateModalGallery(projects)
            // isModalFormValid()
        // }
        // addPhotos()
    } catch (error) {
        console.error("An Error occurred while fetching the data:", error)
    }
}
fetchDataAndGenerate()

// // postFormData(event)



// Mis de côté
// generateAndFilter(projects)
