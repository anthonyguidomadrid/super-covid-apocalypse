class Sickpeople {
    
    constructor(ctx, gameHeight, gameWidth, imageSource, speed) {
        this.ctx = ctx
        this.gameHeight = gameHeight
        this.gameWidth = gameWidth
        this.sickPersonSize = { w:70, h:230}
        this.sickPersonPosition = { x: this.gameWidth, y: this.gameHeight-this.sickPersonSize.h-20 }
        this.imageInstance = new Image()
        this.imageInstance.src = imageSource
        this.speed = speed    }

    draw() {
        this.move()
        this.ctx.drawImage(this.imageInstance, this.sickPersonPosition.x, this.sickPersonPosition.y, this.sickPersonSize.w, this.sickPersonSize.h)
    }

    move() {
        this.sickPersonPosition.x -=  this.speed
    }
}