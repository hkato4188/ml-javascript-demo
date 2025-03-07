
const draw=require('../common/draw.js');
const {createCanvas} = require('canvas');
const canvas = createCanvas(400,400);
const ctx=canvas.getContext('2d');

const constants = {};

constants.DATA_DIR="../data";
constants.DATASET_DIR=constants.DATA_DIR+"/dataset";
constants.IMG_DIR=constants.DATA_DIR+"/img";
constants.JSON_DIR=constants.DATA_DIR+"/json";
constants.RAW_DIR=constants.DATA_DIR+"/raw";
constants.SAMPLES=constants.DATASET_DIR+"/samples.json";

const fs=require('fs');

const fileNames=fs.readdirSync(constants.RAW_DIR);

const samples=[];

let id=1;

fileNames.forEach((fn)=>{
    const content=fs.readFileSync(constants.RAW_DIR+"/"+fn)
    const {session, student, drawings} = JSON.parse(content);
    for(let label in drawings){
        samples.push({
            id,
            label,
            student_name: student,
            student_id: session
        })


        const paths = drawings[label];
        fs.writeFileSync(constants.JSON_DIR+"/"+id+".json",JSON.stringify(paths))

        //create this method
        generateImageFile(constants.IMG_DIR+"/"+id+".png", paths);

        id++;
    }

})

fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples));

function generateImageFile(outFile, paths){
    // draw() is out of scope--move to parent directory with exports
    // canvas is only browser supported must install for node
    // clear rect for canvas
    ctx.clearRect(0,0,canvas.width,canvas.height)
    draw.paths(ctx,paths);

    const buffer=canvas.toBuffer("image/png");
    fs.writeFileSync(outFile,buffer);
}
