/////////////////////////////////////////////////////////////////////////
// Contains all the functions necessary for the operation of the site //
////////////////////////////////////////////////////////////////////////

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
const generateProjects = (projects) => {
    for (let i = 0; i < projects.length; i++) {
        const image = projects[i].imageUrl
        const title = projects[i].title
            createGallery(image, title)        
    }
}

//get an array with the categories names store in API
const getCategoryNames = (projects) => {
    let categorySet = new Set()
    categorySet.add("Tous")
    projects.forEach(project => {
        categorySet.add(project.category.name)
    })
    const categoryArray = [...categorySet]
    return categoryArray
}

//generate buttons with the array of categories
const generateFilterButtons = (projects) => {
    const filter = document.querySelector(".filter")
    const categoryNames = getCategoryNames(projects)
    categoryNames.shift()
    
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

//filter categories
function filterCategory(projects) {
    generateFilterButtons(projects)
        
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

// Check if the gallery is present
export function generateAndFilter(projects) {
    const gallery = document.querySelector(".gallery")
    
    if (gallery) {
        generateProjects(projects);
        filterCategory(projects);
    }
}

/**********************************************************
 2- Login page
 **********************************************************/
// Login the admin user
 export function addListenerSendLogin() {
    //select the form and add a event listener
    const loginForm = document.querySelector(".login-form")
    if(loginForm) {
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
            const loginData = await response.json()
            
            //condition to login the user
            if (response.ok) {
                //store the token locally and redirect
                window.localStorage.setItem("token", JSON.stringify(loginData))
                window.location.href = "./index.html"
                
            } else {
                alert("Erreur dans l'identifiant ou le mot de passe")
            }
        })
    }
}

// Display none the elements of the admin
const showLogout = () => {
    let adminUser = window.localStorage.getItem("token")
    const log = document.querySelector("#login-nav")
    
    const filter = document.querySelector(".filter")
    const adminTool = document.querySelectorAll(".js-admin")

    if (adminUser !== null) {
        log.innerHTML = "logout"
        if (filter) {
            filter.style.display = "none"
        }
    } else {
        if (adminTool) {
            adminTool.forEach(tool => tool.style.display = "none")
            // adminTool.style.display = "none"
        }
    }
}

