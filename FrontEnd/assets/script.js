//recover the architect's projects with the API
const answer = await fetch("http://localhost:5678/api/works")
const projects = await answer.json()

//i
for (let i = 0; i < projects.length; i++) {
    const image = projects[i].imageUrl
    const title = projects[i].title

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