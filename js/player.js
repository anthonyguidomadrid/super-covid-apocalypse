class Player {

  constructor(ctx, gameWidth, gameHeight) {
    this.ctx = ctx
    this.gameWidth = gameWidth
    this.gameHeight = gameHeight

    this.playerWidth = 125
    this.playerHeight = 250
    this.playerPositionX = 50
    this.playerPositionY = this.gameHeight - this.playerHeight - 20
    this.floorLevel = this.gameHeight - 20

    this.imageInstance = new Image()
    this.imageInstance.src = "./img/player-walking.png"
    this.imageInstance.frames = 8
    this.imageInstance.framesIndex = 0

    this.speed = 1
    this.gravity = 0.4
    this.almostDead = false
  }

  draw(framesCounter) {
    if (this.almostDead == true) {
      this.ctx.globalAlpha = 0.5
    } 
      this.ctx.drawImage(
      this.imageInstance,
      this.imageInstance.framesIndex * Math.floor(this.imageInstance.width / this.imageInstance.frames), 0,
      Math.floor(this.imageInstance.width / this.imageInstance.frames),
      this.imageInstance.height,
      this.playerPositionX,
      this.playerPositionY,
      this.playerWidth,
      this.playerHeight
    )

    this.animate(framesCounter)

    this.move()

    this.ctx.globalAlpha = 1
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
    if (this.playerPositionY + this.playerHeight < this.floorLevel) {  
      this.playerPositionY += this.speed
      this.speed += this.gravity
    } else {
      this.playerPositionY = this.floorLevel - this.playerHeight
      this.speed = 1
    }
  }

  jump() {
   setTimeout(() => {
     this.imageInstance.src = "./img/player-walking.png"
     this.playerHeight = 250
   }, 1000);
   if (this.playerPositionY === this.floorLevel - this.playerHeight) {
      this.imageInstance.src = "./img/player-jumping.png"
      this.playerHeight = 280
      this.playerPositionY -= 370
      this.speed -= 8
   }
  }
}