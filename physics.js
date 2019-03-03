let geometry = require("./geometry");

const PLAYER_RADIUS = 10;
module.exports = {
    bulletsHit: function(gamestate) {
        for (let prop in gamestate.bullets) {
            if (gamestate.bullets.hasOwnProperty(prop)) {
                let bullet = gamestate.bullets[prop];
                let line = {x: bullet.x, y: bullet.y, dx: bullet.vx, dy: bullet.vy};
                let playerHit = null;
                let playerDistance = 0;
                for (let player in gamestate.players) {
                    if (geometry.lineCollidesCircle(player, PLAYER_RADIUS, line)) {
                        //wacky physics, assumes closest player is the first one hit
                        let d = Math.hypot(player.x - bullet.x, player.y - bullet.y);
                        if (playersHit == null || d < playerDistance) {
                            playerHit = player;
                            playerDistance = d;
                        }
                    }
                }
                if (playerHit != null) {
                    //Bullet hit player
                    console.log('hit');
                    playerHit.health -= bullet.damage;
                    if (playerHit.health < 0) {playerHit.health = 0;}
                    delete gamestate.bullets[prop];
                } else {
                    bullet.x += bullet.vx;
                    bullet.y += bullet.vy;
                }
            }
        }
    }
}