"use strict";

class Road {
  constructor(x, width, laneNum = 5) {
    this.x = x;
    this.width = width;
    this.lane = laneNum;

    this.largeValue = 1e6;

    this.left = x - this.width / 2;
    this.right = x + this.width / 2;
    this.top = -this.largeValue;
    this.bottom = this.largeValue;

    let topLeft = { x: this.left, y: this.top },
      bottomLeft = { x: this.left, y: this.bottom },
      topRight = { x: this.right, y: this.top },
      bottomRight = { x: this.right, y: this.bottom };

    this.borders = [
      [topLeft, bottomLeft],
      [topRight, bottomRight],
    ];
  }

  getCenter(index) {
    let laneWidth = this.width / this.lane;

    return (
      this.left + laneWidth / 2 + Math.min(index, this.lane - 1) * laneWidth
    );
  }

  draw(ctx) {
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";

    for (let i = 1; i < this.lane; i++) {
      let x = lerp(this.left, this.right, i / this.lane);

      ctx.setLineDash([22, 20]);

      ctx.beginPath();
      ctx.moveTo(x, this.top);
      ctx.lineTo(x, this.bottom);
      ctx.stroke();
    }

    ctx.setLineDash([])
    this.borders.forEach(bd => {
      
      ctx.beginPath()
      ctx.moveTo(bd[0].x, bd[0].y)
      ctx.lineTo(bd[1].x, bd[1].y)
      ctx.stroke()
    })
  }
}
