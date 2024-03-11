/********************************************************************************
 ************** All functions relate to modal *
 ********************************************************************************/

import { fetchProjects, fetchCategories } from "../data/api.js"
import { createReusableGallery, getToken } from "../data/config.js"

// Constant often use

const gallery = document.querySelector(".gallery")
const modalGallery = document.querySelector(".modal-gallery")

const modal = document.getElementById("modal")
const openModal = document.querySelector(".open-modal")
const closeModal = document.querySelectorAll(".close-modal")

//////////////////////////////////////////////////////////////////////////////
// Add Event listener to open and close the modal

openModal.addEventListener("click", () => {
    modal.showModal()
    modalView1()
    toggleModalView()
})

closeModal.forEach(button => {
    button.addEventListener("click", () => {
        modal.close()
    })
})

modal.addEventListener("click", (event) => {
    if (event.target == modal) {
        modal.close()
    }
})

// Display the different views of the modal

const view1 = document.querySelector(".js-modal-view1")
const view2 = document.querySelector(".js-modal-view2")

function modalView1() {
    view1.classList.remove("hidden")
    view2.classList.add("hidden")
}

function modalView2() {
    view1.classList.add("hidden")
    view2.classList.remove("hidden")
}

function toggleModalView() {
    // Display view 2 when "Ajouter photo" button is clicked
    const addButton = document.querySelector(".add-btn")
    addButton.addEventListener("click", function () {
        resetForm()
        modalView2()
    })
    // Display view 1 when the arrow on the top left is clicked
    const arrow = document.querySelector(".fa-arrow-left")
    arrow.addEventListener("click", () => {
        modalView1()
    })
}

//////////////////////////////////////////////////////////////////////////////
// Create modal gallery and add trash icon

export async function initializeModalGallery() {
    try {
        const projects = await fetchProjects()
        
        createModalGallery(projects)
    } catch (error) {
        console.error("Error fetching projects:", error)
    }
}

// Function to add trash icon to the figure

function addTrashIcon(figure) {
    const trashContainer = document.createElement("button")
    trashContainer.classList.add("trash-container")

    const trashIcon = document.createElement("i")
    trashIcon.classList.add("fa-solid", "fa-trash-can")

    trashContainer.appendChild(trashIcon)
    figure.appendChild(trashContainer)
}

// Function to create the modal gallery

function createModalGallery(projects) {
    for (let i = 0; i < projects.length; i++) {
        const image = projects[i].imageUrl
        const id = projects[i].id

        //create tags and elements intended for the modal.
        const element = createReusableGallery(image, id)
        addTrashIcon(element)
        modalGallery.appendChild(element)
            

    }
    removeTitle()
}

// Function to remove title on modal gallery

function removeTitle() {
    const figures = modalGallery.querySelectorAll("figure")
    figures.forEach(figure => {
        const figcaption = figure.querySelector("figcaption")
        if (figcaption) {
            figure.removeChild(figcaption)
        }
    })
}


//////////////////////////////////////////////////////////////////////////////
// Delete project in the gallery

export function deleteProject() {
    let token = getToken()

    if (!modalGallery) return

    // Add a single click event listener to the gallery container
    modalGallery.addEventListener("click", async function(event) {
        // Check if the clicked element is a trash icon
        if (event.target.classList.contains("fa-trash-can")) {
            // Check if figure is correctly found
            const figure = event.target.closest("figure")
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
                    // Remove the project from the modal gallery
                    figure.remove()
                    // Remove the corresponding project from the main gallery
                    const mainGalleryFigure = gallery.querySelector(`figure[id="${projectId}"]`)
                    mainGalleryFigure.remove()

                    modal.close()

                } else {
                    const errorMessage = await response.text()
                    console.error("Failed to delete project:", errorMessage)
                }
            } catch (error) {
                console.error("An error occurred while deleting project:", error)
            }

            } else {
                console.error("Parent figure not found!")
            }
        }
    })
}

//////////////////////////////////////////////////////////////////////////////
// Add projects in the gallery

const categoryInput = document.getElementById("select-category")
const fileInput = document.getElementById("img-file")
const titleInput = document.getElementById("title")

export async function initializeCategories() {
    try {
        const categories = await fetchCategories()
        categoriesForm(categories)

    } catch (error) {
        console.error("Error fetching categories:", error)
    }
}

