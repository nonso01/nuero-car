"use strict";

const [F, T] = [false, true];

class Controls {
  constructor() {
    this.up = F;
    this.left = F;
    this.right = F;
    this.back = F;

    this.#keyBoardEvent();
  }

  #keyBoardEvent() {
    d.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowUp":
          this.up = T;
          break;
        case "ArrowDown":
          this.back = T;
          break;
        case "ArrowLeft":
          this.left = T;
          break;
        case "ArrowRight":
          this.right = T;
          break;
      }

      // log(this)
    });

    d.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "ArrowUp":
          this.up = F;
          break;
        case "ArrowDown":
          this.back = F;
          break;
        case "ArrowLeft":
          this.left = F;
          break;
        case "ArrowRight":
          this.right = F;
          break;
      }

      // log(this)
    });
  }
}
