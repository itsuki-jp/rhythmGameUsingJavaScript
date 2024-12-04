// 定数の定義
const CANVAS_HEIGHT = 1000;
const CANVAS_WIDTH = 1000;
const offset = 200;
const lineSpace = 110;
const lineWidth = 10;
const nodeSize = { x: 100, y: 40 };
const colors = ["red", "blue", "yellow", "purple", "orange"];
const NODES = colors.map((color, i) => ({
    line: i,
    time: (i + 1) * 10,
    color: color,
    size: nodeSize,
    checked: false,
}));
const LINES = Array.from({ length: 6 }, (_, i) => ({
    line: i,
    size: { x: lineWidth, y: CANVAS_HEIGHT },
    pos: { x: offset + lineSpace * i, y: 0 }
}));

const checkArea = Array.from({ length: 5 }, (_, i) => ({
    line: i,
    size: nodeSize,
    pos: { x: offset + lineWidth + lineSpace * i, y: CANVAS_HEIGHT - 100 }
}));

const CURRENT_NODES = [];
let score = 0;



// canvasをJavaScriptで使えるようにする
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// canvasの初期設定
canvas.height = 1000;
canvas.width = 1000;

ctx.fillStyle = "green"; // 色を緑に
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);


const drawRect = (rect, color, alpha = 1) => {
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.fillRect(rect.pos.x, rect.pos.y, rect.size.x, rect.size.y);
    ctx.globalAlpha = 1;
}
const moveNode = (node) => {
    node.pos.y += 1;
}

const isCollided = (node, line) => {
    if (node.line !== line.line) return false;
    if (node.checked) return false;
    if (line.pos.y <= node.pos.y && node.pos.y <= line.pos.y + line.size.y) {
        node.checked = true;
        console.log("aaaaaaaaaaaa")
        return true;
    }
    return false;
}

document.addEventListener("keydown", (e) => {
    if (e.key === "a") {
        CURRENT_NODES.forEach((node) => {
            score += isCollided(node, checkArea[0]) ? 1 : 0;
        });
    }
    else if (e.key === "s") {
        CURRENT_NODES.forEach((node) => {
            score += isCollided(node, checkArea[1]) ? 1 : 0;
        });
    }
    else if (e.key === "d") {
        CURRENT_NODES.forEach((node) => {
            score += isCollided(node, checkArea[2]) ? 1 : 0;
        });
    }
    else if (e.key === "f") {
        CURRENT_NODES.forEach((node) => {
            score += isCollided(node, checkArea[3]) ? 1 : 0;
        });
    }
    else if (e.key === "g") {
        CURRENT_NODES.forEach((node) => {
            score += isCollided(node, checkArea[4]) ? 1 : 0;
        });
    }
}
)

let now = 0;

setInterval(() => {
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    LINES.forEach((line) => {
        drawRect(line, "black");
    });
    checkArea.forEach((area) => {
        drawRect(area, "gray", 0.7);
    });
    for (let i = 0; i < NODES.length; i++) {
        if (NODES[i].time <= now / 10) {
            const newNode = NODES.shift();
            newNode.pos = { x: offset + lineWidth + newNode.line * lineSpace, y: 0 };
            CURRENT_NODES.push(newNode);
        } else {
            break;
        }
    }
    CURRENT_NODES.forEach((node) => {
        moveNode(node);
        drawRect(node, node.color);
    });
    now++;
    console.log(score)
}
    , 10);
