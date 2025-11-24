const game = document.getElementById("game");
const gameWidth = game.clientWidth;
const gameHeight = game.clientHeight;

class Player {
  constructor() {
    this.width = 60;   
    this.height = 80;  
    this.positionX = gameWidth / 2 - this.width / 2;
    this.positionY = 20;

    this.updateUI();
  }

  updateUI() {
    const playerELM = document.getElementById("player");
    playerELM.style.width = this.width + "px";
    playerELM.style.height = this.height + "px";
    playerELM.style.left = this.positionX + "px";
    playerELM.style.bottom = this.positionY + "px";
  }

  moveLeft() {
    if (this.positionX > 0) {
      this.positionX -= 10;
      this.updateUI();
    }
  }

  moveRight() {
    if (this.positionX < gameWidth - this.width) {
      this.positionX += 10;
      this.updateUI();
    }
  }

  moveForward() {
    if (this.positionY < gameHeight - this.height) {
      this.positionY += 10;
      this.updateUI();
    }
  }

  moveBackwards() {
    if (this.positionY > 0) {
      this.positionY -= 10;
      this.updateUI();
    }
  }
}




  

class Meteor {
  constructor() {
    this.width = 150;   
    this.height = 150;  
    this.positionX = Math.random() * (gameWidth - this.width);
    this.positionY = gameHeight;
    this.MeteorELM = null;

    this.createMeteor();
    this.updateUI();
  }

  createMeteor() {
    this.MeteorELM = document.createElement("div");
    this.MeteorELM.className = "Meteor";
    game.appendChild(this.MeteorELM);
  }

  updateUI() {
    this.MeteorELM.style.width = this.width + "px";
    this.MeteorELM.style.height = this.height + "px";
    this.MeteorELM.style.left = this.positionX + "px";
    this.MeteorELM.style.bottom = this.positionY + "px";
  }

  moveDown() {
    this.positionY -= 4;
    this.updateUI();
  }
}



const player = new Player();
let MeteorsArr = [];

setInterval(() => {
  const newMeteor = new Meteor();
  MeteorsArr.push(newMeteor);
}, 2000);

setInterval(() => {
  MeteorsArr.forEach((MeteorInstance, index) => {
    MeteorInstance.moveDown();

    
    if (MeteorInstance.positionY + MeteorInstance.height < 0) {
      MeteorInstance.MeteorELM.remove();
      MeteorsArr.splice(index, 1);
    }
    if (
      player.positionX < MeteorInstance.positionX + MeteorInstance.width &&
      player.positionX + player.width > MeteorInstance.positionX &&
      player.positionY < MeteorInstance.positionY + MeteorInstance.height &&
      player.positionY + player.height > MeteorInstance.positionY
    ) {
      console.log("game over my fren!!");
      location.href = "gameover.html";
    }
  });
}, 50);

document.addEventListener("keydown", (e) => {
  if (
    e.code === "ArrowUp" ||
    e.code === "ArrowDown" ||
    e.code === "ArrowLeft" ||
    e.code === "ArrowRight"
  ) {
    e.preventDefault();
  }

  if (e.code === "ArrowLeft")
     player.moveLeft();
  else if (e.code === "ArrowRight") 
    player.moveRight();
  else if (e.code === "ArrowUp") 
    player.moveForward();
  else if (e.code === "ArrowDown")
     player.moveBackwards();
});


