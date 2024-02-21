        const response = await fetch("http://localhost:5678/api/works")
        const projects = await response.json()

        /**********************************************************
 1- Landing page with gallery
 **********************************************************/
// Creates the gallery elements and attaches them to the dom
const createGallery = (image, title) => {
    //create tags and elements intended for the gallery
    const gallery = document.querySelector(".gallery")
    const figure = document.createElement("figure")
    const imageElement = document.createElement("img")
    imageElement.src = image
    const figCaption = document.createElement("figcaption")
    figCaption.innerText = title
    
    //add to the gallery the architect's work
    gallery.appendChild(figure)
    figure.appendChild(imageElement)
    figure.appendChild(figCaption)
}

// Loop through the projects stored in the api to retrieve them
function generateProjects(projects) {
    for (let i = 0; i < projects.length; i++) {
        const image = projects[i].imageUrl
        const title = projects[i].title
        createGallery(image, title)        
    }
}

//get an array with the category name store in API
const getCategoryNames = () => {
    let categorySet = new Set()
    categorySet.add("Tous")
    projects.forEach(project => {
        categorySet.add(project.category.name)
    })
    const categoryArray = [...categorySet]
    return categoryArray
}

//generate buttons with the array of category
const generateFilterButtons = () => {
    const filter = document.querySelector(".filter")
    const categoryNames = getCategoryNames()
    
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

//filter category
function filterCategory(projects) {
    generateFilterButtons()
    const buttons = document.querySelectorAll(".filter-btn")
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const buttonId = parseInt(button.dataset.id)
            
            switch (buttonId) {
                case 0 :
                    const keepAll = projects.filter(project => project)
                    document.querySelector(".gallery").innerHTML = ""
                    generateProjects(keepAll)
                    break
                    case 1 :
                        const keepObjects = projects.filter(project => {
                            return project.categoryId === parseInt(buttonId)
                        })
                        document.querySelector(".gallery").innerHTML = ""
                        generateProjects(keepObjects)
                        break
                        case 2 :
                            const keepAppartment = projects.filter(project => {
                                if (project.categoryId === 2) {
                                    return project
                                }
                            })
                            document.querySelector(".gallery").innerHTML = ""
                            generateProjects(keepAppartment)
                            break
                            case 3 :
                                const keepHotel = projects.filter(project => {
                                    if (project.categoryId === 3) {
                                        return project
                                    }
                                })
                                document.querySelector(".gallery").innerHTML = ""
                                generateProjects(keepHotel)
                                break
                                default :
                                console.log("Press a category")
                            }
                        })
    })
    
}
////////////////////////////////////
// Check if the gallery is present
function ifGallery() {
    const gallery = document.querySelector(".gallery")
    
    if (gallery) {
        generateProjects(projects);
        filterCategory(projects);
    }
}
ifGallery()
////////////////////////////////////
/**********************************************************
 2- Login page
 **********************************************************/
function addListenerSendLogin() {
        //select the form and add a event listener
        const loginForm = document.querySelector(".login-form")
        console.log(loginForm)
        loginForm.addEventListener("submit", async function (event) {
                event.preventDefault()

        //get my form input values and turn them into json
        const logData = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value
        };
        
        const chargeUtile = JSON.stringify(logData)
        
        //send my form input values
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile
        })

        //wait for the response
        const data = await response.json()
        
        //condition to login the user
        if (response.ok) {
            //store the token locally and redirect
            window.localStorage.setItem("token", JSON.stringify(data))
            window.location.href = "./index.html"

        } else {
            alert("Erreur dans l'identifiant ou le mot de passe")
        }
    })
}

////////////////////////////////////
function ifLoginForm() {
    const loginForm = document.querySelector(".login-form")
    
    if (loginForm) {
        addListenerSendLogin()
    }
}
ifLoginForm()
////////////////////////////////////

let adminUser = window.localStorage.getItem("token")
const log = document.querySelector("#login-nav")

const filter = document.querySelector(".filter")
const adminTools = document.querySelector(".admin-tools")

const showLogout = () => {
    if (adminUser !== null) {
        log.innerHTML = "logout"
        if (filter) {
            filter.style.display = "none"
        }
    } else {
        if (adminTools) {
            adminTools.style.display = "none"
        }
    }
}

showLogout()


//logout the admin on click and redirect
const logAdminOut = () => {
    // const log = document.querySelector("#login-nav")
    // let adminUser = window.localStorage.getItem("token")
    if(log) {
        log.addEventListener("click", function () {
            //if token is true
            if (adminUser !== null) {
                window.localStorage.removeItem("token")
                log.innerHTML = "login"
                log.setAttribute("href", "./index.html")
            } else {
                log.setAttribute("href", "./login.html")
            }
        })
    }
}
logAdminOut()

