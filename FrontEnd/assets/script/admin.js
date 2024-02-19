// // import { addListenerSendLogin } from "./login.js"

// // //Recover admin login possibly stored in localStorage
// // addListenerSendLogin()

// // console.log(adminUser)

// // const toggleLogout = () => {
// //     const logOut = document.querySelector("#login-nav")
// //     logOut.innerHTML = "logout"
// // }
// // toggleLogout()

// ///////////////////////////////////////////////////////
// let adminUser = window.localStorage.getItem("token")
// const log = document.querySelector("#login-nav")


// const showLogout = () => {
//     if (adminUser !== null) {
//         log.innerHTML = "logout"
//         document.querySelector(".filter").style.display = "none"

        
//     } else {
//         document.querySelector(".admin-tools").style.display = "none"
//         document.querySelector("h2 .admin-tools").style.display = "none"
//     }

// }
// showLogout()


// //logout the admin on click and redirect
// const logAdminOut = () => {
//     // const log = document.querySelector("#login-nav")
//     // let adminUser = window.localStorage.getItem("token")
//     log.addEventListener("click", function () {
//         //if token is true
//         if (adminUser !== null) {
//             window.localStorage.removeItem("token")
//             log.innerHTML = "login"
//             log.setAttribute("href", "./index.html")
//         } else {
//             log.setAttribute("href", "./login.html")
//         }
//     })
// }
//     logAdminOut()

// // logOut.addEventListener("click", function () {
//     //     //if token is true
// //     if (adminUser !== null) {
// //         window.localStorage.removeItem("token")
// //         // window.location.href = "./index.html"
// //         logOut.innerHTML = "login"
// //         // homePage()
// //     }
// // })

// //     const toggleLogout = () => {
// //         const logOut = document.querySelector("#login-nav")
// //         logOut.innerHTML = "logout"
// //     }
// //     toggleLogout()