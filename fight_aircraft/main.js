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
            // blocks = loadLevel(game, Number(k))
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
    }
    var game = GuaGame.instance(30, images, function(g) {
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })

    enableDebugModel(game, true)

}

__main()