/**********************************************************
 3- Modal
 **********************************************************/
//delete project in the gallery 
function deleteProject() {
    const { token } = JSON.parse(window.localStorage.getItem("token"))
    console.log("this is my token:", token)

    const trashIcons = document.querySelectorAll(".fa-trash-can")

    trashIcons.forEach(trash => {

        trash.addEventListener("click", async function() {
            const projectId = this.parentElement.dataset.id
            console.log("deleting project with ID:", projectId)
            
            try {
                const response = await fetch(`http://localhost:5678/api/works/${projectId}`, {
                    method: "DELETE",
                    headers: {
                        "Accept": "*/*",
                        "Authorization": `Bearer ${token}`
                }
            })
            
            if (response.ok) {
                console.log("Project deleted successfully")
                const projectToRemove = this.closest("figure")
                if (projectToRemove) {
                    projectToRemove.remove()
                } else {
                    console.log("Project to delete not found in DOM")
                }
            } else {
                const errorMessage = await response.text()
                console.error("Failed to delete project:", errorMessage)
            }
            } catch (error) {
            console.error("An error occurred while deleting project:", error)
            }
        })
    })
}

const generateModalGallery = (projects) => {
    for (let i = 0; i < projects.length; i++) {
        const image = projects[i].imageUrl
        const id = projects[i].id
        
        const modalPhoto = document.querySelector(".modal-gallery")
        const figure = document.createElement("figure")
        const imageModal = document.createElement("img")
        imageModal.src = image
        imageModal.classList.add("image-modal")

        // Create trash icon and attach click event listener
        const trash = document.createElement("i")
        trash.classList.add("fa-solid", "fa-trash-can")

        // Create trash container and append trash icon
            const trashContainer = document.createElement("div")
            trashContainer.classList.add("trash-container")
            trashContainer.setAttribute("data-id", id)
            trashContainer.appendChild(trash)
            // console.log(trashContainer.dataset.id)
        
            
            // Add image and trash container to the figure and fugure to the modal
            modalPhoto.appendChild(figure)
            figure.appendChild(imageModal)
            figure.appendChild(trashContainer)
        
    }
    deleteProject()
}

generateModalGallery(projects)



///////////////////////////////
//open and close the modal
let modal = null

const openModal = function (e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute("href"))
    target.style.display = null
    target.removeAttribute("aria-hidden")
    target.setAttribute("aria-modal", "true")
    modal = target
    modal.addEventListener("click", closeModal)
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)
    // noDisplay()
}

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute("aria-hidden", "true")
    modal.removeAttribute("aria-modal")
    modal.removeEventListener("click", closeModal)
    document.querySelector(".js-modal-close").removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation)
    modal = null
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

function toggleModal() {
    document.querySelector(".js-modal").addEventListener("click", openModal)
}
toggleModal()

////////////
// const noDisplay = () => {
//     const toggleView = document.querySelectorAll(".toggle-view")
//     toggleView.forEach(element => element.noDisplay)
// }
// const buttonModal = document.querySelector(".div-btn")
// if (buttonModal) {
//     generateModalGallery(projects)
// }

// document.querySelector(".modal-form-container").style.display = "none"

// const modalForm = document.querySelector(".modal-form")

// const toggleViewModal = () => {
//     const toggleView = document.querySelectorAll(".toggle-view")
//     const addPhotosButton = document.querySelector(".add-btn")

//     addPhotosButton.addEventListener("click", () => {
//         toggleView.forEach(element => )
//     })
// }
///////////////////////////////////
// const modalForm = document.querySelector("modal-form")
// modalForm.style.display = "none"
//
// function addPhotos() {
//     // const modalWrapper1 = document.querySelector(".modal-wrapper")
//     const addButton = document.querySelector(".add-btn")
//     //
//     if (addButton) {

//         addButton.addEventListener("click", function () {
//             //disable the gallery & change of content
//             const modalGallery = document.querySelectorAll(".modal-gallery figure")
//             modalGallery.forEach(figure => figure.style.display = "none")
//             const title = document.querySelector(".title-modal")
//             title.innerText = "Ajout Photo"
//             //////////////
//             const toggleElements = document.querySelectorAll(".toggle")
//             toggleElements.forEach(element => element.style.display = "block")
//             //////////////
//             document.querySelector(".add-btn").style.display = "none"
//         })
//     }
// }
// addPhotos()