// Retrieves the categories from swagger and integrates them into the form

function categoriesForm(categories) {
    categoryInput.innerHTML = ""

    // Ajoute l'option "Selectionner une categorie"
    const defaultOption = document.createElement("option")
    defaultOption.setAttribute("value", "")
    categoryInput.appendChild(defaultOption)

    let i = 0
    for (let category of categories) {
        const option = document.createElement("option")
        option.innerText = category.name
        option.setAttribute("value", category.id)
        categoryInput.appendChild(option)
        i++
    }
}

// Check if the image file is valid and return a boolean

function isFileValid(file) {
    if (!file) return
    const fileTypes = ["image/jpeg", "image/png"]
    const maxSize = 4 * 1024 * 1024

    if (!fileTypes.includes(file.type)) {
        alert("Veuillez entrer un fichier de type png ou jpeg.")
        fileInput.value = ""
        return false
    }

    if (file.size > maxSize) {
        alert("Le fichier dépasse 4 Mo.")
        return false
    }
    return true
}

// Display the file preview

export function previewFile() {
    fileInput.addEventListener("change", async function(event) {
        const file = event.target.files[0]
        if (isFileValid(file)) {
            const reader = new FileReader()
            reader.onload = function (event) {
                const preview = document.querySelector(".preview")
                preview.innerHTML = `<figure><img src="${event.target.result}" alt="File Preview"></figure>`
                preview.style.display = "block" // Show the preview container
                
                const previewInput = document.querySelector(".preview-input")
                previewInput.classList.add("opacity") // Hide the form input
                updateSubmitButton()
            }
            reader.readAsDataURL(file)
        } else {          
            // Clear the file input if invalid
            fileInput.value = ""
            updateSubmitButton()
        }
    })
}

// If the modal form is valid, change the color of the button

export function updateSubmitButton() {
    const valid = isModalFormValid()
    const submitButton = document.querySelector(".validate-button")
    submitButton.style.backgroundColor = valid ? "#1D6154" : "" // Change color if inputs are valid
}

// Check if all the input of the modal form are filled

function isModalFormValid() {
    // Check if there is a file in the preview
    const previewImage = document.querySelector('.preview img')
    if (!previewImage) return false; // No file selected

    // Check if the title is valid
    const regex = /^[a-zA-Z0-9\s\-_.,:;“”"'()!?&]+$/
    const titleValue = titleInput.value.trim()
    const validTitle = regex.test(titleValue)

    // Check if a category is selected
    const validCategory = categoryInput.value !== ""
    return validTitle && validCategory // No need to validate file as it's already in the preview
}

// Attach event listeners for input event on title and category input fields
titleInput.addEventListener("input", updateSubmitButton)
categoryInput.addEventListener("input", updateSubmitButton)

// Add project to the galleries

export function postFormData() {
    const modalForm = document.querySelector(".modal-form")
    if (!modalForm) return
    modalForm.addEventListener('submit', async function(event) {
        event.preventDefault()

        // Check if form data is valid and create FormData
        const validForm = await isModalFormValid()

        if (validForm) {

            // Get the token
            let token = getToken()

            // Get the form data from the modal form
            const formData = new FormData()
        
            // Get file input and append file
            const file = fileInput.files[0]
            formData.append('image', file)

            // Get title input and append title
            const title = titleInput.value
            formData.append('title', title)

            // Get category input and append category
            const category = categoryInput.value // fetchCategories
            formData.append('category', category)

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

                    const newModalFigure = createReusableGallery(responseData.imageUrl, responseData.id, responseData.title)
                    addTrashIcon(newModalFigure)
                    modalGallery.appendChild(newModalFigure)
                    removeTitle()

                    const newFigure = createReusableGallery(responseData.imageUrl, responseData.id, responseData.title)
                    gallery.appendChild(newFigure)

                    // Reset modal view 2 and close modal
                    resetForm()
                    modal.close()
                } else {
                    throw new Error("Erreur dans les données")
                }
            } catch (error) {
                 console.error("Erreur:", error)
            }
        }       
    })
}

function resetForm() {
    const preview = document.querySelector(".preview")
    preview.innerHTML = ""
    preview.style.display = "none"
                    
    const previewInput = document.querySelector(".preview-input")
    previewInput.classList.remove("opacity")

    titleInput.value = ''
    categoryInput.value = ''
}
