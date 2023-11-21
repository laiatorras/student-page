const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 700;

const colorButton = document.getElementById("color-button");
const widthButton = document.getElementById("width-button");
const resetButton = document.getElementById("reset-button");
const circleButton = document.getElementById("circle-button");
const triangleButton = document.getElementById("triangle-button");
const squareButton = document.getElementById("square-button");
const pencilButton = document.getElementById("pencil-button");
const sizeSlider = document.getElementById("size-slider"); 

let isMouseDown = false;
let isDrawingShape = false;
let currentShape = null;

const init = () => {
    canvasContext.lineWidth = 3;
    widthButton.value = 3;

    canvasContext.strokeStyle = "#18b7ec";
    canvasContext.lineCap = "round";
};

const drawLine = (x, y) => {
    canvasContext.lineTo(x, y);
    canvasContext.stroke(); 
};

const drawCircle = (x, y, size) => {
    const radius = size; 
    canvasContext.beginPath();
    canvasContext.arc(x, y, radius, 0, Math.PI * 2);
    canvasContext.stroke();
};

const drawTriangle = (x, y, size) => {
    const base = size; 
    const height = (Math.sqrt(3) / 2) * base; 
    canvasContext.beginPath();
    canvasContext.moveTo(x, y);
    canvasContext.lineTo(x + base / 2, y + height);
    canvasContext.lineTo(x - base / 2, y + height);
    canvasContext.closePath();
    canvasContext.stroke();
};

const drawSquare = (x, y, size) => {
    const side = size; 
    canvasContext.beginPath();
    canvasContext.rect(x - side / 2, y - side / 2, side, side);
    canvasContext.stroke();
};

const getMousePosition = (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseXPosition = event.clientX - rect.left;
    const mouseYPosition = event.clientY - rect.top;
    return { mouseXPosition, mouseYPosition };
};

canvas.addEventListener("mousemove", (event) => {
    const { mouseXPosition, mouseYPosition } = getMousePosition(event);

    if (isMouseDown && isDrawingShape) {
        switch (currentShape) {
            case "circle":
                drawCircle(mouseXPosition, mouseYPosition, sizeSlider.value);
                break;
            case "triangle":
                drawTriangle(mouseXPosition, mouseYPosition, sizeSlider.value);
                break;
            case "square":
                drawSquare(mouseXPosition, mouseYPosition, sizeSlider.value);
                break;
            default:
                drawLine(mouseXPosition, mouseYPosition);
                break;
        }
    }
});

canvas.addEventListener("mousedown", (event) => {
    const { mouseXPosition, mouseYPosition } = getMousePosition(event);
    isMouseDown = true;
    isDrawingShape = true;
    canvasContext.beginPath();
    canvasContext.moveTo(mouseXPosition, mouseYPosition);
});

canvas.addEventListener("mouseup", (event) => {
    isMouseDown = false;
    isDrawingShape = false;
});

colorButton.addEventListener("input", (event) => {
    const selectedColor = event.target.value;
    canvasContext.strokeStyle = selectedColor;
});

widthButton.addEventListener("input", (event) => {
    const selectedWidth = event.target.value;
    canvasContext.lineWidth = selectedWidth;
});

resetButton.addEventListener("click", () => {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    init();
});

circleButton.addEventListener("click", () => {
    currentShape = "circle";
    isDrawingShape = false;
});

triangleButton.addEventListener("click", () => {
    currentShape = "triangle";
    isDrawingShape = false;
});

squareButton.addEventListener("click", () => {
    currentShape = "square";
    isDrawingShape = false;
});

pencilButton.addEventListener("click", () => {
    currentShape = null;
    isDrawingShape = true;
});

sizeSlider.addEventListener("input", (event) => {
    
    const selectedSize = event.target.value;

    switch (currentShape) {
        case "circle":
            drawCircle(mouseX, mouseY, selectedSize);
            break;
        case "triangle":
            drawTriangle(mouseX, mouseY, selectedSize);
            break;
        case "square":
            drawSquare(mouseX, mouseY, selectedSize);
            break;
        default:
            
            break;
    }
});

init();
