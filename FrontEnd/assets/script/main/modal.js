/**********************************************************
 ***** Modal
 **********************************************************/
// Import fetchProjects.
import { fetchProjects, fetchCategories } from "../data/projects.js"
import { createReusableGallery } from "../data/config.js"

const projects = await fetchProjects()
const categories = await fetchCategories()
// Import createGallery function from the script file
// import { createGallery } from "./script";
// import { generateProjects } from "./script"

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
    // if (modal === null) return
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
    const modal = document.querySelector(".js-modal")
    modal.addEventListener("click", openModal)
    // if (modal) {
    // }
}
toggleModal()
/////////////

///////////////////no!!!///////////////////////////////////
// // Generate the gallery on the modal
// function generateModalGallery(projects, containerSelector) {
//     const container = document.querySelector(containerSelector)
//     if (!container) return // Exit early if the container doesn't exist

//     for (let i = 0; i < projects.length; i++) {
//         const image = projects[i].imageUrl
//         const id = projects[i].id
//         const figure = createGallery(image, "", id) // Create the gallery figure
//         container.appendChild(figure) // Append the figure to the container
//         addTrashIcon(figure, id) // Add trash icon to the figure
//     }
// }

// Function to add trash icon to the figure
function addTrashIcon(figure) { // <====j'ai enlevé l'id
    const trashContainer = document.createElement("button")
    trashContainer.classList.add("trash-container")
    // trashContainer.setAttribute("data-id", id)

    const trashIcon = document.createElement("i")
    trashIcon.classList.add("fa-solid", "fa-trash-can")

    trashContainer.appendChild(trashIcon)
    figure.appendChild(trashContainer)
}

//////////////////////////code qui fonctionne/////////////////////////////
// const createModalGallery = (image, id) => {
//     //create tags and elements intended for the modal
//     const modalPhoto = document.querySelector(".modal-gallery")
//     if (modalPhoto) {
//         const figure = document.createElement("figure")
//         const imageModal = document.createElement("img")
//         imageModal.src = image
//         imageModal.classList.add("image-modal")
//         const trashContainer = document.createElement("div")
//         trashContainer.classList.add("trash-container")
//         ////////////
//         // trashContainer.setAttribute("data-id", projects[i].id)
//         trashContainer.setAttribute("data-id", id)
        
//         console.log(trashContainer.dataset.id)
        
//         const trash = document.createElement("i")
//         trash.classList.add("fa-solid", "fa-trash-can")
        
//         //add to the modal the architect's work
//         modalPhoto.appendChild(figure)
//         figure.appendChild(imageModal)
//         figure.appendChild(trashContainer)
//         trashContainer.appendChild(trash)
//     }
// }
// // Generate the gallery on the modal
// export const generateModalGallery = (projects) => {
//     for (let i = 0; i < projects.length; i++) {
//         const image = projects[i].imageUrl
//         const id = projects[i].id

//     createModalGallery(image, id)    
//     }
// }
// generateModalGallery(projects)
////////////////////////////////////////////////////////////////
const createModalGallery = (projects) => {
    // Iterate through projects.
    for (let i = 0; i < projects.length; i++) {
        const image = projects[i].imageUrl
        const id = projects[i].id

    //create tags and elements intended for the modal.
    const modalPhoto = document.querySelector(".modal-gallery")
    if (modalPhoto) {
        // const figure = document.createElement("figure")
        // const imageModal = document.createElement("img")
        // imageModal.src = image
        // imageModal.classList.add("image-modal")

        // Add the one already create.
        const element = createReusableGallery(image, id)
        
        //add to the modal the architect's work
        modalPhoto.appendChild(element)

        addTrashIcon(element)
    }
    }
}
createModalGallery(projects)


////////////////////////////
export function addPhotosBtn() {
    // const modalWrapper1 = document.querySelector(".modal-wrapper")
    const addButton = document.querySelector(".add-btn")
    // if (addButton) {

        addButton.addEventListener("click", function () {
            // event.stopPropagation(); // Prevent bubbling
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
    // }
}

addPhotosBtn()

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
        document.querySelector(".validate-button").style.display= "none"
        addBtn.style.display = "flex"
    })
}
backModalView1()

