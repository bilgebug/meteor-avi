controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    fire = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 5 5 . . . . . . . . . 
        . . . . . 2 2 . . . . . . . . . 
        . . . . . 2 2 . . . . . . . . . 
        . . . . . 2 2 . . . . . . . . . 
        . . . . . 2 2 . . . . . . . . . 
        . . . . . 2 2 . . . . . . . . . 
        . . . . . 2 2 . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, spaceship, 0, -140)
    fire.startEffect(effects.warmRadial, 100)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy(effects.disintegrate, 500)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    otherSprite.destroy(effects.disintegrate, 500)
    sprite.startEffect(effects.fire, 200)
    info.changeLifeBy(-1)
})
let meteor: Sprite = null
let fire: Sprite = null
let spaceship: Sprite = null
game.splash("Meteor avı")
game.showLongText("A tuşuna basıp meteorları yok et!", DialogLayout.Center)
effects.starField.startScreenEffect()
spaceship = sprites.create(img`
    . . . . . . . c d . . . . . . . 
    . . . . . . . c d . . . . . . . 
    . . . . . . . c d . . . . . . . 
    . . . . . . . c b . . . . . . . 
    . . . . . . . f f . . . . . . . 
    . . . . . . . c 6 . . . . . . . 
    . . . . . . . f f . . . . . . . 
    . . . . . . . 8 6 . . . . . . . 
    . . . . . . 8 4 4 8 . . . . . . 
    . . . . . . 8 4 4 8 . . . . . . 
    . . . . . c c c 8 8 8 . . . . . 
    . . . . 8 8 6 6 6 9 8 8 . . . . 
    . . 7 f f f c c e e f f 8 8 . . 
    . 7 7 a a a a d d d d d d 8 8 . 
    7 7 7 a a a a a d d d d d d 8 8 
    7 7 7 a a a a a d d d d d d 8 8 
    `, SpriteKind.Player)
spaceship.setStayInScreen(true)
spaceship.bottom = 120
controller.moveSprite(spaceship, 100, 100)
info.setLife(5)
game.onUpdateInterval(500, function () {
    meteor = sprites.createProjectileFromSide(img`
        . . . . . . . . . c c 8 . . . . 
        . . . . . . 8 c c c f 8 c c . . 
        . . . c c 8 8 f c a f f f c c . 
        . . c c c f f f c a a f f c c c 
        8 c c c f f f f c c a a c 8 c c 
        c c c b f f f 8 a c c a a a c c 
        c a a b b 8 a b c c c c c c c c 
        a f c a a b b a c c c c c f f c 
        a 8 f c a a c c a c a c f f f c 
        c a 8 a a c c c c a a f f f 8 a 
        . a c a a c f f a a b 8 f f c a 
        . . c c b a f f f a b b c c 6 c 
        . . . c b b a f f 6 6 a b 6 c . 
        . . . c c b b b 6 6 a c c c c . 
        . . . . c c a b b c c c . . . . 
        . . . . . c c c c c c . . . . . 
        `, 0, 75)
    meteor.setKind(SpriteKind.Enemy)
    meteor.x = randint(10, 150)
    if (info.score() == 20) {
        game.over(true)
    }
})
