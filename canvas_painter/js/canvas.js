'use strict';

let canvas = document.querySelector('#canv');
let ctx = canvas.getContext('2d');

let xCoord = document.querySelector('#x-coord');
let yCoord = document.querySelector('#y-coord');

let wrapper = document.querySelector('#app');
let wrapWidth = wrapper.clientWidth;
let wrapHeight = wrapper.clientHeight;
canvas.setAttribute('width', wrapWidth);
canvas.setAttribute('height', wrapHeight);

let editor = {
  container: '#app',
  width: canvas.getAttribute('width'),
  height: canvas.getAttribute('height'),
  currentTool: 'pencil',
  'current-color': '#000',
  'current-size': 2,
  x: 0,
  y: 0,

  init() {
    this.clearCanvas();
    document.querySelector(this.container).addEventListener('input', this.inputHandler);
    document.querySelector(this.container).addEventListener('click', this.clickHandler);
    document.querySelector('.clear').addEventListener('click', this.clearCanvas);

    canvas.addEventListener('mousemove', this.getCoordinates);
    canvas.addEventListener('mousedown', this.startDraw);
    canvas.addEventListener('mouseup', this.endDraw);
  },
  getCoordinates(evt) {
    console.log(`Mouse coordinates: (${editor.x}, ${editor.y})`)
    xCoord.innerText = evt.offsetX;
    yCoord.innerText = evt.offsetY;
  },
  clickHandler(evt) {
    let saveBtn = document.querySelector('#save-button');
    if (evt.target.name === 'tool-button') {
      editor.currentTool = evt.target.dataset.name;
      if (evt.target.dataset.name === 'fill') {
        editor.fillBackground();
      }
      let toolsBtns = document.querySelectorAll('button[name="tool-button"]');
      for (let i = 0; i < toolsBtns.length; i++) {
        toolsBtns[i].classList.remove('activeTool');
        if (evt.target == toolsBtns[i]) {
          toolsBtns[i].classList.add('activeTool');
        }
      }
    } else if (evt.target.name === 'save-button') {
      editor.url = canvas.toDataURL('image/png');
      saveBtn.href = editor.url;
    }
  },
  inputHandler(evt) {
    if (evt.target.name === 'input-obj') {
      editor[`current-${evt.target.dataset.name}`] = evt.target.value;
      editor['current-size'] = evt.target.value;
    }
  },
  startDraw(evt) {
    editor.x = evt.offsetX;
    editor.y = evt.offsetY;

    if (editor.currentTool === 'pencil') {
      editor.drawPencil();
    } else if (editor.currentTool === 'brush') {
      editor.drawBrush();
    } else if (editor.currentTool === 'line') {
      editor.drawLine();
    } else if (editor.currentTool === 'rectangle') {
      editor.drawRectangle();
    }
  },
  endDraw() {
    canvas.onmousemove = null;
  },
  drawPencil() {
    canvas.onmousemove = (evt) => {
      ctx.lineWidth = editor['current-size'];
      ctx.lineTo(evt.offsetX, evt.offsetY);
      ctx.stroke();
    };
  },
  drawBrush() {
    canvas.onmousemove = (evt) => {
      ctx.beginPath();
      ctx.lineTo(evt.offsetX, evt.offsetY);
      ctx.ellipse(evt.offsetX, evt.offsetY, editor['current-size'], editor['current-size'], Math.PI / 4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    };
  },
  drawLine() {
    canvas.onmousemove = (evt) => {
      this.clearCanvas();

      ctx.lineWidth = editor['current-size'];
      ctx.beginPath();
      ctx.moveTo(editor.x, editor.y);
      ctx.lineTo(evt.offsetX, evt.offsetY);
      ctx.stroke();
      ctx.closePath();
    };
  },
  drawRectangle() {
    canvas.onmousemove = (evt) => {

      var x = Math.min(evt.offsetX,  editor.x),
      y = Math.min(evt.offsetY,  editor.y),
      w = Math.abs(evt.offsetX - editor.x),
      h = Math.abs(evt.offsetY - editor.y);

      if (!w || !h) {
          return;
      }

      this.clearCanvas();
      ctx.lineWidth = editor['current-size'];
      ctx.beginPath();
      ctx.strokeRect(x, y, w, h);
      ctx.stroke();
      ctx.closePath();
    };
  },
  fillBackground() {
    ctx.fillStyle = editor['current-color'];
    ctx.fillRect(1, 0, editor.width, editor.height);
  },
  clearCanvas() {
    ctx.clearRect(0, 0, editor.width, editor.height);
  }
};


/**
 *@description функция для получения значений цвета из колорпикера
 */
function update(picker) {
  editor['current-color'] = picker.toHEXString();
  ctx.fillStyle = editor['current-color'];
  ctx.strokeStyle = editor['current-color'];
}

editor.init();