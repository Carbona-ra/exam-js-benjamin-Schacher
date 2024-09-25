class ThemeSwitcher {

    constructor () {
        this.body = document.querySelector("body")
        this.darkBtn = document.querySelector("#darkThemeBtn")
        this.lightBtn = document.querySelector("#lightThemeBtn")

        this.darkBtn.addEventListener('click', () => {
            this.switchToDark()
        })
        this.lightBtn.addEventListener('click', () => {
            this.switchToLight()
        })

        if (localStorage.getItem('selectedTheme')){
            if (localStorage.getItem('selectedTheme') === 'dark'){
                this.body.classList.add('dark')
                localStorage.setItem('selectedTheme', 'dark')
            } else if (localStorage.getItem('selectedTheme') === 'light'){
                this.body.classList.remove('dark')
                localStorage.setItem('selectedTheme', 'light')
            }
        } else {
            this.body.classList.remove('dark')
            localStorage.setItem('selectedTheme', 'light')
        }

    }
    
    switchToLight() {
        this.body.classList.remove('dark')
        console.log('switchToDark')
        localStorage.setItem('selectedTheme', 'light')
    }

    switchToDark() {
        this.body.classList.add('dark')
        console.log('switchToLight')
        localStorage.setItem('selectedTheme', 'dark')
    }
}



const switcher = new ThemeSwitcher()