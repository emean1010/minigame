class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        // cave bg
        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)
        // 循环移动的地面
        this.grounds = []
        for (var i = 0; i < 30; i++) {
            var g = GuaImage.new(game, 'ground')
            g.x = i * g.w
            g.y = 600 - g.h
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount = 5
        // mario
        let mario = GuaNesSprite.new(game)
        this.addElement(mario)
        this.mario = mario
        mario.x = 100
        mario.y = 476

        this.setupInputs()
    }
    debug() {
        this.birdSpeed = config.bird_spped.value
    }
    update() {
        super.update()
    }
    setupInputs() {
        var self = this
        var b = this.mario
        let playerSpeed = 5
        self.game.registerAction('a', function(keyStatus) {
            b.move(-playerSpeed, keyStatus)
        })
        self.game.registerAction('d', function(keyStatus) {
            b.move(playerSpeed, keyStatus)
        })
        self.game.registerAction('j', function(keyStatus) {
            b.jump()
        })
    }
}
