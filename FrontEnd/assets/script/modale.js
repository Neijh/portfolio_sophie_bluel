// // import { generateProjects } from "./main"

// // const answer = await fetch("http://localhost:5678/api/works")
// // const projects = await answer.json()

// // const generatePhotos = (projects) => {
// //     for (let i = 0; i < projects.length; i++) {
// //         const image = projects[i].imageUrl
// //         const id = projects[i].id

// //         //create tags and elements intended for the modal
// //         const modalPhoto = document.querySelector(".modal-gallery")
// //         const figure = document.createElement("figure")
// //         const imageModal = document.createElement("img")
// //         imageModal.src = image
// //         imageModal.classList.add("image-modal")
// //         const trashContainer = document.createElement("div")
// //         trashContainer.classList.add("trash-container")
// //         ////////////
// //         trashContainer.setAttribute("data-id", projects[i].id)
// //         // console.log(trashContainer.dataset.id)

// //         const trash = document.createElement("i")
// //         trash.classList.add("fa-solid", "fa-trash-can")
        
// //         //add to the modal the architect's work
// //         modalPhoto.appendChild(figure)
// //         figure.appendChild(imageModal)
// //         figure.appendChild(trashContainer)
// //         trashContainer.appendChild(trash)
        
// //     }
// // }
// // generatePhotos(projects)

// // //create element in the modal
// // // const generateModalElements = () => {

// // //     const modalWrapper = document.querySelector(".modal-wrapper")
// // //     const topContainer = document.createElement("div")
// // //     topContainer.setAttribute("class", "top-container")
// // //     const closeButton = document.createElement("button")
// // //     closeButton.classList.add("close-btn", "js-modal-close")
// // //     const xMark = document.createElement("i")
// // //     xMark.setAttribute("class", "fa-solid fa-xmark")
// // //     const modalTitle = document.createElement("h3")
// // //     modalTitle.setAttribute("id", "title-modal")
// // //     modalTitle.innerText = "Galerie photo"
// // //     const line = document.createElement("div")
// // //     line.setAttribute("class", "modal-gallery")
// // //     const divBtn = document.createElement("div")
// // //     divBtn.setAttribute("class", "div-btn")
// // //     const button = document.createElement("button")
// // //     button.setAttribute("class", "add-btn")
// // //     button.innerText = "Ajouter une photo"
    
// // //     modalWrapper.appendChild(topContainer)
// // //     topContainer.appendChild(closeButton)
// // //     closeButton.appendChild(xMark)
// // //     modalWrapper.appendChild(modalTitle)
// // //     modalWrapper.appendChild(line)
// // //     modalWrapper.appendChild(divBtn)
// // //     divBtn.appendChild(button)

// // //     generatePhotos(projects)
// // // }
// // // generateModalElements()


// ////////////////////////////////////////////////////////

// // const deleteProject = () => {
// //     const trashIcons = document.querySelectorAll(".trash-container");
    
// //     trashIcons.forEach(icon => {
// //         icon.addEventListener("click", async function () {
// //             const projectId = this.dataset.id;
// //             console.log("Deleting project with ID:", projectId);
            
// //             // const adminToken = window.localStorage.getItem("token");
// //             const { token } = JSON.parse(window.localStorage.getItem("token"))
// //             console.log(token)
            
// //             try {
// //                 const response = await fetch(`http://localhost:5678/api/works/${projectId}`, {
// //                     method: "DELETE",
// //                     headers: {
// //                         "Accept": "*/*",
// //                         "Authorization": `Bearer ${token}`
// //                     }
// //                 });

// //                 if (response.ok) {
// //                     console.log("Project deleted successfully");
// //                     // for (let i = 0; i < projects.length; i++) {
// //                     //     let projectRemove = projects[i]
// //                     //     projectRemove.remove()
// //                     // }
// //                 } else {
// //                     const errorMessage = await response.text();
// //                     console.error("Failed to delete project:", errorMessage);
// //                 }
// //             } catch (error) {
// //                 console.error("An error occurred while deleting project:", error);
// //             }
// //         });
// //     });
// // };

// // deleteProject();
// // ///////////////////////////////
// // let modal = null

// // const openModal = function (e) {
// //     e.preventDefault()
// //     const target = document.querySelector(e.target.getAttribute("href"))
// //     target.style.display = null
// //     target.removeAttribute("aria-hidden")
// //     target.setAttribute("aria-modal", "true")
// //     modal = target
// //     modal.addEventListener("click", closeModal)
// //     modal.querySelector(".js-modal-close").addEventListener("click", closeModal)
// //     modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)
// // }

