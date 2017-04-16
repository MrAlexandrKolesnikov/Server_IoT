
exports.CreateTxtFileByName = function (filename) {
    var path = require('path');
    var fs = require('fs');
    fs.writeFile("TextNote/"+filename+'.txt', '', function (err) {
        if (err) throw err;
    });
    return "answer:Записать файл?"
}

exports.WriteTxtFile = function( filename , text )
{
    var fs = require('fs');
    fs.writeFile("TextNote/"+filename+'.txt', text, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
};