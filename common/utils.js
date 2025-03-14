const utils={}

utils.flaggedUsers=[1667498528238];

utils.formatPercent=(n)=>{
    return (n*100).toFixed(2)+"%";
}

utils.printProgress=(count,max)=>{
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    const percent=utils.formatPercent(
        count/max
    );
    process.stdout.write(count+"/"+max+" ("+percent+")");
}

// iterfact => utils.groupBy(samples, "student_id")
utils.groupBy=(objArray, key)=>{
    const groups={};
    for(let obj of objArray){
        const val=obj[key];
        // if student_id is identified but no drawings have been saved
        if(groups[val]==null){groups[val]=[];}
        groups[val].push(obj)
    }
    return groups;
}


if(typeof module!=='undefined'){
    module.exports=utils;   
}