class Background {

  constructor(ctx, imageWidth, imageHeight, imgSource, speed) {
    this.ctx = ctx
    this.imageWidth = imageWidth
    this.imageHeight = imageHeight
    this.imageInstance = new Image()
    this.imageInstance.src = imgSource
    this.imagePosition = { x:0, y:0 }
    this.speed = speed
  }

  draw() {
    this.ctx.drawImage(this.imageInstance, this.imagePosition.x, this.imagePosition.y, this.imageWidth, this.imageHeight)
    this.ctx.drawImage(this.imageInstance, this.imagePosition.x + this.imageWidth, this.imagePosition.y, this.imageWidth, this.imageHeight)
    this.move()
  }

  move() {
    if (this.imagePosition.x <= -this.imageWidth) {
      this.imagePosition.x = 0;
    }
    this.imagePosition.x -= this.speed
  }
}

class Home {
    constructor(ctx, gameWidth, gameHeight, speed) {
        this.ctx = ctx
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.homeSize = { w:525, h:400 }
        this.homePos = { x:2000, y:this.gameHeight-this.homeSize.h-100}
        this.speed = speed
        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = './img/ending-point.png'
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.homePos.x, this.homePos.y, this.homeSize.w, this.homeSize.h)
        this.move()
    }

    move(speed) {
        this.homePos.x -= this.speed
    }

}