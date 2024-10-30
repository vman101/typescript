"use strict";
let message = "hello";
console.log(message);
class CircleCanvas {
    constructor(canvasId, radius) {
        const canvasElement = document.getElementById(canvasId);
        if (!canvasElement) {
            throw new Error("Failed to get element '${canvasId}'");
        }
        if (!(canvasElement instanceof HTMLCanvasElement)) {
            throw new Error("Element '$(canvasId) is not a Canvas!'");
        }
        this.canvas = canvasElement;
        const canvasCtx = this.canvas.getContext('2d');
        if (!canvasCtx) {
            throw new Error("Failed to get Canvas context '${canvasId}'");
        }
        this.ctx = canvasCtx;
        this.circleCenter = {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2
        };
        this.circleRadius = radius;
        this.drawCircle();
        this.addEventListeners();
    }
    drawCircle() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.arc(this.circleCenter.x, this.circleCenter.y, this.circleRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = 'blue';
        this.ctx.fill();
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = 'black';
        this.ctx.stroke();
    }
    addEventListeners() {
        this.canvas.addEventListener('click', this.handleClick.bind(this));
    }
    handleClick(event) {
        const { offsetX, offsetY } = event;
        const distance = Math.hypot(offsetX - this.circleCenter.x, offsetY - this.circleCenter.y);
        if (distance <= this.circleRadius) {
            console.log("click\n");
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    try {
        new CircleCanvas('myCanvas', 50);
    }
    catch (error) {
        console.error(error);
    }
});
