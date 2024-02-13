import { addListenerSendLogin } from "./login.js"

//Recover admin login possibly stored in localStorage
let adminUser = window.localStorage.getItem("token")

if (adminUser === null) {

}
addListenerSendLogin()

//get the architect's projects with the API
const answer = await fetch("http://localhost:5678/api/works")
const projects = await answer.json()


//show all projects by API
function generateProjects(projects) {
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
} 

generateProjects(projects)

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

generateFilterButtons()

//filter category
const filterCategory = () => {
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
            
filterCategory()

