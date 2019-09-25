var SceneEnd = function(game) {
    var s = {
        game: game,
    }
    // 初始化

    s.draw = function() {
        // draw Labels
        game.context.fillText('游戏结束', 100, 200)

    }
    s.update = function() {

    }

    return s
}
