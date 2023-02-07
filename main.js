"use strict";

const canvas = d.querySelector("#canvas");

const ctx = canvas.getContext("2d");

const road = new Road(canvas.width / 2, canvas.width * 0.9);

const car = new Car(road.getCenter(2), 150, 30, 50);

const traffic = [
  new Car(road.getCenter(1), -150, 30, 50),
  new Car(road.getCenter(0), -110, 30, 50),
];

animate();

function animate(t) {
  for (let i = 0; i < traffic.length; i++) traffic[i].update(road.borders);
  car.update(road.borders);

  canvas.height = w.innerHeight;

  ctx.save();
  ctx.translate(0, -car.y + canvas.height * 0.8);

  road.draw(ctx);

  for (let i = 0; i < traffic.length; i++) traffic[i].draw(ctx);

  car.draw(ctx);
  ctx.restore();
  requestAnimationFrame(animate);
}
