class Pipes {
    constructor(game) {
        this.game = game
        this.pipes = []
        this.pipeSpace = 150
        this.管子横向间距 = 200
        this.columsOfPipe = 3
        for (var i = 0; i < this.columsOfPipe; i++) {
            var p1 = GuaImage.new(game, 'pipe')
            p1.flipY = true
            p1.x = 500 + i * this.管子横向间距
            var p2 = GuaImage.new(game, 'pipe')
            p2.x = p1.x
            this.resetPipePosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }
    static new(game) {
        return new this(game)
    }
    resetPipePosition(p1, p2) {
        p1.y = randomBetween(-200, 0)
        p2.y = p1.y + p1.h + this.pipeSpace
    }
    debug() {
        this.pipeSpace = config.pipe_space.value
        this.管子横向间距 = config.管子横向间距.value
    }
    update() {
        for (var i = 0; i < this.pipes.length; i += 2) {
            var p1 = this.pipes[i]
            var p2 = this.pipes[i + 1]
            p1.x -= 5
            p2.x -= 5
            if (p1.x < -100) {
                p1.x += this.管子横向间距 * this.columsOfPipe
            }
            if (p2.x < -100) {
                p2.x += this.管子横向间距 * this.columsOfPipe
                this.resetPipePosition(p1, p2)
            }
        }
    }
    draw() {
        var context = this.game.context
        for (var p of this.pipes) {
            context.save()

            var w2 = p.w / 2
            var h2 = p.h / 2
            context.translate(p.x + w2, p.y + h2)
            var scaleX = p.flipX ? -1 : 1
            var scaleY = p.flipY ? -1 : 1
            context.scale(-scaleX, scaleY)
            context.rotate(p.rotation * Math.PI / 180)
            context.translate(-w2, -h2)

            context.drawImage(p.texture, 0, 0)

            context.restore()
        }
    }
}

class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        // var label = GuaLabel.new(game, 'hello from gua')
        // this.addElement(label)

        // cave bg
        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)
        // 加入水管
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)
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
        // bird
        this.birdSpeed = 2
        var b = GuaAnimation.new(game)
        b.x = 180
        b.y = 200
        this.bird = b
        this.addElement(b)

        this.setupInputs()
    }
    debug() {
        this.birdSpeed = config.bird_spped.value
    }
    update() {
        // 判断游戏结束
        var bird = this.bird
        var bx = this.bird.x
        var by = this.bird.y
        var pipes = this.pipe.pipes
        for (var i = 0; i < pipes.length; i += 2) {
            var p1 = pipes[i]
            var p2 = pipes[i + 1]
            // 判断碰撞
            var x1 = p1.x
            var x2 = p1.x + p1.w
            var y1 = p1.y
            var y2 = p2.y
            if (bx >= x1 && bx <= x2) {
                if (by <= y1 || by >= y2) {
                    // 跳转到游戏结束的场景
                    // log('game over', bx, by, x1, x2, y1, y2)
                    var end = SceneEnd.new(this.game)
                    this.game.replaceScene(end)
                }
            }
        }
        super.update()
        // 地面移动
        this.skipCount--
        var offset = -5
        if (this.skipCount == 0) {
            this.skipCount = 4
            offset = 15
        }
        for (var i = 0; i < 30; i++) {
            var g = this.grounds[i]
            g.x += offset
        }
    }
    setupInputs() {
        var self = this
        var b = this.bird
        self.game.registerAction('a', function(keyStatus) {
            b.move(-self.birdSpeed, keyStatus)
        })
        self.game.registerAction('d', function(keyStatus) {
            b.move(self.birdSpeed, keyStatus)
        })
        self.game.registerAction('j', function(keyStatus) {
            b.jump()
        })
    }
}

class SceneBegin extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('k', function(){
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })
    }
    draw() {
        // draw Labels
        this.game.context.fillText('按 k 开始游戏', 100, 290)
    }
}
