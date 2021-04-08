class Points {

    constructor(ctx, gameHeight, gameWidth, imageSource, speed, pointsPositionY) {
        this.ctx = ctx
        this.gameHeight = gameHeight
        this.gameWidth = gameWidth

        this.imageInstance = new Image()
        this.imageInstance.src = imageSource

        this.speed = speed

        this.pointsPositionY = pointsPositionY
        this.pointsSize = { w: 50, h: 50 }
        this.pointsPosition = { x: this.gameWidth, y: this.pointsPositionY }
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.pointsPosition.x, this.pointsPositionY, this.pointsSize.w, this.pointsSize.h)
        this.move()
    }

    move() {
        this.pointsPosition.x -= this.speed
    }
}