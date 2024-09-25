const messages = document.querySelector("#messages")
const creationForm = document.querySelector("#creationForm")
const spiner = document.querySelector("#spinnerContainer")
spiner.style.display = 'none'

creationForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    spiner.style.display = 'block'
    const formData = new FormData(creationForm)
    const email = formData.get("Email")
    const password = formData.get("Password")
    const confirmPassword = formData.get("confirmPassword")

    if (password.length < 8) {
        messages.textContent = "Formulaire invalide"
        messages.style.color = "red"
        spiner.style.display = 'none'
        return
    } else if (password !== confirmPassword) {
        messages.textContent = "Confirmation de mot de passe invalide"
        messages.style.color = "red"
        spiner.style.display = 'none'
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
                    "roles": [
                      "flopeur"
                    ],
                    "password": password,
                    "articles": []
                  })
            })

            const data = await res.json()
            console.log(data)

            if (!res.ok) {
                const errorMessage = data['title']
                messages.textContent = "Erreur : " + errorMessage
                messages.style.color = "red"
                spiner.style.display = 'none'
                return
            }

            messages.textContent = "Création réussite"
            messages.style.color = "green"
            spiner.style.display = 'none'
            
        }   catch (err) {
            messages.textContent = "Une erreur s'est produite : " + err;
            messages.style.color = "red"
            spiner.style.display = 'none'
        }
    });

