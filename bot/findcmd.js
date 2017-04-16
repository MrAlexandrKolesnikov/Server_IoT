/**
 * Created by sasha on 08/08/16.
 */

//require import
var CreateTxtFileByName = require("./WorkWithFile.js").CreateTxtFileByName; //func for worck with txt file
var WriteTxtFile = require("./WorkWithFile.js").WriteTxtFile; //func for write text in txt file
var CheckDevice = require("./CheckDevice.js").checkDevice; //func for check divice and cmd
var SetDeviceStatus = require("../device/wifi_power.js").setStatus;
//var mysql = require('mysql'); //for mysql database
//var PythonShell = require('python-shell'); //for run python shell


//********************* Options For USER Queriess******************************************************

var optionGoogleSerch    =  [ "-----" , "найди в гугле" , "загугли" , "поиск в гугл" , "найди в google" ,"найди мне информацию о"
                            , "найди в гугле про" ,"кто такой" ,"найди в гугле o" , "что такое" ];
var optionGoogleOpen     =  [ "открой google" , "открой гугл" ];


var optionWikiSerch      =  [ "найди в википедии", "найти в википедии"];
var optionWikiOpen       =  [ "открой википедию" ,"открой wiki" , "открой вики","открой wikipedia"];


var optionGoogleMapSerch =  [ "найди на карте" , "где находится" , "открой на карте" , "покажи на карте" ];
var optionGoogleMapOpen  =  [ "открой карты" , "открой карты google" ];


var optionMath           =  [ [ "минус" , "-" ] , [ "и минус" , "-" ] , [ "отнять" , "-" ] , [ "и отнять" , "-" ] , [ "плюс" , "+" ]
                            , [ "и плюс" , "+" ] , [ "и прибавить" , "+" ] , [ "прибавить" , "+" ] , [ "умножить на" , "*" ]
                            , [ "и умножить на" , "*" ] , [ "разделить на" , "/" ] , [ "и разделить на" , "/" ] ];


var randomSequence       =  [ [ "выведи случайное число" , 1 ] , [ "вывести случайное число" , 1 ] , [ "вывести случайное число" , 1 ]
                            , [ "сгенерируй случайное число" , 1 ] , [ "генерируй случайное число" , 1 ]
                            , [ "выведи случайную последовательность" , -1 ] , [ "вывести случайную последовательность" , -1 ]
                            , [ "сгенерируй случайную последовательность" , -1 ] , [ "генерируй случайную последоватьльность" , -1 ] ];


var lenthSequence        =  [ " от " , " c " , " до " ];


var lenths               =  [ "длинной " , "размером " ];


var TestBot              =  [ "начать тестирование" , "запусти тесты" , "проведи тесты" , "запустить тесты" ];


var optionReload         =  [ "перезагрузка" , "перезагрузись" , "рестарт" , "рестартанись" , "перезагрузить" ];


var lastAnswer           =  [ "последнее сообщение" , "повтори" , "что ты сказала" , "еще раз" ];


var lastCmd              =  [ "повтори команду" , "повтори последний запрос" , "еще раз команду" , "заново запрос"
                            , "еще раз послднее действие" , "повторить запрос" ];


var byText               =  [ "с текстом" , "c таким текстом" , "текстом" ];


var make                 =  [ "создай файл" , "запиши" , "новый файл" , "создать файл" ];


var VolumeControlOption  =  [ [ "выключи звук" , "off" ] , [ "off звук" , "off" ] , [ "убери звук" , "off" ] , [ "включи звук" , "on" ]
                            , [ "сделай громче" , "more" ] , [ "оффни звук" , "more" ] , [ "погромче","more" ] , [ "больше звука" , "more" ]
                            , [ "громче" , "more" ] , [ "тише" , "less" ] , [ "слишком громко" , "less" ]
                            , [ "выключить звук" , "off" ] ];


