/**
 * Created by sasha on 08/04/2017.
 */

var status = 0;
var io;

function inConnect( i )
{
    console.log("Connect device");
    io = i;
}

function setStatus( i )
{
    status = i;
    console.log("Set wifi_power " + status);
    io.emit('news', { led: status });
}

function getStatus() {
    return status;
}

exports.inConnect = inConnect;
exports.setStatus = setStatus;
exports.getStatus = getStatus;