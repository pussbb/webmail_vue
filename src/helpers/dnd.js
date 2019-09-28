
export function drawText(text='') {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    context.fillStyle = 'black';
    context.font = 'bold 16px Arial';
    context.fillText(text, 0, 16);
    const img = new Image();
    img.src = canvas.toDataURL();
    return img;
}

export function createDragImage(text, x, y) {
    const dragNode = drawText(text);
    dragNode.style.top = -Math.max(0, y * 500000) + "px";
    dragNode.style.left = -Math.max(0, x * 500000) + "px";
    dragNode.style.position = "absolute";
    dragNode.style.pointerEvents = "none";
    dragNode.className = "draggingElem";
    document.body.appendChild(dragNode);
    setTimeout(function() {
        document.body.removeChild(dragNode);
    });
    return dragNode;
}