/**
 * Created by sasha on 09/09/16.
 */

var Suffix = ["ов","","a","a","ов","ов","ов","ов","ов"];

exports.addSuffixForNumber =  function( varible )
{
    var buffer = Math.abs(varible);
    while(buffer < 1)
    {
        buffer = buffer * 10;
    }
    return Suffix[ buffer % 10 ];
}