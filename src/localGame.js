﻿function Spaceship(x, y) {
    //small form locations.
    this.x = x;
    this.y = y;
    this.side = 40;

    //full location
    this.loc = [x, y];

    //array for holding projectiles thrown by this ship
    this.projectiles = [];

    //spaceship speed
    this.thrusterSpeed = 4;
    this.friction = 0.98;

    //spaceship health and shield
    this.health = 100;
    this.shield = 100;

    //The direction the spaceship is heading
    this.direction = 3 * Math.PI / 2;

    //methods

    //get methods
    this.getHealth = function () {
        return this.health;
    }

    this.getShield = function () {
        return this.shield;
    }

    this.getX = function () {
        return this.x;
    }

    this.getY = function () {
        return this.y;
    }

    this.getSide = function () {
        return this.side;
    }

    this.getThrusterSpeed = function () {
        return this.thrusterSpeed;
    }

    this.forwardMove = function () {
        this.x += this.thrusterSpeed * Math.cos(this.direction);
        this.y += this.thrusterSpeed * Math.sin(this.direction);
    }

    this.turnRight = function () {
        this.direction += 0.1;

    }

    this.turnLeft = function () {
        this.direction += -0.1;
    }


    this.getLoc = function () {
        return this.loc;
    }

    this.getProjectiles = function () {
        return this.projectiles;
    }

    //set methods
    this.setHealth = function (newHp) {
        this.health = hp;
    }

    this.setShield = function (newShield) {
        this.shield = newShield;
    }

    this.setX = function (newX) {
        this.x = newX;
        this.updateLoc();
    }

    this.setY = function (newY) {
        this.y = newY;
        this.updateLoc();
    }

    this.setThrusterSpeed = function (newSpeed) {
        this.thrusterSpeed = newSpeed;
    }

    this.setLocation = function (x, y) {
        this.loc = [x, y];
        this.x = x;
        this.y = y;
    }

    this.shoot = function () {
        if (this.projectiles.length <= 100) {
            this.projectiles.push(new Projectile(this.x, this.y, this.direction));
            return true;
        } else {
            return false;
        }


    }

    //damage methods

    this.applyDamageToShield = function (dmg) {
        this.shield = shield - dmg;
    }

    this.applyDamageToHealth = function (dmg) {
        this.health = health - dmg;
    }

    //update methods

    this.updateLoc = function () {
        this.loc = [this.x, this.y];
    }

    //log methods

    this.logCordinates = function () {
        console.log('x: ' + this.x + " y: " + this.y);
    }

    this.logControls = function () {
        console.log("up: " + this.forward + ", left: " + this.left + ", right: " + this.right + ", Shield: " + this.down);
    }

    this.logShipStatus = function () {
        if (this.shield == 100) {
            console.log("Ship has maximum shield");
        } else if (this.shield > 50) {
            console.log("ship has more than 50% shield");
        } else {
            console.log("ship has less than 50% shield");
        }
    }

    //reset ship

    this.resetShip = function (loc) {
        this.x = loc[0];
        this.y = loc[1];
        this.loc = loc;
        this.health = 100;
        this.shield = 100;
        this.thrusterSpeed = 20;
    }


    //render methods

    this.renderSpaceShip = function (ctx) {

        var ctx = ctx;

        var side = this.side;

        var h = side * (Math.sqrt(3) / 2);

        ctx.save();

        //This holds where the triangle should be
        ctx.translate(this.x, this.y);
        ctx.rotate(this.direction + Math.PI / 2);
        ctx.beginPath();

        ctx.moveTo(0, -h / 2);
        ctx.lineTo(-side / 2, h / 2);
        ctx.lineTo(side / 2, h / 2);
        ctx.lineTo(0, -h / 2);

        ctx.strokeStyle = "white";

        ctx.closePath();

        ctx.stroke();

        ctx.restore();

    }


}

function Asteroid(x, y, size, dir, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.direction = dir;
    this.speed = 2;


    this.renderAsteroid = function (ctx) {
        ctx.strokeStyle = "#ffffff";

        ctx.save();

        //build asteroid here
        ctx.rect(this.x, this.y, this.size, this.size);

        ctx.stroke();
        ctx.restore();
    }

    this.move = function () {
        this.x += this.speed * Math.cos(this.direction);
        this.y += this.speed * Math.sin(this.direction);
    }

    this.getX = function () {
        return this.x;
    }

    this.getY = function () {
        return this.y;
    }

    this.getSize = function () {
        return this.size;
    }

    this.setX = function (newX) {
        this.x = newX;
    }

    this.setY = function (newY) {
        this.y = newY;
    }


}

function Projectile(x, y, dir) {
    this.x = x;
    this.y = y;
    this.direction = dir;
    this.speed = 6;

    this.getX = function () {
        return this.x;
    }

    this.getY = function () {
        return this.y;
    }

    this.move = function () {
        this.x += this.speed * Math.cos(this.direction);
        this.y += this.speed * Math.sin(this.direction);
    }

    //renders the bullet to the screen
    this.render = function (ctx) {
        var ctx = ctx;

        ctx.save();

        ctx.beginPath();

        ctx.fillRect(this.x, this.y, 5, 15);

        ctx.closePath();

        ctx.restore();
    }

}


function localGame(StartingLocationPlayer, StartingLocationOpp) {

    this.asteroids = [];

    this.playerSpaceship = new Spaceship(StartingLocationPlayer[0], StartingLocationPlayer[1]);
    this.opponenetSpaceship = new Spaceship(StartingLocationOpp[0], StartingLocationOpp[1]);

    this.playerScore = 0;
    this.oppScore = 0;


    this.getPlayerSpaceship = function () {
        return this.playerSpaceship;
    }

    this.getOpponenetSpaceship = function () {
        return this.opponenetSpaceship;
    }

    this.setPlayerCoordinates = function () {

    }

    this.getAsteroidsArr = function () {
        return this.asteroids;
    }

    this.addAsteroids = function (arrOfAsteroids) {
        for (var i = 0; i < arrOfAsteroids.length; i++) {
            var a = arrOfAsteroids[i];
            //x, y, size, dir
            this.asteroids.push(new Asteroid(a.loc[0], a.loc[1], a.size, a.dir));
        }
    }

    this.renderScores = function (ctx, canvasObj) {
        canvasObj.createCanvasText(ctx, "20px Arial", "white", "Your Score:" + this.playerScore, 10, 40);
        canvasObj.createCanvasText(ctx, "20px Arial", "white", "Opponent Score:" + this.oppScore, 1050, 40);

    }

}