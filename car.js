"use strict";

class Car {
  constructor(x, y, width, heigth) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.heigth = heigth;

    this.speed = 0.0;
    this.acceleration = 0.2;
    this.max = 15;
    this.friction = 0.05;

    this.angle = 0.0;

    this.damaged = false;
    this.sensor = new Sensor(this);
    this.controls = new Controls();
  }

  update(borders) {
    if (!this.damaged) {
      this.#movement();
      this.polygon = this.#createPolygon();
      this.damaged = this.#isDamaged(borders);
    }

    this.sensor.update(borders);

    // log(this.damaged)
  }

  #isDamaged(borders) {
    for (let i = 0; i < borders.length; i++) {
      if (polygonIntersection(this.polygon, borders[i])) return true;
    }

    return false;
  }

  #createPolygon() {
    let points = [],
      rad = Math.hypot(this.width, this.heigth) / 2,
      teta = Math.atan2(this.width, this.heigth);

    points.push({
      x: this.x - Math.sin(this.angle - teta) * rad,
      y: this.y - Math.cos(this.angle - teta) * rad,
    });

    points.push({
      x: this.x - Math.sin(this.angle + teta) * rad,
      y: this.y - Math.cos(this.angle + teta) * rad,
    });

    points.push({
      x: this.x - Math.sin(Math.PI + this.angle - teta) * rad,
      y: this.y - Math.cos(Math.PI + this.angle - teta) * rad,
    });

    points.push({
      x: this.x - Math.sin(Math.PI + this.angle + teta) * rad,
      y: this.y - Math.cos(Math.PI + this.angle + teta) * rad,
    });

    return points;
  }

  #movement() {
    if (this.controls.up) this.speed += this.acceleration;
    if (this.controls.back) this.speed -= this.acceleration;

    if (this.speed > this.max) this.speed = this.max;

    if (this.speed < -this.max / 2) this.speed = -this.max / 2;

    if (this.speed > 0) this.speed -= this.friction;

    if (this.speed < 0) this.speed += this.friction;

    if (Math.abs(this.speed) < this.friction) this.speed = 0.0;

    if (this.speed !== 0) {
      let flip = this.speed ? 1 : -1;
      if (this.controls.left) this.angle += 0.03 * flip;
      if (this.controls.right) this.angle -= 0.03 * flip;
    }

    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;

    // log(Math.cos(this.angle) * this.speed);
  }

  draw(ctx) {
    if (this.damaged) ctx.fillStyle = "gray";
    else ctx.fillStyle = "black";

    ctx.beginPath();
    ctx.moveTo(this.polygon[0].x, this.polygon[0].y);

    for (let i = 0; i < this.polygon.length; i++) {
      ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
      ctx.fill();
    }
    // ctx.save();
    // ctx.translate(this.x, this.y);
    // ctx.rotate(-this.angle);

    // ctx.beginPath();
    // ctx.rect(-this.width / 2, -this.heigth / 2, this.width, this.heigth);
    // ctx.fill();

    // ctx.restore();

    this.sensor.draw(ctx);
  }
}
