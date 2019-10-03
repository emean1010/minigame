class GuaAnimation {
    constructor(game) {
        this.game = game
        // 为了省事，这里 hard code 一套动画
        this.frames = []
        for (var i = 1; i < 10; i++) {
            var name = `w${i}`
            var t = game.textureByName(name)
            this.frames.push(t)
        }
        this.texture = this.frames[0]
        this.frameIndex = 0
        this.frameCount = 3
    }
    static new(game) {
        return new this(game)
    }
    update() {
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 3
            this.frameIndex = (this.frameIndex + 1) % this.frames.length
            this.texture = this.frames[this.frameIndex]
        }
    }
    draw() {
        this.game.drawImage(this)
    }
    move(x) {
        this.x += x
    }
}