// // const closeModal = function (e) {
// //     if (modal === null) return
// //     e.preventDefault()
// //     modal.style.display = "none"
// //     modal.setAttribute("aria-hidden", "true")
// //     modal.removeAttribute("aria-modal")
// //     modal.removeEventListener("click", closeModal)
// //     document.querySelector(".js-modal-close").removeEventListener("click", closeModal)
// //     modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation)
// //     modal = null
// // }

// // const stopPropagation = function (e) {
// //     e.stopPropagation()
// // }

// // document.querySelector(".js-modal").addEventListener("click", openModal)

// // const addPhotos = () => {
// //     const modalWrapper1 = document.querySelector(".modal-wrapper")
// //     const addButton = document.querySelector(".add-btn")
// //     //
// //     addButton.addEventListener("click", function () {
// //         // //top container
// //         // const topContainer = document.querySelector(".top-container")
// //         // const arrow = document.createElement("i")
// //         // arrow.classList.add("fa-solid", "fa-arrow-left")
        
// //         // topContainer.appendChild(arrow)
        
// //         //disable the gallery & change of content
// //         const modalGallery = document.querySelectorAll(".modal-gallery figure")
// //         modalGallery.forEach(figure => figure.style.display = "none")
// //         const title = document.querySelector(".title-modal")
// //         title.innerText = "Ajout Photo"
// //         //////////////
// //         const toggleElements = document.querySelectorAll(".toggle")
// //         toggleElements.forEach(element => element.style.display = "block")
// //         //////////////
// //         document.querySelector(".add-btn").style.display = "none"
// //         // const newGallery = document.querySelector(".modal-gallery")
// //         // const previewContainer = document.createElement("div")
// //         // previewContainer.setAttribute("class", "preview-container")
// //         // const previewIcon = document.createElement("i")
// //         // previewIcon.classList.add("fa-regular", "fa-image")
// //         // const previewButton = document.createElement("button")
// //         // previewButton.innerText = "+ Ajouter photo"
// //         // const previewDetails = document.createElement("p")
// //         // previewDetails.innerText = "jpg, png:4mo max"

// //         // const form = document.createElement("form")
// //         // form.classList.add("form")
// //         // const labelTitle = document.createElement("label")
// //         // labelTitle.setAttribute("for", "title")
// //         // labelTitle.innerText = "Titre"
// //         // const titleInput = document.createElement("input")
// //         // titleInput.setAttribute("id", "title")
// //         // titleInput.setAttribute("name", "title")
// //         // const categoryLabel = document.createElement("label")
// //         // categoryLabel.setAttribute("for", "category")
// //         // categoryLabel.innerText = "Catégorie"
// //         // const categoryContainer = document.createElement("div")
// //         // categoryContainer.setAttribute("class", "category-container")
// //         // const chevron = document.createElement("i")
// //         // chevron.classList.add("fa-solid", "fa-chevron-down")
// //         // const categoryInput = document.createElement("input")
// //         // categoryInput.setAttribute("id", "category")
// //         // categoryInput.setAttribute("name", "category")
// //         // categoryInput.classList.add("category")
        
// //         // modalWrapper1.appendChild(newGallery)
// //         // newGallery.appendChild(previewContainer)
// //         // previewContainer.appendChild(previewIcon)
// //         // previewContainer.appendChild(previewButton)
// //         // previewContainer.appendChild(previewDetails)
        
// //         // newGallery.appendChild(form)
// //         // form.appendChild(labelTitle)
// //         // form.appendChild(titleInput)
// //         // form.appendChild(categoryLabel)
// //         // form.appendChild(categoryContainer)
// //         // categoryContainer.appendChild(chevron)
// //         // categoryContainer.appendChild(categoryInput)

// //         // const line = document.querySelector(".line")
// //         // modalWrapper1.insertBefore(newGallery, line)

// //         // //button
// //         // const buttonContainer = document.querySelector(".div-btn")
// //         // const validateButton = document.createElement("button")
// //         // validateButton.innerText = "Valider"
// //         // validateButton.setAttribute("class", "validate-button")

// //         // buttonContainer.appendChild(validateButton)
// //     })
// // }

// // addPhotos()