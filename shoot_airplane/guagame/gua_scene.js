class GuaScene {
    constructor(game) {
        this.game = game
        this.debugModeEnabled = true
        this.elements = []
        this.bullets = []
        this.enemyBullets = []
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
                    var ps = GuaParticleSystem.new(this.game)
                    ps.x = b.x
                    ps.y = b.y
                    this.addElement(ps)
              }
            }
        }
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
    }
}
