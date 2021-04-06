class Player {

  constructor(ctx, gameWidth, gameHeight) {
    this.ctx = ctx
    this.gameWidth = gameWidth
    this.gameHeight = gameHeight

    this.playerWidth = 125
    this.playerHeight = 250

    this.imageInstance = new Image()
    this.imageInstance.src = "./img/player-walking.png"
    this.imageInstance.frames = 8
    this.imageInstance.framesIndex = 0

    this.playerPositionX = 50
    this.playerPositionY = this.gameHeight-this.playerHeight-20
    this.floorLevel = this.playerPositionY

    this.speed = 1
    this.gravity = 0.4
  }

  draw(framesCounter) {
    this.ctx.drawImage(
      this.imageInstance,
      this.imageInstance.framesIndex * Math.floor(this.imageInstance.width / this.imageInstance.frames),
      0,
      Math.floor(this.imageInstance.width / this.imageInstance.frames),
      this.imageInstance.height,
      this.playerPositionX,
      this.playerPositionY,
      this.playerWidth,
      this.playerHeight
    )

    this.animate(framesCounter)

    this.move()
  }

    animate(framesCounter) {
    if (framesCounter % 5 == 0) {
      this.imageInstance.framesIndex++
    }
    if (this.imageInstance.framesIndex >= this.imageInstance.frames) {
      this.imageInstance.framesIndex = 0
    }
  }

  move() {
    if (this.playerPositionY < this.floorLevel) {  
      this.playerPositionY += this.speed
      this.speed += this.gravity
    } else {
      this.playerPositionY = this.floorLevel
      this.speed = 1
    }
  }

  jump() {
   setTimeout(() => {
     this.imageInstance.src = "./img/player-walking.png"
     this.playerHeight = 250
   }, 1000);
      this.imageInstance.src = "./img/player-jumping.png"
      this.playerHeight = 280
      if (this.playerPositionY === this.floorLevel) {
      this.playerPositionY -= 370
      this.speed -= 8
      } 
  }

  vaccinate() {

   setTimeout(() => {
     this.imageInstance.src = "./img/player-walking.png"
   }, 1000);
      this.imageInstance.src = "./img/player-vaccinating.png"
  }

}