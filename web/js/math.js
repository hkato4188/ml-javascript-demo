const math={};

math.lerp=(a,b,t)=>{
    // return a+(b-a)*t;
    // refactored accounting for floats
    // example: 5,8,1.1,1
    return (a*(1-t)) + (b*t);
}