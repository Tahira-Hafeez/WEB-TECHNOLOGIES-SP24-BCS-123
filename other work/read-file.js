let fs=require("fs");

console.log("calling files in current directory");
let files=fs.readdir(".",function(err,result){
    if(!err) console.log(result);
});
console.log("Reading files in current directory");