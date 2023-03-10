"use strict";

class Sensor {
  constructor(car) {
    this.car = car;
    this.rayCount = 5.0;
    this.rayLength = 160;
    this.raySpread = Math.PI / 2;

    this.rays = [];
    this.readRays = [];
  }

  update(borders) {
    this.#castRays();
    this.readRays = [];

    for (let i = 0; i < this.rays.length; i++) {
      this.readRays.push(this.#getReading(this.rays[i], borders));
    }
  }

  #getReading(ray, borders) {
    let touches = [];

    for (let i = 0; i < borders.length; i++) {
      let touch = getIntersection(ray[0], ray[1], borders[i][0], borders[i][1]);

      if (touch) {
        touches.push(touch);
      }
    }

    if (touches.length === 0) return null;
    else {
      let offset = touches.map((e) => e.offset),
        minOffset = Math.min(...offset);

      return touches.find((e) => e.offset === minOffset);
    }
  }

  #castRays() {
    this.rays = [];

    for (let i = 0; i < this.rayCount; i++) {
      const rayAngle =
        lerp(
          this.raySpread / 2,
          -this.raySpread / 2,
          this.rayCount === 1 ? 0.5 : i / (this.rayCount - 1)
        ) + this.car.angle;

      let start = { x: this.car.x, y: this.car.y },
        end = {
          x: this.car.x - Math.sin(rayAngle) * this.rayLength,
          y: this.car.y - Math.cos(rayAngle) * this.rayLength,
        };

      this.rays.push([start, end]);
    }
  }

  draw(ctx) {
    for (let i = 0; i < this.rayCount; i++) {
      let end = this.rays[i][1];

      if (this.readRays[i]) {
        end = this.readRays[i];
      }

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "orange";
      ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
      ctx.lineTo(end.x, end.y);

      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "black";
      ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y);
      ctx.lineTo(end.x, end.y);

      ctx.stroke();
    }
    
  }
}