// Delete project in the gallery. 
export function deleteProject() {
    //get the token and select the trash icon
    const tokenItem = window.localStorage.getItem("token")

    let token
    if (tokenItem) {
        token = JSON.parse(tokenItem).token
    }
    /////////////////////////////////////////////////////////////////////////
    // const trashIcons = document.querySelectorAll(".trash-container")
    
    // // Loop through the trash icons to know with project to deleted with the id
    // trashIcons.forEach(trash => {
    //     trash.addEventListener("click", async function () {
    //         const projectId = this.parentElement.dataset.id
    /////////////////////////////////////////////////////////////////////////
    const galleryContainer = document.querySelector(".modal-gallery");
    if (!galleryContainer) return; // Exit early if the gallery container doesn't exist

    // Add a single click event listener to the gallery container
    galleryContainer.addEventListener("click", async function(event) {
        // Check if the clicked element is a trash icon
        if (event.target.classList.contains("fa-trash-can")) {
            console.log("Trash icon clicked!")
            // Check if figure is correctly found
            const figure = event.target.closest("figure")
            console.log("Figure:", figure)
            if (figure) {
                const projectId = figure.id;
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
                    const projectToRemove = event.target.closest("figure")
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
        //////////////////////
    } else {
        console.error("Parent figure not found!");
    }
    ///////////////////////////
    }
    })
}
deleteProject()

// // Delete project in the gallery. 
// export function deleteProject() {
//     //get the token and select the trash icon
//     const tokenItem = window.localStorage.getItem("token")

//     let token
//     if (tokenItem) {
//         token = JSON.parse(tokenItem).token
//     }
//     /////////////////////////////////////////////////////////////////////////
//     // const trashIcons = document.querySelectorAll(".trash-container")
    
//     // // Loop through the trash icons to know with project to deleted with the id
//     // trashIcons.forEach(trash => {
//     //     trash.addEventListener("click", async function () {
//     //         const projectId = this.parentElement.dataset.id
//     /////////////////////////////////////////////////////////////////////////
//     const galleryContainer = document.querySelector(".modal-gallery");
//     if (!galleryContainer) return; // Exit early if the gallery container doesn't exist

//     // Add a single click event listener to the gallery container
//     galleryContainer.addEventListener("click", async function(event) {
//         // Check if the clicked element is a trash icon
//         if (event.target.classList.contains("fa-trash-can")) {
//             const trashContainer = event.target.parentElement;
//             const projectId = trashContainer.dataset.id;
            
//             console.log("Deleting project with ID:", projectId)
            
//             try {
//                 const response = await fetch(`http://localhost:5678/api/works/${projectId}`, {
//                     method: "DELETE",
//                     headers: {
//                         "Accept": "*/*",
//                         "Authorization": `Bearer ${token}`
//                     }
//                 })

//                 if (response.ok) {
//                     console.log("Project deleted successfully")
//                     const projectToRemove = this.closest("figure")
//                     if (projectToRemove) {
//                         projectToRemove.remove()
//                     } else {
//                         console.log("Project to delete not found in DOM")
//                     }
//                 } else {
//                     const errorMessage = await response.text()
//                     console.error("Failed to delete project:", errorMessage)
//                 }
//             } catch (error) {
//                 console.error("An error occurred while deleting project:", error)
//             }
//         // })
//     }
//     })
// }
// deleteProject()

// Add project in the gallery.
// Retrieves the categories from the API and integrates them into the form
export function categoriesForm(categories) {
    let i = 0
    for (let category of categories) {
        const selectCategories = document.querySelector("[name=category]")
        const option = document.createElement("option")
        option.innerText = category.name
        option.setAttribute("value", category.id)
        selectCategories.appendChild(option)
        i++
    }
}
categoriesForm(categories)

// Validate file type
function validFileType(file) {
    const fileTypes = ["image/jpeg", "image/png"]
    if (!fileTypes.includes(file.type)) {
        throw new Error(`Veuillez entrer un fichier de type jpeg ou png.`)
    }
}

// Validate file size
function validFileSize(file) {
    if (file.size > 4 * 1024 * 1024) {
        throw new Error(`Veuillez entrer un fichier de maximun 4mo.`)
    }
}

function isFileSelected(file) {
    if (!file) {
        throw new Error("Veuillez sélectionner une image.")
    }
}

// Preview image if there is one upload
function previewImage(file) {
    // Proceed with handling the file
    const preview = document.querySelector(".preview")
    // // Clear previous content with a loop
    // while (preview.firstChild) {
    //     preview.removeChild(preview.firstChild)
    // }
    preview.innerHTML = ''; // Clear previous content
    
    const figure = document.createElement("figure")
    const newImage = document.createElement("img")
    newImage.src = URL.createObjectURL(file) 
    newImage.alt = "preview-image"
    figure.appendChild(newImage)
    preview.appendChild(figure)
    
    // if (!file) {
    //     preview.classList.add("hidden")
    // } else {
    //     preview.classList.remove("hidden")
    // }
    // Toggle preview display based on the presence of a file
}



