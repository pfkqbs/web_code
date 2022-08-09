var chess = document.getElementById('chess');
var context = chess.getContext('2d')
context.strokeStyle = '#000'
// 设背景图
var logo = new Image()
logo.src='./logo.jpeg'
logo.onload = function(){
    drawChessBoard()  //横线竖线的函数
    context.drawImage(logo,0,0,450,450)  //画背景图

    // 画旗子
    context.beginPath();
    context.arc(200,200,100,0,2*Math.PI);
    context.closePath();
    var gradient = context.createRadialGradient(200,200,50,200,200,20)
    gradient.addColorStop(0,'#0a0a0a')
    gradient.addColorStop(1,'#636766')
    context.fillStyle= gradient  //设置填充颜色
    context.fill();//填充



}




// 画横线竖线的函数
let drawChessBoard = function(){
    for(let i= 0;i<15;i++){
        // 画竖线
        context.moveTo(15 + i*30 , 15)
        context.lineTo(15 + i*30 , 435)
        context.stroke();
        // 画横线
        context.moveTo(15 , 15 + i*30)
        context.lineTo(435 , 15 + i*30)
        context.stroke();
    }
}