var AppOption            =  [ [ "skype" , "skype" ] , [ "скайп" , "skype" ] , [ "itunes" , "itunes" ] , [ "музык" , "itunes" ]
                            , [ "айтюнс" , "itunes" ] , [ "xcode" , "xcode" ] , [ "twitter" , "twitter" ]
                            , [ "твитер" , "twitter" ] , [ "твиттер" , "twitter" ] , [ "терминал" , "terminal" ]
                            , [ "terminal" , "terminal" ] , [ "календарь" , "celendar" ] , [ "найстройки компьютера" , "prefernces" ]
                            , [ "браузер" , "safari" ] , [ "сафари" , "safari" ] , [ "safari" , "safari" ] ];


var rateMoney            =  [ "покажи курс" , "открой курс" ];


var OpenProgOptins       =  [ "открой " , "запусти " ];
var CloseProgOptins      =  [ "закрой" , "заверши" , "убей процесс" ];

var lastMessage          =    "Это первое сообщение";

var ledOn                =  [ "включи свет" , "свет включить"];
var ledOff               =  [ "выключи свет" , "свет выключить"];

//*******************************************************************************************

//********************* Options of BOT Answer******************************************************

var answerOk             =  [ "Хорошо" , "Сделано" , "Окей" , "Выполнено" ];


var answerSerch          =  [ "Вот что я нашла" , "Поиск выполнен" , "Вот ответ на ваш запрос" ];


var fileNamequestion     =  [ "Как назвать файл?" , "Назовите Файл" , "Имя файла" ];

//*******************************************************************************************


var ListOfFileTxt        = [ ]; //in future save name of txt file

var flagOfComandContinue = [ false , false , false , false ];//some cmd need to some user answer

var endOfRequest         =  0;

var lastComand           = "";

var findIndex; // global varible for find text in user cmd

var MoneyInformer = '<div id="informerBelarusbank"></div><script type="text/javascript" src="//belarusbank.by/informer?logotyp=1&ColorTextTitle=000000&ColorTextInformer=969696&ColorBackGround=ffffff&ColorTitleBackGround=ffffff&ColorBorder=006030"></script>'

function Random( min , max )
{
    return Math.floor( Math.random( ) * ( max - min + 1 ) ) + min;
};

//func for ContinueComand - need separate file
exports.ContinueComand = function ( cmd )
{
    var result = false;
    var writeLastFile = false;

    flagOfComandContinue.forEach( function ( item , index )
    {
        if( item )
        {
            flagOfComandContinue[ index ] = false;

            switch (index)
            {
                case 0:

                    ListOfFileTxt[ ListOfFileTxt.length ] = cmd;
                    result = CreateTxtFileByName( cmd );

                break;

                case 1:
                    console.log(cmd + " !!");

                    if( cmd.indexOf("да ") !=  -1 )
                    {
                        writeLastFile = true;
                        byText.forEach(function ( item )
                        {
                            console.log( item + "  " + cmd.indexOf( item ) );

                            if( cmd.indexOf( item ) != -1 && !result )
                            {
                                console.log( ListOfFileTxt[ ListOfFileTxt.length ] + "  " + cmd.substring( cmd.indexOf( item ) ) + item.length );
                                writeLastFile = false;
                                WriteTxtFile( ListOfFileTxt[ ListOfFileTxt.length - 1 ] , cmd.substring( cmd.indexOf( item ) + item.length ) );
                                result = "answer:" + answerOk[ Random( 0 , 2 ) ];
                            }
                        });
                    }
                    else if( cmd.indexOf( " нет " ) !=  -1)
                    {
                        result = "answer:" + answerOk[ Random( 0 , 3 ) ];
                    }
                    else
                    {
                        result = "answer:Записать файл?"
                    }
                break;
                case 2:

                break;
                case 3:

                break;
            }
        }
    });
    if( result == "answer:Записать файл?" )
    {
        flagOfComandContinue[ 1 ] = true;
    }
    if( writeLastFile )
    {
        flagOfComandContinue[ 2 ] = true;
    }
    return result;
}


