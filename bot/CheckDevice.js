/**
 * Created by sasha on 06/12/2016.
 */
var ComandDeviceCheck = [ ["openPage","web","python_client"],["test","web","python_client"],["restart","web"],];

exports.checkDevice = function( cmd , device)
{   var result = false;
    ComandDeviceCheck.forEach(function (item) {
       if(cmd == item[0])
       {
           for(var i = 1 ; i < item.length ; i = i+ 1)
           {
               if(device == item[i]) result = true;
           }

       }
    });
    return result;
}
