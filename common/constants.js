const constants = {};

constants.DATA_DIR="../data";
constants.DATASET_DIR=constants.DATA_DIR+"/dataset";
constants.IMG_DIR=constants.DATA_DIR+"/img";
constants.JSON_DIR=constants.DATA_DIR+"/json";
constants.RAW_DIR=constants.DATA_DIR+"/raw";
constants.SAMPLES=constants.DATASET_DIR+"/samples.json";


if(typeof module!=='undefined'){
    module.exports=constants;
}