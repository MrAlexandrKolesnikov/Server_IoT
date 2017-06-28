/**
 * Created by Саша on 21.03.2017.
 */
var server = require("./server_main.js");
var router =require("./route.js");
var requestHandlers = require("./requestHandlers");


var handle = {}

handle["/"] = requestHandlers.index;
handle["/temperatura"] = requestHandlers.temperatura;
handle["/about"] = requestHandlers.about;
handle["/friday"] = requestHandlers.friday;
handle["error"] = requestHandlers.error;
handle["/remote"] = requestHandlers.remote;
handle["file"] = requestHandlers.file;
handle["/start_page"] = requestHandlers.start_page;

//!!!!!
handle["/soket"] = requestHandlers.soket;
//!!!!!

server.start(router.route , handle);

