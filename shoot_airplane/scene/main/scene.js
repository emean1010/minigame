class Player extends GuaImage {
    constructor(game) {
        super(game, 'player')
        this.speed = 10
    }
    update() {

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

class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        var game = this.game
        this.bg = GuaImage.new(game, 'sky')
        this.cloud = GuaImage.new(game, 'cloud')

        // this.player = GuaImage.new(game, 'player')
        this.player = Player.new(game)
        this.player.x = 100
        this.player.y = 150
        
        this.addElement(this.bg)
        this.addElement(this.cloud)
        this.addElement(this.player)
    }
    update() {
        this.cloud.y += 1
    }
    // draw() {
        // draw Labels
        // this.game.drawImage(this.bg)
        // this.game.drawImage(this.player)
    // }
}

// var Scene = function(game) {
//     var s = {
//         game: game,
//     }
//     // 初始化
//     var paddle = Paddle(game)
//     var ball = Ball(game)
//
//     var score = 0
//
//     var blocks = loadLevel(game, 1)
//
//     game.registerAction('a', function(){
//         paddle.moveLeft()
//     })
//     game.registerAction('d', function(){
//         paddle.moveRight()
//     })
//     game.registerAction('f', function(){
//         ball.fire()
//     })
//
//     s.draw = function() {
//         // draw 背景
//         game.context.fillStyle = "#554"
//         game.context.fillRect(0, 0, 400, 300)
//         //draw
//         game.drawImage(paddle)
//         game.drawImage(ball)
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.alive) {
//                 game.drawImage(block)
//             }
//         }
//         // draw Labels
//         game.context.fillText('分数： ' + score, 10, 290)
//     }
//     s.update = function() {
//         ball.move()
//         // 判断游戏结束
//         if (ball.y > paddle.y) {
//             // 跳转到游戏结束的场景
//             var end = SceneEnd.new(game)
//             game.replaceScene(end)
//
//         }
//         // 判断相撞
//         if (paddle.collide(ball)) {
//             ball.fantan()
//         }
//         // 判断 ball 和 block 相撞
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.collide(ball)) {
//                 log('block 相撞')
//                 block.kill()
//                 ball.fantan()
//                 score += 100
//             }
//         }
//     }
//
//     // mouse event
//     enableDrag = false
//     game.canvas.addEventListener('mousedown', function(event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         log(x, y)
//         // 检查是否点中 ball
//         if (ball.hasPoint(x, y)) {
//             // 设置拖拽状态
//             enableDrag = true
//         }
//     })
//     game.canvas.addEventListener('mousemove', function(event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         if (enableDrag) {
//             ball.x = x
//             ball.y = y
//         }
//     })
//     game.canvas.addEventListener('mouseup', function(event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         enableDrag = false
//     })
//
//     return s
// }
