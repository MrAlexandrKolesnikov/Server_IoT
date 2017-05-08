/**
 * Created by sasha on 08/05/2017.
 */

var method = device.prototype;

function device(soket,id)
{
    this._id = id;
    this._soket = soket;
    console.log("Device Connect!");
}
method.getId = function()
{
    return this._id;
}

this.getSoket = function()
{
    return this.soket;
}

exports.device = device;