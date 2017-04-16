/**
 * Created by sasha on 07/08/16.
 */
// Создаем распознаватель
var respond = '{"id":"*","answer":"*"}';
var optionControlStop = ["закончить разговор","завершение работы","завершить работу","стоп запись","останавить запись","стоп","закончить"];
var optionControlStart = ["начать работу","начать запись","эй пятница","пятница","работай","старт"];
var answerHello = ["Здравствуйте","Добрый день","Привет","Я вас слушаю"]
var answerBy = ["Завершение работы","Работа завершена","Конец Работы","заткнись","замолчи"];
var optionAnswer = ["answer:","openPage:","restart", "test" , "insert_element:" ,"openApp:"];
var TestAnswerRequest = [["посчитай 3 + 5","8"],["сколько будет 7*8/4","14"],["переведи 40 метров в километры","0.04 километр"],["переведи 30 километров в метры","30000 метров"],["cоздать файл","файл"],["123","Записать файл?"],["да",""]];


var FocusInput = new Event('focus');
var BlurInput = new Event("blur");

function Random(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var recognizer = new webkitSpeechRecognition();
recognizer.continuous = false;
recognizer.interimResults = true;
var msg = new SpeechSynthesisUtterance();
var voices = window.speechSynthesis.getVoices();
var messegeField ;
document.getElementById("monitor");
var BotMessageId = 0;
var UserMessageId = 0;
var ElementMessageId = 0;
var callProgram = true;
var work = false;
var transcription = 0;
var hiSpeeck = false;
var last;
function start() {

    recognizer.start();
}
function setWork(bool) {
    work = bool;
}

function StartWork(cmd)
{
    var find = false;
    if(!work)
    {
        optionControlStart.forEach(function (item) {
            if(cmd.indexOf(item)!=-1 && !find) {
                PrintMessage("user", item);
                setWork(true);
                PrintMessage("bot",answerHello[Random(0,3)] , true);
                find = true;
            }
        });
    }
}

function StopWork(cmd) {
    find = false;
    if(work) {
        optionControlStop.forEach(function (item) {
            if (cmd.indexOf(item) != -1 && !find) {
                PrintMessage("user", item);
                setWork(false);
                PrintMessage("bot", answerBy[Random(0, 2)],true);
                find = true;
            }
        });
    }
}


// Ставим опцию, чтобы распознавание началось ещё до того, как пользователь закончит говорить
recognizer.interimResults = true;
recognizer.continuous = false;

// Какой язык будем распознавать?
recognizer.lang = 'ru-RU';
msg.onend = function (event) {
    hiSpeeck = false;
}

function speech(text) {
    // Create a new instance of SpeechSynthesisUtterance.

    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[27]; // Note: some voices don't support altering params
    msg.voiceURI = 'native';
    msg.volume = 1; // 0 to 1
    msg.rate = 1; // 0.1 to 10
    msg.pitch = 2; //0 to 2
    msg.text = text;
    msg.lang = 'ru-Ru';
    speechSynthesis.speak(msg);
}

// Используем колбек для обработки результатов
recognizer.onresult = function (event) {
    var result = event.results[event.resultIndex];
    console.log(result.isFinal);
    if (result.isFinal) {
        document.getElementById("userConsoleText").value ="";
        var cmd = result[0].transcript.toLowerCase();
        StopWork(cmd);

        if(work) {
            SendPrintToServer(cmd);
        }

        StartWork(cmd);

    } else {
        console.log('Промежуточный результат: ', result[0].transcript);
        document.getElementById("userConsoleText").dispatchEvent(FocusInput);
        document.getElementById("userConsoleText").value = result[0].transcript;
        document.getElementById("userConsoleText").setAttribute('style',"color:#DCDCDC;");
    }
};

recognizer.onerror = function(event) {
    console.log(event.error);

};


var PrintMessage = function( person , message , speech_q )
{
    messegeField = document.getElementById("monitor");
    var messageElement = document.createElement("p");
    messageElement.setAttribute("style","border-radius: 20px;");
    messageElement.setAttribute("style","background: 3CACFA;");
    if(person == "bot")
    {
        if(speech_q) {
            recognizer.stop();
            hiSpeeck = true;
            speech(message);
        }
        messageElement.id = BotMessageId;
        messageElement.className = "lead text-left center-block";
        messageElement.appendChild(document.createTextNode("  "+message+"  "));
    }
    else
    {
        messageElement.id = UserMessageId;
        messageElement.className = "lead text-right ";
        messageElement.appendChild(document.createTextNode("  " + message + "  "));
    }
    messegeField.appendChild(messageElement);
}


function restart() {
    try
    {
        if(!hiSpeeck) {
            start();
            console.log("not work - restart");
        }
    }catch(e){
        console.log("work");
    }
}
setInterval(restart, 1000);

var ParseAnswer = function(cmd)
{
    cmd = cmd.split("***");
    console.log(cmd);
    cmd.forEach(function (item) {
        if(item.indexOf(optionAnswer[0]) != -1)
        {
            PrintMessage("bot",item.substring(optionAnswer[0].length) , true);
        }
        if(item.indexOf(optionAnswer[1]) != -1)
        {
            window.open("http://"+item.substring(optionAnswer[1].length), "_blank");
        }
        if(item.indexOf(optionAnswer[2]) != -1)
        {
            location.reload();
        }
        if(item.indexOf(optionAnswer[3]) != -1)
        {
            TestBot();
        }
        if(item.indexOf(optionAnswer[4]) != -1)
        {
            ElementMessageId++;
            console.log(item.substring(optionAnswer[4].length));
            PrintElement(item.substring(optionAnswer[4].length));
        }
    });
}


var TestBot = function()
{
    var GoodTest = true;
    TestAnswerRequest.forEach(function (item , index) {
        var request = new XMLHttpRequest();
        request.open("POST", 'friday', true);
        request.send("user:" + item[0]);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                console.log("send:" + item + " " + "answer:"+request.responseText);
                if(request.responseText.indexOf(item[1]) == -1)
                {
                    PrintMessage("bot","Не пройден тест номер " + index + " Получен ответ:" + request.responseText.substring(optionAnswer[0].length));
                    GoodTest = false;
                }

            }
        }
        if(GoodTest && index == TestAnswerRequest.length-1) {
            PrintMessage("bot", "Тесты завершены");
        }
    });
}

var PrintElement = function( element  )
{
    messegeField = document.getElementById("body");
    var messageElement = document.createElement("div");
    messageElement.id = ElementMessageId;
    messageElement.innerHTML = element;
    //messageElement = messageElement.firstChild;
    //messageElement = messageElement.nextElementSibling;
    for(var i = 0 ; i < messageElement.childElementCount ; i++)
    {
        messageElement.nextElementSibling;
        messegeField.appendChild(messageElement);
    }
}

var SendPrintToServer = function (text) {
    UserMessageId++;
    PrintMessage("user", text);
    var request = new XMLHttpRequest();
    request.open("POST", 'friday', true);
    request.send("device:web***user:" + text);
    request.onreadystatechange = function ()
    {
        if (request.readyState == 4) {
            BotMessageId++;
            ParseAnswer(request.responseText);
        }
    }
}

