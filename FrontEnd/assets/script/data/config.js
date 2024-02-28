////////////////////////////////////////////////////////////////////////////
// Contains and retrieves all the data necessary for the operation of the site //
///////////////////////////////////////////////////////////////////////////
// import { fetchProjects } from "../data/projects.js"
// const projects = await fetchProjects()

export function createReusableGallery(image, id) {
    const figure = document.createElement("figure")
    // figure.setAttribute("data-id", id)
    figure.id = id
    const imageElement = document.createElement("img")
    imageElement.setAttribute("class", "imgGallery")
    imageElement.src = image

    figure.appendChild(imageElement)

    return figure
}

// export function iterateProjects(projects, image, title, id) {
//     for (let i = 0; i < projects.length; i++) {
//         // const image = projects[i].imageUrl
//         // const title = projects[i].title
//         // const id = projects[i].id
//         const { imageURL: image, title, id } = projects[i] // Destructure project object
//         callback(image, title, id)
//     }
// }

