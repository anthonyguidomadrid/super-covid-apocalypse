class Vaccine {
    constructor(ctx, gameHeight, vaccineLength) {
        this.ctx = ctx
        this.gameHeight = gameHeight
        this.vaccineLength = vaccineLength
        this.vaccineX = 175
    }
    draw(playerHeight, playerY) {
        this.ctx.beginPath()
        this.ctx.strokeStyle = '#82d9e0'
        this.ctx.lineWidth = 3
        this.ctx.setLineDash([0, 0])
        this.ctx.moveTo(this.vaccineX, playerY + playerHeight / 2 - 26)
        this.ctx.lineTo(this.vaccineX + this.vaccineLength, playerY + playerHeight / 2 - 26)
        this.ctx.stroke()
        this.ctx.closePath()
    }
}