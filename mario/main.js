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

const ajax = request => {
    let r = new XMLHttpRequest()
    r.open('GET', request.url, true)
    r.responseType = 'arraybuffer'
    r.onreadystatechange = event => {
        if (r.readyState == 4) {
            request.callback(r.response)
        }
    }
    r.send()
}

var __main = function() {

    var images = {
        // flappy bird
        bg: 'bird/bg.png',
        pipe: 'bird/pipe.png',
        ground: 'bird/ground.png',
        b1: 'bird/b1.png',
        b2: 'bird/b2.png',
        b3: 'bird/b3.png',
        //
        t1: 'tiles/t1.png',
        t2: 'tiles/t2.png',
        t3: 'tiles/t3.png',
        t4: 'tiles/t4.png',
    }

    let request = {
        url: 'mario.nes',
        callback(r) {
            window.bytes = new Uint8Array(r)
            log('mario file', window.bytes.length)
            var game = GuaGame.instance(30, images, function(g) {
                // var s = Scene.new(g)
                var s = SceneTitle.new(g)
                var s = SceneEditor.new(g)
                g.runWithScene(s)
            })
        },
    }
    ajax(request)
    // 没有下面这行，gua_nes_sprite.js 中无法读取 window.bytes
    log('mario file', window.bytes.length)

    var game = GuaGame.instance(30, images, function(g) {
        // var s = Scene.new(g)
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })

    enableDebugModel(game, true)

}

__main()
