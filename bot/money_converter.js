/**
 * Created by sasha on 20/11/2016.
 */
var fx = require("./money.js");
var optionMoney = [["доллар","USD"],["российские рубли","RU"],["евро","EUR"]];

var idOpenexchangerates = "cb15cb73177841e28b111ad3b2745ab5";
//var request = require("request");
var needRequest = true;
exports.MoneyConverter = function( message)
{
    var from = false;
    var to = false;
    var n = Number(message.replace(/\D+/g,""));
    if(needRequest) {
        var url = "https://openexchangerates.org/api/latest.json?app_id=" + idOpenexchangerates;

        request({
            url: url,
            json: true
        }, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                if (typeof fx != "undefined" && fx.rates) {
                    fx.rates = data.rates;
                    fx.base = data.base;
                } else {
                    // If not, apply to fxSetup global:
                    var fxSetup = {
                        rates: data.rates,
                        base: data.base
                    }
                }
            }
        })
        needRequest = false;
    }

    optionMoney.forEach(function (item) {
        if(message.indexOf("в " + item[0]) != -1)
        {
            to = item;
        }
        else if(message.indexOf(item[0]) != -1 && message.indexOf("в " + item[0] == -1))
        {
            from = item;
        }
    });
    if(!from || !to)
        return false;
    else {
        return fx.convert(n, {from: from[1], to: to[1]});
        //return false;
    }


}