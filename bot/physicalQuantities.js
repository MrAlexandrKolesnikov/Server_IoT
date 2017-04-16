/**
 * Created by sasha on 23/08/16.
 */

var addSuffixForNumber= require("./languageConstrol.js").addSuffixForNumber;

var optionLenth = [["метр",1 ],["сантиметр",100,],["миллиметр",1000,],["микрометр",1000000],["микрон",1000000 ,"мик"],["нанометр",1000000000],["ангстрем", 10000000000,],["километр", 1/1000]
    ,["пункт", 1000/0.353],["дюйм", 1000/25.39,"дюйм"],["ярд", 1/0.9144],["мили",1/100/1.6093],["фут",3.281],["аршин", 1/2.13]];


var BadData = ["Проверте входные данные","Входные данные неверные"];
exports.LenthConvert = function( message)
{
    var from;
    var to;
    var n = Number(message.replace(/\D+/g,""));
    optionLenth.forEach(function (item) {
        if(message.indexOf("в " + item[0]) != -1)
        {
            to = item;
        }
        else if(message.indexOf(item[0]) != -1 && message.indexOf("в " + item[0] == -1))
        {
            from = item;
        }
    });

    try {
        console.log("from" + from + " to"+ to + " n" +n);
        if( to[ 0 ] == "мили" || to[ 0 ] == "аршин") {
            return n / from[1] * to[1];
        }
        else{
            return n / from[1] * to[1] + " " +to[0]+ addSuffixForNumber(n / from[1] * to[1]);
        }
    }catch(e)
    {
     return false;
    }

}

var optionTem = {};
optionTem["градусов"] = -1;
optionTem["цельсия"] = -1;
optionTem["кульвин"] =273.3;

var TempConvert = function(from , n , to)
{
    try{
        return n + optionTem[to];
    }catch(e)
    {
        return BadData[Random(0,1)];
    }
}