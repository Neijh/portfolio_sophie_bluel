/********************************************************************************
 ******************************* Login page *
 ********************************************************************************/

// Login the admin user

export function addListenerSendLogin() {
    // Select the form and add a event listener on the submit input
    const loginForm = document.querySelector(".login-form")
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault()
        
        try {
            // Get my form input values and turn them into json
            const logData = {
                email: event.target.querySelector("[name=email]").value,
                password: event.target.querySelector("[name=password]").value
            }
            
            const payload = JSON.stringify(logData)
            
            // Post my form input values to the api
            const response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: payload
            })
    
            // Wait for the response
            const loginData = await response.json()
            
            if (!response.ok) {
                throw new Error("Erreur dans l'identifiant ou le mot de passe")
            }

            // Store the token locally and redirect
            window.localStorage.setItem("token", JSON.stringify(loginData))
            window.location.href = "./index.html"
        } catch (error) {
            alert(error.message)
        }
    })
}

addListenerSendLogin()