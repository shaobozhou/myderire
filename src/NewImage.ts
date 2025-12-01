class NewImage extends eui.Image {
    private targetPosx: number; // 目标X
    private targetPosy: number; // 目标Y
    private centerX: number;    // 抛物线顶点X（修正后的中间点）
    private centerY: number;    // 抛物线顶点Y（最高点）
    private startX: number;     // 起始X
    private startY: number;     // 起始Y
    private counts: number;     // 抛物线高度系数（控制弧度）

    public constructor() {
        super();
    }
	
    public SetBezier(
        startX: number, 
        startY: number, 
        targetPosx: number, 
        targetPosy: number, 
        counts: number = 0.5
    ) {
        this.targetPosx = targetPosx;
        this.targetPosy = targetPosy;
        this.startX = startX;
        this.startY = startY;
        this.x = startX;
        this.y = startY;
        this.counts = counts;
        const midX = (startX + targetPosx) / 2;
        const midY = (startY + targetPosy) / 2;
        this.centerX = midX > 540 ? midX - 100 : midX + 100;
        const minY = Math.min(startY, targetPosy);
        this.centerY = minY - Math.abs(startY - targetPosy) * this.counts - 200; 
    }

    public get factor(): number {
        return 0;
    }

    public set factor(t: number) {
        t = Math.max(0, Math.min(1, t));
        
        // 二阶贝塞尔公式（抛物线）：以centerX/centerY为顶点
        // X轴：线性插值（保证水平轨迹）
        this.x = (1 - t) * (1 - t) * this.startX + 2 * t * (1 - t) * this.centerX + t * t * this.targetPosx;
        // Y轴：抛物线插值（保证centerY为最高点）
        this.y = (1 - t) * (1 - t) * this.startY + 2 * t * (1 - t) * this.centerY + t * t * this.targetPosy;
        
        // 可选：如果需要微调弧度，保留counts参数（注释掉则纯抛物线）
        // this.y -= this.counts * 40;
    }
}