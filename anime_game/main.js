var loadLevel = function(game, n) {
    n = n - 1
    var level = levels[n]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

var enableDebugModel = function(game, enable) {
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event) {
        var k = event.key
        if (k == 'p') {
            window.paused = !window.paused
        } else if ('1234567'.includes(k)){
            blocks = loadLevel(game, Number(k))
        }
    })
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        window.fps = Number(input.value)
    })
}

var __main = function() {

    var images = {
        bullet: 'img/bullet.png',
        cloud: 'img/cloud.png',
        player: 'img/player.png',
        sky: 'img/sky.png',
        enemy0: 'img/enemy0.png',
        enemy1: 'img/enemy1.png',
        enemy2: 'img/enemy2.png',
        enemy3: 'img/enemy3.png',
        enemy4: 'img/enemy4.png',
        fire: 'img/fire.png',
        // 走路动画
        w1: 'img/walking/w1.png',
        w2: 'img/walking/w2.png',
        w3: 'img/walking/w3.png',
        w4: 'img/walking/w4.png',
        w5: 'img/walking/w5.png',
        w6: 'img/walking/w6.png',
        w7: 'img/walking/w7.png',
        w8: 'img/walking/w8.png',
        w9: 'img/walking/w9.png',
    }
    var game = GuaGame.instance(30, images, function(g) {
        // var s = Scene.new(g)
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })

    enableDebugModel(game, true)

}

__main()
