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
    level: 1,
    background: undefined,
    startButton: undefined,
    tryAgainButton: undefined,
    playAgainButton: undefined,
    home: undefined,
    player: undefined,
    platforms: [],
    masks: [],
    gels: [],
    sickPeople: [],
    vaccine: undefined,
    pointsCounter: undefined,
    totalPoint: 100,
    speed: 5,
    levelbtn: undefined,
    audio: undefined,

    init() {
        this.canvasDom = document.querySelector('#canvas')
        this.ctx = this.canvasDom.getContext('2d')
        this.setDimensions()
        this.setEventListeners()
        this.reset()
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
                if(this.platforms.length === 0) {
                    this.player.jump()
                    return
                }

                this.platforms.forEach(elm => {
                    
                    if (!(this.player.playerPositionY > elm.platPos.y + elm.platSize.h
                    && this.player.playerPositionX > elm.platPos.x
                    && this.player.playerPositionX < elm.platPos.x + elm.platSize.w)) {
                        
                        this.player.jump()
                    }
                })
            }
            if (e.key === this.keys.VACCINE) {
                if(this.player.playerPositionY === this.canvasSize.h - this.player.playerHeight - 20) {
                    setTimeout(() => {
                    this.player.imageInstance.src = "./img/player-walking.png"
                    this.vaccine.vaccineX = 175
                    this.vaccine.vaccineLength = 0
                    }, 1000);
                    this.player.imageInstance.src = "./img/player-vaccinating.png"
                    this.vaccine.vaccineLength = 20
                }
            } 
        }
    },

    startScreen() {
        this.startButton = document.querySelector('#start-button')
        this.startButton.addEventListener('click', function () {
            document.getElementById("start-screen").style.display = "none"
            Game.init()
        });
    },

    reset() {
        clearInterval(this.interval)
        this.background = new Background(this.ctx, this.canvasSize.w, this.canvasSize.h, "./img/game-background.jpg", this.speed)
        this.home = new Home(this.ctx, this.canvasSize.w, this.canvasSize.h, this.speed)
        this.player = new Player(this.ctx, this.canvasSize.w, this.canvasSize.h)
        this.vaccine = new Vaccine(this.ctx, this.canvasSize.h)
        this.definemusic()
        this.audio.play()
        this.start()
    },

    start() {
        this.interval = setInterval(() => {
            this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++
            this.clearAll()
            this.drawAll()
            this.pointsCounting()
            this.generatePlatforms()
            this.generatePoints()
            this.generateSickPeople()
            this.clearElements()
            this.isOnPlatform()
            this.almostDead()
            this.getPoints()
            this.isContaminated()
            this.isVaccinated()
            this.gameOver()
            this.gameWon()
        }, 1000 / this.FPS)
    },

    definemusic() {
        this.audio = document.querySelector("audio")
        this.audio.volume = 0.1
    },

    pointsCounting() {
        this.pointsCounter = document.querySelector('.health span')
        this.pointsCounter.innerText = this.totalPoint
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    drawAll() {
        this.background.draw()
        this.home.draw()
        this.player.draw(this.framesCounter)
        this.vaccine.draw(this.player.playerHeight, this.player.playerPositionY)
        this.sickPeople.forEach(elm => { elm.draw() })
        this.masks.forEach(elm => { elm.draw() })
        this.gels.forEach(elm => { elm.draw() })
        this.platforms.forEach(elm => { elm.draw() })
    },

    generatePlatforms() {
        const widthPlatformRandom = Math.floor(Math.random() * 200) + 600
        if (this.framesCounter % 500 === 0) {
            this.platforms.push(new Platforms(this.ctx, this.canvasSize.h, this.canvasSize.w, widthPlatformRandom, this.speed))
        }
    },

    generatePoints() {
        const gelRandom = Math.floor(Math.random() * 100) + 300
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
        this.platforms = this.platforms.filter(platform => platform.platPos.x >= -2000)
    },

    erase() {
        this.sickPeople = this.sickPeople.filter(sickPerson => sickPerson.sickPersonPosition.x <= 0)
        this.masks = this.masks.filter(point => point.pointsPosition.x <= 0)
        this.gels = this.gels.filter(point => point.pointsPosition.x <= 0)
        this.platforms = this.platforms.filter(platform => platform.platPos.x <= -2000)
    },

    isOnPlatform() {
        this.platforms.forEach(elm => {
            if (elm.platPos.y - 20 < this.player.playerPositionY + this.player.playerHeight
                && this.player.playerPositionY + 200 < elm.platPos.y
                && elm.platPos.x < this.player.playerPositionX
                && elm.platPos.x + elm.platSize.w > this.player.playerPositionX
            ) {
                this.player.floorLevel = elm.platPos.y  
                this.player.playerPositionY = this.player.floorLevel - this.player.playerHeight - 20
                this.player.imageInstance.src = "./img/player-walking.png"
                this.player.playerHeight = 250
            } else {
                this.player.floorLevel = this.canvasSize.h - 20
            }
        })
    },

    almostDead() {
        if (this.totalPoint < 20) {
            this.player.almostDead = true
        } else {
            this.player.almostDead = false
        }
    },

    getPoints() {
        this.masks.forEach(elm => {
            if (this.player.playerPositionX < elm.pointsPosition.x + elm.pointsSize.w &&
                this.player.playerPositionX + this.player.playerWidth > elm.pointsPosition.x &&
                this.player.playerPositionY < elm.pointsPosition.y + elm.pointsSize.h &&
                this.player.playerPositionY + this.player.playerHeight > elm.pointsPosition.y) {
                this.masks.splice(elm, 1);
                this.totalPoint += 5
            }
        })
        this.gels.forEach(elm => {
            if (this.player.playerPositionX < elm.pointsPosition.x + elm.pointsSize.w &&
                this.player.playerPositionX + this.player.playerWidth > elm.pointsPosition.x &&
                this.player.playerPositionY < elm.pointsPosition.y + elm.pointsSize.h &&
                this.player.playerPositionY + this.player.playerHeight > elm.pointsPosition.y) {
                this.gels.splice(elm, 1);
                this.totalPoint += 10
            }
        })
    },

    isContaminated() {
        this.sickPeople.forEach(element => {
            if (element.sickPersonPosition.x < this.player.playerPositionX + this.player.playerWidth && this.player.playerPositionY === this.canvasSize.h - this.player.playerHeight - 20) {
                this.totalPoint -= 25
            }
        });
    },

    isVaccinated() {
        this.sickPeople.forEach(element => {
            if (element.sickPersonPosition.x < this.vaccine.vaccineX + this.vaccine.vaccineLength && this.player.playerPositionY === this.canvasSize.h - this.player.playerHeight - 20) {
                this.sickPeople.splice(element, 1);
                this.vaccine.vaccineLength = 0
                this.vaccine.vaccineX = 175
            }
        });
    },

    gameOver() {
        if (this.totalPoint <= 0) {
            clearInterval(this.interval)
            this.audio.pause()
            this.erase()
            this.level = 1
            this.speed = 5
            document.getElementById("gameover-screen").style.display = "block"
            this.tryAgainButton = document.querySelector('#tryagain-button')
            this.tryAgainButton.addEventListener('click', () => {
                document.getElementById("gameover-screen").style.display = "none"
                this.totalPoint = 100
                this.reset()
            });
        }
    },

    gameWon() {
        if (this.player.playerPositionX + this.player.playerWidth > this.home.homePos.x + this.home.homeSize.w / 2) {
            clearInterval(this.interval)
            this.audio.pause()
            this.erase()
            this.level += 1
            this.speed += 1.5
            document.getElementById("gamewon-screen").style.display = "block"
            this.levelbtn = document.querySelector('#playagain-button span')
            this.levelbtn.innerText = this.level
            this.playAgainButton = document.querySelector('#playagain-button')
            this.pointsCounter = document.querySelector('.final-points span')
            this.pointsCounter.innerText = this.totalPoint
            this.playAgainButton.addEventListener('click', () => {
                document.getElementById("gamewon-screen").style.display = "none"
                this.reset()
            });
        }
    }
}