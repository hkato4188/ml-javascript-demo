const draw=require('../common/draw.js');
const constants=require('../common/constants.js');
const utils=require('../common/utils.js');


const {createCanvas} = require('canvas');
const canvas = createCanvas(400,400);
const ctx=canvas.getContext('2d');



const fs=require('fs');

const fileNames=fs.readdirSync(constants.RAW_DIR);

const samples=[];

let id=1;



fileNames.forEach((fn)=>{
    // .DS_Store macOS system file throws error
    // const {session, student, drawings} = JSON.parse(content);
    
    if(!fn.endsWith(".json")){
        console.warn(`Skipping non-JSON file: ${fn}`);
        return;
    }
    
    const content=fs.readFileSync(constants.RAW_DIR+"/"+fn);
    let session, student, drawings;

    try {
        ({ session, student, drawings } = JSON.parse(content));
    } catch (err) {
        console.error(`Error parsing JSON in file: ${fn}`, err);
        return;
    }

    
    
    
    
    
    for(let label in drawings){
        samples.push({
            id,
            label,
            student_name: student,
            student_id: session
        })
        const paths = drawings[label];
        fs.writeFileSync(constants.JSON_DIR+"/"+id+".json",JSON.stringify(paths))
        generateImageFile(constants.IMG_DIR+"/"+id+".png", paths);
        // 8 pictures per file
        utils.printProgress(id,fileNames.length*8);
        id++;
    }    
})    



fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples));

// resuse method to declare const js object rather than json with string concatenation
fs.writeFileSync(constants.SAMPLES_JS, "const samples="+JSON.stringify(samples)+";");

function generateImageFile(outFile, paths){
    // draw() is out of scope--move to parent directory with exports
    // canvas is only browser supported must install for node
    // clear rect for canvas
    ctx.clearRect(0,0,canvas.width,canvas.height)
    draw.paths(ctx,paths);

    const buffer=canvas.toBuffer("image/png");
    fs.writeFileSync(outFile,buffer);
}
