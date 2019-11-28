class GuaTileMap {
    constructor(game) {
        this.game = game
        // 8 X 5
        this.tiles = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 0, 1,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 0, 1,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 0, 1,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 0, 1,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 0, 1,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 0, 1,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 0, 1,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 0, 1,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 0, 1,
        ]
        this.th = 15
        // TODO, tw 应该是一个整数
        this.tw = this.tiles.length / this.th
        this.tileImages = [
            GuaImage.new(game, 't1'),
            GuaImage.new(game, 't2'),
            GuaImage.new(game, 't3'),
            GuaImage.new(game, 't4'),
        ]
        this.tileSize = 32
    }
    static new(...args) {
        log('static', ...args)
        return new this(...args)
    }
    onTheGround(i, j) {
        let index = i * this.th + j
        let tile = this.tiles[index]
        return tile != 0
    }
    update() {

    }
    draw() {
        let h = this.th
        for (var i = 0; i < this.tiles.length; i++) {
            let index = this.tiles[i]
            if (index != 0) {
                let x = Math.floor(i / h) * this.tileSize
                let y = (i % h) * this.tileSize
                let image = this.tileImages[index]
                this.game.context.drawImage(image.texture, x, y)
            }
        }
    }
}
