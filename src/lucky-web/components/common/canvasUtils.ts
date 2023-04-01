class CanvasUtils {
    canvas: HTMLCanvasElement
    ctx: any

    constructor() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
    }

    // 计算文字宽度
    public getActualWidthOfChars(text: string, options: any = {}) {
        const {
            size = 30,
            family = "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'"
        } = options;

        this.ctx.font = `${size}px ${family}`;
        const metrics = this.ctx.measureText(text);
        const actual = Math.abs(metrics.actualBoundingBoxLeft) + Math.abs(metrics.actualBoundingBoxRight);
        return Math.max(metrics.width, actual);
    }
}


export default new CanvasUtils()
