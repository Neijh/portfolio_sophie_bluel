export function addListenerSendLogin() {
    //select the form and add a event listener
    const loginForm = document.querySelector(".login-form")
    console.log("LoginForm:", loginForm)
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault()

        //get my form input values and turn them into json
        const logData = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value
        };
        console.log("Login data:", logData)
        
        const chargeUtile = JSON.stringify(logData)
        console.log(chargeUtile)
        
        //send my form input values
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile
        })
        console.log(response)

        //wait for the response
        const data = await response.json()
        console.log(data)
        
        //condition to login the user
        if (response.ok) {
            window.localStorage.setItem("token", JSON.stringify(data))
            window.location.href = "./index.html"
        } else {
            alert("user not found")
        }
    })
}

//////////////////////////////////////////////////////////////
// async function handleLogin() {
    //     const response = await fetch("http://localhost:5678/api/users/login", {
        //                 method: "POST",
        //                 headers: { "Content-Type": "application/json" },
        //                 body: chargeUtile
        //             })
        //             console.log(response)
        
        //             const data = await response.json()
        //             console.log(data)
        // }
        
        // export const displayLogin = () => {
        //     const pressLogin = document.querySelector("#press-login")
        //     pressLogin.addEventListener("click", function (event) {
        //         const mainPage = document.querySelector("#main-page")
        //         const targetMain = event.target.mainPage
        
        //     })
        // }