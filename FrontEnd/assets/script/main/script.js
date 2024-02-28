/**********************************************************
 ***** Main script for launching and coordinating
 **********************************************************/
// Import fetchProjects.
import { fetchProjects } from "../data/projects.js"
import { createReusableGallery } from "../data/config.js"


// // Fetch projects and perform operations.
// async function initializeGallery() {
//     try {
//         // Fetch projects.
//         const projects = await fetchProjects()
//         console.log("Fetched projects:", projects)
        
//         // Create gallery and filter buttons.
//         // const gallery = document.querySelector(".gallery")
//         // generateGallery(projects, gallery)
        
//         generateProjects(projects)
//         generateFilterButtons(projects)
//         filterCategory(projects)
//     } catch (error) {
//         console.error("Error fetching projects:", error)
//     }
// }

// initializeGallery()

async function initializeGallery() {
    try {
      // Fetch projects.
      const projects = await fetchProjects()
  
      // Ensure projects is an array before proceeding
    //   if (Array.isArray(projects)) {
    //     console.log("Fetched projects:", projects)
  
        // Create gallery and filter buttons.
        // generateProjects(projects)
        createGallery(projects)
        generateFilterButtons(projects)
        filterCategory(projects)
    //   } else {
    //     console.error("Error: Projects data is not an array")
    //   }
    } catch (error) {
      console.error("Error fetching projects:", error)
    }
  }
  initializeGallery()
/////////////////////////////////

///////////////////no!!!///////////////////////////////////
// // Creates the gallery elements and attaches them to the DOM.
// export function createGallery(image, title, id) {
//     // Create tags and elements intended for the gallery.
//     const figure = document.createElement("figure")
//     figure.setAttribute("data-id", id)

//     const imageElement = document.createElement("img")
//     imageElement.src = image

//     const figCaption = document.createElement("figcaption")
//     figCaption.innerText = title

//     // Add image and figCaption to the figure.
//     figure.appendChild(imageElement)
//     figure.appendChild(figCaption)

//     return figure // Return the created figure element.
// }

// // Loop through the projects stored in the API to retrieve them and generate a gallery.
// function generateGallery(projects, containerSelector) {
//     const container = document.querySelector(containerSelector)
//     if (!container) return // Exit early if the container doesn't exist

//     for (let i = 0; i < projects.length; i++) {
//         const image = projects[i].imageUrl
//         const title = projects[i].title
//         const id = projects[i].id
//         const figure = createGallery(image, title, id) // Create the gallery figure
//         container.appendChild(figure) // Append the figure to the container
//     }
// }
///////////////////code 2 qui fonctionne///////////////////////////////////
// function createGallery(image, id, title) {
//     // Create tags for the main gallery.
//     const gallery = document.querySelector(".gallery")
//     const figCaption = document.createElement("figcaption")
//     figCaption.innerText = title

//     // Add the one already create.
//     const element = createReusableGallery(image, id)

//     //Attach to the gallery.
//     gallery.appendChild(element)
    
// }
////A mettre avec l'iteration de projet

/////////////// Nouvelle tentative////
function createGallery(projects) {
    // Iterate through projects.
    for (let i = 0; i < projects.length; i++) {
        const image = projects[i].imageUrl
        const title = projects[i].title
        const id = projects[i].id

    // Create tags for the main gallery.
    const gallery = document.querySelector(".gallery")
    const figCaption = document.createElement("figcaption")
    figCaption.innerText = title
        
    // Add the one already create.
    const element = createReusableGallery(image, id)
        
    //Attach to the gallery.
    gallery.appendChild(element)
    element.appendChild(figCaption)
    }
}
// function generateProjects() {
//     projects.forEach(project => {
//         const image = project.imageURL
//         const title = project.title
//         const id = project.id

//         const element = createMainGallery(image, title, id)

//     })
// }
    //PasscreateGallery as callback.
    // for (let i = 0; i < projects.length; i++) {
    //     const image = projects[i].imageUrl
    //     const title = projects[i].title

    //     const id = projects[i].id
            // createGallery(image, title)
            
    // }


///////////////////code qui fonctionne///////////////////////////////////
// // Creates the gallery elements and attaches them to the dom.
// const createGallery = (image, title, id) => {
//     // Create tags and elements intended for the gallery.
//     const gallery = document.querySelector(".gallery")
//     const figure = document.createElement("figure")
//     const imageElement = document.createElement("img")
//     imageElement.src = image
//     const figCaption = document.createElement("figcaption")
//     figCaption.innerText = title
    
//     // Add to the gallery the architect's work.
//     gallery.appendChild(figure)
//     figure.appendChild(imageElement)
//     figure.appendChild(figCaption)
// }

// // Loop through the projects stored in the api to retrieve them.
// function generateProjects(projects) {
//     for (let i = 0; i < projects.length; i++) {
//         const image = projects[i].imageUrl
//         const title = projects[i].title

//         const id = projects[i].id
//             // createGallery(image, title)
            
//             createGallery(image, id, title)
//     }
// }
///////////////////////////////////////////////////////////////////////////

// Get an array with the categories names store in API.
const getCategoryNames = (projects) => {
    let categorySet = new Set()
    categorySet.add("Tous")
    projects.forEach(project => {
        categorySet.add(project.category.name)
    })
    const categoryArray = [...categorySet]
    return categoryArray
}

// Generate buttons with the array of categories.
const generateFilterButtons = (projects) => {
    const filter = document.querySelector(".filter")
    const categoryNames = getCategoryNames(projects)
    
    let i = 0
    
    for (let name of categoryNames) {
        const newButton = document.createElement("button")
        newButton.innerText = name
        newButton.setAttribute("class", "filter-btn")
        newButton.setAttribute("data-id", `${i}`)
        
        filter.appendChild(newButton)
        
        i++
    }
}

// Filter categories.
function filterCategory(projects) {
        const buttons = document.querySelectorAll(".filter-btn")
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                const buttonId = parseInt(button.dataset.id)
                let filteredProjects
                        switch (buttonId) {
                            case 0:
                                filteredProjects = projects
                                break
                            default:
                                const categoryName = button.innerText
                                filteredProjects = projects.filter(project => project.category.name === categoryName)
                        }
            
                        document.querySelector(".gallery").innerHTML = ""
                        // generateProjects(filteredProjects)
                        createGallery(filteredProjects)
                    // }
            })
        })
}

// When logout, display none the elements of the admin.
const showLogout = () => {
    let adminUser = window.localStorage.getItem("token")
    const log = document.querySelector("#login-nav")
    
    const filter = document.querySelector(".filter")
    const adminTool = document.querySelectorAll(".js-admin")

    // If admin login, don't show the filter and show "logout".
    if (adminUser !== null) {
        log.innerHTML = "logout"
        filter.style.display = "none"
    // If not, don't show the admin tools.
    } else {
        adminTool.forEach(tool => tool.style.display = "none")
    }
}

// Logout the admin on click and redirect.
function logAdminOut() {
    const log = document.querySelector("#login-nav")
    let adminUser = window.localStorage.getItem("token")
    showLogout()
    // If the admin, click on "logout":
    log.addEventListener("click", function () {
        // Remove the token, show "login" and redirect.
        if (adminUser !== null) {
            window.localStorage.removeItem("token")
            log.innerHTML = "login"
            log.setAttribute("href", "./index.html")
        // If not admin user redirect on login page.
        } else {
            log.setAttribute("href", "./login.html")
        }
    })
}
logAdminOut()
/////////////



// /////////////////////////



// // //////////////////////////////////////////////////////////////////////
// // ///////////////////////////////////////////////////////////////////////
