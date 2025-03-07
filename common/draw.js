const draw={};

draw.paths=(ctx,paths,color="black")=>{
    for(const path of paths){
        draw.path(ctx,path,color);
    }
}

draw.path=(ctx,path,color="black")=>{
    ctx.strokeStyle=color;
    ctx.lineWidth=3;
    ctx.beginPath();
    // moveTo takes two args | spread operator unpacks and element 0 has x,y coordinates
    ctx.moveTo(...path[0]);
    
    for(let i=1;i<path.length;i++){
        ctx.lineTo(...path[i]);
    }
    
    // softens lines for drawing
    ctx.lineCap='round';
    ctx.lineJoin='round'
    
    ctx.stroke()
}

// browser does not understand module
if(typeof module!=='undefined'){
    module.exports=draw;
}

// must install canvas for npm