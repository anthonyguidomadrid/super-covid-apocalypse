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