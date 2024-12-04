// =====================
// 必要な変数を定義
// =====================

// 定数の定義
const CANVAS_HEIGHT = 1000;
const CANVAS_WIDTH = 1000;
const offset = 200;
const lineSpace = 110;
const lineWidth = 10;
const nodeSize = { x: 100, y: 40 };
// 落ちてくるノードの定義
const colors = ["red", "blue", "yellow", "purple", "orange"];
const NODES = colors.map((color, i) => ({
    line: i,
    time: (i + 1) * 10,
    color: color,
    size: nodeSize,
    checked: false,
}));
// ラインの定義
const LINES = Array.from({ length: 6 }, (_, i) => ({
    line: i,
    size: { x: lineWidth, y: CANVAS_HEIGHT },
    pos: { x: offset + lineSpace * i, y: 0 }
}));
// 判定エリアの定義
const checkArea = Array.from({ length: 5 }, (_, i) => ({
    line: i,
    size: nodeSize,
    pos: { x: offset + lineWidth + lineSpace * i, y: CANVAS_HEIGHT - 100 }
}));
// 現在落ちてきてるノードの定義
const CURRENT_NODES = [];
// スコアの定義(判定エリアにノードがあるときに、特定のキーを押したら+1)
let score = 0;

// canvasをJavaScriptで使えるようにする
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// canvasの初期設定
canvas.height = 1000;
canvas.width = 1000;

// =====================
// メインの処理
// =====================

// 四角を描画する関数
// 引数：書きたい四角、色、透明度（書かなくてもOK）
const drawRect = (rect, color, alpha = 1) => {
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.fillRect(rect.pos.x, rect.pos.y, rect.size.x, rect.size.y);
    ctx.globalAlpha = 1;
}

// ノードを動かす関数
// 引数：動かしたいノード
const moveNode = (node) => {
    node.pos.y += 1;
}

// ノードと判定エリアが衝突しているかどうかを判定する関数
// 引数：ノード、判定エリア
const isCollided = (node, area) => {
    // ノードが判定エリアのラインにあるか確認
    if (node.line !== area.line) return false;
    // 既に判定してたら無視する
    if (node.checked) return false;
    // ノードが判定エリアにある場合は、ノードを確認済みにする
    if (area.pos.y <= node.pos.y && node.pos.y <= area.pos.y + area.size.y) {
        node.checked = true;
        return true;
    }
    return false;
}

// テキストを描画する関数
const drawText = (text, x, y, font, color) => {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.fillText(text, x, y);
}

// キーが押されたときの処理
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
// 今の秒数的な
let now = 0;
let combo = 0;

// =====================
// 10msごとに実行する処理
// =====================

setInterval(() => {
    // 盤面を初期化する
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    LINES.forEach((line) => {
        drawRect(line, "black");
    });
    checkArea.forEach((area) => {
        drawRect(area, "gray", 0.7);
    });
    // ノードを追加する
    for (let i = 0; i < NODES.length; i++) {
        if (NODES[i].time <= now / 10) {
            const newNode = NODES.shift();
            newNode.pos = { x: offset + lineWidth + newNode.line * lineSpace, y: 0 };
            CURRENT_NODES.push(newNode);
        } else {
            break;
        }
    }
    // ノードを動かして、描写する
    CURRENT_NODES.forEach((node) => {
        // ノードが盤外に移動したら削除する
        if (node.pos.y + node.size.y > CANVAS_HEIGHT) {
            if (node.checked) {
                combo++;
            } else {
                combo = 0;
            }
            CURRENT_NODES.shift();
            return;
        }
        moveNode(node);
        drawRect(node, node.color);
    });
    drawText("score: " + score, 10, 30, "30px sans-serif", "white");
    drawText("combo: " + combo, 10, 60, "30px sans-serif", "white");
    now++;
    console.log(score)
}
    , 10);