//main func for command understanding
exports.getcmd = function( cmd , device)
{
    cmd = cmd.toLowerCase( );

    var findcmd = false;

    //serch google serch command
    optionGoogleSerch.forEach( function ( item )
    {
        findIndex = cmd.indexOf( item );

            if( findIndex != -1 && !findcmd  )
            {
                if( CheckDevice( "openPage" , device ) ) //check can device do command
                {
                    endOfRequest = findIndex + item.length;
                    lastMessage = "answer:" + answerSerch[ Random( 0 , 3 ) ];
                    findcmd = lastMessage + "***" + MakeGoogleSerchURL( cmd , findIndex += item.length );
                }
                else
                {
                    lastMessage = "answer:Извините но я немогу выполнить данную команду на этом устройстве";
                    findcmd =  lastMessage;
                }
            }
    });

    //serch google open command
    if( !findcmd )
        optionGoogleOpen.forEach( function ( item )
        {
            findIndex = cmd.indexOf( item );

            if( findIndex != -1 )
            {
                if( CheckDevice( "openPage" , device ) )
                {
                    endOfRequest = findIndex + item.length;
                    lastMessage = "answer:"+answerOk[ Random( 0 , 3 ) ];
                    findcmd = lastMessage+"***"+"openPage:google.com";
                }
                else
                {
                    lastMessage = "answer:Извините но я немогу выполнить данную команду на этом устройстве";
                    findcmd =  lastMessage;
                }
            }
        });

    //serch wiki search command
    if( !findcmd )
        optionWikiSerch.forEach( function ( item )
        {
            findIndex = cmd.indexOf( item );
            if( findIndex != -1 )
            {
                if( CheckDevice( "openPage" , device ) )
                {
                    endOfRequest = findIndex + item.length;
                    lastMessage = "answer:" + answerSerch[ Random( 0 , 3 ) ];
                    findcmd = lastMessage + "***" + MakeWikiSerchURL( cmd , findIndex += item.length );
                }
                else
                {
                    lastMessage = "answer:Извините но я немогу выполнить данную команду на этом устройстве";
                    findcmd =  lastMessage;
                }
            }
        });

    //serch wiki open command
    if( !findcmd )
        optionWikiOpen.forEach(function (item)
        {
            findIndex = cmd.indexOf( item );

            if( findIndex != -1 )
            {
                if( CheckDevice( "openPage" , device ) )
                {
                    endOfRequest = findIndex + item.length;
                    lastMessage = "answer:" + answerOk[ Random( 0 , 3 ) ];
                    findcmd = lastMessage + "***" + "openPage:ru.wikipedia.org/";
                }
                else
                {
                    lastMessage = "answer:Извините но я немогу выполнить данную команду на этом устройстве";
                    findcmd =  lastMessage;
                }
            }
        });

    //serch google map serch command
    if( !findcmd )
        optionGoogleMapSerch.forEach(function (item)
        {
            findIndex = cmd.indexOf( item );

            if( findIndex != -1 )
            {
                if( CheckDevice( "openPage" , device ) )
                {
                    endOfRequest = findIndex + item.length;
                    lastMessage = "answer:" + answerSerch[ Random( 0 , 3 ) ];
                    findcmd = lastMessage + "***" + MakeGoogleMapSerchURL( cmd , findIndex += item.length);
                }
                else
                {
                    lastMessage = "answer:Извините но я немогу выполнить данную команду на этом устройстве";
                    findcmd =  lastMessage;
                }
            }
        });

    //serch google map open command
    if( !findcmd )
        optionGoogleMapOpen.forEach( function ( item )
        {
            findIndex = cmd.indexOf( item );

            if( findIndex != -1)
            {
                if( CheckDevice( "openPage" , device ) )
                {
                    endOfRequest = findIndex + item.length;
                    lastMessage = "answer:" + answerOk[ Random( 0 , 3 ) ];
                    findcmd = lastMessage + "***" + "openPage:google.ru/maps";
                }
                else
                {
                    lastMessage = "answer:Извините но я немогу выполнить данную команду на этом устройстве";
                    findcmd =  lastMessage;
                }
            }
        });

    //search restart command
    if( !findcmd )
        optionReload.forEach( function ( item )
        {
            findIndex = cmd.indexOf( item );

            if( findIndex != -1 && cmd.length == item.length )
            {
                if( CheckDevice( "restart" , device ) )
                {
                    endOfRequest = findIndex + item.length;
                    findcmd = "restart" ;
                }
                else
                {
                    lastMessage = "answer:Извините но я немогу выполнить данную команду на этом устройстве";
                    findcmd =  lastMessage;
                }
            }
        });

    //generate random sequence - need separete file
    if(!findcmd)
        randomSequence.forEach( function ( item )
        {
            findIndex = cmd.indexOf( item[ 0 ] )

            if(findIndex != -1)
            {
                endOfRequest = findIndex + item.length;
                var lenthRandom = item[ 1 ];
                var min = 0;
                var max = 1;
                var stringforRandom = cmd.substring( findIndex += item[ 0 ].length + 1 );
                stringforRandom = stringforRandom.split(" ");

                for( var i = 0 ; i < stringforRandom.length ; i++ )
                {
                    if( stringforRandom[ i ] == "от" || stringforRandom[ i ] == "c")
                    {
                        min = Math.floor( stringforRandom[ i + 1 ] );
                    }
                    if( stringforRandom[ i ] == "до" )
                    {
                        max = Math.floor( stringforRandom[ i + 1 ] );
                    }
                    if( stringforRandom[ i ] == "длиной" || stringforRandom[ i ] == "размером")
                    {
                        lenthRandom = Math.floor( stringforRandom[ i + 1 ] );
                    }
                }

                var buf;

                console.log( "min:" + min + " max:" + max + " lenth:" + lenthRandom) ;

                buf = "answer:";

                for( var i = 0 ; i < lenthRandom-1 ; i++ )
                {
                    buf += Random( min , max ) + " ";
                }

                buf += Random( min , max );

                findcmd = buf;
                lastMessage = buf;
            }
        });

    //search command for get last answer
    if( !findcmd )
        lastAnswer.forEach( function ( item )
        {
            findIndex = cmd.indexOf( item );

            if( findIndex != -1 )
            {
                findcmd = lastMessage;
            }
        });

    if( !findcmd )
        ledOn.forEach( function ( item )
        {
            findIndex = cmd.indexOf( item );

            if( findIndex != -1 )
            {
                SetDeviceStatus(1);
                lastMessage = "answer:"+answerOk[ Random( 0 , 3 ) ];
                findcmd = lastMessage;
            }
        });

    if( !findcmd )
        ledOff.forEach( function ( item )
        {
            findIndex = cmd.indexOf( item );

            if( findIndex != -1 )
            {
                SetDeviceStatus(0);
                lastMessage = "answer:"+answerOk[ Random( 0 , 3 ) ];
                findcmd = lastMessage;
            }
        });

    //search command for make test
    if( !findcmd )
        TestBot.forEach( function ( item )
        {
            findIndex = cmd.indexOf(item);
            if(findIndex != -1)
            {
                findcmd = "test";
            }
        });

    //serch make file command
    if( !findcmd )
        make.forEach( function ( item ) 
        {
            findIndex = cmd.indexOf( item );
            if( findIndex != -1 )
            {
                flagOfComandContinue[ 0 ] = true;
                findcmd =  "answer:" + fileNamequestion[ Random( 0 , 2 ) ];
            }
        });

    //serch Launch prog command
    if(!findcmd)
        if( cmd.indexOf( OpenProgOptins[ 0 ] ) != -1 || cmd.indexOf( OpenProgOptins[ 1 ] ) != -1 )
        {
            AppOption.forEach( function ( item )
            {
                findIndex = cmd.indexOf( item[ 0 ] );

                if ( findIndex != -1 )
                {
                    endOfRequest = findIndex + item.length;

                    var options =
                    {
                        args: [""]
                    };

                    options.args = item[ 1 ];
                    PythonShell.run( 'PythonScript/LaunchApp.py' , options , function ( err , results )
                    {
                        if ( err ) throw err;
                    });

                    findcmd = "answer:" + answerOk[Random(0, 3)];
                }
            });
        };

    //serch close prog command
    if( !findcmd )
        if( cmd.indexOf( CloseProgOptins[ 0 ] ) != -1 || cmd.indexOf( CloseProgOptins[ 1 ] ) != -1 || cmd.indexOf( CloseProgOptins[ 2 ] ) != -1 )
        {
            AppOption.forEach( function ( item )
            {
                findIndex = cmd.indexOf( item[ 0 ] );
                if ( findIndex != -1 )
                {
                    endOfRequest = findIndex + item.length;
                    var options =
                    {
                        args: [""]
                    };
                    options.args = item[ 1 ];

                    PythonShell.run( 'PythonScript/CloseApp.py' , options , function ( err , results )
                    {
                        if ( err ) throw err;
                    });

                    findcmd = "answer:" + answerOk[ Random( 0 , 3 ) ];
                }
            });
        }

    //serch volume control command
    if( !findcmd )
    VolumeControlOption.forEach( function ( item )
    {
        findIndex = cmd.indexOf( item[ 0 ] );

        if( findIndex != -1 )
        {
            endOfRequest = findIndex + item.length;

            var options =
            {
                args: [""]
            };
            options.args = item[ 1 ];
            PythonShell.run( 'PythonScript/VolumeControl.py' , options , function ( err , results )
            {
                if ( err ) throw err;
            });

            findcmd = "answer:" + answerOk[ Random( 0 , 3 ) ];
        }
    });


    //serch restart prog command
    if( !findcmd )
        if( cmd.indexOf( "перезапусти" ) != -1 || cmd.indexOf( "перезагрузи" ) != -1 )
        {
            AppOption.forEach( function ( item )
            {
                findIndex = cmd.indexOf( item[ 0 ] );

                if ( findIndex != -1 )
                {
                    /*endOfRequest = findIndex + item.length;
                    var options =
                    {
                        args: [""]
                    };
                    options.args = item[ 1 ];
                    PythonShell.run( 'PythonScript/RestartApp.py' , options, function ( err , results )
                    {
                        if ( err ) throw err;
                    });
                    findcmd = "answer:" + answerOk[ Random( 0 , 3 ) ];*/
                    lastMessage = "answer:Извините но я немогу выполнить данную команду на этом устройстве";
                    findcmd =  lastMessage;
                }
            });
        }
    //serch money convert command
    /*if(!findcmd)
        rateMoney.forEach( function ( item )
        {
            findIndex = cmd.indexOf( item );

            if(findIndex != -1 )
            {
                endOfRequest = findIndex + item.length;
                lastMessage = "answer:" + answerOk[ Random( 0 , 3 ) ];
                findcmd =  lastMessage+"***"+"insert_element:"+MoneyInformer;
            }
        });*/


    lastComand = cmd;
    return findcmd;
};

//make google url
function  MakeGoogleSerchURL( cmd , index )
{
   return "openPage:google.by/search?q=" + cmd.substring( index );
};

//make wiki url
function  MakeWikiSerchURL(cmd , index ) {
    return "openPage:ru.wikipedia.org/wiki/" + cmd.substring( index );
};

//make google map url
function MakeGoogleMapSerchURL( cmd , index )
{
    return "openPage:google.ru/maps/place/" + cmd.substring( index );
};

//find math sign and replase becose sometime speech recognition make them as word
exports.findMath = function( cmd )
{
    optionMath.forEach( function ( item )
    {
        if( cmd.indexOf( item[ 0 ] ) != -1 )
        {
            while( cmd.indexOf( item[ 0 ] ) != -1)
            {
                cmd = cmd.replace( item[ 0 ] , item[ 1 ] );
            }
        }
    });

    return cmd;
};

exports.useLastCmd = function ( cmd )
{
    var flag = false;

    lastCmd.forEach(function ( item )
    {
        if( cmd.indexOf( item ) != -1 )
            flag = true;
    });

    return flag;
};

exports.setLastComand = function ( cmd )
{
  lastComand = cmd;  
};

exports.setLastComandendRequest = function ( index )
{
    endOfRequest = index;
};