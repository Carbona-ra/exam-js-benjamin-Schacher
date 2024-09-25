const messages = document.querySelector("#messages")
const creationForm = document.querySelector("#creationForm")
const spiner = document.querySelector("#spinnerContainer")
spiner.style.display = 'none'

function makeMessages(Text, color) {
    messages.textContent = Text
    messages.style.color = color
    spiner.style.display = 'none'
}

creationForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    spiner.style.display = 'block'

    const formData = new FormData(creationForm)
    const email = formData.get("Email")
    const password = formData.get("Password")
    const confirmPassword = formData.get("confirmPassword")

    if (password.length < 8) {
        makeMessages("Mot de passe trop court", "red")
        return
    } else if (password !== confirmPassword) {
        makeMessages("Confirmation de mot de passe invalide", "red")
        return
    }
    
    try {
        const res = await fetch('http://localhost:8000/api/users', 
            {
                method: "Post",
                headers : {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password,
                  })
            })

        const data = await res.json()
        console.log(data)

        if (!res.ok) {
            const errorMessage = data['title']
            messagesErreur = "Erreur : " + errorMessage
            makeMessages(messagesErreur, "red")
            return
        }

        makeMessages("Création réussite", "green")
            
    } catch (err) {
        messagesCathErreur = "Une erreur s'est produite : " + err
        makeMessages(messagesCathErreur, "red")
    }
});

