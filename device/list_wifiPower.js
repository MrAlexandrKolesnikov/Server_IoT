/**
 * Created by sasha on 08/05/2017.
 */

wifiPower = require("./wifiPower.js").wifiPower;

var list_wifiPower = {};

exports.add = function ( socket )
{
    var userId = Object.keys(list_wifiPower).length;
    if (!list_wifiPower[userId]) {
        list_wifiPower[userId] = new wifiPower(socket,userId);
    }
    else
    {
        console.log("Error");
        console.log(userId);
    }
};

exports.remove = function (socket)
{
    for(var index in list_wifiPower)
    {
       if(list_wifiPower[index].getSocket() == undefined)
       {
           console.log("Disconnect device #" + list_wifiPower[index].getId());
           delete list_wifiPower[list_wifiPower[index].getId()];
       }
    }
};

exports.setStatus = function(id , status) {
    list_wifiPower[id].setStatus(status);
};

exports.getStatus = function( id )
{
    console.log("Get status device #" +id);
    return list_wifiPower[id].getStatus();
};

exports.getIdList = function()
{
    var idList = [];
    for(var index in list_wifiPower)
    {
        idList.push(list_wifiPower[index].getId());
    }
    return idList;
}

exports.getNumberOfDevice = function () {
    var count = 0;
    for(var prs in list_wifiPower)
    {
        if(list_wifiPower.hasOwnProperty(prs)) count++;
    }
    console.log("Number Of Device:" + count);
    return list_wifiPower.length;
}
