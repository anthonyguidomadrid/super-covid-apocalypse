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
    masks: [],
    gels: [],
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
        this.interval = setInterval(() => {
            this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++
            this.clearAll()
            this.drawAll()
            this.generatePlatforms()
            this.generatePoints()
            this.generateSickPeople()
            this.clearElements()
            this.isOnPlatform()
            this.cantGetPlatform()
            this.getPoints()
            this.isContaminated()
            this.isVaccinated()
            this.gameOver() 
            this.gameWon() 
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
        this.masks.forEach(elm => {
            elm.draw()
        })
        this.gels.forEach(elm => {
            elm.draw()
        })
        this.platforms.forEach(elm => {
            elm.draw()
        })
    },

    generatePlatforms() {       
        const frequencyRandom = Math.floor(Math.random() * 100) + 100
        const widthPlatformRandom = Math.floor(Math.random() * 450) + 350
        if (this.framesCounter % frequencyRandom === 0) {
            this.platforms.push(new Platforms(this.ctx, this.canvasSize.h, this.canvasSize.w, widthPlatformRandom, this.speed))
        }
    },

    generatePoints() {
        const gelRandom = Math.floor(Math.random() * 50) + 150
        const maskRandom = Math.floor(Math.random() * 100) + 100
        if (this.framesCounter % gelRandom === 0) {
            this.gels.push(new Points(this.ctx, this.canvasSize.h, this.canvasSize.w, "./img/gel.png", this.speed, this.canvasSize.h - 70))
        } else if (this.framesCounter % maskRandom === 0) {
            this.masks.push(new Points(this.ctx, this.canvasSize.h, this.canvasSize.w, "./img/mask.png", this.speed, this.canvasSize.h - 400))
        }
    },

    generateSickPeople() {
        const womanRandom = Math.floor(Math.random() * 150) + 50
        const manRandom = Math.floor(Math.random() * 50) + 150
        if (this.framesCounter % womanRandom === 0) {
            this.sickPeople.push(new Sickpeople(this.ctx, this.canvasSize.h, this.canvasSize.w, "./img/sick-woman.png", this.speed))
        } else if (this.framesCounter % manRandom === 0) {
            this.sickPeople.push(new Sickpeople(this.ctx, this.canvasSize.h, this.canvasSize.w, "./img/sick-man.png", this.speed))
        }
    },

    clearElements() {
        this.sickPeople = this.sickPeople.filter(sickPerson => sickPerson.sickPersonPosition.x >= 0)
        this.masks = this.masks.filter(point => point.pointsPosition.x >= 0)
        this.gels = this.gels.filter(point => point.pointsPosition.x >= 0)
        this.platforms = this.platforms.filter(platform => platform.platPos.x >= -1000)
    },

    isOnPlatform() {
        this.platforms.forEach(elm => {
            if (elm.platPos.y - 20 < this.player.playerPositionY + this.player.playerHeight
                && this.player.playerPositionY < elm.platPos.y 
                && elm.platPos.x < this.player.playerPositionX
                && elm.platPos.x + elm.platSize.w > this.player.playerPositionX
            ) {
                this.player.floorLevel = elm.platPos.y - this.player.playerHeight -20
                this.player.playerPositionY = this.player.floorLevel
                this.player.imageInstance.src = "./img/player-walking.png"
                this.player.playerHeight = 250
            } else {
                this.player.floorLevel = this.canvasSize.h - this.player.playerHeight -20
            }

        })
    },

    cantGetPlatform() { 
    // this.platforms.forEach(elm => {
    //     if (this.player.playerPositionY < elm.platPos.y + elm.platSize.h
    //         && elm.platPos.x < this.player.playerPositionX 
    //         && elm.platPos.x + elm.platSize.w > this.player.playerPositionX) {
    //             this.player.playerPositionY = this.player.floorLevel 
    //     }
    // })
    },

    getPoints() {
        this.masks.forEach(elm => {
            if (this.player.playerPositionX < elm.pointsPosition.x + elm.pointsSize.w &&
                this.player.playerPositionX + this.player.playerWidth > elm.pointsPosition.x &&
                this.player.playerPositionY < elm.pointsPosition.y + elm.pointsSize.h &&
                this.player.playerPositionY + this.player.playerHeight > elm.pointsPosition.y) {
                this.masks.splice(elm, 1);
                this.totalPoint += 5
                console.log(this.totalPoint)
            }
        })
        this.gels.forEach(elm => {
            if (this.player.playerPositionX < elm.pointsPosition.x + elm.pointsSize.w &&
                this.player.playerPositionX + this.player.playerWidth > elm.pointsPosition.x &&
                this.player.playerPositionY < elm.pointsPosition.y + elm.pointsSize.h &&
                this.player.playerPositionY + this.player.playerHeight > elm.pointsPosition.y) {
                this.gels.splice(elm, 1);
                this.totalPoint += 10
                console.log(this.totalPoint)
            }
        })
    },

    isContaminated() {
        this.sickPeople.forEach(element => {
            if (element.sickPersonPosition.x < this.player.playerPositionX + this.player.playerWidth && this.player.playerPositionY === this.canvasSize.h - this.player.playerHeight - 20) {
                this.totalPoint -= 50
                console.log(this.totalPoint)
            }
        });
    },

    isVaccinated() {

        this.sickPeople.forEach(element => {
            if (element.sickPersonPosition.x < this.vaccine.vaccineX + this.vaccine.vaccineLength && this.player.playerPositionY === this.canvasSize.h - this.player.playerHeight - 20) {
                this.sickPeople.splice(element, 1);
            }
        });

    },

    gameOver() {
        // clearInterval(this.interval)
    },

    gameWon() { }
}