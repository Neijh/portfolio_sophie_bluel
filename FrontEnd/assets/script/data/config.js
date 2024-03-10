/********************************************************************************
 * Contains and retrieves all the data necessary for the operation of the site
 ********************************************************************************/

// Creates the basis of the gallery

export function createReusableGallery(image, id, title) {
    const figure = document.createElement("figure")
    // Put the id of projects on the figure
    figure.id = id
    const imageElement = document.createElement("img")
    imageElement.setAttribute("class", "imgGallery")
    imageElement.src = image

    const figCaption = document.createElement("figcaption")
    figCaption.innerText = title

    figure.appendChild(imageElement)
    figure.appendChild(figCaption)

    return figure
}

//////////////////////////////////////////////////////////////////////////////
// Get the token if there is one in the local storage

export function getToken() {

    const tokenItem = window.localStorage.getItem("token")
    
    let token
    if (tokenItem) {
    token = JSON.parse(tokenItem).token
    }

    return token
}