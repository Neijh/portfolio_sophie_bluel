/**********************************************************
 ***** Modal
 **********************************************************/
// Import fetchProjects
import { fetchProjects, fetchCategories } from "../data/projects.js"
import { createReusableGallery, getToken } from "../data/config.js"

const projects = await fetchProjects()
const categories = await fetchCategories()

const gallery = document.querySelector(".gallery")
const modalGallery = document.querySelector(".modal-gallery")


const modal = document.getElementById("modal")
const openModal = document.querySelector(".open-modal")
const closeModal = document.querySelector(".close-modal")

openModal.addEventListener("click", () => {
    modal.showModal()
})

closeModal.addEventListener("click", () => {
    modal.close()
})

modal.addEventListener("click", (event) => {
    if (event.target == modal) {
        modal.close()
    }
})

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

async function createModalGallery(projects) {
    // Iterate through projects.
    for (let i = 0; i < projects.length; i++) {
        const image = projects[i].imageUrl
        const id = projects[i].id

        //create tags and elements intended for the modal.
        if (modalGallery) {
            // Add the one already create.
            const element = createReusableGallery(image, id)
        
            //add to the modal the architect's work
            modalGallery.appendChild(element)

            addTrashIcon(element)
        }
    }
}
createModalGallery(projects)

function displayView2() {
    // const modalWrapper1 = document.querySelector(".modal-wrapper")
    const addButton = document.querySelector(".add-btn")

        addButton.addEventListener("click", function () {
            //disable the gallery & change of content
            const modalPhoto = document.querySelectorAll(".modal-gallery figure")
            modalPhoto.forEach(figure => figure.style.display = "none")
            // change the title
            const title = document.querySelector(".title-modal")
            title.innerText = "Ajout photo"
            //////////////
            const toggleElements = document.querySelectorAll(".js-modal-view2")
            toggleElements.forEach(element => element.style.display = "flex")
            //////////////
            const addBtn = document.querySelector(".div-btn")
            addBtn.style.display = "none"
            
            backModalView1(modalPhoto, title, toggleElements, addBtn)
        })
    // }
}

displayView2()

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

// Delete project in the gallery. 
function deleteProject() {

    // Get the token
    let token = getToken()

    // const modalGallery = document.querySelector(".modal-gallery")
    if (!modalGallery) return; // Exit early if the gallery container doesn't exist

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
        //////////////////////
        } else {
            console.error("Parent figure not found!")
        }
    ///////////////////////////
    }
    })
}
deleteProject()

// Add project in the gallery.
const categoryInput = document.getElementById("select-category")
const fileInput = document.getElementById("img-file")
const titleInput = document.getElementById("title")

// Retrieves the categories from the API and integrates them into the form
function categoriesForm(categories) {
    let i = 0
    for (let category of categories) {
        const option = document.createElement("option")
        option.innerText = category.name
        option.setAttribute("value", category.id)
        categoryInput.appendChild(option)
        i++
    }
}
categoriesForm(categories)

function isFileValid(file) {
    // if (!file) {
    //     alert("Veuillez sélectionner un fichier.")
    //     return false
    // }
    if (!file) return
    const fileSize = file.size / (1024 * 1024)
    const fileTypes = ["image/jpeg", "image/png"]

    if (!fileTypes.includes(file.type)) {
        alert("Veuillez entrer un fichier de type png ou jpeg.")
        fileInput.value = ""
        return false
    }

    if (fileSize > 4) {
        alert("Le fichier dépasse 4 Mo.")
        return false
    }
    return true
}
// isFileValid()
// console.log(isFileValid())

// Display the file preview
function previewFile() {
    fileInput.addEventListener("change", async function(event) {
        const file = event.target.files[0]
        if (isFileValid(file)) {
            const reader = new FileReader()
            reader.onload = function (event) {
                const preview = document.querySelector(".preview")
                preview.innerHTML = `<figure><img src="${event.target.result}" alt="File Preview"></figure>`
                preview.style.display = "block" // Show the preview container
                
                const previewInput = document.querySelector(".preview-input")
                previewInput.classList.add("hidden") // Hide the form input
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

function updateSubmitButton() {
    const valid = isModalFormValid()
    const submitButton = document.querySelector(".validate-button")
    // submitButton.disabled = !valid; // Disable the button if inputs are invalid
    submitButton.style.backgroundColor = valid ? "#1D6154" : "" // Change color if inputs are valid
}

function isModalFormValid() {
    const file = fileInput.files[0]
    const validFile = isFileValid(file)
    const validTitle = titleInput.value.trim() !== ""
    const validCategory = categoryInput.value !== ""

    return validFile && validTitle && validCategory

    // try {
    //     const file = fileInput.files[0]
    //     if (!file) {
    //         throw new Error("Veuillez sélectionner une image.")
    //     }
    // const validFile = isFileValid(file)
    // const validTitle = titleInput.value.trim() !== ""
    // const validCategory = categoryInput.value !== ""

    // return validFile && validTitle && validCategory
    // } catch (error) {
    //     console.log(error)
    //     alert(error.message)
    // }
}
previewFile()
// Attach event listeners for input event on title and category input fields
titleInput.addEventListener("input", updateSubmitButton);
categoryInput.addEventListener("input", updateSubmitButton);

// Update submit button color initially
updateSubmitButton()

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
                    // modal.close()
                    console.log("Nouveau project envoyé:", responseData)

                    const newFigure = createReusableGallery(responseData.imageUrl, responseData.id)
                    gallery.appendChild(newFigure)

                    // Reset modal view 2 and close modal
                    // Reset the input form
                    fileInput.value = ''
                    titleInput.value = ''
                    categoryInput.value = ''
                    displayView2()
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
postFormData()