// Logout the admin on click and redirect
export function logAdminOut() {
    const log = document.querySelector("#login-nav")
    let adminUser = window.localStorage.getItem("token")
    showLogout()
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

// /**********************************************************
//  3- Modal
//  **********************************************************/

// Open and close the modal
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

export function toggleModal() {
    const modal = document.querySelector(".js-modal")
    if (modal) {
        modal.addEventListener("click", openModal)
    }
}

// Generate the gallery on the modal
export const generateModalGallery = (projects) => {
    for (let i = 0; i < projects.length; i++) {
        const image = projects[i].imageUrl
        const id = projects[i].id

    createModalGallery(image, id)    
    }
}
const createModalGallery = (image, id) => {
    //create tags and elements intended for the modal
    const modalPhoto = document.querySelector(".modal-gallery")
    if (modalPhoto) {
        const figure = document.createElement("figure")
        const imageModal = document.createElement("img")
        imageModal.src = image
        imageModal.classList.add("image-modal")
        const trashContainer = document.createElement("div")
        trashContainer.classList.add("trash-container")
        ////////////
        // trashContainer.setAttribute("data-id", projects[i].id)
        trashContainer.setAttribute("data-id", id)

        // console.log(trashContainer.dataset.id)

        const trash = document.createElement("i")
        trash.classList.add("fa-solid", "fa-trash-can")
        
        //add to the modal the architect's work
        modalPhoto.appendChild(figure)
        figure.appendChild(imageModal)
        figure.appendChild(trashContainer)
        trashContainer.appendChild(trash)
    }
}
 

//delete project in the gallery 
export function deleteProject() {
    //get the token and select the trash icon
    const tokenItem = window.localStorage.getItem("token")

    let token
    if (tokenItem) {
        token = JSON.parse(tokenItem).token
    }
    const trashIcons = document.querySelectorAll(".trash-container")
    
    // Loop through the trash icons to know with project to deleted with the id
    trashIcons.forEach(trash => {
        trash.addEventListener("click", async function () {
            const projectId = this.parentElement.dataset.id
            console.log("Deleting project with ID:", projectId)
            
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

/////////////////////////////

const diplayNoneModal2 = () => {
    const modalview2 = document.querySelectorAll(".js-modal-view2")
    if (modalview2) {
        modalview2.forEach(e => e.style.display = "none")
    }
}
diplayNoneModal2()

const backModalView1 = (modalGallery, title, toggleElements, addBtn) => {
    document.querySelector(".fa-arrow-left").addEventListener("click", () => {
        modalGallery.forEach(figure => figure.style.display = "flex")
        title.innerText = "Galerie photo"
        toggleElements.forEach(element => element.style.display = "none")
        document.querySelector("#validate-button").style.display= "none"
        addBtn.style.display = "flex"
    })
}
export function addPhotosModal() {
    // const modalWrapper1 = document.querySelector(".modal-wrapper")
    const addButton = document.querySelector(".add-btn")
    //
    if (addButton) {

        addButton.addEventListener("click", function () {
            //disable the gallery & change of content
            const modalGallery = document.querySelectorAll(".modal-gallery figure")
            modalGallery.forEach(figure => figure.style.display = "none")
            // change the title
            const title = document.querySelector(".title-modal")
            title.innerText = "Ajout photo"
            //////////////
            const toggleElements = document.querySelectorAll(".js-modal-view2")
            toggleElements.forEach(element => element.style.display = "flex")
            //////////////
            const addBtn = document.querySelector(".div-btn")
            addBtn.style.display = "none"

            backModalView1(modalGallery, title, toggleElements, addBtn)
        })
    }
}

addPhotosModal()
//////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////


const validFileType = (file) => {
    const fileTypes = ["image/jpeg", "image/png"]
    return fileTypes.includes(file.type)
}

const validFileSize = (file) => {
    return file.size <= 4 * 1024 * 1024 // 4 mo?????
}

// Check if the form is correctly fill
function checkImageUrl() {
    const imageFile = document.querySelector("[name=img-file]")
    console.log("Selected input element:", imageFile)

    if (!imageFile || !imageFile.files || imageFile.files.length === 0) {
        // No file input or no files selected
        return
    }
    
    // addPhoto.addEventListener("click", () => {
        
    // })
    // Convert fileList (.files) to an array
    const files = Array.from(imageFile.files)
    console.log(files)
        
        // // Error message for not having completed the form
        // if (files.length === 0) {
        //     alert("Veuillez sélectionner un fichier")
        //     return
        // }
        
        // Get the first file from the array
        const file = files[0]
       
        
        if (!validFileType(file)) {
            alert ("Le fichier doit être de type JPEG ou PNG")
            return
        }
        
        if (!validFileSize(file)) {
            alert("La taille du fichier doit être de 4 Mo maximun")
        return
    }
    
    // If everything is valid, proceed with handling the file
    const preview = document.querySelector(".preview")
    // Clear previous content with a loop
    while (preview.firstChild) {
        preview.removeChild(preview.firstChild)
    }
    
    
    const figure = document.createElement("figure")
    const newImage = document.createElement("img")
    try {
        newImage.src = URL.createObjectURL(file)
        console.log("Image source:", newImage.src)
    } catch (error) {
        console.log("Errorcreating image URL:", error)
        throw new Error("Failed to display image preview!")
    }
    newImage.alt = "preview-image"
    // Clear the previous
    // preview.innerHTML = ""
    figure.appendChild(newImage)
    preview.appendChild(figure)
    // preview.appendChild(newImage)

    

//     // Add event listener to handle image loading errors
//   newImage.addEventListener("error", () => {
//     console.error("Image failed to load!")
//     // Handle image loading error gracefully, display message or notify user
//     throw new Error("Image preview failed to load!")
//   })
}
// checkImageUrl()

// Add event listener to image input for change event
const imageInput = document.querySelector("[name=img-file]")
imageInput.addEventListener("change", checkImageUrl)

function validateTitleModalForm() {
    const modalForm = document.querySelector(".modal-form")

    const title = document.querySelector("[name=title]").value.trim()

    const regex = new RegExp("[a-zA-Z\s\-“”]+")

    let validationTitre = regex.test(titre)
    if (validationTitre === true) {
        console.log(title)
        return title
    } else {
        console.log("Attention certains caractères ne sont pas autorisés")
    }
}

function validateModalForm() {
    const imageOk = checkImageUrl()
    const titleOk = validateTitleModalForm()
    if (imageOk && titleOk) {
        return
    }
}

export function categoriesForm(projects) {
    const categories = getCategoryNames(projects)
    categories.shift()
    console.log(categories)
    const selectCategories = document.querySelector("[name=category]")

    let i = 0
    for (let category of categories) {
        const option = document.createElement("option")
        option.innerText = category
        option.setAttribute("value", category.value)
        selectCategories.appendChild(option)
        i++
    }
}

// export function generateCategoriesForm(categories) {
//     const selectCategories = document.querySelector("[name=category]")

//     for (let i = 0; i < categories.length; i++) {
//         const category = categories[i].name
//         const option = document.createElement("option")
//         option.innerText = category
//         option.setAttribute("value", category)
//         selectCategories.appendChild(option)

//     }
// }

export function fillModalForm(projects) {
    checkImageUrl()
    validateTitleModalForm()
    categoriesForm(projects)
}

// export async function postFormData(event) {
//     event.preventDefault()

//     Get the form element & create a new form data
//     var modalForm = document.querySelector(".modal-form")
//     var formData = new FormData(modalForm)

//     try {
//         // Make a POST request to the API endpoint
//         const response = await fetch("http://localhost:5678/api/users/works", {
//             method: "POST",
//             body: formData
//         })

//         wait for the response
//         const formReturn = await response.json()
        
//         condition to login the user
//         if (response.ok) {
//             store the token locally and redirect
//             return formReturn
//         } else {
//             throw new Error("Erreur dans les données")
//         }
//     } catch (error) {
//         console.error("Error:", error)
//     }
// }
// postFormData(event)
