class Player {

  constructor(ctx, gameWidth, gameHeight) {

    this.ctx = ctx;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.playerWidth = 125;
    this.playerHeight = 250;

    this.imageInstance = new Image();
    this.imageInstance.src = "./img/player-walking.png";
    this.imageInstance.frames = 8;
    this.imageInstance.framesIndex = 0;

    this.posX = 50;
    this.posY = this.gameHeight - this.playerHeight - 20;
    this.posY0 = this.posY;

    this.velY = 1
    this.gravity = 0.4
  }

  draw(framesCounter) {

    this.ctx.drawImage(
      this.imageInstance,
      this.imageInstance.framesIndex * Math.floor(this.imageInstance.width / this.imageInstance.frames),
      0,
      Math.floor(this.imageInstance.width / this.imageInstance.frames),
      this.imageInstance.height,
      this.posX,
      this.posY,
      this.playerWidth,
      this.playerHeight
    )

    this.animate(framesCounter)

    this.move()
  }

  move() {
    if (this.posY < this.posY0) {   
      this.posY += this.velY
      this.velY += this.gravity
    } else {
      this.posY = this.posY0
      this.velY = 1
    }
  }

  animate(framesCounter) {
    if (framesCounter % 5 == 0) {
      this.imageInstance.framesIndex++;
    }
    if (this.imageInstance.framesIndex >= this.imageInstance.frames) {
      this.imageInstance.framesIndex = 0;
    }
  }

  jump() {
      if (this.posY >= this.posY0) {
            this.posY -= 350 
            this.posY -= this.gravity
          }
  }

}