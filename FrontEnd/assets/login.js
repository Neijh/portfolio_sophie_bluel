// //embed login page on add event listener
// const loginPage = () => {
//     const loginNav = document.getElementById("login-nav")
//     loginNav.addEventListener("click", function () {
//         //display the login form section
//         document.getElementById("login").style.display
//         //display none the gallery
//         document.getElementById("introduction").style.display = "none"
//         document.getElementById("portfolio").style.display = "none"
//         document.getElementById("contact").style.display = "none"
//     })
// }
// loginPage()

// export function homePage() {
//     const home = document.getElementById("home")
//     home.addEventListener("click", function () {
//         //display none the login form section
//         document.getElementById("login").style.display = "none"
//         //display the gallery and other sections
//         document.getElementById("introduction").style.display
//         document.getElementById("portfolio").style.display
//         document.getElementById("contact").style.display
//     })
// }

//         // Setup event listener for login/logout button
//         const log = document.querySelector("#login-nav");
//         log.addEventListener("click", function () {
//             // Recover admin login possibly stored in localStorage
//             let adminUser = window.localStorage.getItem("token");
            
//             // If user is logged in, log them out
//             if (adminUser !== null) {
//                 window.localStorage.removeItem("token");
//                 log.innerHTML = "login";
//                 console.log("The log should change");
//                 // Call homePage again to update event listeners
//                 homePage();
//             }
//         })

// //create tags and elements intended for the form
// const generateForm = () => {
//     const formSection = document.querySelector(".login-form")
//     const title = document.createElement("h2")
//     const form = document.createElement("form")
//     const labelEmail = document.createElement("label")
//     const inputEmail = document.createElement("input")

// }

function addListenerSendLogin() {
    //select the form and add a event listener
    const loginForm = document.querySelector(".login-form")
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

addListenerSendLogin()

//////////////////////////////////////////////////////////////
// async function handleLogin() {
//         const response = await fetch("http://localhost:5678/api/users/login", {
//                         method: "POST",
//                         headers: { "Content-Type": "application/json" },
//                         body: chargeUtile
//                     })
//                     console.log(response)
        
//                     const data = await response.json()
//                     console.log(data)
//         }
        
//         export const displayLogin = () => {
//             const pressLogin = document.querySelector("#press-login")
//             pressLogin.addEventListener("click", function (event) {
//                 const mainPage = document.querySelector("#main-page")
//                 const targetMain = event.target.mainPage
        
//             })
//         }