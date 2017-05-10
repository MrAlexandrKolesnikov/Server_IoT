/**
 * Created by sasha on 09/04/2017.
 */

var idDevice = 0;

function onStart()
{
    var request = new XMLHttpRequest();
    request.open("POST", 'remote', true);
    request.send("getIdList");
    request.onreadystatechange = function ()
    {
        if (request.readyState == 4)
        {
            var listOfIdDevice = request.responseText.split(",")
            console.log(listOfIdDevice.length);
            for(var i = 0 ; i < listOfIdDevice.length ; i++)
            {
                var x = document.getElementById("deviceId");
                var option = document.createElement("option");
                console.log(listOfIdDevice[i]);
                option.text = listOfIdDevice[i];
                x.add(option);
            }
        }
    }
}

$(function()
{
    $('#deviceId').change(function()
    {
        idDevice = $('#deviceId :selected').val();
        var request = new XMLHttpRequest();
        request.open("POST", 'remote', true);
        request.send("getStatus&" + idDevice);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                console.log(request.responseText);
                if (request.responseText == "1") {
                    $("body").animate({color: "#333333"}, 1000);
                    $(".site-wrapper").animate({backgroundColor: "#FFFFFF"}, 1000);
                }
                else {
                    $("body").animate({color: "#FFFFFF"}, 1000);
                    $(".site-wrapper").animate({backgroundColor: "#333333"}, 1000);
                }
            }
        }
    });
});


function sendStatus(i) {
    var request = new XMLHttpRequest();
    request.open("POST", 'remote', true);
    request.send("setStatus&"+idDevice+"&"+i);
}