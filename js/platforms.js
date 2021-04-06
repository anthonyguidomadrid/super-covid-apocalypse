class Platforms {

    constructor(ctx, gameHeight, gameWidth, platformWidth, speed) {
        this.ctx = ctx

        this.gameHeight = gameHeight
        this.gameWidth = gameWidth
        this.platformWidth = platformWidth

        this.platPos = { x: this.gameWidth, y: this.gameHeight - 320 }
        this.platSize = { w: this.platformWidth, h: 16 }
        this.speed = speed
    }

    draw() {

        this.ctx.shadowColor = 'white'
        this.ctx.shadowBlur = 15
        this.ctx.fillStyle = '#98C8EF'
        this.ctx.fillRect(this.platPos.x, this.platPos.y, this.platSize.w, this.platSize.h - 6)
        this.ctx.closePath()
        this.ctx.fillStyle = '#FFF'
        this.ctx.fillRect(this.platPos.x, this.platPos.y - 6, this.platSize.w, this.platSize.h - 10)
        this.ctx.shadowBlur = 0
        this.move()
    }

    move() {
        this.platPos.x -= this.speed
    }
}