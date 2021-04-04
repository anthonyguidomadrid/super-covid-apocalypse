class Background {

  constructor(ctx, imageWidth, imageHeight, imgSource) {
    this.ctx = ctx
    this.imageWidth = imageWidth
    this.imageHeight = imageHeight
    this.imageInstance = new Image()
    this.imageInstance.src = imgSource
    this.imagePosition = { x:0, y:0 }
    this.speed = 10
  }

  draw() {
    this.ctx.drawImage(this.imageInstance, this.imagePosition.x, this.imagePosition.y, this.imageWidth, this.imageHeight)
    this.ctx.drawImage(this.imageInstance, this.imagePosition.x + this.imageWidth, this.imagePosition.y, this.imageWidth, this.imageHeight)
  }

  move() {
    if (this.imagePosition.x <= -this.imageWidth) {
      this.imagePosition.x = 0;
    }
    this.imagePosition.x -= this.speed
  }
}

class Home {
    constructor(ctx, gameWidth, gameHeight) {
        this.ctx = ctx
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.init()
        this.homeSize = { w:525, h:400 }
        this.homePos = { x:1000, y:this.gameHeight-this.homeSize.h-100}
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = './img/ending-point.png'
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.homePos.x, this.homePos.y, this.homeSize.w, this.homeSize.h)
    }

    move() {
        this.homePos.x -= 10
    }

}