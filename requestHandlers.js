/**
 * Created by Саша on 21.03.2017.
 */
/**
 * Created by sasha on 18/07/16.
 */

var querystring = require("querystring");
var bot = require("./bot/bot.js").getAnswer;
var io = require("socket.io");
var getStatus = require("./device/list_wifiPower").getStatus;
var setStatus = require("./device/list_wifiPower").setStatus;
var getIdList = require("./device/list_wifiPower").getIdList;

var respond = "";
var device = "";
var cmd_mass = "";
var user_cmd = "";


function friday( response , postDate)
{
    //console.log(postDate)
    if( postDate.indexOf( "device" ) != -1 && postDate.indexOf( "user" ) != -1 )
    {
        cmd = postDate.split( "***" );

        cmd.forEach( function ( item )
        {
            if( item.indexOf( "user:" ) != -1 )
            {
                user_cmd = item.substring( 5 );
            }
            if( item.indexOf( "device:" ) != -1 )
            {
                device = item.substring( 7 );
            }
        });

       // console.log( "User:" + user_cmd + "   device:" + device  +  "   Time:" + now);
        console.log( "User:" + user_cmd + "   device:" + device);
        respond = bot( user_cmd , device );
        console.log("Bot:" + respond);
        response.write( respond );
        response.end();
    }
    else
    {
        fs = require( 'fs' );
        fs.readFile('./friday/friday.html', function ( err , info )
        {
            if ( err ) throw err;
            response.write( info );
            response.end();
        })

    }

}

function about( response , postDate)
{
    console.log(postDate);
//        now.setTimezone( 'UTC' );
    fs = require( 'fs' );
    fs.readFile('./about/about.html', function ( err , info )
    {
        if ( err ) throw err;
        response.write( info );
        response.end();
    })
}

function temperatura( response , postDate)
{
    console.log(postDate);
//        now.setTimezone( 'UTC' );
    fs = require( 'fs' );
    fs.readFile('./temperatura/temperatura.html', function ( err , info )
    {
        if ( err ) throw err;
        response.write( info );
        response.end();
    })
}

function index( response , postDate)
{
    console.log(postDate);
//        now.setTimezone( 'UTC' );
    fs = require( 'fs' );
    fs.readFile('./index/index.html', function ( err , info )
    {
        if ( err ) throw err;
        response.write( info );
        response.end();
    })
}

function start_page( response , postDate)
{
    console.log(postDate);
//        now.setTimezone( 'UTC' );
    fs = require( 'fs' );
    fs.readFile('./index/start_page.html', function ( err , info )
    {
        if ( err ) throw err;
        response.write( info );
        response.end();
    })
}

function remote(response , postDate)
{
    console.log(postDate);
    if( postDate.indexOf( "getStatus" ) != -1)
    {
        var status = getStatus(parseInt(postDate.split("&")[1]))
        console.log(status);
        response.write( String(status) );
        response.end();
    }
    else if(postDate.indexOf( "getIdList" ) != -1)
    {
        response.write( String(getIdList()) );
        response.end();
    }
    else if( postDate.indexOf( "setStatus" ) != -1)
    {
        console.log(parseInt(postDate.split("&")[2]) + 1)
        setStatus(postDate.split("&")[1] , postDate.split("&")[2]);
    }
    else
    {
        fs = require('fs');
        fs.readFile('./wifi_power/remote_control.htm', function (err, info) {
            if (err) throw err;
            response.write(info);
            response.end();
        })
    }
}

function soket( response , postDate)
{
    console.log(postDate);
//        now.setTimezone( 'UTC' );
    fs = require( 'fs' );
    fs.readFile('./soket_test/soket_test.html', function ( err , info )
    {
        if ( err ) throw err;
        response.write( info );
        response.end();
    })
}
/**
 * Created by sasha on 18/07/16.
 */
function error( response , postData )
{
    response.writeHead( 200 , { "Content-Type": "text/plain" } );
    response.write( "404 not found: " + querystring.parse( postData ).text );
    response.end();
}

function file( response , postData )
{
    // Читаем файл
    console.log( postData );
    fs = require( 'fs' );
    fs.readFile( '.' + postData , function( err , info )
    {
        if ( err ) error( response , postData );
        else
        {
            if(postData.indexOf(".css") != -1)
            {
                response.writeHead(200, {'Content-Type': 'text/css'});
            }
            response.write( info );
            response.end();
        }
    });
}



exports.file = file;
exports.index = index;
exports.about = about;
exports.error = error;
exports.temperatura = temperatura;
exports.friday = friday;
exports.remote = remote;
exports.start_page = start_page;

exports.soket = soket;