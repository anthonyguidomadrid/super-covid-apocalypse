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
        MOVEFORWARD: 'ArrowRight',
        VACCINE: 'Space'
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
        document.onkeydown = e => {
            if (e.key === this.keys.MOVEFORWARD ) {
                this.background.move()
                this.home.move()
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
            this.jumpPlatform() ? this.getPlatform() : null
            this.getRewards() ? this.getPoints () : null
            this.isContaminated() ? this.looseLife() : null
            this.isVaccination() ? this.healing() : null
            this.allPointsLost() ? this.gameOver() : null
            this.backHome() ? this.gameWon() : null
        }, 1000 / this.FPS)
    },

    reset() {
        this.background = new Background(this.ctx, this.canvasSize.w, this.canvasSize.h, "./img/game-background.jpg")
        this.home = new Home(this.ctx, this.canvasSize.w, this.canvasSize.h)
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    drawAll() {
        this.background.draw()
        this.home.draw()
    },

    generatePlatforms() {},

    generatePoints() {},

    generateSickPeople() {},

    clearElements() {},

    jumpPlatform() {},

    getPlatform() {},

    getRewards() {},

    getPoints () {},

    isContaminated() {},

    looseLife() {},

    isVaccination() {},

    healing() {},

    allPointsLost() {},

    gameOver() {
        clearInterval(this.interval)
    },

    backHome() {},
    
    gameWon() {}
}