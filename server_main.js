var http = require( "http" );
var url  = require( "url" );
var io = require('socket.io');
var deviceInConnect = require('./device/wifi_power.js').inConnect;
var number_of_device = 0;

//function(nodejs module) start server and get response and request
function start( route , handle )
{
    function onRequest( request , response )
    {
        var postData = "";
        var pathname = url.parse( request.url ).pathname;

        request.setEncoding( "utf8" );

        request.addListener( "data" , function( postDataChunk )
        {
            postData += postDataChunk;
        });

        request.addListener( "end" , function( )
        {
            route( handle , pathname , response , postData);
        });
    }
    //http.createServer( onRequest ).listen(process.env.PORT);FOR DEPLOY
    //var server = http.createServer( onRequest ).listen(8888); //FOR LOCAL
    var server = http.createServer(onRequest).listen(process.env.PORT || 8888);
    console.log( "Start Server" );
    io = io.listen(server);
    console.log( "Soket start" );

    io.sockets.on('connection', function (client)
    {

        client.on('disconnect', function () {
            console.log('user disconnected');
        });
        number_of_device++;
        deviceInConnect(client , number_of_device);
    });
}

exports.start = start;