// Validate type, size and upload of the image
const isFileValid = async (file) => {
    try {
        await validFileType(file)
        await validFileSize(file)
        await isFileSelected(file)
        previewImage(file)
        return true
    } catch (error) {
        console.log(error.message)
        alert(error.message)
        return false
    }
}
// Attach change event listener to file input
// function handleFile(file) {
    const fileInput = document.querySelector("input[type='file']")
    if (fileInput) {
        fileInput.addEventListener("change", async function(event) {
            const image = event.target.files[0]
            await isFileValid(image)
        })
    }
    
    // Function to handle file input change event
    function handlePreview() {
        const fileInput = document.getElementById("img-file")
        const label = document.querySelector("label[for='img-file']")
        const preview = document.querySelector(".preview")
        const previewContainer = document.querySelector(".preview-container")
        const paragraphe = previewContainer.querySelector("p")
        const icon = document.querySelector(".fa-image")
        
        // if (fileInput) {
            fileInput.addEventListener("change", async function(event) {
                const file = event.target.files[0]
                preview.style.display = file ? "block" : "none"
                if (file) {
                    // If a file is selected, show the preview and hide the label
                    await isFileValid(file)
                label.classList.add("label-hidden")
                paragraphe.classList.add("label-hidden")
                icon.classList.add("label-hidden")

                label.disabled = false
                label.style.backgroundColor = "#1D6154"
                preview.style.display = "block"; // Show the preview
            } else {
                // Otherwise, hide the preview and show the label (if a previous file was selected)
                label.classList.remove("label-hidden")
                paragraphe.classList.remove("label-hidden")
                icon.classList.remove("label-hidden")

                label.disabled = true
                preview.style.display = "none"; // Hide the preview
            }
            // const image = event.target.files[0]
            // await isFileValid(image)
        
        })
    // }
}
handlePreview()


// Check title
function isTitleValid(title) {
    // const titleInput = document.getElementById("title")
    const regex = /^[a-zA-Z\s\-“”]+$/
    const titleTested = regex.test(title.trim())
    if (!titleTested) {
        throw new Error("Veuillez entrer un titre en caractères alphabétiques, espaces et symboles spécifiques uniquement.")
    }
    return title
}
// isTitleValid()


// Check if a category is selected
function isCategorySelected(category) {
    const categoryInput = document.getElementById("select-category")
    if (!categoryInput.value) {
        throw new Error(`Veuillez sélectionner une catégorie.`)
    }
    return category
}
// // isCategorySelected()

// Check if the modal is open
function isModalOpen() {
    return modal !== null && modal.style.display !== "none"
}

// Check if the modal form is correctly fill
async function isModalFormValid() {
    try {
        // Check if the modal is open
        if (!isModalOpen()) {
            return false; // Modal is not open, so form is not valid
        }

        // Check file validation
        const fileInput = document.getElementById("img-file")
        const file = fileInput.files[0]
        await isFileValid(file)
        // Change the color of the button
      
        // Check title validation
        const titleInput = document.getElementById("title")
        const title = titleInput.value
        isTitleValid(title)

        // Check category selection
        const categoryInput = document.getElementById("select-category")
        isCategorySelected(categoryInput.value) // Check category selection

        // If all checks pass, enable the button
        document.querySelector(".validate-button").disabled = false
        return true
    } catch (error) {
        console.error(error)
        alert(error.message)
        return false
    }
}

// isModalFormValid()

export function postFormData() {
    const modalForm = document.querySelector(".modal-form")
    if (!modalForm) {
        return
    }
    modalForm.addEventListener('submit', async function(event) {
        event.preventDefault()

        // Check if form data is valid and create FormData
        const validForm = await isModalFormValid()

        if (validForm) {
            //get the token and select the trash icon
            const tokenItem = window.localStorage.getItem("token")

            let token
            if (tokenItem) {
            token = JSON.parse(tokenItem).token
            }

            // Get the form data from the modal form
            const formData = new FormData()
        
            // Get file input and append file
            const fileInput = document.getElementById("img-file")
            const file = fileInput.files[0]
            formData.append('image', file)
            console.log(file)

            // Get title input and append title
            const titleInput = document.getElementById("title")
            const title = titleInput.value
            formData.append('title', title)
            console.log(title)

            // Get category input and append category
            const categoryInput = document.getElementById("select-category")
            const category = categoryInput.valuefetchCategories
            formData.append('category', category)
            console.log(category)

            // Use the formData to submit the form
            try {
                const response = await fetch("http://localhost:5678/api/works", {
                    method: "POST",
                    headers: { 
                        "Authorization": `Bearer ${token}` 
                    },
                    body: formData
                })
                if (response.ok) {
                    // Retrieve the response data
                    const responseData = await response.json()
                    console.log("Nouveau project envoyé:", responseData)

                    // Append the preview image
                    const gallery = document.querySelector(".gallery")
                    const figure = document.createElement("figure")
                    const img = document.createElement("img")
                    figure.appendChild(img)
                    // img.src = URL.createObjectURL(formData.get('image'))
                    img.src = responseData.imageUrl
                    gallery.appendChild(figure)
                } else {
                    throw new Error("Erreur dans les données")
                }
            } catch (error) {
                 console.error("Erreur:", error)
            }
        }       
    })
}
postFormData()