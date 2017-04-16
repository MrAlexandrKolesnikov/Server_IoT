/**
 * Created by sasha on 09/04/2017.
 */
function onStart()
{
    var request = new XMLHttpRequest();
    request.open("POST", 'remote', true);
    request.send("getStatus");
    request.onreadystatechange = function ()
    {
        if (request.readyState == 4) {
            console.log(request.responseText);
            if(request.responseText == "1")
            {
                $("body").animate({ color: "#333333"}, 1000);
                $(".site-wrapper").animate({ backgroundColor: "#FFFFFF"}, 1000);
            }
            else
            {
                $("body").animate({ color: "#FFFFFF"}, 1000);
                $(".site-wrapper").animate({ backgroundColor: "#333333"}, 1000);
            }
        }
    }
}

function sendStatus(i) {
    var request = new XMLHttpRequest();
    request.open("POST", 'remote', true);
    request.send("setStatus***"+i);
}