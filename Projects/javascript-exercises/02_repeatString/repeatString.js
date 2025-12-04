const repeatString = function(str, num) {
    let string = "";
    if (num < 0){
        return "ERROR";
    }
    for (let i=0;i<num;i++)
    {
        string += str;
    }
    return string;


};

// Do not edit below this line
module.exports = repeatString;
