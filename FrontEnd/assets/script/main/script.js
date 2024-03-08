/**********************************************************
 ***** Main script for launching and coordinating
 **********************************************************/

import { fetchProjects } from "../data/api.js"
import { createReusableGallery } from "../data/config.js"

//////////////////////////////////////////////////////////////////////////////
// Create the main gallery and generate filter buttons

export async function initializeGallery() {
    try {
        // Fetch projects.
        const projects = await fetchProjects()
        
        // Launches functions.
        createGallery(projects)
        generateFilterButtons(projects)
        filterCategory(projects)
    } catch (error) {
        console.error("Error fetching projects:", error)
    }
}

//////////////////////////////////////////////////////////////////////////////
// Create main gallery

export function createGallery(projects) {
    // Create tags for the main gallery
    const gallery = document.querySelector(".gallery")

    // Iterate through projects
    for (let i = 0; i < projects.length; i++) {
        const image = projects[i].imageUrl
        const title = projects[i].title
        const id = projects[i].id


    // Add the one already create
    const elements = createReusableGallery(image, id, title)

    //Attach to the gallery
    gallery.appendChild(elements)
    }
}

//////////////////////////////////////////////////////////////////////////////
// Get an array with the categories names store in swagger

const getCategoryNames = (projects) => {
    let categorySet = new Set()
    categorySet.add("Tous")
    projects.forEach(project => {
        categorySet.add(project.category.name)
    })
    const categoryArray = [...categorySet]
    return categoryArray
}

// Generate buttons with the array of categories

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

// Filter categories
 
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
                        
                        createGallery(filteredProjects)
            })
        })
}

//////////////////////////////////////////////////////////////////////////////
// When logout, display none the elements of the admin

const showLogout = () => {
    let adminUser = window.localStorage.getItem("token")
    const log = document.querySelector("#login-nav")
    
    const filter = document.querySelector(".filter")
    const adminTool = document.querySelectorAll(".js-admin")

    // If admin login, don't show the filter and show "logout"
    if (adminUser !== null) {
        log.innerHTML = "logout"
        filter.style.display = "none"
    // If not, don't show the admin tools
    } else {
        adminTool.forEach(tool => tool.style.display = "none")
    }
}

// Logout the admin on click and redirect

export function logAdminOut() {
    const log = document.querySelector("#login-nav")
    let adminUser = window.localStorage.getItem("token")
    showLogout()
    // If the admin, click on "logout":
    log.addEventListener("click", function () {
        // Remove the token, show "login" and redirect
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