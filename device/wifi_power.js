/**
 * Created by sasha on 08/04/2017.
 */

var _device = require("./device.js").prototype, method = wifi_power.prototype = Object.create(_device);


method.constructor = wifi_power;

function wifi_power( soket , id )
{
    var status;
    _device().constructor.apply(this,[soket,id])
}

method.setStatus = function( i )
{
    this.status = i;
    console.log("Set devece #" + _device.getId.call(this)+" status:" + status);
    io.emit('news', i);
}

method.getStatus = function()
{
    return this.status;
}

