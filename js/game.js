const Game = {
    title: 'Super Covid Apocalypse',
    authors: 'David Edson & Anthony Guido',
    license: undefined,
    version: '1.0.0',
    canvasDom: undefined,
    ctx: undefined,
    canvasSize: {
        w: undefined,
        h: undefined
    },
    keys: {
        JUMP: 'ArrowUp',
        VACCINE: 'ArrowRight'
    },
    FPS: 60,
    framesCounter: 0,
    background: undefined,
    home: undefined,
    player: undefined,
    platforms: [],
    points: [],
    sickPeople: [],
    vaccine: undefined,
    totalPoint: 100,
    speed: 5,

    init() {
        this.canvasDom = document.querySelector('#canvas')
        this.ctx = this.canvasDom.getContext('2d')
        this.setDimensions()
        this.setEventListeners()
        this.start()
    },

    setDimensions() {
        this.canvasSize.w = window.innerWidth
        this.canvasSize.h = window.innerHeight
        this.canvasDom.setAttribute('width', this.canvasSize.w)
        this.canvasDom.setAttribute('height', this.canvasSize.h)
    },

    setEventListeners() {
        document.onkeyup = e => {
            if (e.key === this.keys.JUMP) {
                this.player.jump(this.framesCounter)
            }
            if (e.key === this.keys.VACCINE) {
                this.player.vaccinate()
                setTimeout(() => {
                    this.vaccine.vaccineLength = 0
                }, 1000);
                this.vaccine.vaccineLength = 100
            }
        }
  },

    start() {
        this.reset()
        this.interval = setInterval(() =>{
            this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++
            this.clearAll()
            this.drawAll()
            this.generatePlatforms()
            this.generatePoints()
            this.generateSickPeople()
            this.clearElements()
            this.jumpPlatform() 
            this.getRewards() ? this.getPoints () : null
            this.isContaminated()
            this.isVaccinated() 
            this.allPointsLost() ? this.gameOver() : null
            this.backHome() ? this.gameWon() : null
        }, 1000 / this.FPS)
    },

    reset() {
        this.background = new Background(this.ctx, this.canvasSize.w, this.canvasSize.h, "./img/game-background.jpg", this.speed)
        this.home = new Home(this.ctx, this.canvasSize.w, this.canvasSize.h, this.speed)
        this.player = new Player(this.ctx, this.canvasSize.w, this.canvasSize.h)
        this.vaccine = new Vaccine(this.ctx, this.canvasSize.h, 0)  
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    drawAll() {
        this.background.draw()
        this.home.draw()
        this.player.draw(this.framesCounter)
        this.vaccine.draw(this.player.playerHeight, this.player.playerPositionY)
        this.sickPeople.forEach(elm => {
            elm.draw()
        })
    },

    generatePlatforms() {},

    generatePoints() {},

    generateSickPeople() {
        const womanRandom = Math.floor(Math.random() * 150) + 50
        const manRandom = Math.floor(Math.random() * 50) + 150
        if (this.framesCounter % womanRandom === 0) {
      this.sickPeople.push(new Sickpeople(this.ctx, this.canvasSize.h,this.canvasSize.w, "./img/sick-woman.png", this.speed))
    } else if (this.framesCounter % manRandom === 0) {
      this.sickPeople.push(new Sickpeople(this.ctx, this.canvasSize.h,this.canvasSize.w, "./img/sick-man.png", this.speed))
    }
    },

    clearElements() {
        this.sickPeople = this.sickPeople.filter(sickPerson => sickPerson.sickPersonPosition.x >= 0)
    },

    jumpPlatform() {
        // si el player entra en contacto con la parte superior de la plataforma => el x del player va a ser del x de la plataforma + 20
        // else if el player entra en contacto con la parte lateral izquierda o la parte de abajo de la plataforma => el x del player vuelve a ser el x del suelo
        // si el player no esta encima de la plataforma => vuelve al suelo
    },

    getPlatform() {},

    getRewards() {},

    getPoints () {},

    isContaminated() {
        this.sickPeople.forEach( element => {
            if(element.sickPersonPosition.x < this.player.playerPositionX + this.player.playerWidth && this.player.playerPositionY === this.canvasSize.h-this.player.playerHeight-20) {
                console.log("contaminated")
                this.totalPoint -= 50
                console.log(this.totalPoint)
                console.log(this.player)
            }
        });
    },

    looseLife() {},

    isVaccinated() {
            
        this.sickPeople.forEach( element => {
            if(element.sickPersonPosition.x < this.vaccine.vaccineX + this.vaccine.vaccineLength && this.player.playerPositionY === this.canvasSize.h-this.player.playerHeight-20) {
                this.sickPeople.splice(element, 1); 
            }
        });
        
    },

    healing() {},

    allPointsLost() {},

    gameOver() {
        clearInterval(this.interval)
    },

    backHome() {},
    
    gameWon() {}
}