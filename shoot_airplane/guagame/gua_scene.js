class GuaScene {
    constructor(game) {
        this.game = game
        this.debugModeEnabled = true
        this.elements = []
        this.bullets = []
        this.enemyBullets = []
        this.enemyElements = []
        this.player = ''
        this.playerLife = 1
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    addElement(img) {
        img.scene = this
        this.elements.push(img)
    }
    addBullet(img) {
        img.scene = this
        this.bullets.push(img)
    }
    addEnemyBullet(img) {
        img.scene = this
        this.enemyBullets.push(img)
    }
    addEnemyElement(img) {
        img.scene = this
        this.enemyElements.push(img)
    }
    addPlayer(img) {
        img.scene = this
        this.player = img
    }

    draw() {
        for (var e of this.elements) {
            // this.game.drawImage(e)
            e.draw()
        }
        for (var e of this.bullets) {
            e.draw()
        }
        for (var e of this.enemyBullets) {
            e.draw()
        }
        for (var e of this.enemyElements) {
            e.draw()
        }
        if (this.playerLife > 0) {
            this.player.draw()
        }
    }
    update() {
        if (this.debugModeEnabled) {
            for (var i = 0; i < this.elements.length; i++) {
                var e =this.elements[i]
                e.debug && e.debug()
            }
        }
        // 刪除碰撞子彈
        for (var i = 0; i < this.bullets.length; i++) {
            var b = this.bullets[i]
            for (var j = i+1; j < this.enemyBullets.length; j++) {
                var eb = this.enemyBullets[j]
                var yd = eb.y - b.y
                var xd = b.x - eb.x
                var s = 10
                var ms = -1 * s
                if(yd > ms & yd < s & xd > ms & xd < s){
                    this.bullets.splice(i, 1)
                    this.enemyBullets.splice(j, 1)
                    // 碰撞效果
                    var ps = GuaParticleSystem.new(this.game)
                    ps.x = b.x
                    ps.y = b.y
                    this.addElement(ps)
              }
            }
        }
        this.hitPlayer()
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            e.update()
        }
        for (var i = 0; i < this.bullets.length; i++) {
            var e = this.bullets[i]
            e.update()
        }
        for (var i = 0; i < this.enemyBullets.length; i++) {
            var e = this.enemyBullets[i]
            e.update()
        }
        for (var i = 0; i < this.enemyElements.length; i++) {
            var e = this.enemyElements[i]
            e.update()
        }
        if (this.playerLife > 0) {
            this.player.update()
        }
    }
    aInb(x, x1, x2) {
        return x >= x1 && x <= x2
    }
    hitPlayer() {
        // 飞机碰撞炸毁
        for (var i = 0; i < this.enemyElements.length; i++) {
            var a = this.player
            var b = this.enemyElements[i]
            if (this.aInb(a.x, b.x, b.x + b.w) || this.aInb(b.x, a.x, a.x + a.w)) {
                if (this.aInb(a.y, b.y, b.y + b.h) || this.aInb(b.y, a.y, a.y + a.h)) {
                    this.enemyElements.splice(i, 1)
                    this.playerLife -= 1
                }
            }
        }
        // 飞机寿命归零
        if (this.playerLife == 0) {
            // 碰撞效果
            // this.playerLife = -1
            var ps = GuaParticleSystem.new(this.game)
            ps.x = this.player.x
            ps.y = this.player.y
            this.addElement(ps)
            this.player = ''
        }
    }
}
