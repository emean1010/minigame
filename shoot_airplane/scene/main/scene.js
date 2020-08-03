const config = {
    palyer_speed: 10,
    cloud_speed: 1,
    enemy_speed: 5,
    bullet_speed: 5,
    fire_cooldown: 9,
    enemy_fire_cooldown: 50,
}

class Bullet extends GuaImage{
    constructor(game, direction) {
        super(game, 'bullet')
        this.setup()
        this.direction = direction
        this.life = true
    }
    setup() {
        this.speed = config.bullet_speed
    }
    update() {
        this.y += this.speed * this.direction
    }
}

class Player extends GuaImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
    }
    setup() {
        this.speed = 5
        this.cooldown = 0
    }
    update() {
        this.speed = config.palyer_speed
        if (this.cooldown > 0) {
            this.cooldown--
        }
    }
    fire() {
        if (this.cooldown == 0) {
            this.cooldown = config.fire_cooldown
            var x = this.x + this.w / 2
            var y = this.y
            var b = Bullet.new(this.game, -1)
            b.x = x
            b.y = y
            // this.scene.addElement(b)
            this.scene.addBullet(b)
        }
    }
    moveLeft() {
        this.x -= this.speed
    }
    moveRight() {
        this.x += this.speed
    }
    moveUp() {
        this.y -= this.speed
    }
    moveDown() {
        this.y += this.speed
    }
}

class Enemy extends GuaImage {
    constructor(game) {
        var type = randomBetween(0, 4)
        var name = 'enemy' + type
        super(game, name)
        this.setup()
    }
    setup() {
        this.speed = randomBetween(2, 5)
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)
        this.cooldown = config.enemy_fire_cooldown + randomBetween(0, 10)
    }
    update() {
        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }
        if (this.cooldown > 0) {
            this.cooldown--
        }
        if (this.cooldown == 0) {
            this.cooldown = config.enemy_fire_cooldown + randomBetween(0, 10)
            this.fire()
        }
    }
    fire() {
        var x = this.x + this.w / 2
        var y = this.y
        var b = Bullet.new(this.game, 1)
        b.x = x
        b.y = y
        // this.scene.addElement(b)
        this.scene.addEnemyBullet(b)
    }
}

class Cloud extends GuaImage {
    constructor(game) {
        super(game, 'cloud')
        this.setup()
    }
    setup() {
        this.speed = 1
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)
    }
    update() {
        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }
    }
    debug() {
        this.speed = config.cloud_speed
    }
}

class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    setup() {
        var game = this.game
        this.numberOfEnemies = 10
        this.bg = GuaImage.new(game, 'sky')
        this.cloud = Cloud.new(game, 'cloud')

        this.player = Player.new(game)
        this.player.x = 100
        this.player.y = 150

        this.addElement(this.bg)
        this.addElement(this.cloud)
        // this.addElement(this.player)
        this.addPlayer(this.player)
        //
        this.addEnemies()
        // 添加小火花
        var ps = GuaParticleSystem.new(this.game)
        this.addElement(ps)
    }
    addEnemies() {
        var es = []
        for (var i = 0; i < this.numberOfEnemies; i++) {
            var e = Enemy.new(this.game)
            es.push(e)
            // this.addElement(e)
            this.addEnemyElement(e)
        }
        this.enemies = es
    }
    setupInputs() {
        var g = this.game
        var s = this
        g.registerAction('a', function(){
            s.player.moveLeft()
        })
        g.registerAction('d', function(){
            s.player.moveRight()
        })
        g.registerAction('w', function(){
            s.player.moveUp()
        })
        g.registerAction('s', function(){
            s.player.moveDown()
        })
        g.registerAction('j', function(){
            s.player.fire()
        })
    }
    update() {
        super.update()
        this.cloud.y += 1
    }
    // draw() {
        // draw Labels
        // this.game.drawImage(this.bg)
        // this.game.drawImage(this.player)
    // }
}
