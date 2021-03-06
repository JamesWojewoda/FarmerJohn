﻿/// <summary>
/// A monster who is impeding the progress of our fearless adventurer.
/// </summary>
/// <summary>
/// How long to wait before turning around.
/// </summary>
var MaxWaitTime = 0.5;

/// <summary>
/// The speed at which this enemy moves along the X axis.
/// </summary>
var MoveSpeed = 3.0;

// Local bounds used to calculate collision between enemies and the hero
var localBounds;

// Index used for the naming of the monsters
var monsterIndex = 0;

var globalTargetFPS = 17;

var StaticTile = new Tile(null, Enum.TileCollision.Passable, 0, 0);

function Rock(level, position, imgMonster) {
    this.initialize(level, position, imgMonster);
};

Rock.prototype = new BitmapAnimation();

// constructor:
Rock.prototype.BitmapAnimation_initialize = Enemy.prototype.initialize;

Rock.prototype.initialize = function (level, position, imgMonster) {
    var width;
    var left;
    var height;
    var top;
    var frameWidth;
    var frameHeight;

    var localSpriteSheet = new SpriteSheet({
        images: [imgMonster], //image to use
        frames: { width: 27, height: 25, regX: 0, regY: 0 },
        animations: {
            walk: [0, 0, "walk", 4],
            idle: [0, 0, "idle", 4]
        }
    });

    SpriteSheetUtils.addFlippedFrames(localSpriteSheet, true, false, false);

    this.BitmapAnimation_initialize(localSpriteSheet);

    this.x = position.x;
    this.y = position.y;
    this.level = level;

    /// <summary>
    /// How long this enemy has been waiting before turning around.
    /// </summary>
    this.waitTime = 0;

    frameWidth = 64;
    frameHeight = 64;

    // Calculate bounds within texture size.
    width = parseInt(frameWidth * 0.35);
    left = parseInt((frameWidth - width) / 2);
    height = parseInt(frameWidth * 0.7);
    top = parseInt(frameHeight - height);
    localBounds = new XNARectangle(left, top, width, height);

    // start playing the first sequence:
    this.gotoAndPlay("idle"); //animate

    // set up a shadow. Note that shadows are ridiculously expensive. You could display hundreds
    // of animated monster if you disabled the shadow.
    if (enableShadows)
        this.shadow = new Shadow("#000", 3, 2, 2);

    this.name = "Monster" + monsterIndex;
    monsterIndex++;

    /// <summary>
    /// The direction this enemy is facing and moving along the X axis.
    /// </summary>
    // 1 = right & -1 = left
    this.direction = -1;
    // starting directly at the first frame of the walk_right sequence
    this.currentFrame = 21;
};

/// <summary>
/// Gets a rectangle which bounds this enemy in world space.
/// </summary>
Rock.prototype.BoundingRectangle = function () {
    var left = parseInt(Math.round(this.x - 32) + localBounds.x);
    var top = parseInt(Math.round(this.y - 64) + localBounds.y);

    return new XNARectangle(left, top, localBounds.width, localBounds.height);
};

/// <summary>
/// Paces back and forth along a platform, waiting at either end.
/// </summary>
Rock.prototype.tick = function () {
    // We should normaly try here to compute the elpsed time since
    // the last update. But setTimeout/setTimer functions
    // are not predictable enough to do that. requestAnimationFrame will
    // help when the spec will be stabilized and used properly by all major browsers
    // In the meantime, we're cheating... and living in a perfect 60 FPS world ;-)
    var elapsed = globalTargetFPS / 1000;

    var posX = this.x + (localBounds.width / 2) * this.direction;
    var tileX = Math.floor(posX / StaticTile.Width) - this.direction;
    var tileY = Math.floor(this.y / StaticTile.Height);
    this.waitTime = 0;
    //  if (this.waitTime > 0) {
    // Wait for some amount of time.
    //    this.waitTime = Math.max(0.0, this.waitTime - elapsed);
    //     if (this.waitTime <= 0.0 && !this.level.IsHeroDied && !this.level.ReachedExit) {
    // Then turn around.
    // this.direction = -this.direction;
    //  if (this.direction === 1) {
    //      this.gotoAndPlay("idle"); //animate
    //  }
    //  else {
    //     this.gotoAndPlay("walk"); //animate
    // }

    //     }
    // }
    /* else {
         // If we are about to run into a wall or off a cliff, start waiting.
         if (this.level.GetCollision(tileX + this.direction, tileY - 1) === Enum.TileCollision.Impassable
             || this.level.GetCollision(tileX + this.direction, tileY) === Enum.TileCollision.Passable
             || this.level.IsHeroDied || this.level.ReachedExit) {
             this.waitTime = MaxWaitTime;
             if (!(this.currentAnimation.indexOf("idle") === -1)) {
                 this.gotoAndPlay("idle");
             }
         }
         else {
             Move in the current direction. */
    var velocity = this.direction * MoveSpeed * 1;
    this.x = this.x + velocity;
    // }
    //}
};

window.Rock = Rock;