/**
 * Created by sasha on 08/05/2017.
 */

var method = device.prototype;

function device(socket,id)
{
    this._id = id;
    this._socket = socket;
    console.log("Device Connect!");
}
method.getId = function()
{
    return this._id;
}

method.getSocket = function()
{
    return this.socket;
}

module.exports = device;