export const drawRect = (detections, ctx) => {
    let flag = false;
    detections.forEach(prediction => {
        const [x, y, width, height] = prediction['bbox'];
        const text = prediction['class'];
        ctx.font = '36px Arial';
        if (text === 'car' && x < 1000 && x > 100 && prediction['score'] > 0.5) {
            console.log("Car FOUND")
            ctx.beginPath();
            flag = true;
            ctx.fillStyle = 'red';
            ctx.strokeStyle = 'red';
            ctx.fillText('Oncoming '+text, x, y);
            ctx.rect(x, y, width, height);
            ctx.stroke();
        }
        else if (text === 'car' && prediction['score'] > 0.5) {
            ctx.beginPath();
            flag = true;
            ctx.strokeStyle = 'green'
            ctx.fillStyle = 'green'
            ctx.fillText(text, x, y);
            ctx.rect(x, y, width, height);
            ctx.stroke();
        }
        else {
            flag = false;
        }
    });
    return flag;
}