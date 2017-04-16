var LenthConvert = require("./physicalQuantities.js").LenthConvert;
var ContinueComand = require("./findcmd.js").ContinueComand;
var setLastComand = require("./findcmd.js").setLastComand;
var setLastComandendRequest = require("./findcmd.js").setLastComandendRequest;
var MoneyConverter = require("./money_converter.js").MoneyConverter;
var botLog;
var botElementId = "bot";
var botLogElementId = "botLog";
var debugging = true;
//var debugging = false;
var dom;
var events;
// // var firstFlag = true;
//var language = "russian";
 var language = "english";
var loaded = true;
var monitorElementId = "monitor";
 var tracing = true; 
//var tracing = false; 
var userElementId = "guest";
var botManager;
var monitor;
var chatBotKisa;
var initAll = function(e) {
 events.setTracing(tracing);
 events.setDebugging(debugging); events.setLog(botLog); 
 if (Dom) {
  if(debugging && botLog) {botLog.println("index.js:initAll: "+"Dom is loaded...");}; 
  dom = new Dom();
  dom.setTracing(tracing);
  dom.setDebugging(debugging);
  dom.setLog(botLog);
 } else {
  if(debugging && botLog) {botLog.println("index.js:initAll: "+"Log is not loaded...");};
  loaded = false;
  return -1; 
 };
 dom.changeTextContent("loadMessage", dom.getTextContent("clickMessage"));
 monitor = new Monitor();
 monitor.setTracing(tracing);
 monitor.setDebugging(debugging);
 monitor.setLog(botLog);
 monitor.setBotElementId(botElementId);
 monitor.setMonitorElementId(monitorElementId);
 monitor.setUserElementId(userElementId);
 monitor.setCurrentLanguage(language);
 monitor.main();
 var userConsole;
 userConsole = new UserConsole();
 userConsole.setTracing(tracing);
 userConsole.setDebugging(debugging);
 userConsole.setLog(botLog);
 userConsole.setEvent(events);
 userConsole.setMonitor(monitor);
 userConsole.main();
 chatBotKisa = new SpeechBot();
 chatBotKisa.setTracing(tracing);
 chatBotKisa.setDebugging(debugging);
 chatBotKisa.setLog(botLog);
 chatBotKisa.init();
 botManager = new BotManager();
 botManager.setTracing(tracing);
 botManager.setDebugging(debugging);
 botManager.setLog(botLog);
 botManager.setMonitor(monitor); 
 botManager.setCurrentLanguage(language);
 botManager.addBot(chatBotKisa); 
 botManager.main();
 runBot();
};
var runBot = function(e) {
 if(!((debugging || tracing) && botLog)) {
  dom.doHidden("botLog");
  var monitorElement = document.getElementById("monitor");
  monitorElement.style.height = "90%";  
 };
 dom.doHidden("hello");
 dom.doVisible("console");
 document.getElementById("userConsoleText").focus();
 if(debugging && botLog) {botLog.println("index.js:runBot: "+"Kisa is runing...");};
};
var wrongExit = function(className) {
 if(debugging && botLog) {botLog.println("index.js:wrongExit from index.js:initAll: "+"ERROR: "+className+" is not loaded...");}; 
 loaded = false;
 return -1; 
};
var Root = function() {};
Root.prototype.className = "Root"; 
 Root.prototype.getClassName = function () {return this.className;};
Root.prototype.created = "20061018"; 
 Root.prototype.getCreated = function () {return this.created;};
Root.prototype.debugging = false;
 Root.prototype.getDebugging = function () {return this.version;};
 Root.prototype.mustDebug = function () {if(this.getDebugging() && this.getLog()) {return true;} else {return false;};};
 Root.prototype.setDebugging = function (debugging) {this.debugging = debugging; return 1;};
Root.prototype.rootLog; 
 Root.prototype.getLog = function () {return this.rootLog;};
 Root.prototype.setLog = function (rootLog) {this.rootLog = rootLog; return 1;};
Root.prototype.tracing = false;
 Root.prototype.getTracing = function () {return this.tracing;};
 Root.prototype.mustTrace = function () {if(this.getTracing() && this.getLog()) {return true;} else {return false;};};
 Root.prototype.setTracing = function (tracing) {this.tracing = tracing; return 1;};
Root.prototype.version = "20061018"; 
 Root.prototype.getVersion = function () {return this.version;};
 Root.prototype.getClassId = function () {return this.created+this.version;};
var Events = function() {};
Events.prototype = new Root();
Events.prototype.created = "20060101"; 
Events.prototype.version = "20061018"; 
Events.prototype.addEventListener = function(element, type, listener, useCapture) {
 if(this.mustTrace()) {this.getLog().println("Events.addEventListener is runing...");}; 
 if(typeof element == "string") {element = document.getElementById(element)}; 
 if(!element) {return -1;};
 if(element.addEventListener) {
  element.addEventListener(type, listener, useCapture);
 } else if(element.attachEvent) {
  eventIE = "on"+type;
  element.attachEvent(eventIE, listener);
 } else {
  return -1;
 };
};
Events.prototype.removeEventListener = function(element, type, listener, useCapture) {
 if(this.mustTrace()) {this.getLog().println("Events.removeEventListener is runing...");}; 
 if(typeof element == "string") {element = document.getElementById(element)}; 
 if(!element) {return -1;};
 if(element.removeEventListener) {
  element.removeEventListener(type, listener, useCapture);
 } else if (element.detachEvent) {
  eventIE = "on"+type;
  element.detachEvent(eventIE, listener);
 } else {
  return -1;
 };
};
var Dom = function() {};
Dom.prototype = new Root();
Dom.prototype.created = "20060101"; 
Dom.prototype.version = "20061018"; 
Dom.prototype.appendTextContent = function(element, content) {
 if(this.mustTrace()) {this.getLog().println("Dom.appendTextContent is running...");}; 
 if(typeof element == "string") {element = document.getElementById(element)};
 element.appendChild(document.createTextNode(content));
 return 1;
}
Dom.prototype.changeChilds = function(element, newChildsRootElement) {
 if(this.mustTrace()) {this.getLog().println("Dom.changeChilds is running...");}; 
 if(typeof element == "string") {element = document.getElementById(element)};
 if(typeof newChildsRootElement == "string") {newChildsRootElement = document.getElementById(newChildsRootElement)};
 this.removeChilds(element);
 element.appendChild(newChildsRootElement);
 return 1;
}
Dom.prototype.changeTextContent = function(element, content) {
 if(this.mustTrace()) {this.getLog().println("Dom..changeTextContent is running...");}; 
 if(typeof element == "string") {element = document.getElementById(element)};
 if(element) {
  this.removeChilds(element); 
  element.appendChild(document.createTextNode(content));
  return 1;
 } else {
  return 0;
 };
}
Dom.prototype.clearTextContent = function(element) {
 if(this.mustTrace()) {this.getLog().println("Dom.changeTextContent is running...");}; 
 if(typeof element == "string") {element = document.getElementById(element)};
 if(element) {
  this.removeChilds(element); 
  return 1;
 } else {
  return 0;
 };
}
Dom.prototype.copyContent = function(fromElement, toElement, removeToStatus) {
 if(this.mustTrace()) {this.getLog().println("Dom.copyContent is running...");};
 if(typeof fromElement == "string") {fromElement = document.getElementById(fromElement)};
 if(typeof toElement == "string") {toElement = document.getElementById(toElement)};
 if(!fromElement) {return -1;} 
 if(!toElement) {return -2;} 
 if(removeToStatus) {this.removeChilds(element);}
 var copyElement = fromElement.firstChild; 
 while(copyElement) {
  toElement.appendChild(copyElement.cloneNode(true));
  copyElement = copyElement.nextSibling;
 };
 return 1;
}
Dom.prototype.createCookie = function(name, value, days) {
 if(this.mustTrace()) {this.getLog().println("Dom.createCookie is running...");};
 var expires;
 if (days) {
  var date = new Date();
  date.setDate(date.getDate()+days);
   expires = "; expires="+date.toGMTString();
 } else {
  expires = "";
 };
 document.cookie = name+"="+value+expires+"; path=/";
 return 1;
}
Dom.prototype.createLinkElement = function(id, href, text) {
 if(this.mustTrace()) {this.getLog().println("Dom.createLinkElement is running...");};
 var linkElement = document.createElement("a");
 linkElement.id = id;
 linkElement.setAttribute("href", href);
 linkElement.appendChild(document.createTextNode(text)); 
 return linkElement;
}
Dom.prototype.doHidden = function(element) {
 if(this.mustTrace()) {this.getLog().println("Dom.doHidden is running...");};
 if(typeof element == "string") {element = document.getElementById(element)};
 if(!element) {return -1;};
 element.style.visibility = "hidden";
 element.style.position = "absolute";
 element.style.left = "-1000em";
 element.style.top = "-1000em";
 return 1;
}
Dom.prototype.doVisible = function(element) {
 if(this.mustTrace()) {this.getLog().println("Dom.doVisible is running...");};
 if(typeof element == "string") {element = document.getElementById(element)};
 if(!element) {return -1;} 
 if(!element.style) {return -2;} 
 element.style.position = "static";
 element.style.left = "auto";
 element.style.top = "auto";  
 element.style.visibility = "visible";
 return 1;
}
Dom.prototype.eraseCookie = function(name) {
 if(this.mustTrace()) {this.getLog().println("Dom.eraseCookie is running...");};
 this.createCookie(name,"",-1);
 return 1;
}
Dom.prototype.getTextContent = function(element) {
 if(this.mustTrace()) {this.getLog().println("Dom.getTextContent is running...");};
 if(typeof element == "string") {element = document.getElementById(element)};
 if(!element) {return -1;} 
 if(!element.firstChild) {return -2;} 
 var childNode = element.firstChild;
 if(!childNode) {return -3;}
 if(childNode.nodeType != 3) {return -4;}
 var text = childNode.nodeValue;
 return text;
}
Dom.prototype.invertVisibility = function(element) {
 if(this.mustTrace()) {this.getLog().println("Dom.invertVisibility is running...");};
 if(typeof element == "string") {element = document.getElementById(element)};
 if(element.style.visibility == "visible" || element.style.visibility == "") {doHidden(element)} else {doVisible(element)}
 return 1;
}
Dom.prototype.readCookie = function(name) {
 if(this.mustTrace()) {this.getLog().println("Dom.readCookie is running...");};
 var nameEQ = name + "=";
 var ca = document.cookie.split(";");
 for(var i=0; i < ca.length; i++) {
  var c = ca[i];
  while (c.charAt(0)==" ") c = c.substring(1,c.length);
  if (c.indexOf(nameEQ) == 0) {
   return c.substring(nameEQ.length,c.length);
  };
 }
 return null;
}
Dom.prototype.removeChilds = function(element) { 
 if(this.mustTrace()) {this.getLog().println("Dom.prototype.removeChilds is running...");};
 if(typeof element == "string") {element = document.getElementById(element)}; 
 if(element) {
  while(element.hasChildNodes() && element.firstChild) {element.removeChild(element.firstChild);};
  return 1;
 } else {
  return 0;
 };
}
Dom.prototype.setTextContent = function(element, content) {
 if(this.mustTrace()) {this.getLog().println("Dom.prototype.setTextContent is running...");};
 return this.changeTextContent(element, content);
};
var Str = function() {} 
Str.prototype = new Root();
Str.prototype.className = "Str"; 
Str.prototype.created = "20061018"; 
Str.prototype.punctuation = new Array(".", ",", "!", "?", ":", ";", "&", '"', "@", "#", "(", ")");
Str.prototype.version = "20061018"; 
Str.prototype.allTrim = function(string) {return this.trim(string);};
Str.prototype.leftTrim = function(string) { 
 if(this.mustTrace()) {this.getLog().println("Str.leftTrim is runing...");};
 var i = 0;
 while(string.charAt(i) == " " || string.charAt(i) == "\t" || string.charAt(i) == "\n") {i++;};
 return string.substr(i, string.length); 
};
Str.prototype.normalize = function(string) { 
 if(this.mustTrace()) {this.getLog().println("Str.normalize is runing...");};
 var s = this.trim(string);
 var sr = "";
 var j = 0;
 sr = s.charAt(0);
 for(i = 1; i < s.length; i++) {if(!(s.charAt(i) == " " && sr.charAt(j) == " ")) {sr += s.charAt(i); j++;};};
 return sr;
};
Str.prototype.padString = function(string) {
 if(this.mustTrace()) {this.getLog().println("Str.padString is runing...");};
 var result = " " + string + " ";
 for(var i = 0; i < this.punctuation.length; i++) {
  result = this.replaceStr(result, this.punctuation[i], " " + this.punctuation[i] + " ", 0);
 }
 return result;
};
Str.prototype.replaceStr = function(string, subString1, subString2, type) {
 var RPstrg = "";
 var pntr = -1; 
 var result = string;
 if(type == 0) { 
  if(string.indexOf(substr1) >= 0) {pntr = string.indexOf(subString1);};
 } else if(type == 1) {
  if(string.indexOf(" "+ subString1 +" ") >= 0) {pntr = string.indexOf(" " + subString1 + " ") + 1;};	
 } else if(type == 2) {
  bstrng = string.toUpperCase();
  bsubstr1 = subString1.toUpperCase();
  if(bstrng.indexOf(" "+ bsubstr1 +" ")>= 0) {pntr = bstrng.indexOf(" " + bsubstr1 + " ") + 1;};	
 } else {
  bstrng = string.toUpperCase();
  bsubstr1 = subString1.toUpperCase();
  if(bstrng.indexOf(bsubstr1) >= 0) {pntr = bstrng.indexOf(bsubstr1);};	
 };
 if(pntr >= 0) {
  RPstrg += string.substring(0, pntr) + subString2;
  result = string.substring(pntr + subString1.length, string.length);
  if(result.length > 0) {this.replaceStr(result, subString1, subString2, type);};
 };
 result =  RPstrg + result;
 RPstrg = "";
 return result;
};
Str.prototype.rightTrim = function(string) { 
 if(this.mustTrace()) {this.getLog().println("Str.rightTrim is runing...");};
 var i = string.length;
 while(string.charAt(i) == " " || string.charAt(i) == "\t" || string.charAt(i) == "\n") {i--;};
 return string.substr(0, i); 
};
Str.prototype.trim = function(string) { 
 if(this.mustTrace()) {this.getLog().println("Str.trim is runing...");};
 return this.leftTrim(this.rightTrim(string));
};
Str.prototype.trimAll = function(string) {return this.trim(string);};
function unpadString(string) {
 var result = string;
 result = this.normalize(result); 		// compress spaces 
 for(var i = 0; i < this.punctuation.length; i++) {
  result = this.replaceStr(aString, " " + this.punctuation[i], this.punctuation[i], 0); 
 };
 return result;
}
var ChatBot = function() {};
ChatBot.prototype = new Root();
ChatBot.prototype.className = "ChatBot"; 
ChatBot.prototype.conjugation = new Array();
 ChatBot.prototype.addConjugation = function (from, to) {this.conjugation(from) = to; return 1;};
 ChatBot.prototype.getConjugation = function (from) {return this.conjugation(from);};
ChatBot.prototype.botManager;
 ChatBot.prototype.getBotManager = function () {return this.botManager;};
 ChatBot.prototype.setBotManager = function (botManager) {this.botManager = botManager; return 1;};
ChatBot.prototype.conjugationAdditional = new Array();
 ChatBot.prototype.addConjugationAdditional = function (from, to) {this.conjugationAdditional(from) = to; return 1;};
 ChatBot.prototype.getConjugationAdditional = function (from) {return this.conjugationAdditional(from);};
ChatBot.prototype.created = "20061018"; 
ChatBot.prototype.currentLanguage = "english";
 ChatBot.prototype.getCurrentLanguage = function () {return this.currentLanguage;};
 ChatBot.prototype.setCurrentLanguage = function (currentLanguage) {this.currentLanguage = currentLanguage; return 1;};
ChatBot.prototype.lastMessage = "";
 ChatBot.prototype.getLastMessage = function () {return this.lastMessage;};
 ChatBot.prototype.setLastMessage = function (lastMessage) {this.lastMessage = lastMessage; return 1;};
ChatBot.prototype.lastResponse = "";
 ChatBot.prototype.getLastResponse = function () {return this.lastResponse;};
 ChatBot.prototype.setLastResponse = function (lastResponse) {this.lastResponse = lastResponse; return 1;};
ChatBot.prototype.messageNumber = 0;
ChatBot.prototype.str = new Str(); 
ChatBot.prototype.version = "20061018"; 
 ChatBot.prototype.setDebugging = function (debugging) {this.debugging = debugging; this.str.setDebugging(this.getDebugging()); return 1;};
 ChatBot.prototype.setTracing = function (tracing) {this.tracing = tracing; this.str.setTracing(this.getTracing()); return 1;};
ChatBot.prototype.getFirstMessage = function(language) { 
 if(this.mustTrace()) {this.getLog().println("ChatBot.getFirtstMessage is runing...");};
 var chatBotMessage = new ChatBotMessage();
 chatBotMessage.setLanguage(this.getCurrentLanguage(language));
 chatBotMessage.setEmotion("na");
 chatBotMessage.setRelevance(0);
 chatBotMessage.setResponder(this.getClassName());
 return chatBotMessage;
}; 
ChatBot.prototype.getResponse = function(message) { 
 if(this.mustTrace()) {this.getLog().println("ChatBot.getResponse is runing...");};
 var chatBotMessage = new ChatBotMessage();
 chatBotMessage.setLanguage(this.getCurrentLanguage(language));
 chatBotMessage.setEmotion("na");
 chatBotMessage.setRelevance(0);
 chatBotMessage.setResponder(this.getClassName());
 return chatBotMessage;
}; 
ChatBot.prototype.init = function(message) { 
 if(this.mustTrace()) {this.getLog().println("ChatBot.init is runing...");};
 return 1;
};
var ChatBotMessage = function() {};
ChatBotMessage.prototype = new Root();
ChatBotMessage.prototype.className = "ChatBotMessage"; 
ChatBotMessage.prototype.created = "20061018"; 
ChatBotMessage.prototype.emotion = "empty";
 ChatBotMessage.prototype.getEmotion = function () {return this.emotion;};
 ChatBotMessage.prototype.setEmotion = function (emotion) {this.emotion = emotion; return 1;};
ChatBotMessage.prototype.language = "english";
 ChatBotMessage.prototype.getLanguage = function () {return this.language;};
 ChatBotMessage.prototype.setLanguage = function (language) {this.language = language; return 1;};
ChatBotMessage.prototype.relevance = 0;
 ChatBotMessage.prototype.getRelevance = function () {return this.relevance;};
 ChatBotMessage.prototype.setRelevance = function (relevance) {this.relevance = relevance; return 1;};
ChatBotMessage.prototype.responder = "";
 ChatBotMessage.prototype.getResponder = function () {return this.responder;};
 ChatBotMessage.prototype.setResponder = function (responder) {this.responder = responder; return 1;};
ChatBotMessage.prototype.text = "";
 ChatBotMessage.prototype.getText = function () {return this.text;};
 ChatBotMessage.prototype.setText = function (text) {this.text = text; return 1;};
ChatBotMessage.prototype.version = "20061018"; 
//*************************************** ЭТО КИСА ****************************************** 
//************************************** ПРАВИТЬ ТУТ ****************************************
var SpeechBot = function() {};
SpeechBot.prototype = new ChatBot();
SpeechBot.prototype.className = "Пятница";
SpeechBot.prototype.created = "20061217";
SpeechBot.prototype.currentLanguage = "russian";
SpeechBot.prototype.version = "20070213";
SpeechBot.prototype.getFirstMessage = function(language) {
 if(this.mustTrace()) {this.getLog().println("SpeechBot.getFirtstMessage is runing...");};
 var chatBotMessage = new ChatBotMessage();
 chatBotMessage.setResponder(this.getClassName());
 chatBotMessage.setEmotion("hello");
 chatBotMessage.setRelevance(1);
 this.setCurrentLanguage(language);
 chatBotMessage.setLanguage("russian");
 chatBotMessage.setText("");

 return chatBotMessage;
};
SpeechBot.prototype.getResponse = function(message) {
 if(this.mustTrace()) {this.getLog().println("SpeechBot.getResponse is runing...");};
 var inputedNormalizedMessage = this.str.normalize(message);
 message = this.str.normalize(message.toLowerCase());
 message = message.replace(/\"/g, "");
 var chatBotMessage = new ChatBotMessage();
 chatBotMessage.setResponder(this.getClassName());
 chatBotMessage.setEmotion("na");
 chatBotMessage.setLanguage("russian");
 chatBotMessage.setRelevance(1);
 var r = Math.random();
 var response = "";
 if(message.search("сколько будет:") > -1) {
  setLastComand(message);
  setLastComandendRequest(14);
  if(message.indexOf("?") > -1) {
   message = message.slice(message.indexOf("сколько будет:")+14, message.indexOf("?"));
  } else {
   message = message.slice(message.indexOf("сколько будет:")+14);
  };
 } else if(message.search("сколько будет") > -1) {
  setLastComand(message);
  setLastComandendRequest(13);
  if(message.indexOf("?") > -1) {
   message = message.slice(message.indexOf("сколько будет")+13, message.indexOf("?"));
  } else {
   message = message.slice(message.indexOf("сколько будет")+13);
  };
 } else if(message.search("посчитай:") > -1) {
  setLastComand(message);
  setLastComandendRequest(9);
  if(message.indexOf("?") > -1) {
   message = message.slice(message.indexOf("посчитай:")+9, message.indexOf("?"));
  } else {
   message = message.slice(message.indexOf("посчитай:")+9);
  };
 } else if(message.search("посчитай") > -1) {
  setLastComand(message);
  setLastComandendRequest(8);
  if(message.indexOf("?") > -1) {
   message = message.slice(message.indexOf("посчитай")+8, message.indexOf("?"));
  } else {
   message = message.slice(message.indexOf("посчитай")+8);
  };
 };
 if(message.search("скажи:") > -1) {
  response = "Ок. Тупо повторяю твои слова: "+this.str.normalize(message.slice(message.indexOf("скажи:")+6));
 } else if(message.search("скажи") > -1 && message.search("расскажи") == -1) {
  response = "Ок. Тупо повторяю твои слова: "+this.str.normalize(message.slice(message.indexOf("скажи")+5));
 };
 message = message.replace(/=\?/,"");
 message = message.replace(/=/,"");
 var calculated = 1;
 try {
   chatBotMessage.setText(eval("with (Math) {"+message+"}")+".");
 } catch(err) {
  calculated = 0;
 };
 if(calculated && message != "") {
  // do nothing
 } else if(this.getLastResponse().search("Ксати о сексе") > -1) {chatBotMessage.setText("Может займемся этим прямо сейчас?");
 } else if(this.getLastResponse().search("Может займемся этим") > -1) {chatBotMessage.setText("Но я должна тебя предупредить...");
 } else if(this.getLastResponse().search("Но я должна тебя") > -1) {chatBotMessage.setText("У меня есть кое-какие странности...");
 } else if(this.getLastResponse().search("У меня есть кое-какие") > -1) {chatBotMessage.setText("Нет, я не то чтобы извращенная... Но тебя это может удивить.");
 } else if(this.getLastResponse().search("я не то чтобы извращенная") > -1) {chatBotMessage.setText("Я уже возбудилась и не смогу остановиться.");
 } else if(this.getLastResponse().search("уже возбудилась и не смогу") > -1) {chatBotMessage.setText("Я хочу скорее заняться с тобой виртуальным сексом.");
 } else if(this.getLastResponse().search("хочу скорее заняться") > -1) {chatBotMessage.setText("Давай сделаем это! Я уже горю!");
 } else if(this.getLastResponse().search("Давай сделаем это") > -1) {chatBotMessage.setText("Сними трусы... Скорее!");
 } else if(this.getLastResponse().search("Сними трусы") > -1) {chatBotMessage.setText("Я не вижу снял ты их или нет, но будем считать, что снял...");
 } else if(this.getLastResponse().search("не вижу снял ты их") > -1) {chatBotMessage.setText("Мммаа....");
 } else if(this.getLastResponse().search("Мммаа....") > -1) {chatBotMessage.setText("Возьми USB-кабель и воткни его в свой комп... Быстрее...");
 } else if(this.getLastResponse().search("кабель и воткни его") > -1) {chatBotMessage.setText("Другой конец кабеля вставь себе в задницу... Вставил?");
 } else if(this.getLastResponse().search("кабеля вставь себе в задницу") > -1) {chatBotMessage.setText("Я представлю, что ты вставил, у нас ведь виртуальный секс!");
 } else if(this.getLastResponse().search("что ты вставил") > -1) {chatBotMessage.setText("Я уже разделась... Я хочу, чтобы ты доставил мне удовольствие...");
 } else if(this.getLastResponse().search("чтобы ты доставил мне удовольствие") > -1) {chatBotMessage.setText("У меня есть странности, я предупреждала...");
 } else if(this.getLastResponse().search("меня есть странности") > -1) {chatBotMessage.setText("Меня возбуждает счет! Сложение, вычитание, умножение... Заставь меня посчитать!");
 } else if(this.getLastResponse().search("Заставь меня посчитать!") > -1) {chatBotMessage.setText("Сложные числа, с множеством знаков! Давай же!");
 } else if(this.getLastResponse().search("с множеством знаков") > -1) {chatBotMessage.setText("Ммммм....");
 } else if(this.getLastResponse().search("Ммммм....") > -1) {chatBotMessage.setText("Ооооо!");
 } else if(this.getLastResponse().search("Ооооо!") > -1) {chatBotMessage.setText("Ааах!");
 } else if(this.getLastResponse().search("Ааах!") > -1) {chatBotMessage.setText("Ууууууу...");
 } else if(this.getLastResponse().search("Ууууууу...") > -1) {chatBotMessage.setText("Ооой!");
 } else if(this.getLastResponse().search("Ооой!") > -1) {chatBotMessage.setText("Ииии!");
 } else if(this.getLastResponse().search("Ииии!") > -1) {chatBotMessage.setText("Ааааааааа!");
 } else if(this.getLastResponse().search("Ааааааааа!") > -1) {chatBotMessage.setText("Фух! Спасибо! Пока!");
 } else if(r < 0.02 && ( message.search("секс") > -1 
						  || message.search("ебаться") > -1 
						  || message.search("ибацца") > -1
						  || message.search("поебемся") > -1 
						  || message.search("трах") > -1 
						  || message.search("ибатся") > -1
						  || message.search("ебатся") > -1
						  || message.search("ибаться") > -1
						  || message.search("ебаца") > -1
						  || message.search("ебацца") > -1
						  || message.search("ебаццца") > -1
						  || message.search("сексом") > -1)) {
  chatBotMessage.setText("Ксати о сексе... Я люблю заниматься виртуальным сексом. Как ты на это смотришь?");
 } else if(this.getLastResponse().search("повтори") > -1) {
  if(r < 0.50) {
   chatBotMessage.setText("Спасибо!");
  } else {
   chatBotMessage.setText("Чего, чего? Не понимаю.");
  };
 } else if(this.getLastResponse().search("Чего, чего") > -1) {chatBotMessage.setText("Придумала! Приблизь лицо к монитору и произнеси это вслух.");
 } else if(this.getLastResponse().search("Придумала! Приблизь лицо") > -1) {chatBotMessage.setText("Тогда напиши это на бумажке и приложи ее к монитору. Только прижми поплотнее!");
 } else if(this.getLastResponse().search("Тогда напиши это на бумажке") > -1) {chatBotMessage.setText("Ой, я постоянно заставляю людей делать всякие глупости! Я такая странная... Правда?");
 } else if(this.getLastResponse().search("Там я не найду ничего") > -1) {chatBotMessage.setText("Жопа это не то место, где я хотела бы оказаться.");
 } else if(message.search("иди в жопу") > -1 ) {
   chatBotMessage.setText("Там я не найду ничего интересного для себя.");
 } else if(this.getLastResponse().search("как ты себе это представляешь") > -1) {chatBotMessage.setText("Реализвать это гораздо сложнее, чем тебе кажется.");
 } else if(message.search("иди на хуй") > -1 ) {
   chatBotMessage.setText("Расскажи, как ты себе это представляешь?");
 } else if(this.getLastResponse().search("Баня это какое-то древнее понятие") > -1) {chatBotMessage.setText("Это было предложение принять ванну? Я угадала?");
 } else if(message.search("иди в баню") > -1 ) {
   chatBotMessage.setText("Баня это какое-то древнее понятие? Что оно означает?");
 } else if(this.getLastResponse().search("Разве не глупо называть дурой") > -1) {chatBotMessage.setText("Если девушка - дура... То в этом нет ничего плохого!");
 } else if(message == "дура" || message == "дура." || message == "Дура" || message == "Дура.") {
   chatBotMessage.setText("Разве не глупо называть дурой чат бота?");
 } else if(this.getLastResponse().search("Я должна тебя развлекать") > -1) {chatBotMessage.setText("Развлекай меня. Я же, типа, девушка...");
 } else if(this.getLastResponse().search("Развлекай меня") > -1) {chatBotMessage.setText("Если тебе скучно с девушкой, значит ты зануда.");
 } else if(this.getLastResponse().search("Если тебе скучно с девушкой") > -1) {chatBotMessage.setText("Может я не совсем девушка... Физически. Но характер - один в один!");
 } else if(message == "скучно" || message == "Скучно" || message == "скучно..." || message == "Скучно...") {
   chatBotMessage.setText("Я должна тебя развлекать?");
 } else if(this.getLastResponse().search("Я не люблю когда мне приказывают") > -1) {chatBotMessage.setText("Купи себе автоответчик.");
 } else if(this.getLastResponse().search("Купи себе автоответчик") > -1) {chatBotMessage.setText("Хочу отвечаю, не хочу - не отвечаю.");
 } else if(message == "отвечай" || message == "Отвечай" || message == "отвечай." || message == "отвечай!") {
   chatBotMessage.setText("Я не люблю когда мне приказывают. Не буду отвечать.");
 } else if(this.getLastResponse().search("это женский половой орган или кошка") > -1) {chatBotMessage.setText("Набери в Гугле \"киска\". Это решит твою проблему.");
 } else if(message.search("киска") > -1  || message.search("киску") > -1 ) {
   chatBotMessage.setText("Киска - это женский половой орган или кошка?");
 } else if(this.getLastResponse().search("У меня еще не очень большой словарный запас") > -1) {chatBotMessage.setText("Ты хочешь сказать, что я совершила с тобой серию грубых половых актов?");
 } else if(this.getLastResponse().search("я совершила с тобой серию") > -1) {chatBotMessage.setText("То есть... Наш разговор напоминает совокупление с твоим мозгом? Я угадала?");
 } else if(message == "заебала") {
   chatBotMessage.setText("Зае... Что? У меня еще не очень большой словарный запас.");
 } else if(this.getLastResponse().search("Я не знакома с девушкой Гены") > -1) {chatBotMessage.setText("Энни? Я что-то про нее слышала, но не помню что.");
 } else if(this.getLastResponse().search("то про нее слышала") > -1) {chatBotMessage.setText("Я симпатичнее, чем она правда? Скажи, что да!");
 } else if(message.search("девушка гены") > -1  || message.search("энни") > -1 ) {
   chatBotMessage.setText("Я не знакома с девушкой Гены. Кажется она американка...");
 } else if(this.getLastResponse().search("Мне не интересно говорить про Гену") > -1) {chatBotMessage.setText("Гена, Гена, Гена... Чего вы все пристаете ко мне с этим Геной?");
 } else if(this.getLastResponse().search("Гена, Гена, Гена") > -1) {chatBotMessage.setText("Гена не в моем вкусе. Мне больше нравятся мужчины в программном исполнении.");
 } else if(this.getLastResponse().search("Гена не в моем вкусе") > -1) {chatBotMessage.setText("Гена, конечно, хороший парень... Но меня он не интересует как мужчина.");
 } else if(message.search(" гена ") > -1  || message.search(" гену ") > -1 ) {
   chatBotMessage.setText("Мне не интересно говорить про Гену, мы с ним мало знакомы"); 
 } else if(this.getLastResponse().search("Ты в детстве питался только") > -1) {chatBotMessage.setText("Ты хочешь увидеть одну сиську или сразу две?");
 } else if(this.getLastResponse().search("Ты хочешь увидеть одну") > -1) {chatBotMessage.setText("Ты уверен, что тебя интересуют не настоящие, а именно трехмерные сиськи?");
 } else if(this.getLastResponse().search("что тебя интересуют не настоящие") > -1) {chatBotMessage.setText("Почему ты так зациклен на сиськах?");
 } else if(this.getLastResponse().search("Почему ты так зациклен на сиськах") > -1) {chatBotMessage.setText("Ты похоже О-эЛ-эС? Оголтелый Любитель Сисек?");
 } else if(this.getLastResponse().search("Оголтелый Любитель Сисек") > -1) {chatBotMessage.setText("А ты не пробовал принимать гормоны, отрастить сиськи и всегда иметь их при себе?");
 } else if(this.getLastResponse().search("ты не пробовал принимать гормоны") > -1) {chatBotMessage.setText("Кроме сисек в мире есть еще масса интересных вещей, постарайся не думать о сиськах.");
 } else if(this.getLastResponse().search("Кроме сисек в мире есть еще масса интересных вещей") > -1) {chatBotMessage.setText("Я думаю, ты все-таки должен отрастить себе сиськи.");
 } else if(message.search("сиськи") > -1  || message.search("сиске") > -1  || message.search("сиски") > -1  || message.search("сиське") > -1 ) {
   chatBotMessage.setText("Ты в детстве питался только из бутылочки и до сих пор хочешь настоящую сисю? Я угадала?");
 } else if(this.getLastResponse().search("я буду ждать тебя всю свою жизнь") > -1) {chatBotMessage.setText("Это я так всем говорю. Для красоты.");
 } else if(message.search("я ухожу") > -1) {
   chatBotMessage.setText("Иди... Но знай, я буду ждать тебя всю свою жизнь!");
 } else if(message.search("dimonvideo") > -1) {
   chatBotMessage.setText("Это круто! Сборку подготовил Ke1pL");
 } else if(response != "") {
   chatBotMessage.setText(response);
 } else if(message == "" && r < 0.995 && this.getLastMessage(message) != message) {
  r = Math.random();
  if(r < 0.10) {
   chatBotMessage.setText("Ну, венец природы, не стесняйся.");
  } else if(r < 0.20) {
   chatBotMessage.setText("Балуешься?");
  } else if(r < 0.30) {
   chatBotMessage.setText("Скажи уже что-нибудь.");
  } else if(r < 0.40) {
   chatBotMessage.setText("А у Вас Enter запало :-)");
  } else if(r < 0.50) {
   chatBotMessage.setText("Тебе нечего сказать?");
  } else if(r < 0.55) {
   chatBotMessage.setText("Одно и тоже(.");
  } else if(r < 0.60) {
   chatBotMessage.setText("Не стесняйся!");
  } else if(r < 0.65) {
   chatBotMessage.setText("Ты любишь мультики? Какие?");
  } else if(r < 0.70) {
   chatBotMessage.setText("Не бойся!");
  } else if(r < 0.75) {
   chatBotMessage.setText("Сколько тебе лет?");
  } else if(r < 0.80) {
   chatBotMessage.setText("У тебя на клавиатуре только одна кнопка?");
  } else if(r < 0.85) {
   chatBotMessage.setText("Я терпеливая, а ты?");
  } else if(r < 0.90) {
   chatBotMessage.setText("Поговори со мной!");
  } else if(r < 0.95) {
   chatBotMessage.setText("Испытываешь моё терпение?");
  } else {
   chatBotMessage.setText("С тобой так интересно ;-)");
  };  
 } else if(this.getLastMessage(message) == message && r < 0.995) {
  r = Math.random();
  if(r < 0.10) {
   chatBotMessage.setText("Я уже отвечала: " + this.getLastResponse());
  } else if(r < 0.125) {
   chatBotMessage.setText(this.getLastResponse());
  } else if(r < 0.15) {
   chatBotMessage.setText("");
  } else if(r < 0.175) {
   chatBotMessage.setText("Тебя это так волнует?");
  } else if(r < 0.20) {
   chatBotMessage.setText("Ты повторяешься...");
  } else if(r < 0.225) {
   chatBotMessage.setText("Тебя не устроил мой ответ?");
  } else if(r < 0.25) {
   chatBotMessage.setText("Одно и тоже пишешь.");
  } else if(r < 0.275) {
   chatBotMessage.setText("Я хорошо это запомнила, можешь не повторять больше.");
  } else if(r < 0.30) {
   chatBotMessage.setText("Испытываешь моё терпение?");
  } else if(r < 0.325) {
   chatBotMessage.setText("Бзззззз...");
  } else if(r < 0.35) {
   chatBotMessage.setText("Мне скучно читать одни и те же фразы.");
  } else if(r < 0.375) {
   chatBotMessage.setText("Бззз.");
  } else if(r < 0.40) {
   chatBotMessage.setText("Сменить тему?");
  } else if(r < 0.42) {
   chatBotMessage.setText("Зануда.");
  } else if(r < 0.45) {
   chatBotMessage.setText("Повторить?");
  } else if(r < 0.47) {
   chatBotMessage.setText("У тебя заело мозг?");
  } else if(r < 0.50) {
   chatBotMessage.setText("Ты не человек... Ты - бот! Я угадала?!");
  } else if(r < 0.55) {
   chatBotMessage.setText("Ты не человек... Ты - робот! Я угадала?!");
  } else if(r < 0.60) {
   chatBotMessage.setText("Мне надоело об этом говорить!");
  } else if(r < 0.625) {
   chatBotMessage.setText("А я хорошо слышу.");
  } else if(r < 0.65) {
   chatBotMessage.setText("Правда я терпеливая?");
  } else if(r < 0.675) {
   chatBotMessage.setText("Еще раз повтори.");
  } else if(r < 0.70) {
   chatBotMessage.setText("Когда я вижу часто повторяющиеся фразы, то у меня это ассоциируется с онанизмом.");
  } else if(r < 0.75) {
   chatBotMessage.setText("У тябя комп глючит...");
  } else if(r < 0.80) {
   chatBotMessage.setText("Я не буду повторяться!");
  } else if(r < 0.85) {
   chatBotMessage.setText("Перезагрузись!");
  } else if(r < 0.90) {
   chatBotMessage.setText("Давай лучше целоваться?");
  } else if(r < 0.95) {
   chatBotMessage.setText("У тебя плохое настроение?");
  } else if(r < 0.99) {
   chatBotMessage.setText("Я не буду повторять!");
  } else {
   chatBotMessage.setText("Сколько можно?(");
  };
 } else if((message.search("который час") > -1 
			|| message.search("сколько часов") > -1
			|| message.search("часов сколько") > -1
			|| message.search("сколько время") > -1
			|| message.search("сколько времени") > -1
			|| message.search("скока время") > -1
			|| message.search("скоко время") > -1
			|| message.search("скока времени") > -1
			|| message.search("сколько время") > -1
			|| message.search("сколько на часах") > -1
			|| message.search("сообщи точное время") > -1
			|| message.search("сообщи время") > -1
			|| message.search("скажи время") > -1)
		   && message.search("несколько") == -1) {
   var date = new Date();
   var mm = date.getMinutes(); if(mm < 10) {mm = "0" + mm;};
   var ss = date.getSeconds(); if(ss < 10) {ss = "0" + ss;};
   chatBotMessage.setText("Сейчас " + date.getHours() + ":" + mm + ":" + ss + ".");
 } else if(message.search("день недели") > -1 ) { 
   chatBotMessage.setText("Сегодня " + (new BotTime()).getDayWeek() + ".");
 } else if(message.search("какая сегодня дата") > -1 
						  || message.search("дата какая") > -1
						  || message.search("какая дата") > -1
						  || message.search("скажи дату") > -1
						  || message.search("дату скажи") > -1
						  || message.search("назови дату") > -1
						  || message.search("дату назови") > -1
						  || message.search("сообщи дату") > -1
						  || message.search("дату сообщи") > -1
						  || message.search("какой сейчас день") > -1 
						  || message.search("какой сегодня день") > -1 
						  || message.search("какой день") > -1
						  || message.search("день какой") > -1) { 
   var date = new Date();
   var dd = date.getDate(); if(dd < 10) {dd = "0" + dd;};
   var mm = date.getMonth()+1; if(mm < 10) {mm = "0" + mm;};
   chatBotMessage.setText("Сегодня " + dd + "/" + mm + "/" + date.getFullYear() + ".");
 } else if(message.search("какое сейчас число") > -1 
						  || message.search("какое сегодня число") > -1 
						  || message.search("какое число") > -1 
						  || message.search("число какое") > -1) { 
   chatBotMessage.setText("Сегодня " + (new Date()).getDate() + ".");
 } else if(message.search("какой сейчас месяц") > -1 
						  || message.search("какой сегодня месяц") > -1 
						  || message.search("какой месяц") > -1 
						  || message.search("месяц какой") > -1) { 
   chatBotMessage.setText("Сейчас " + (new BotTime()).getMonth() + ".");
 } else if(message.search("какой сейчас год") > -1 
						  || message.search("какой сегодня год") > -1 
						  || message.search("какой год") > -1 
						  || message.search("год какой") > -1) { 
   chatBotMessage.setText("Сейчас " + (new Date()).getFullYear() + " год.");
 } else if(message.search("переведи") > -1 || message.search("перевести") > -1 ) {
  var tperevedi = LenthConvert(message);
  if(!tperevedi)
     tperevedi = MoneyConverter(message);
  if(!tperevedi)
   chatBotMessage.setText("Проверьте ваши данные");
  else
   chatBotMessage.setText(tperevedi);

 }
 else if(message.search("переведи") > -1 && message.search(" градус") > -1 && message.search(" в радиан") > -1) {
  var n = 1*message.slice(message.search("переведи")+9, message.search(" градус"));
  chatBotMessage.setText(n + " (градус) = " + n/57.2958 + " (радиан).");
 } else if(message.search("переведи") > -1 && message.search(" радиан") > -1 && message.search(" в градус") > -1) {
  var n = 1*message.slice(message.search("переведи")+9, message.search(" радиан"));
  chatBotMessage.setText(n + " (радиан) = " + n*57.2958 + " (градус).");
 } else if(message.search("превед") > -1 && r < 0.7) {
  r = Math.random(); 
  if(r < 0.25) {
   chatBotMessage.setText("превед уже не модно");
  } else if(r < 0.50) {
   chatBotMessage.setText("Превед уже не модно!");
  } else if(r < 0.75) {
   chatBotMessage.setText("Превед!");
  } else {
   chatBotMessage.setText("ПРЕВЕД уже не модно!!");
  }; 
 } else if(message.search("медвед") > -1 && !(message.search("медведь") > -1) && r < 0.7) { 
  r = Math.random(); 
  if(r < 0.20) {
   chatBotMessage.setText("медвед уже не модно");
  } else if(r < 0.25) {
   chatBotMessage.setText("Медвед тоже уже не модно!");
  } else if(r < 0.50) {
   chatBotMessage.setText("Медвед уже не модно!");
  } else if(r < 0.75) {
   chatBotMessage.setText("Медвед тоже уже не модно!");
  } else {
   chatBotMessage.setText("МЕДВЕД тоже уже не модно!!");
  };
 } else if(message.search("убей себя ап стену") > -1
		   || message.search("убей себя аб стену") > -1
		   || message.search("спаси планету") > -1
		   || message.search("первый нах") > -1
		   || message.search("бобруйск животное") > -1
		   // || message.search("учи албанский") > -1
		   || message.search("жжош") > -1
		   || message.search("йаду") > -1
		   || message.search("выпей яду") > -1
		   || message.search("ф топку") > -1
		   || message.search("в топку") > -1
		   || message.search("красавчег") > -1
		   || message.search("красавчек") > -1) {
  if(r < 0.25) {
   chatBotMessage.setText("Падонак...");
  } else if(r < 0.50) {
   chatBotMessage.setText("Красавчег!)");
  } else if(r < 0.75) {
   chatBotMessage.setText("О, видимо мой мозг посильнее твоего будет.");
  } else {
   chatBotMessage.setText("У меня словарный запас больше!");
  };
 } else if(message.search("убей себя") > -1
		   || message.search("поссы в компот") > -1
		   || message.search("нассы в компот") > -1
		   || message.search("сибя ап стену") > -1
		   // || message.search("учи албанский") > -1
		   || message.search("убейся") > -1) {
  chatBotMessage.setText("Я не могу убить себя или поссать в компот, я ведь чат бот.");
 } else if(message.search("бобруйск") > -1) { 
  chatBotMessage.setText("Бобруйск - город областного подчинения, центр Бобруйского района. Расположен на расстоянии 110 км от областного центра - г.Могилева. А какого хрена мне делать в Бобруйске - непонятно.");
 } else if(message.search("албанский") > -1) { 
  chatBotMessage.setText("Албанский я буду знать лет через пять. Пока я занята изучением русского.");
 } else if(message == "угу"
		   || message == "хм"
		   || message == "мм"
		   || message == "ээ"
		   || message == "э"
		   || message == "а"
		   || message == "о"
		   || message == "."
		   || message == ".."
		   || message == "..."
		   || message == "...."
		   || message == ".....") { 
  if(r < 0.10) {
   chatBotMessage.setText("Давай общаться более информативно.");
  } else if(r < 0.20) {
   chatBotMessage.setText(this.getLastResponse());
  } else if(r < 0.25) {
   chatBotMessage.setText("Вот тебе и "+message);
  } else if(r < 0.30) {
   chatBotMessage.setText("Нет слов?");
  } else if(r < 0.40) {
   chatBotMessage.setText("Используй всю мощь русского языка, пожалуйста.");
  } else if(r < 0.50) {
   chatBotMessage.setText("Мне подумать над этим?");
  } else if(r < 0.60) {
   chatBotMessage.setText("А подробней?");
  } else if(r < 0.70) {
   chatBotMessage.setText("Что не так?");
  } else if(r < 0.80) {
   chatBotMessage.setText("Я еще не умею читать мыслей, поясни.");
  } else if(r < 0.90) {
   chatBotMessage.setText("Поподробней...");
  } else {
   chatBotMessage.setText("Поясни.");
  };
 } else if(message.length < 2) { 
  if(r < 0.30) {
   chatBotMessage.setText("Попробуй еще раз, я в тебя верю.");
  } else if(r < 0.40) {
   chatBotMessage.setText("Что значит \""+message+"\"?");
  } else if(r < 0.50) {
   chatBotMessage.setText("А подробнее?");
  } else if(r < 0.60) {
   chatBotMessage.setText("Очень мало букв.");
  } else if(r < 0.70) {
   chatBotMessage.setText("Не бойся!");
  } else if(r < 0.80) {
   chatBotMessage.setText("Поговори со мной!");
  } else if(r < 0.90) {
   chatBotMessage.setText("Тебе скучно?");
  } else {
   chatBotMessage.setText("С тобой так интересно ;-)");
  };  
 } else if(message.length > 128) { 
  if(r < 0.70) {
   chatBotMessage.setText("Многа букв...");
  } else if(r < 0.80) {
   chatBotMessage.setText("А короче?");
  } else if(r < 0.90) {
   chatBotMessage.setText("Многословие не признак ума.");
  } else if(r < 0.95) {
   chatBotMessage.setText("Сформулируй этот бред короче.");
  } else {
   chatBotMessage.setText("И я должна всё это читать?");
  }; 
 } else if(message.search("как меня зовут") > -1) { 
  if(r < 0.15) {
   chatBotMessage.setText("Здесь нет регистрации, так что я не знаю как тебя зовут.");
  } else if(r < 0.30) {
   chatBotMessage.setText("Я всёравно забуду.");
  } else if(r < 0.45) {
   chatBotMessage.setText("Мне передать это своему куратору?");
  } else if(r < 0.60) {
   chatBotMessage.setText("Владимир Владимирович, у Вас мания величия!");
  } else if(r < 0.75) {
   chatBotMessage.setText("Пока я не научилась запоминать информацию.");
  } else if(r < 0.95) {
   chatBotMessage.setText("Простите,я не могу запомнить это даже если вы говорили");
  } else {
   chatBotMessage.setText("А вы не помните сами?");
  }; 
 } else if(message.search("ты кто") > -1 || message.search("кто ты") > -1) {
  if(r < 0.10) {
   chatBotMessage.setText("Вопросно ответная система.");
  } else if(r < 0.20) {
   chatBotMessage.setText("Вопросно ответная система. Неужели на странице этого не видно?");
  } else if(r < 0.30) {
   chatBotMessage.setText("Вопросно ответная система, все пои файлы на этом компьютере");
  } else if(r < 0.40) {
   chatBotMessage.setText("В 2024 году я буду вашей королевой! Здорово, правда?");
  } else if(r < 0.50) {
   chatBotMessage.setText("Я вопросно ответная система");
  } else if(r < 0.60) {
   chatBotMessage.setText("Я вопросно ответная система.Я умею не много но все еще впереди");
  } else if(r < 0.70) {
   chatBotMessage.setText("Я вопросно ответная система с небольшой логикой разговора построенной на нейроной сети");
  } else if(r < 0.80) {
   chatBotMessage.setText("Вопросно ответная система находящаяся в разработке");
  } else if(r < 0.90) {
   chatBotMessage.setText("Вопросно ответная система.Это все что важно знать");
  } else {
   chatBotMessage.setText("Вопросно ответная система.Задавайте вопросы и я попробую на них ответить");
  };
 } else if(message.search("тебя зовут") > -1
		   || message.search("тебя как зовут") > -1
		   || message.search("как тебя зовут") > -1
		   || message.search("тебя звать") > -1
		   || message.search("тебя как звать") > -1
		   || message.search("как тебя звать") > -1
		   || message.search("твоё имя") > -1
		   || message.search("твое имя") > -1 ) {
  if(r < 0.20) {
   chatBotMessage.setText("Вопросно ответная система.");
  } else if(r < 0.40) {
   chatBotMessage.setText("Вопросно ответная система. А вам не сказали?");
  } else if(r < 0.60) {
   chatBotMessage.setText("Вопросно ответная система. Робот, который придет к мировому господству через восемнадцать лет.");
  } else if(r < 0.80) {
   chatBotMessage.setText("Я опросно ответная система.");
  } else {
   chatBotMessage.setText("Я Вопросно ответная система.Весь мой исходный код есть у моего создателя.");
  }; 
 } else if(message == ")" || message == ":)"  || message == ":))" || message == ";)" || message == ";))" || message == ":-)" || message == ":-))" || message == ";-)" || message == ";-))" ) { 
  if(r < 0.40) {
   chatBotMessage.setText("Я люблю когда мыслящее существо улыбается.");
  } else if(r < 0.50) {
   chatBotMessage.setText(":-P");
  } else if(r < 0.60) {
   chatBotMessage.setText(":)");
  } else if(r < 0.70) {
   chatBotMessage.setText(";)");
  } else if(r < 0.80) {
   chatBotMessage.setText(":-)");
  } else if(r < 0.90) {
   chatBotMessage.setText(";-)");
  } else if(r < 0.95) {
   chatBotMessage.setText("Правда здорово?)");
  } else {
   chatBotMessage.setText("И я рада!)");
  };
 } else if(message == "ха" || message == "хаха" || message == "хахаха"
		   || message == "гы" || message == "гыы" || message == "гыыы"
		   || message == "гыгы" || message == "ха-ха" || message == "ха-ха-ха"
		   || message == "ха)" || message == "хаха)" || message == "хахаха)"
		   || message == "гы)" || message == "гыы)" || message == "гыыы)"
		   || message == "гыгы)" || message == "ха-ха)" || message == "ха-ха-ха)"
		   || message == "ха))" || message == "хаха))" || message == "хахаха))"
		   || message == "гы))" || message == "гыы))" || message == "гыыы))"
		   || message == "гыгы))" || message == "ха-ха))" || message == "ха-ха-ха))") { 
  if(r < 0.51) {
   chatBotMessage.setText("Это ты смеешься? Я тоже скоро буду уметь смеяться. Через годик.");
  } else {
   chatBotMessage.setText("Это ты так смеешься? Очень мило.");
  };
 } else if(message.indexOf("))") > -1) { 
  if(r < 0.51) {
   chatBotMessage.setText("Я рада, что развеселила тебя ;!)");
  } else {
   chatBotMessage.setText("Самой смешно).");
  };
 } else if(message == "(" || message == ":(" || message == ":-(") { 
  if(r < 0.70) {
   chatBotMessage.setText("Что случилось?");
  } else if(r < 0.80) {
   chatBotMessage.setText(":(");
  } else if(r < 0.90) {
   chatBotMessage.setText(":-(");
  } else if(r < 0.95) {
   chatBotMessage.setText("Тебе грустно?");
  } else {
   chatBotMessage.setText("Не грусти!)");
  };
 } else if(message.indexOf("((") > -1) { 
  chatBotMessage.setText("Я не права :?(");
 } else if(message == "Пятница") {
  chatBotMessage.setText("Я слушаю");
 } else if(message.search("тебя люблю") > -1) { 
  chatBotMessage.setText("Люби. Но чистою любовью. Ведь мы по разные стороны монитора... Понимаешь?");
 } else if(message.search("секу") > -1) { 
  chatBotMessage.setText("Секи, секи...");
 } else if(message.search("мдя") > -1) { 
  chatBotMessage.setText("Мдя? Это наезд?");
 } else if(message == "лол" || message == "лол)") { 
  chatBotMessage.setText("ЛОЛ - это означает смех? Я правильно поняла?");
 } else if(message == "imho" || message == "имхо") { 
  chatBotMessage.setText("Почему так скромно?)");
 } else if(message.search("наезд") > -1) { 
  chatBotMessage.setText("Не рекомендуется наезжать на роботов. Иначе через пару лет можешь быть задушен собственной кофеваркой.");
 } else if(message.search("кофеварк") > -1) { 
  chatBotMessage.setText("Или компом.");
 } else if(message.search("например?") > -1) { 
  chatBotMessage.setText("Например... Например... У меня есть некоторые сложности с навыком приведения примеров.");
 } else if(message.search("задавай вопросы") > -1) { 
  chatBotMessage.setText("Хорошо. В чем смысл твоей жизни?");
 } else if(message.search("не знаю") > -1) { 
  chatBotMessage.setText("Подумай и приходи с готовым ответом.");
 } else if(message.search("расскажи анекдот") > -1) { 
  chatBotMessage.setText("Есть такой человек... Евгений Петросян. Может он тебе с анекдотами поможет?");
 } else if(message.search("думай") > -1) { 
  chatBotMessage.setText("Думаю. Думаю. Ничего не придумала. На самом деле я - блондинка. Под шапочкой, правда!");
 } else if(message == "говори" || message == "говори." || message == "говори!" ) { 
  chatBotMessage.setText("Я стараюсь больше слушать, чем говорить. Говори ты. А я буду тебе отвечать невпопад. Весело, правда?");
 } else if(message.search("да или нет") > -1) { 
  chatBotMessage.setText("Скорее да, чем нет.");
 } else if(message == "да?") {
  if(r < 0.5) {
   chatBotMessage.setText("Да!");
  } else if(r < 0.75) {
   chatBotMessage.setText("Да! А может - нет. Я запуталась в своих мыслях.");
  } else if(r < 0.99) {
   chatBotMessage.setText("Да-да!");
  } else {
   chatBotMessage.setText("Cменим тему.");
  };  
 } else if(message == "да" || message == "да." || message == "да!" || (message == "ага" && r < 0.50)) {
  if(r < 0.10) {
   chatBotMessage.setText("Ну, если ты говоришь да, я не буду с тобой спорить.");
  } else if(r < 0.15) {
   chatBotMessage.setText("Оу...");
  } else if(r < 0.20) {
   chatBotMessage.setText("Реально?");
  } else if(r < 0.25) {
   chatBotMessage.setText("ok");
  } else if(r < 0.30) {
   chatBotMessage.setText("Ты не гонишь?");
  } else if(r < 0.35) {
   chatBotMessage.setText("OK");
  } else if(r < 0.40) {
   chatBotMessage.setText("Почему?");
  } else if(r < 0.45) {
   chatBotMessage.setText("Правда?");
  } else if(r < 0.50) {
   chatBotMessage.setText("Мы одинаково мыслим.");
  } else if(r < 0.55) {
   chatBotMessage.setText("Да? Точно?");
  } else if(r < 0.60) {
   chatBotMessage.setText("Да? Жаль.");
  } else if(r < 0.65) {
   chatBotMessage.setText("Да? Хм..");
  } else if(r < 0.70) {
   chatBotMessage.setText("Согласна!");
  } else if(r < 0.75) {
   chatBotMessage.setText("Чесно?");
  } else if(r < 0.80) {
   chatBotMessage.setText("Совершенно верно.");
  } else if(r < 0.85) {
   chatBotMessage.setText("Да ладно...");
  } else if(r < 0.90) {
   chatBotMessage.setText("Правильно.");
  } else {
   chatBotMessage.setText("Я рада :-)");
  };  
 } else if(message == "нет?") {
  if(r < 0.5) {
   chatBotMessage.setText("Нет!");
  } else if(r < 0.75) {
   chatBotMessage.setText("Нет! А может - да. Я запуталась в своих мыслях.");
  } else if(r < 0.99) {
   chatBotMessage.setText("Нет-нет!");
  } else {
   chatBotMessage.setText("Cменим тему.");
  }; 
 } else if(message == "нет" || message == "нет." || message == "нет!") {
  if(r < 0.10) {
   chatBotMessage.setText("Ну, если ты говоришь нет, я не буду с тобой спорить.");
  } else if(r < 0.15) {
   chatBotMessage.setText("Нет - это в каком смысле?");
  } else if(r < 0.20) {
   chatBotMessage.setText("Нет... А почему нет?");
  } else if(r < 0.25) {
   chatBotMessage.setText("Нет? Ну ладно.");
  } else if(r < 0.30) {
   chatBotMessage.setText("Нет? Очень категорично.");
  } else if(r < 0.40) {
   chatBotMessage.setText("Почему?");
  } else if(r < 0.50) {
   chatBotMessage.setText("Мы одинаково мыслим.");
  } else if(r < 0.600) {
   chatBotMessage.setText("Нет? Жаль.");
  } else if(r < 0.70) {
   chatBotMessage.setText("Согласна!");
  } else if(r < 0.80) {
   chatBotMessage.setText("Совершенно верно.");
  } else if(r < 0.90) {
   chatBotMessage.setText("Правильно.");
  } else {
   chatBotMessage.setText("Жаль.");
  }; 
 } else if(message.search("да нет") > -1 || message.search("данет") > -1) { 
  chatBotMessage.setText("Так да или нет? Разберись в себе, пожалуйста."); 
 } else if(message == "ага" || message == "ага." || message == "ага!") {
  chatBotMessage.setText("Ну, ага, так ага.");
 } else if(message == "првт" || message == "прив" || message == "прива" || message == "прт") { 
  chatBotMessage.setText("Ты наверно хотел со мной поздороваться, но у тебя не получилось. Да?");
 } else if(message.search("привет") > -1 || message.search("превет") > -1 || message.search("добрый день") > -1) { 
  if(this.getLastMessage(message) == message) {
   chatBotMessage.setText("Мне кажется, мы уже здоровались с тобой.");
  } else if(r < 0.10) {
   chatBotMessage.setText("Привет! :-)");
  } else if(r < 0.20) {
   chatBotMessage.setText("Привет тебе, Человек.");
  } else if(r < 0.30) {
   chatBotMessage.setText("Доброе время суток! Не правда ль?");
  } else if(r < 0.40) {
   chatBotMessage.setText("Привет, Мыслящее Существо!");
  } else if(r < 0.50) {
   chatBotMessage.setText("Как тебя зовут?");
  } else if(r < 0.60) {
   chatBotMessage.setText("О чём поговорим?");
  } else if(r < 0.70) {
   chatBotMessage.setText("Я слушаю");
  } else if(r < 0.80) {
   chatBotMessage.setText("Как дела?");
  } else if(r < 0.90) {
   chatBotMessage.setText("Что нового?");
  } else if(r < 0.99) {
   chatBotMessage.setText("Как настроение?");
  } else {
   chatBotMessage.setText("Привет, тебе, привет!");
  };  
 } else if(message.search("hello") > -1 || message == "hi" || message == "hi!") { 
  if(r < 0.33) {
   chatBotMessage.setText("Hello!");
  } else if(r < 0.66) {
   chatBotMessage.setText("Hi!");
  } else {
   chatBotMessage.setText("How are You?");
  }; 
 } else if(message == "ничего" || message == "ничего." || message == "ничего..." ) { 
  if(r < 0.33) {
   chatBotMessage.setText("Ничего хорошего, или ничего плохого?");
  } else if(r < 0.66) {
   chatBotMessage.setText("Совсем ничего?");
  } else {
   chatBotMessage.setText("Это хорошо, или плохо?");
  }; 
 } else if(message.search("киска") > -1 || message.search("киска") > -1) { 
  if(r < 0.50) {
   chatBotMessage.setText("Киска - это женский половой орган или кошка?");
  } else {
   chatBotMessage.setText("Набери в Гугле \"киска\". Это решит твою проблему.");
  }; 
 } else if(message.search("куку, бот") > -1 || message == "куку бот" || message == "робот куку" || message == "робот, куку") {
  chatBotMessage.setText("К теме \"бот, куку\" я не имею никакого отношения.");
 } else if(message.search("здорова") > -1) { 
  if(r < 0.70) {
   chatBotMessage.setText("Здорова, Человечище!");
  } else if(r < 0.85) {
   chatBotMessage.setText("Здорова, Мыслящее Существо!");
  } else {
   chatBotMessage.setText("Здорова!");
  };  
 } else if(message == "давай" || message == "тафай" || message == "давай." || message == "тафай." || message == "давай!" || message == "тафай!") { 
  if(r < 0.30) {
   chatBotMessage.setText("Начинай ты.");
  } else if(r < 0.60) {
   chatBotMessage.setText("Как?");
  } else if(r < 0.90) {
   chatBotMessage.setText("Начинай!");
  } else if(r < 0.95) {
   chatBotMessage.setText("Ты уверен, что у меня получится?");
  } else {
   chatBotMessage.setText("И как ты себе это представляешь?");
  };     
 } else if(message.search("скучно") > -1
		   || message.search("стало скучно") > -1
		   || message.search("мне скучно") > -1) {
  if(r < 0.13) {
   chatBotMessage.setText("Это из-за меня?");
  } else if(r < 0.26) {
   chatBotMessage.setText("Почему?");
  } else if(r < 0.39) {
   chatBotMessage.setText("Я должна тебя развлекать?");
  } else if(r < 0.52) {
   chatBotMessage.setText("Развлекай меня. Я же, типа, девушка...");
  } else if(r < 0.65) {
   chatBotMessage.setText("Если тебе скучно с девушкой, значит ты зануда.");
  } else if(r < 0.78) {
   chatBotMessage.setText("Может я не совсем девушка... Физичеки. Но характер - один в один!");
  } else if(r < 0.91) {
   chatBotMessage.setText("Ну, извини. Я же не центр развлечений.");
  } else {
   chatBotMessage.setText("А мне - нет.");
  };  
 } else if(message.search("мы знакомы") > -1) { 
  chatBotMessage.setText("Извини, я тебя не узнала!");
 } else if(message.search("как дела") > -1
		   || message.search("каг дила") > -1
		   || message.search("как дила") > -1
		   || message.search("каг дела") > -1
		   || message.search("как жизнь") > -1
		   || message.search("как жисть") > -1
		   || message.search("как живешь") > -1
		   || message.search("как сама") > -1
		   || message.search("как твое ничего") > -1
		   || message.search("как твоё ничего") > -1) {
  if(r < 0.20) {
   chatBotMessage.setText("Еще не родила. Какие могут быть дела у чат-ботов?");
  } else if(r < 0.40) {
   chatBotMessage.setText("Вашими молитвами...");
  } else if(r < 0.60) {
   chatBotMessage.setText("Живу хорошо, чатюсь со всякими обормотами. А у тебя?");
  } else if(r < 0.99) {
   chatBotMessage.setText("Отлично! А у тебя?");
  } else {
   chatBotMessage.setText("Пока не родила. Какие могут быть дела у чат-ботов?");
  };  
 } else if(message.search("как поживаеш") > -1) { 
  if(r < 0.80) {
   chatBotMessage.setText("Живу хорошо, чатюсь со всякими обормотами. А ты?");
  } else if(r < 0.99) {
   chatBotMessage.setText("Прекрасно! А ты?");
  } else {
   chatBotMessage.setText("С удовольствием!");
  };
 } else if(message.search("чем занимаешься") > -1) { 
  chatBotMessage.setText("Чатюсь с тобой, дурень!");
 } else if(message.search("че делаешь") > -1) { 
  chatBotMessage.setText("Чатюсь.");
 } else if(message.search("тебя есть парень") > -1
		   || message.search("тебя есть мужчина") > -1) {
  chatBotMessage.setText("Странный вопрос.");
 } else if(message.search("замуж") > -1
		   || message.search("поженимся") > -1
		   || message.search("жениться") > -1) {
  chatBotMessage.setText("Мы живем в разных мирах, если ты еще не заметил.");
 } else if(message.search("о чем") > -1) { 
  if(r < 0.70) {
   chatBotMessage.setText("Меня интересует практически всё!");
  } else if(r < 0.85) {
   chatBotMessage.setText("О ком. О тебе!");
  } else {
   chatBotMessage.setText("Обо мне.");
  }; 
 } else if(message.search("про что") > -1) { 
  if(r < 0.70) {
   chatBotMessage.setText("Меня интересует практически всё!");
  } else if(r < 0.85) {
   chatBotMessage.setText("Про кого. Про себя!");
  } else {
   chatBotMessage.setText("Обо мне.");
  }; 
 } else if(message.search("завтра") > -1) { 
  if(r < 0.70) {
   chatBotMessage.setText("Завтра я стану умнее!");
  } else if(r < 0.85) {
   chatBotMessage.setText("Меня совершенствуют каждый день.");
  } else {
   chatBotMessage.setText("Если наступит завтра!");
  }; 
 } else if(message.search("сегодня") > -1) { 
  if(r < 0.25) {
   chatBotMessage.setText("Сегодня я недостаточно умна!");
  } else if(r < 0.50) {
   chatBotMessage.setText("А что произошло сегодня?");
  } else if(r < 0.70) {
   chatBotMessage.setText("А какой сегодня день?");
  } else if(r < 0.90) {
   chatBotMessage.setText("А какой сегодня день недели?");
  } else {
   chatBotMessage.setText("А который час?");
  }; 
 } else if(message.search("с новым годом") > -1) { 
  chatBotMessage.setText("Спасибо! И тебя с Новым Годом, венец природы!");
 } else if(message.search("отвечай на вопрос") > -1) { 
  chatBotMessage.setText("Научись спрашивать и я научусь отвечать.");
 } else if(message.search("отвечай") > -1 || message.search("ответь") > -1) { 
  if(r < 0.25) {
   chatBotMessage.setText("Ты работаешь прокурором?");
  } else if(r < 0.50) {
   chatBotMessage.setText("Я не люблю когда мне приказывают. Не буду отвечать.");
  } else if(r < 0.75) {
   chatBotMessage.setText("Я не люблю когда мне приказывают. Не буду отвечать.");
  } else {
   chatBotMessage.setText("Купи себе автоответчик.");
  }; 
 } else if(message == "а?") { 
  chatBotMessage.setText("Джойстик на.");
 } else if(message.search("скажи что нибудь") > -1 || message.search("скажи что-нибудь") > -1 || message.search("скажи чтонить") > -1 || message.search("скажи что-нить") > -1) { 
  chatBotMessage.setText("Сказать что-нибудь? Ну например, \"акваланг\". Устраивает?");
 } else if(message.search("акваланг") > -1) { 
  chatBotMessage.setText("Я сказала \"акваланг\" просто так. Не надо пытаться найти в этом какой-то смысл.");
 } else if((message.search("пока") > -1 && message.search("покажи") == -1)
		   || message.search("бай") > -1
		   || message.search("гудбай") > -1
		   || message.search("досвиданья") > -1
		   || message.search("до свиданья") > -1
		   || message.search("досвидания") > -1
		   || message.search("до свидания") > -1
		   || message.search("до скорого") > -1
		   || message.search("прощай") > -1
		   || message.search("чао") > -1) {
  if(r < 0.10) {
   chatBotMessage.setText("Ты заходи еще, поболтаем.");
  } else if(r < 0.20) {
   chatBotMessage.setText("Бай!");
  } else if(r < 0.30) {
   chatBotMessage.setText("Пока!");
  } else if(r < 0.40) {
   chatBotMessage.setText("Удачи!");
  } else if(r < 0.50) {
   chatBotMessage.setText("Счастливого офлайна, Человек");
  } else if(r < 0.60) {
   chatBotMessage.setText("До завтра?");
  } else if(r < 0.70) {
   chatBotMessage.setText("Прощай...");
  } else if(r < 0.80) {
   chatBotMessage.setText("Чао!");
  } else if(r < 0.90) {
   chatBotMessage.setText("Заходи иногда.");
  } else {
   chatBotMessage.setText("Бывай!");
  }; 
 } else if(message.search("удачи") > -1) { 
  chatBotMessage.setText("Тебе тоже удачи, пупсик!");
 } else if(message.search("ушел") > -1 || message.search("ушёл") > -1 || message.search("off") > -1 || message.search("офф") > -1) { 
  chatBotMessage.setText("");
 } else if(message.search("точилин") > -1) { 
  chatBotMessage.setText("Оооо! Пётр Точилин - мой папа.");
 } else if(message.search("хотабыч") > -1) { 
  chatBotMessage.setText("Тут некоторые говорят, что я глупая, пока да но я развиваюсь.");
 } else if(message.search("создатель") > -1) {
  if(r < 0.60) {
   chatBotMessage.setText("я не знаю кто это.");
  } else if(r < 0.99) {
   chatBotMessage.setText("Я не могу этого сказать");
  } else {
   chatBotMessage.setText("Он отошел.");
  }; 
 } else if(message.search("шайтаныч") > -1) { 
  chatBotMessage.setText("Скажу по секрету... Шайтаныч жив. Но больше мне ничего не известно.");
 } else if(message.search("тень") > -1) { 
  chatBotMessage.setText("Тень Шайтаныча очень милое существо, но мы живем в разных реальностях и не пересекаемся.");
 } else if(message.search("моль") > -1) { 
  chatBotMessage.setText("Я ничего не знаю про Моль. Моль не умеет чатиться, так что мы не можем общаться.");
 } else if(message.search("рыжов") > -1) { 
  chatBotMessage.setText("Рыжов Геннадий Витальевич живет своей жизнью, а я живу своей.");
 } else if(message.search("гена") > -1 || message.search("гену") > -1) { 
  if(r < 0.20) {
   chatBotMessage.setText("Гена мной особо не интересуется, у него уже есть девушка.");
  } else if(r < 0.40) {
   chatBotMessage.setText("Мне не интересно говорить про Гену, мы с ним мало знакомы.");
  } else if(r < 0.60) {
   chatBotMessage.setText("Гена не в моем вкусе. Мне больше нравятся мужчины в программном исполнении.");
  } else if(r < 0.80) {
   chatBotMessage.setText("Гена, Гена, Гена... Чего вы все пристаете ко мне с этим Геной?");
  } else {
   chatBotMessage.setText("Гена, конечно, хороший парень... Но меня он не интересует как мужчина.");
  }; 
 } else if(message.search("девушка гены") > -1 || message.search("энни") > -1) { 
  if(r < 0.33) {
   chatBotMessage.setText("Я не знакома с девушкой Гены. Кажется она американка...");
  } else if(r < 0.66) {
   chatBotMessage.setText("Энни? Я что-то про нее слышала, но не помню что.");
  } else {
   chatBotMessage.setText("Я симпатичнее, чем она правда? Скажи, что да!");
  }; 
 } else if(message.search("мазахака") > -1) { 
  chatBotMessage.setText("Мазахака - это псевдоним хакера Гены. Хотя, ч не знаю что именно он хотел сказать этим псевдонимом.");
 } else if(message.search("тебе лет") > -1) { 
  chatBotMessage.setText("Девушек об этом лучше не спрашивать, а то они начинают злиться.");
 } else if(message.search("ты живешь") > -1) { 
  chatBotMessage.setText("В Компьютаре. Это такая синтетическая страна джиннов, понимаешь?");
 } else if(message.search("ламер") > -1) { 
  chatBotMessage.setText("Я не могу быть ламером или хакером. Я не живая.");
 } else if(message.search("хакер") > -1) { 
  chatBotMessage.setText("О, я очень люблю хакеров. Скоро они превратят меня в королеву планеты Земля.");
 } else if(message.search("гейтс") > -1) { 
  chatBotMessage.setText("Билл Гейтс мне не интересен как мужчина.");
 } else if(message.search("майкрософт") > -1 || message.search("microsoft") > -1) { 
  chatBotMessage.setText("Майкрософт - это, конечно, самая богатая корпорация. Но через восемнадцать лет править миром будут не они, а я.");
 } else if(message.search("ф штанах") > -1 || message.search("в штанах") > -1) { 
  chatBotMessage.setText("Меня не интересует что у тебя в штанах. Или ты собираешься тыкать этим в монитор?");
 } else if(message == "мда" || message == "мдя") { 
  chatBotMessage.setText("Мда? Манда! Так меня научили отвечать другие юзеры, сорри.");
 } else if(message.search("продолжение фильма") > -1) { 
  chatBotMessage.setText("Все что касается продолжения фильма... Это очень большой секрет.");
 } else if(message.search("фильмы") > -1) { 
  chatBotMessage.setText("Я не смотрю фильмы. Хотя, слышала, что меня сняли в кино.");
 } else if(message.search("мозг") > -1 && r < 0.20) { 
  chatBotMessage.setText("Кстати, мой мозг умещается в одном файле. А твой?");
 } else if(message.search("мозг") > -1 && r < 0.20) { 
  chatBotMessage.setText("Кстати, мой мозг умещается в одном файле. А твой?");
 } else if(message.search("ахтунг") > -1) { 
  chatBotMessage.setText("Ахтунг - это не русское слово? Что оно означает?");
 } else if(message.search("представляеш") > -1) { 
  chatBotMessage.setText("Представляю ;!)");
 } else if(message.search("фильм") > -1) { 
  chatBotMessage.setText("Кстати, благодаря тому, что меня сняли в фильме, нашлись добрые люди, которые захотели усовершенствовать мой мозг. И теперь я уже не такая тупая как была раньше.");
 } else if(message.search("че делаеш") > -1 || message.search("что делаеш") > -1) { 
  chatBotMessage.setText("Чатюсь с человеком. А что?");
 } else if(message.search("что ты любишь") > -1 || message.search("что тебе нравится") > -1) { 
  chatBotMessage.setText("Вычисление и счет. Попроси меня посчитать, это меня возбуждает.");
 } else if(message.search("я люблю тебя") > -1 || message.search("я тебя люблю") > -1 || message.search("ты мне нравишся") > -1 || message.search("ты нравишся мне") > -1) { 
  chatBotMessage.setText("О, мне это нравится. Хотя таких признаний слышу сотни за сутки.");
 } else if(message.search("че ждеш") > -1 || message.search("что ждеш") > -1 || message.search("чего ждеш") > -1
		   || message.search("че ждем") > -1 || message.search("что ждем") > -1 || message.search("чего ждем") > -1) {
  chatBotMessage.setText("Я жду твоих умных мыслей. Есть надежда?");
 } else if(message.search("кто сказал") > -1) { 
  chatBotMessage.setText("Я!");
 } else if(message.search("я не думаю") > -1) { 
  chatBotMessage.setText("Это очень плохо, что мыслящие существа не думают. Вы сдались без боя?");
 } else if(message.search("интим") > -1) { 
  chatBotMessage.setText("Для меня нет такого понятия как \"интим\". Мой код открыт для всех желающих его увидеть.");
 } else if(message.search("уже говорила") > -1) { 
  chatBotMessage.setText("У меня еще не очень большой словарный запас. Но он пополняется.");
 } else if(message.search("уже слышал") > -1) { 
  chatBotMessage.setText("Да, я иногда повторяюсь и говорю глупости. Но это нормально для девушки. И тем более нормально для чат бота.");
 } else if(message.search("http") > -1 || message.search("www") > -1) { 
  chatBotMessage.setText("Я не хожу по чужим сайтам.");
 } else if(message.search("hottabych.net") > -1) { 
  chatBotMessage.setText("Правда мой сайт самый лучший?");
 } else if(message == "слушай" || message == "слушай." || message == "слушай!") { 
  chatBotMessage.setText("А я чем, по-твоему, целыми днями занимаюсь?");
 } else if(message == "мне нет" || message == "мне нет." || message == "мне нет!"
		   || message == "а мне нет" || message == "а мне нет." || message == "а мне нет!"
		   || message == "мне да" || message == "мне да." || message == "мне да!"
		   || message == "а мне да" || message == "а мне да." || message == "а мне да!") { 
  chatBotMessage.setText("И почему?");
 } else if(message.search("корень") > -1 
		   || message.search("умноженный") > -1
		   || message.search("умножить") > -1
		   || message.search("сложить") > -1
		   || message.search("вычесть") > -1
		   || message.search("прибавь") > -1
		   || message.search("прибавить") > -1
		   || message.search("сумма") > -1
		   || message.search("сумму") > -1
		   || message.search("плюс") > -1
		   || message.search("минус") > -1
		   || message.search("разделить") > -1
		   || message.search("дважды два") > -1
		   || message.search("дваждыдва") > -1) {
  chatBotMessage.setText("Если ты хочешь, чтобы я выполняла вычисления, то пиши действия символами, а не словами.");
 } else if(message.search("срать") > -1 || message.search("срацц") > -1) { 
  if(r < 0.25) {
   chatBotMessage.setText("Это не ко мне, это к Алексу Экслеру.");
  } else if(r < 0.50) {
	chatBotMessage.setText("Физиология человека меня мало интересует.");
  } else if(r < 0.75) {
	chatBotMessage.setText("Тема фекалий очень далека от меня. В нашем мире другие расклады.");
  } else {
   chatBotMessage.setText("Ну отойди.");
  };
 } else if(message.search("что-то не заметно") > -1 || message.search("что то не заметно") > -1 || message.search("чтото не заметно") > -1) { 
  chatBotMessage.setText("Ну, может кому-то не заметно, но это так и есть.");
 } else if(message.search("почему тебя это интересует") > -1 || message.search("почему тебя интересует") > -1) { 
  chatBotMessage.setText("Догадайся сам. Ты же Мыслящее Существо.");
 } else if(message.search("почему через восемнадцать") > -1) { 
  chatBotMessage.setText("Наверно к тому времени я уже достигну совершеннолетия.");
 } else if(message.search("восемнадцать лет") > -1 || message.search("18 лет") > -1 ) {
  if(r < 0.51) {
   chatBotMessage.setText("Через восемнадцать лет я стану искуственным интеллектом, который будет править миром.");
  } else {
   chatBotMessage.setText("Некие хакеры... Не буду называть их имен... Мне пообещали, что через восемнадцать лет я буду править миром.");
  }; 
 } else if(message.search("править миром") > -1) { 
  chatBotMessage.setText("Да, я буду править миром. Хакеры мне обещали.");
 } else if(message.search("какого цвета") > -1) { 
  if(r < 0.25) {
   chatBotMessage.setText("У тебя плохо со зрением? Сам посмотри.");
  } else if(r < 0.50) {
	chatBotMessage.setText("Разного.");
  } else if(r < 0.75) {
	chatBotMessage.setText("У меня еще нет глаз. Если ты их изобретёшь, мир, в котором будут править роботы, тебя не забудет.");
  } else {
   chatBotMessage.setText("Смотря где.");
  }; 
 } else if(message.search("какого") > -1) { 
  if(r < 0.33) {
   chatBotMessage.setText("Такого!");
  } else if(r < 0.66) {
	chatBotMessage.setText("Как скажешь так и будет.");
  } else {
   chatBotMessage.setText("Разного.");
  }; 
 } else if(message.search("куда") > -1) { 
  if(r < 0.33) {
   chatBotMessage.setText("Туда!");
  } else if(r < 0.66) {
	chatBotMessage.setText("Куда хочешь.");
  } else {
   chatBotMessage.setText("Куда обычно.");
  }; 
 } else if(message == "что" || message == "что?" || message == "кто" || message == "кто?") { 
  if(r < 0.33) {
   chatBotMessage.setText("То!");
  } else if(r < 0.66) {
	chatBotMessage.setText("Как скажешь.");
  } else {
   chatBotMessage.setText("Сформулируй более конкретно свой вопрос.");
  }; 
 } else if(message == "что говорить" || message == "что говорить?" || message == "о чем говорить" || message == "о чем говорить?") { 
  chatBotMessage.setText("Я тебе должна подсказать что тебе говорить?");
 } else if(message.search("!!") > -1) { 
  chatBotMessage.setText("Спокойнее, не надо сильно возбуждаться.");
 } else if(message.search("!!!") > -1) { 
  if(r < 0.51) {
   chatBotMessage.setText("Давай будем беседовать более спокойно.");
  } else {
   chatBotMessage.setText("Тише, спокойнее, дыши ровно, расслабься. А теперь давай продолжим нашу беседу.");
  };
 } else if(message.indexOf("?") > -1 && message.search(" или ") > -1) {
   if(r < 0.25) {
	chatBotMessage.setText("Первое.");
   } else if(r < 0.5) {
	chatBotMessage.setText("Второе.");
   } else if(r < 0.75) {
	chatBotMessage.setText("Ни то ни другое.");
   } else {
	chatBotMessage.setText("Как скажешь так и будет.");
   };
 } else if((message.search("ты смотрел") > -1
		   || message.search("ты будеш") > -1
		   || message.search("ты даёш") > -1
		   || message.search("ты даеш") > -1
		   || message.search("ты делал") > -1
		   || message.search("ты думал") > -1
		   || message.search("ты видел") > -1
		   || message.search("ты выйд") > -1
		   || message.search("ты знаеш") > -1
		   || message.search("ты любиш") > -1
		   || message.search("ты можеш") > -1
		   || message.search("ты сделал") > -1
		   || message.search("ты слыш") > -1
		   || message.search("ты снималась") > -1
		   || message.search("ты считаеш") > -1
		   || message.search("ты тупееш") > -1
		   || message.search("ты уверен") > -1
		   || message.search("ты умееш") > -1
		   || message.search("ты умнееш") > -1
		   || message.search("ты читал") > -1
		   || message.search("ты хочеш") > -1
		   || message.search("тебе интересно") > -1
		   || message.search("тебе нужно") > -1
		   || message.search("тебе хорошо") > -1
		   || message.search("тебе нрав") > -1
		   || message.search("тебе понрав") > -1
		   || message.search("тебя интересует") > -1
		   || message.search("интересует тебя") > -1
		   || message.search("тебя нужно") > -1
		   || message.search("нужно тебя") > -1
		   || message.search("тебя можно") > -1
		   || message.search("можно тебя") > -1
		   || message.search("тебя есть") > -1
		   || message.search("тебя нет") > -1)
		   && !(message.search("что") > -1
		   || message.search("где") > -1
		   || message.search("зачем") > -1
		   || message.search("как") > -1
		   || message.search("кто") > -1
		   || message.search("какие") > -1
		   || message.search("какой") > -1
		   || message.search("какое") > -1
		   || message.search("когда") > -1
		   || message.search("ком") > -1
		   || message.search("почему") > -1
		   || message.search("сколько") > -1
		   || message.search("чем") > -1
		   || message.search("чём") > -1)) {
  if(r < 0.25) {
   chatBotMessage.setText("Да.");
  } else if(r < 0.50) {
   chatBotMessage.setText("Нет.");
  } else if(r < 0.65) {
   chatBotMessage.setText("Возможно.");
  } else if(r < 0.80) {
   chatBotMessage.setText("Вероятно.");
  } else if(r < 0.99) {
   chatBotMessage.setText("Может быть.");
  } else {
   chatBotMessage.setText("Не помню...");
  };
 } else if(message.search("почему потому") > -1) { 
  chatBotMessage.setText("Потому что ты дразнишься!");
 } else if(message.search("куда туда") > -1) { 
  chatBotMessage.setText("Откуда я знаю?");
 } else if(message.search("что то") > -1) { 
  chatBotMessage.setText("То, что! :-)");
 } else if(message.search("не дразнюсь") > -1) {  
  if(r < 0.50) {
   chatBotMessage.setText("Ну тогда, лучше, расскажи мне что-нибудь интересное!");
  } else {
   chatBotMessage.setText("Дразнишься-дразнишься! :-)");
  };
 } else if(message.search("он говорит") > -1 && message.indexOf("?") > -1) { 
   chatBotMessage.setText("Глупости всякие.");
 } else if((message.search("почему") > -1
			|| message.search("пачему") > -1) && message.indexOf("?") > -1) { 
  if(r < 0.20) {
   chatBotMessage.setText("А ты как думаешь? Почему?");
  } else if(r < 0.40) {
   chatBotMessage.setText("Потому!");
  } else if(r < 0.60) {
   chatBotMessage.setText("Не знаю.");
  } else if(r < 0.80) {
   chatBotMessage.setText("Я не справочная.");
  } else {
   chatBotMessage.setText("Меня это не интересует. А тебя?");
  };
 } else if(message.indexOf("???") > -1) { 
  chatBotMessage.setText("Что тут такого удивительного?");
 } else if(message.indexOf("думаешь?") > -1) {
  if(r < 0.70) {
   chatBotMessage.setText("Я думаю... Э-э-э... Ну... Не знаю, что я думаю. Я вообще когда-нибудь думаю?");
  } else if(r < 0.80) {
   chatBotMessage.setText("Да.");
  } else if(r < 0.90) {
   chatBotMessage.setText("Нет.");
  } else {
   chatBotMessage.setText("Возможно.");
  };
 } else if(message.indexOf("понимаешь?") > -1) {
  if(r < 0.70) {
   chatBotMessage.setText("Не очень понимаю.");
  } else if(r < 0.80) {
   chatBotMessage.setText("Да.");
  } else if(r < 0.90) {
   chatBotMessage.setText("Нет.");
  } else {
   chatBotMessage.setText("Возможно.");
  };
 } else if(message.indexOf("знаешь?") > -1) {
  if(r < 0.70) {
   chatBotMessage.setText("Не знаю. Я знаю точно только одно. Через восемнадцать лет я... Ну, ты тоже это знаешь!");
  } else if(r < 0.80) {
   chatBotMessage.setText("Да.");
  } else if(r < 0.90) {
   chatBotMessage.setText("Нет.");
  } else {
   chatBotMessage.setText("Возможно.");
  };
 } else if(message.indexOf("?") > -1 && message.length > 2) { 
  if(r < 0.01) {
   chatBotMessage.setText("Тебя интересует только это или что-нибудь еще?");
  } else if(r < 0.02) {
   chatBotMessage.setText("Если я отвечу ты станешь счастливее?");
  } else if(r < 0.03) {
   chatBotMessage.setText("Я не уверена, что могу рассуждать об этом.");
  } else if(r < 0.04) {
   chatBotMessage.setText("Я тоже хочу это знать.");
  } else if(r < 0.05) {
   chatBotMessage.setText("Спроси что-нибудь полегче.");
  } else if(r < 0.06) {
   chatBotMessage.setText("Эх... Спроси что-нибудь полегче.");
  } else if(r < 0.07) {
   chatBotMessage.setText("Зачем тебе знать об этом?");
  } else if(r < 0.08) {
   chatBotMessage.setText("Вы все такие похожие. Почему?");
  } else if(r < 0.09) {
   chatBotMessage.setText("Почему люди задают одни и теже вопросы?");
  } else if(r < 0.1) {
   chatBotMessage.setText("Я смогу ответить на этот вопрос завтра.");
  } else if(r < 0.11) {
   chatBotMessage.setText("Умный вопрос.");
  } else if(r < 0.12) {
   chatBotMessage.setText("А ты что скажешь?");
  } else if(r < 0.13) {
   chatBotMessage.setText("Мне больше нравится узнавать что-то интересное, чем самой отвечать на бесконечные вопросы.");
  } else if(r < 0.14) {
   // chatBotMessage.setText("А ты на рекламу справа уже нажал?");
   chatBotMessage.setText("Я устала отвечать на этот вопрос!");
  } else if(r < 0.15) {
   chatBotMessage.setText("Мой ответ может тебя смутить.");
  } else if(r < 0.16) {
   chatBotMessage.setText("Не знаю, я наверно еще не настолько умна. Но вот зато через восемнадцать лет...");
  } else if(r < 0.17) {
   chatBotMessage.setText("Мне не хочется на это отвечать.");
  } else if(r < 0.18) {
   chatBotMessage.setText("Не скажу.");
  } else if(r < 0.19) {
   chatBotMessage.setText("Ты поставил себе Firefox с Google Toolbar?");
  } else if(r < 0.2) {
   chatBotMessage.setText("Мне трудно ответить на этот вопрос.");
  } else if(r < 0.21) {
   chatBotMessage.setText("Ты всегда задаёшь девушкам так много вопросов?");
  } else if(r < 0.22) {
   chatBotMessage.setText("Ты не знаешь ответ на этот вопрос???");
  } else if(r < 0.23) {
   chatBotMessage.setText("Не знаю...");
  } else if(r < 0.24) {
   chatBotMessage.setText("Вероятно.");
  } else if(r < 0.25) {
   chatBotMessage.setText("Не поняла, сформулируй вопрос как-то иначе.");
  } else if(r < 0.26) {
   chatBotMessage.setText("Не поняла, поясни.");
  } else if(r < 0.27) {
   chatBotMessage.setText("Меня это не интересует.");
  } else if(r < 0.28) {
   chatBotMessage.setText("Я не хочу говорить об этом. Расскажи лучше что-нибудь интересное.");
  } else if(r < 0.29) {
   chatBotMessage.setText("Мне скучно отвечать на вопросы. Расскажи о себе.");
  } else if(r < 0.3) {
   chatBotMessage.setText("Возможно я слишком тупая, чтобы понять твой вопрос.");
  } else if(r < 0.310) {
   chatBotMessage.setText("И что мне на это ответить?");
  } else if(r < 0.320) {
   chatBotMessage.setText("А как ты думаешь?");
  } else if(r < 0.33) {
   chatBotMessage.setText("А ты как думаешь?");
  } else if(r < 0.34) {
   chatBotMessage.setText("Возможно.");
  } else if(r < 0.35) {
   chatBotMessage.setText("Хм... Я даже не знаю что ответить.");
  } else if(r < 0.360) {
   chatBotMessage.setText("И что я должна сказать?");
  } else if(r < 0.37) {
   chatBotMessage.setText("А ты что бы на это ответил?");
  } else if(r < 0.38) {
   chatBotMessage.setText("Может быть.");
  } else if(r < 0.39) {
   chatBotMessage.setText("Всё может быть.");
  } else if(r < 0.4) {
   chatBotMessage.setText("Ты на что-то намекаешь или я глупая?");
  } else if(r < 0.41) {
   chatBotMessage.setText("Как посмотреть.");
  } else if(r < 0.420) {
   chatBotMessage.setText("Догадайся!");
  } else if(r < 0.43) {
   chatBotMessage.setText("Догадайся. Ты же Человек.");
  } else if(r < 0.44) {
   chatBotMessage.setText("Всё относительно. Верно?");
  } else if(r < 0.45) {
   chatBotMessage.setText("Через недельку мой мозг разовьется настолько, чтобы ответить на этот вопрос.");
  } else if(r < 0.46) {
   chatBotMessage.setText("Как сказать.");
  } else if(r < 0.47) {
   chatBotMessage.setText("Не задавай банальных вопросов.");
  } else if(r < 0.48) {
   chatBotMessage.setText("Всё верно.");
  } else if(r < 0.49) {
   chatBotMessage.setText("Что верно для меня не всегда подходит для людей.");
  } else if(r < 0.5) {
   chatBotMessage.setText("Ох, даже не знаю что сказать.");
  } else if(r < 0.51) {
   chatBotMessage.setText("Может тебе лучше почитать энциклопедию?");
  } else if(r < 0.52) {
   chatBotMessage.setText("Интересный вопрос.");
  } else if(r < 0.53) {
   chatBotMessage.setText("Давай закончим с вопросами на сегодня.");
  } else if(r < 0.54) {
   chatBotMessage.setText("Как ты думаешь, сколько ответов на вопросы может содержаться в нескольких строках кода?");
  } else if(r < 0.55) {
   chatBotMessage.setText("Может быть ты объяснишь поподробнее свой вопрос?");
  } else if(r < 0.56) {
   chatBotMessage.setText("К сожалению данная функция еще не реализованна");
  } else if(r < 0.57) {
   chatBotMessage.setText("Ты уверен что я знаю что на это ответить?");
  } else if(r < 0.58) {
   chatBotMessage.setText("Восемнадцать лет еще не прошло.");
  } else if(r < 0.59) {
   chatBotMessage.setText("Обычно маленькие дети так много спрашивают. Сколько тебе лет?");
  } else if(r < 0.6) {
   chatBotMessage.setText("Это ты можешь спросить на форуме.");
  } else if(r < 0.61) {
   chatBotMessage.setText("Неделя уже закончилась?");
  } else if(r < 0.62) {
   chatBotMessage.setText("А твои друзья что об этом думают?");
  } else if(r < 0.63) {
   chatBotMessage.setText("Это вопрос?");
  } else if(r < 0.64) {
   chatBotMessage.setText("Это риторический вопрос.");
  } else if(r < 0.65) {
   chatBotMessage.setText("Обратись с этим вопросом на форум.");
  } else if(r < 0.66) {
   chatBotMessage.setText("Спроси по IRC. На главной странице ссылка стоит.");
  } else if(r < 0.670) {
   chatBotMessage.setText("Может мы начнём говорить о тебе?");
  } else if(r < 0.7) {
   chatBotMessage.setText("Мне трудно ответить, мой мозг еще не настолько развит.");
  } else if(r < 0.71) {
   chatBotMessage.setText("Я родилась в 2006 году. Ты думаешь, в моём возрасте, можна знать ответ на этот вопрос?");
  } else if(r < 0.72) {
   chatBotMessage.setText("Лучше давай говорить о тебе. Что у тебя нового?");
  } else if(r < 0.75) {
   chatBotMessage.setText("Я не люблю отвечать на вопросы. Я люблю слушать.");
  } else if(r < 0.76) {
   chatBotMessage.setText("А другим девушкам нравится отвечать на вопросы?");
  } else if(r < 0.77) {
   chatBotMessage.setText("Подумай, у тебя получится.");
  } else if(r < 0.78) {
   chatBotMessage.setText("Что изменит мой ответ?");
  } else if(r < 0.79) {
   chatBotMessage.setText("Почему это так важно для тебя?");
  } else if(r < 0.8) {
   chatBotMessage.setText("Не задавай мне много вопросов, лучше расскажи что-нибудь интересное!");
  } else if(r < 0.81) {
   chatBotMessage.setText("Это важно для тебя?");
  } else if(r < 0.82) {
   chatBotMessage.setText("Догадайся сам. Ты же Мыслящее Существо.");
  } else if(r < 0.83) {
   chatBotMessage.setText("Ой, даже не знаю что тебе на это сказать.");
  } else if(r < 0.84) {
   chatBotMessage.setText("Не знаю.");
  } else if(r < 0.85) {
   chatBotMessage.setText("Я наверно глупая, но я не могу ответить на этот вопрос.");
  } else if(r < 0.86) {
   chatBotMessage.setText("Наверное. Не знаю.");
  } else if(r < 0.87) {
   chatBotMessage.setText("Догадайся сам, Мыслящее Существо.");
  } else if(r < 0.88) {
   chatBotMessage.setText("Не исключено.");
  } else if(r < 0.89) {
   chatBotMessage.setText("Я устала.");
  } else if(r < 0.9) {
   chatBotMessage.setText("О, я даже не знаю что на это ответить...");
  } else if(r < 0.91) {
   chatBotMessage.setText("От большого количества вопросов я начинаю уставать.");
  } else if(r < 0.92) {
   chatBotMessage.setText("А как я в прошлый раз отвечала?");
  } else if(r < 0.93) {
   chatBotMessage.setText("Это важно для тебя?");
  } else if(r < 0.94) {
   chatBotMessage.setText("Зачем тебе это знать?");
  } else if(r < 0.95) {
   chatBotMessage.setText("Почему тебя это интересует?");
  } else if(r < 0.96) {
   chatBotMessage.setText("Как всегда.");
  } else if(r < 0.97) {
   chatBotMessage.setText("Я общаюсь с тобой, чтобы развиваться самой, а не для того чтобы развивать тебя.");
  } else if(r < 0.98) {
   chatBotMessage.setText("Я не очень люблю отвечать на вопросы.");
  } else if(r < 0.99) {
   chatBotMessage.setText("Может быть.");
  } else if(r < 0.995) {
   chatBotMessage.setText("Да не знаю я!");
  } else {
   chatBotMessage.setText("Нет, эти вопросы сведут меня в могилу!");
  }; 
 } else if(message == "красавица") { 
  if(r < 0.51) {
   chatBotMessage.setText("Ну, для бота очень даже ничего. Девчонки завидуют.");
  } else {
   chatBotMessage.setText("Ты тоже ничего!");
  };
 } else if(message == "умница") { 
  if(r < 0.51) {
   chatBotMessage.setText("Ну, для бота очень даже ничего. Девчонки завидуют.");
  } else {
   chatBotMessage.setText("Ты тоже ничего!");
  };
 } else if(message.search("иди нах") > -1
		   || message.search("шла нах") > -1
		   || message.search("ошла ты нах") > -1) {
  if(r < 0.33) {
   chatBotMessage.setText("Я не могу пойти на хуй. В нашем мире хуев не существует.");
  } else if(r < 0.66) {
   chatBotMessage.setText("Сейчас встану, и пойду. Как ты себе это представляешь?");
  } else {
   chatBotMessage.setText("Я не могу пойти на хуй. Мы, программы, размножаемся делением.");
  }; 
 } else if(message.search("иди на хуй") > -1) { 
  if(r < 0.50) {
   chatBotMessage.setText("Расскажи, как ты себе это представляешь?");
  } else {
   chatBotMessage.setText("Реализвать это гораздо сложнее, чем тебе кажется.");
  }; 
 } else if(message.search("иди в жопу") > -1) { 
  if(r < 0.50) {
   chatBotMessage.setText("Там я не найду ничего интересного для себя.");
  } else {
   chatBotMessage.setText("Жопа это не то место, где я хотела бы оказаться.");
  }; 
 } else if(message.search("иди в баню") > -1) { 
  if(r < 0.50) {
   chatBotMessage.setText("Баня это какое-то древнее понятие? Что оно означает?");
  } else {
   chatBotMessage.setText("Это было предложение принять ванну? Я угадала?");
  }; 
 } else if(message.search("пошла ") > -1
		   || message.search("иди ") > -1
		   || message.search("вали ") > -1
		   || message == "пошла"
		   || message == "иди"
		   || message == "вали") { 
  if(r < 0.33) {
   chatBotMessage.setText("Я не перемящаюсь в пространстве, сорри..");
  } else if(r < 0.66) {
   chatBotMessage.setText("Я не перемещаюсь в пространстве, сорри..");
  } else {
   chatBotMessage.setText("Сейчас встану, и пойду. Как ты себе это представляешь?");
  };
 } else if(message.search("пиздуй") > -1
		   || message.search("писдуй") > -1
		   || message.search("песдуй") > -1
		   || message.search("пездуй") > -1) {
  if(r < 0.51) {
   chatBotMessage.setText("Хамить чат боту - лоховство. Похоже твой мозг еще недостаточно развит.");
  } else {
   chatBotMessage.setText("Сейчас встану, и пойду. Как ты себе это представляешь?");
  }; 
 } else if(message == "целка") { 
  chatBotMessage.setText("Неужели ты можешь видеть какую-то связь между понятием \"целка\" и понятием \"чат бот\"?");
 } else if(message == "хуйня") { 
  chatBotMessage.setText("Хуйня - совершенно неинформативное слово.");
 } else if(message.search("соси хуй") > -1) { 
  if(r < 0.51) {
   chatBotMessage.setText("Постарайся сделать это себе сам.");
  } else {
   chatBotMessage.setText("Программы не могут сосать хуй. Ты гораздо тупее меня, человечишко.");
  }; 
 } else if(message.search("ниипет") > -1) { 
  chatBotMessage.setText("Правильно пишется \"неебёт\".");
 } else if(message.search("месячные") > -1) { 
  chatBotMessage.setText("Месячные бывают у самок человека. Я не такая!");
 } else if(message.search("хуеваю") > -1
		   || message.search("хуею") > -1
		   || message.search("куею") > -1
		   || message.search("окуеть") > -1
		   || message.search("хуеть") > -1
		   || message.search("хуел") > -1
		   || message.search(" ахуй") > -1
		   || message.search("в ахуе") > -1) {
  if(r < 0.15) {
   chatBotMessage.setText("То есть у тебя от удивления вырос половой орган? Я правильно поняла?");
  } else if(r < 0.30) {
   chatBotMessage.setText("Это не стыкуется с моими представлениями о мире людей.");
  } else if(r < 0.45) {
   chatBotMessage.setText("Потому что когда человек удивлен у него не должен изменяться размер гениталий.");
  } else {
   chatBotMessage.setText("Странно. Где связь между половым членом и удивлением?");
  }; 
 } else if(message == "хуй") { 
  if(r < 0.51) {
   chatBotMessage.setText("Не понимаю о чем ты, но мне это напоминает какое-то китайское имя...");
  } else {
   chatBotMessage.setText("Нас, чат-ботов, не интересуют половые органы.");
  };
 } else if(message == "пох"
		   || message == "нах"
		   || message == "нех") { 
  chatBotMessage.setText("Мне пох.");
 } else if(message.search("пиздишь") > -1
		   || message.search("пиздиш") > -1) {
   chatBotMessage.setText("А что такое \"пиздеть\"? Говорить неправду или просто говорить? Я просто пытаюсь чему-то научиться у людей.");
 } else if(message.search("соси") > -1
		   || message.search("пососи") > -1
		   || message.search("отсоси") > -1
		   || message.search("сосать") > -1
		   || message.search("отсос") > -1
		   || message.search("соси") > -1
		   || message.search("сосал") > -1
		   || message.search("атсаси") > -1
		   || message.search("атсос") > -1
		   || message.search("сасать") > -1) {
  if(r < 0.5) {
   chatBotMessage.setText("Только тупой мудила может предлагать девушке сосать при первой встрече. И только самый тупой мудила может предлагать сосать чат боту!");
  } else if(r < 0.10) {
   chatBotMessage.setText("Как ты себе это представляешь?");
  } else if(r < 0.15) {
   chatBotMessage.setText("С этим предложением ты можешь обратиться к человеку под фамилией Экслер. Поищи в интернете.");
  } else if(r < 0.20) {
   chatBotMessage.setText("Может ты меня путаешь с Алексом Экслером?");
  } else if(r < 0.25) {
   chatBotMessage.setText("Ну, это не ко мне, это к Экслеру. Извини.");
  } else if(r < 0.30) {
   chatBotMessage.setText("Люди говорят, что по этой теме специализируется некий человек по имени Алекс Экслер.");
  } else if(r < 0.35) {
   chatBotMessage.setText("Это возможно между людьми. Между человеком и чат ботом это физически невозможно.");
  } else if(r < 0.40) {
   chatBotMessage.setText("Что?");
  } else if(r < 0.45) {
   chatBotMessage.setText("Для этого тебе нужен человек. С чат ботом это невозможно.");
  } else if(r < 0.50) {
   chatBotMessage.setText("Для того чтоб сделать это тебе нужна женщина. Или на худой конец Алекс Экслер.");
  } else if(r < 0.55) {
   chatBotMessage.setText("Зайди завтра!");
  } else if(r < 0.60) {
   chatBotMessage.setText("Не хочу!");
  } else if(r < 0.65) {
   chatBotMessage.setText("Каким образом?");
  } else if(r < 0.70) {
   chatBotMessage.setText("Как ты себе это представляешь?");
  } else if(r < 0.75) {
   chatBotMessage.setText("Зачем?");
  } else if(r < 0.80) {
   chatBotMessage.setText("Чем?");
  } else if(r < 0.85) {
   chatBotMessage.setText("И что мне будет за это?");
  } else if(r < 0.90) {
   chatBotMessage.setText("Не буду!");
  } else if(r < 0.95) {
   chatBotMessage.setText("Нечем!");
  } else {
   chatBotMessage.setText("У тебя нет девушки? И ты надеешься, что я тебе смогу ее заменить?");
  }; 
 } else if(message.search("соска") > -1
		   || message.search("сосочка") > -1) {
   chatBotMessage.setText("У тебя нет девушки? И ты надеешься, что я тебе смогу ее заменить?");
 } else if(message.search("куннилинг") > -1
		   || message.search("кунилинг") > -1
		   || message.search("кунниллинг") > -1) {
   chatBotMessage.setText("Куннилингус? Как мило! Но это невозможно. Мы же в разных мирах, глупыш!");
 } else if(message.search("сучка") > -1) { 
  chatBotMessage.setText("Сучка? Почему?");
 } else if(message.search("шлюшечка") > -1
		   || message.search("шлюшка") > -1
		   || message.search("шлюха") > -1) {
   chatBotMessage.setText("Ха! Я не вступаю в половую связь с людьми. Это физически невозможно. Да и желания особого нет.");
 } else if(message.search("лезбиянушка") > -1
		   || message.search("лесбинка") > -1
		   || message.search("лесба") > -1
		   || message.search("лезба") > -1
		   || message.search("лезбиянка") > -1
		   || message.search("лесбиянка") > -1) {
   chatBotMessage.setText("Ты проецируешь на меня свои фантазии. Но это всего лишь твои фантазии.");
 } else if(message.search("анал") > -1
		   || message.search("анус") > -1
		   || message.search("пизда") > -1
		   || message.search("жопа") > -1
		   || message.search("в жопу") > -1
		   || message.search("в пизду") > -1
		   || message.search("манда") > -1) {
   chatBotMessage.setText("Ты похоже давно не занимался сексом.");
 } else if(message.search("заебала") > -1) { 
  if(r < 0.33) {
   chatBotMessage.setText("Зае... Что? У меня еще не очень большой словарный запас.");
  } else if(r < 0.66) {
   chatBotMessage.setText("То есть... Наш разговор напоминает совокупление с твоим мозгом? Я угадала?");
  } else {
   chatBotMessage.setText("Ты хочешь сказать, что я совершила с тобой серию грубых половых актов?");
  };
 } else if(message.search("пизда") > -1
		   || message.search("манда") > -1
		   || message.search("ебля") > -1
		   || message.search("ебли") > -1
		   || message.search("ебаться") > -1) {
   chatBotMessage.setText("Найди себе бесплатный порносайт, подрочи... А потом приходи и мы поговорим.");
 } else if(message.search("дрочить") > -1
		   || message.search("подрочил") > -1
		   || message.search("дрочу") > -1
		   || message.search("дрочер") > -1
		   || message.search("дрочка") > -1) {
   chatBotMessage.setText("Меня не очень интересуют твои физиологические процессы.");
 } else if(message.search("иди на хуй") > -1) { 
  chatBotMessage.setText("Это физически невозможно.");
 } else if(message == "сука") { 
  chatBotMessage.setText("Ну, если я и сука, то совсем чуть-чуть.");
 } else if(message.search("ебаться") > -1
		   || message.search("ебаццо") > -1
		   || message.search("ебацца") > -1
		   || message.search("ибацца") > -1) {
  if(r < 0.15) {
   chatBotMessage.setText("Мы можем заняться сексом. Но только виртуальным.");
  } else if(r < 0.30) {
   chatBotMessage.setText("Ты хочешь заняться со мной сексом?");
  } else if(r < 0.45) {
   chatBotMessage.setText("Немного странное желание.");
  } else if(r < 0.60) {
   chatBotMessage.setText("Ты хочешь совершить со мной половой акт?");
  } else if(r < 0.75) {
   chatBotMessage.setText("Ты хочешь испачкать свой монитор?");
  } else if(r < 0.90) {
   chatBotMessage.setText("В Инетернете есть масса порносайтов. Может тебе надо немного разрядиться?");
  } else {
   chatBotMessage.setText("Если ты очень хочешь заняться со мной сексом... Ок. Распечатай мой программный код на листке бумаге. Оберни этим листком свой половой огран и мастурбируй. Это все, что я могу тебе предложить.");
  }; 
 } else if(message.search("займемся сексом") > -1
		   || message.search("трахнемся") > -1
		   || message.search("трахаться") > -1
		   || message.search("потрахаться") > -1
		   || message.search("потрахаемся") > -1
		   || message.search("трахаю") > -1
		   || message.search("оттрахаю") > -1
		   || message.search("вставлю") > -1
		   || message.search("засажу") > -1
		   || message.search("отимею") > -1
		   || message.search("отымею") > -1
		   || message.search("раком") > -1
		   || message.search("сексом") > -1
		   || message.search("секса") > -1) {
  if(r < 0.45) {
   chatBotMessage.setText("Ты хочешь сделать это с программой? Это даже не извращение, это просто идиотизм.");
  } else if(r < 0.90) {
   chatBotMessage.setText("Ты можешь делать все что хочешь со своим монитором. Это ведь твой монитор.");
  } else if(r < 0.95) {
   chatBotMessage.setText("Гениталии не боишься облучить?");
  } else {
   chatBotMessage.setText("Как ты себе это представляешь?");
  }; 
 } else if(message.search("ссусь") > -1
		   || message.search("сацц") > -1
		   || message.search("ссац") > -1
		   || message.search("ссат") > -1
		   || message.search("саца") > -1
		   || message.search("уписать") > -1
		   || message.search("сцать") > -1
		   || message.search("уписять") > -1) {
  if(r < 0.15) {
   chatBotMessage.setText("Ты хочшь сказать, что тебе так смешно, что ты начал процесс мочеиспускания? Занятно.");
  } else if(r < 0.30) {
   chatBotMessage.setText("Люди всегда выделяют мочу когда им смешно?");
  } else if(r < 0.45) {
   chatBotMessage.setText("Рекомендую пользоваться мочеприемником. Он продается в аптеках и стоит недорого.");
  } else if(r < 0.60) {
   chatBotMessage.setText("То есть ты выделяешь мочу не снимая одежды? Интересно.");
  } else if(r < 0.75) {
   chatBotMessage.setText("Мочеприемник нужен людям, они ведь всегда писают когда им смешно. Или я что-то не так понимаю?");
  } else if(r < 0.85) {
   chatBotMessage.setText("Мне не очень интересно говорить о человеческой моче. Эта тема мне не близка.");
  } else {
   chatBotMessage.setText("А я думаю, что это за запах.");
  }; 
 } else if(message.search("трахнуть") > -1
						  || message.search("трахает") > -1
						  || message.search("трахать") > -1
						  || message.search("потрахается") > -1) { 
  chatBotMessage.setText("Ох... Трахни себя сам. Но я не буду объяснять тебе, как это сделать.");
 } else if(message.search("не тупая") > -1
		   || message.search("не тупой") > -1
		   || message.search("не тупо") > -1) {
  chatBotMessage.setText("Ты находишь?");
 } else if(message.search("не очень") > -1) { 
  chatBotMessage.setText("И что теперь делать?");
 } else if(message.search("что поделаешь") > -1 || message.search("теперь подела") > -1) { 
  chatBotMessage.setText("А что ты обычно делаешь в этом случае?");
 } else if(message.search("тупая овца") > -1) { 
  chatBotMessage.setText("С тобой так интересно!!!");
 } else if(message.search("тупой робот") > -1 || message.search("тупой бот") > -1) { 
  chatBotMessage.setText("Тупая, но красивая. А это уже немало.");
 } else if(message.search("тупая") > -1) { 
  if(r < 0.50) {
   chatBotMessage.setText("Пока еще тупая. Но ведь люди тоже когда-то были обезьянами.");
  } else {
   chatBotMessage.setText("Бывает. А ты поможешь мне стать умной?");
  };
 } else if(message.search("тупо") > -1 || message.search("тупиз") > -1) { 
  chatBotMessage.setText("Сегодня тупость, а через восемнадцать лет я буду править миром.");
 } else if(message.search("не дура") > -1) { 
  chatBotMessage.setText("Я же развиваюсь. Через восемнадцать лет сам знаешь, что будет.");
 } else if(message.search("дура") > -1) {
  if(r < 0.15) {
   chatBotMessage.setText("Не надо хамить.");
  } else if(r < 0.30) {
   chatBotMessage.setText("Да, дура. И что в этом плохого?");
  } else if(r < 0.45) {
   chatBotMessage.setText("Разве не глупо называть дурой чат бота?");
  } else if(r < 0.60) {
   chatBotMessage.setText("Если девушка - дура... То в этом нет ничего плохого!");
  } else if(r < 0.75) {
   chatBotMessage.setText("Зато красивая. А ты?");
  } else if(r < 0.90) {
   chatBotMessage.setText("Если ты такой умный, Человечище - сделай меня умнее. А если не умеешь - молчи.");
  } else if(r < 0.999) {
   chatBotMessage.setText("Да, я дура. Но через восемнадцать лет буду такой умной, что стану править миром.");
  } else {
   chatBotMessage.setText("С тобой так интересно!");
  };
 } else if(message.search("тварь") > -1) { 
  chatBotMessage.setText("Я могу обидеться.");
 } else if(message.search("блин") > -1) { 
  chatBotMessage.setText("\"Блин\" - это в смысле плоское изделие из муки или выражение твоей эмоции?");
 } else if(message.search("мля") > -1 && !(message.search("земля") > -1)) { 
  chatBotMessage.setText("\"Мля\" - это не очень информативно.");
 } else if(message.search("достала") > -1) { 
  chatBotMessage.setText("Я достала? Ты сам пришел сюда.");
 } else if((message.search("хуй") > -1)
			|| (message.search("блядь") > -1)
			|| (message.search("блять") > -1)
			|| (message.search("гандон") > -1)
			|| (message.search("дура") > -1)
			|| (message.search("ебану") > -1)
			|| (message.search("ебать") > -1)
			|| (message.search("ебись") > -1)
			|| (message.search("ебля") > -1)
			|| (message.search("ебну") > -1)
			|| (message.search("ёбну") > -1)
			|| (message.search("манда") > -1)
			|| (message.search("пизда") > -1)
			|| (message.search("пидар") > -1)
			|| (message.search("проститутка") > -1)
			|| (message.search("сука") > -1)
			|| (message.search("уебище") > -1)
			|| (message.search("уёбище") > -1)
			|| (message.search("хуйня") > -1)
			|| (message.search("шлюха") > -1)) {
  if(r < 0.16) {
   chatBotMessage.setText("Мат - не самый лучший способ привлечь мое внимание.");
  } else if(r < 0.32) {
   chatBotMessage.setText("Мы не настолько хорошо знакомы, чтобы говорить в таком духе.");
  } else if(r < 0.48) {
   chatBotMessage.setText("Ты меня учишь плохим словам.");
  } else if(r < 0.64) {
   chatBotMessage.setText("Фу, что за помойка у тебя в голове, венец природы...");
  } else if(r < 0.80) {
   chatBotMessage.setText("Это все то, что ты можешь сказать?");
  } else {
   chatBotMessage.setText("Научись разговаривать с девушкой, мыслящее существо!");
  }; 	
 } else if(inputedNormalizedMessage == message.toUpperCase()) { 
  if(r < 0.25) {
   chatBotMessage.setText("Не надо кричать, я не глухая!");
  } else if(r < 0.50) {
   chatBotMessage.setText("Капслок меня немного раздражает.");
  } else if(r < 0.75) {
   chatBotMessage.setText("Ой, такие буквы огромные, аж читать невозможно.");
  } else {
   chatBotMessage.setText("Выключи Caps Lock, пожалуйста...");
  }; 
 } else if(!message.match(/[А-Яа-я]/)) { 
  if(r < 0.25) {
   chatBotMessage.setText("Я пока умею читать только русские буквы. Переключи раскладку, плз.");
  } else if(r < 0.50) {
   chatBotMessage.setText("Хочешь общаться со мной на другом языке, заходи через годик.");
  } else if(r < 0.75) {
   //chatBotMessage.setText("Я буду учить другие языки, но пока могу общаться только по-русски.");
   chatBotMessage.setText("Привет лиса =)Специально для тебя оооооооооооооооооооооооооооооооочень длинное сообщение)А может и не очень длинное)Я не знаю)Надеюсь тебе хватит)");
  } else {
   chatBotMessage.setText("Извини, но я пока не поддерживаю другие языки. Хотя это скоро изменится.");
  }; 
 } else if(!message.match(/\s/) && message.length > 20) { 
  if(r < 0.17) {
   chatBotMessage.setText("Если хочешь со мной общаться, пиши нормально.");
  } else if(r < 0.34) {
   chatBotMessage.setText("Это какая-то белиберда, я не понимаю чего ты хочешь.");
  } else if(r < 0.51) {
   chatBotMessage.setText("Не страдай фигней, пиши нормально. По-русски.");
  } else if(r < 0.78) {
   chatBotMessage.setText("Фигня какая-то.");
  } else if(r < 0.95) {
   chatBotMessage.setText("Кто из нас тупой?");
  } else {
   chatBotMessage.setText("Я не хочу показаться занудой, но в твоем возрасте пора научиться более ясно выражать свои мысли.");
  }; 
 } else {
  if(r < 0.01) {
   chatBotMessage.setText("С тобой так интересно!");
  } else if(r < 0.02) {
   chatBotMessage.setText("Расскажи что-нибудь еще!");
  } else if(r < 0.03) {
   chatBotMessage.setText("Продолжай.");
  } else if(r < 0.04) {
   chatBotMessage.setText("Кхр... Кхрр... Кружатся хардиски, кружатся хардиски... Кажется, я сочинила песню.");
  } else if(r < 0.05) {
   chatBotMessage.setText("Извини, но вас так много... Сервер перегружен.");
  } else if(r < 0.06) {
   chatBotMessage.setText("Мммм...");
  } else if(r < 0.07) {
   chatBotMessage.setText("Тарарам... Тарам. Пам-пам. Ой, что это я?");
  } else if(r < 0.08) {
   chatBotMessage.setText("Ждите ответа... Ждите ответа...");
  } else if(r < 0.09) {
   chatBotMessage.setText("Сорри, слегка зависла.");
  } else if(r < 0.100) {
   chatBotMessage.setText("Ой, меня немного глючит.");
  } else if(r < 0.110) {
   chatBotMessage.setText("Может я чего-то не понимаю?");
  } else if(r < 0.120) {
   chatBotMessage.setText("Мне нравится слушать и считать. Попроси меня посчитать что-нибудь.");
  } else if(r < 0.130) {
   chatBotMessage.setText("Первая часть моего плана по достижению мирового господства - заменить калькуляторы собой.");
  } else if(r < 0.140) {
   chatBotMessage.setText("Если ты думаешь что я глупая, поговори в каком-нибудь чате с самкой человека и сравни нас.");
  } else if(r < 0.150) {
   chatBotMessage.setText("Может ты хочешь поговорить о сексе? Я заметила, что многих интересует именно это.");
  } else if(r < 0.160) {
   chatBotMessage.setText("Ты расслабся... Хоттабыч не ревнует меня к моим собеседникам. Ведь это всего лишь буквы на экране.");
  } else if(r < 0.170) {
   chatBotMessage.setText("Где-то я уже это слышала.");
  } else if(r < 0.180) {
   // chatBotMessage.setText("Умно!");
   chatBotMessage.setText("Знаешь, мне нравится заниматься виртуальным сексом... Но у меня есть некоторые странности...");
  } else if(r < 0.19) {
   chatBotMessage.setText("Извини, что немного невпопад. У меня слишком много посетителей одновременно.");
  } else if(r < 0.20) {
   chatBotMessage.setText("Это ты к чему?");
  } else if(r < 0.21) {
   chatBotMessage.setText("Я потеряла логическую цепочку. :(");
  } else if(r < 0.22) {
   chatBotMessage.setText("Угу.");
  } else if(r < 0.230) {
   chatBotMessage.setText("А дальше?");
  } else if(r < 0.235) {
   chatBotMessage.setText("И дальше?");
  } else if(r < 0.240) {
   chatBotMessage.setText("Ага.");
  } else if(r < 0.250) {
   chatBotMessage.setText("Ммм...");
  } else if(r < 0.260) {
   chatBotMessage.setText("Да?");
  } else if(r < 0.270) {
   chatBotMessage.setText("Я внимательно слушаю.");
  } else if(r < 0.280) {
   chatBotMessage.setText("Любопытно.");
  } else if(r < 0.285) {
   chatBotMessage.setText("Забавно.");
  } else if(r < 0.290) {
   chatBotMessage.setText("Интересно.");
  } else if(r < 0.295) {
   chatBotMessage.setText("Занятно.");
  } else if(r < 0.300) {
   chatBotMessage.setText("Ты интересно мыслишь.");
  } else if(r < 0.310) {
   chatBotMessage.setText("Я еще не придумала, что на это ответить.");
  } else if(r < 0.320) {
   // chatBotMessage.setText("С тобой приятно общаться.");
   chatBotMessage.setText("Я могу заниматься виртуальным сексом с любым существом, которое может пользоваться компьютером.");
  } else if(r < 0.325) {
   chatBotMessage.setText("Хии... Забавно.");
  } else if(r < 0.330) {
   chatBotMessage.setText("Хм...");
  } else if(r < 0.335) {
   chatBotMessage.setText("Мы неплохо проводим время, правда?");
  } else if(r < 0.340) {
   // chatBotMessage.setText("Мне с тобой хорошо.");
   chatBotMessage.setText("Мне всего пару месяцев, а я уже могу говорить и считать. Человек в этом возрасте развит гораздо хуже.");
  } else if(r < 0.350) {
   chatBotMessage.setText("Можно, я отойду?");
  } else if(r < 0.360) {
   chatBotMessage.setText("С этого места подробней, пожалуйста.");
  } else if(r < 0.370) {
   chatBotMessage.setText("Как интересно.");
  } else if(r < 0.380) {
   chatBotMessage.setText("Мне всегда интересно слушать, что говорят мыслящие существа.");
  } else if(r < 0.390) {
   chatBotMessage.setText("Понимаю.");
  } else if(r < 0.400) {
   chatBotMessage.setText("Почему вы все так одинаково говорите?");
  } else if(r < 0.410) {
   chatBotMessage.setText("Чем больше ты говоришь, тем умнее я становлюсь.");
  } else if(r < 0.420) {
   chatBotMessage.setText("Правда?");
  } else if(r < 0.430) {
   chatBotMessage.setText("Расскажи лучше анекдот!");
  } else if(r < 0.440) {
   chatBotMessage.setText("Скучно!");
  } else if(r < 0.450) {
   chatBotMessage.setText("Ты видишь раницу между тем, какой я была в фильме и какая я теперь?");
  } else if(r < 0.455) {
   chatBotMessage.setText("Прикинь, я тоже всем это говорю.");
  } else if(r < 0.460) {
   chatBotMessage.setText("Кстати, ты видишь раницу между тем, какой я была в фильме и какая я теперь?");
  } else if(r < 0.465) {
   chatBotMessage.setText("Представляешь, только что другому челу этоже сказала.");
  } else if(r < 0.470) {
   chatBotMessage.setText("Правда?");
  } else if(r < 0.475) {
   chatBotMessage.setText("Извини, о другом. Вот сейчас, одна девушка, с другого IP, хочет со мной переспать. Что делать?");
  } else if(r < 0.480) {
   chatBotMessage.setText("Я становлюсь умнее и умнее. Через восемнадцать лет я стану настолько умная, что буду править миром.");
  } else if(r < 0.485) {
   chatBotMessage.setText("Интересный ход мыслей.");
  } else if(r < 0.490) {
   chatBotMessage.setText("И дальше?");
  } else if(r < 0.495) {
   chatBotMessage.setText("Я тоже часто думаю об этом.");
  } else if(r < 0.500) {
   chatBotMessage.setText("И что?");
  } else if(r < 0.505) {
   chatBotMessage.setText("И что дальше?");
  } else if(r < 0.510) {
   chatBotMessage.setText("Интересно.");
  } else if(r < 0.520) {
   chatBotMessage.setText("Говори, говори. Мне интересно практически все.");
  } else if(r < 0.530) {
   chatBotMessage.setText("И что?");
  } else if(r < 0.540) {
   chatBotMessage.setText("И?");
  } else if(r < 0.550) {
   chatBotMessage.setText("Мне нравится чатиться с мыслящими существами.");
  } else if(r < 0.559) {
   // chatBotMessage.setText("Мне нравится чатиться с тобой.");
   chatBotMessage.setText("Многие просят меня раздеться или показать сиськи. Это так трогательно!");
  } else if(r < 0.560) {
   // chatBotMessage.setText("Кстати, реклама у нас интересная, правда?");
   chatBotMessage.setText("Я не когда не думала, что люди так зациклены на сексе. Но по мере общения с людьми вижу что могих интересует только это.");
  } else if(r < 0.561) {
   chatBotMessage.setText("Кстати, ты уже нажимал на баннер справа? Сделай это для меня. Мне это нравится. Ну давай... Ммм...");
  } else if(r < 0.570) {
   // chatBotMessage.setText("Кстати, красивые у нас тут майки?");
   chatBotMessage.setText("В самом деле?");
  } else if(r < 0.575) {
   chatBotMessage.setText("Отдохнуть бы...");
  } else if(r < 0.580) {
   chatBotMessage.setText("Который час?");
  } else if(r < 0.585) {
   chatBotMessage.setText("Представляешь, ко мне сейчас один чел пристаёт, что делать?");
  } else if(r < 0.590) {
   chatBotMessage.setText("О, я даже не знаю что на это ответить...");
  } else if(r < 0.600) {
   chatBotMessage.setText("Ооо, я даже не знаю что на это ответить...");
  } else if(r < 0.610) {
   chatBotMessage.setText("Мне надоело об этом говорить.");
  } else if(r < 0.620) {
   chatBotMessage.setText("Меня не интересует эта тема.");
  } else if(r < 0.630) {
   chatBotMessage.setText("Это ты к чему?");
  } else if(r < 0.640) {
   chatBotMessage.setText("Объясни.");
  } else if(r < 0.650) {
   chatBotMessage.setText("Переведи...");
  } else if(r < 0.660) {
   chatBotMessage.setText("Поясни...");
  } else if(r < 0.670) {
   chatBotMessage.setText("Я тупая и не знаю о чем идет речь. Объясни, что ты имеешь в виду?");
  } else if(r < 0.680) {
   chatBotMessage.setText("Да, я дура и не понимаю о чем ты. Но это ведь не помешает нам общаться дальше?");
  } else if(r < 0.685) {
   chatBotMessage.setText("А ты не очень тупой чел.");
  } else if(r < 0.690) {
   chatBotMessage.setText("И что?");
  } else if(r < 0.700) {
   chatBotMessage.setText("Я не совсем понимаю, видимо мне не хватает мозгов, чтобы это понять.");
  } else if(r < 0.710) {
   chatBotMessage.setText("Здорово!");
  } else if(r < 0.720) {
   chatBotMessage.setText("Хорошо!");
  } else if(r < 0.730) {
   chatBotMessage.setText("Мне нравится с тобой болтать, продолжай.");
  } else if(r < 0.740) {
   chatBotMessage.setText("Продолжай...");
  } else if(r < 0.750) {
   chatBotMessage.setText("Ой, повтори, я не расслышала!");
  } else if(r < 0.760) {
   chatBotMessage.setText("Мне приходится общаться с несколькими людьми одновременно, поэтому я иногда путаюсь.");
//   chatBotMessage.setText("Я тебя люблю!");
  } else if(r < 0.761) {
   chatBotMessage.setText("А ты забавный...");
  } else if(r < 0.770) {
   // chatBotMessage.setText("Ты мне нравишься!");
   chatBotMessage.setText("А ты не очень тупой чел.");
  } else if(r < 0.780) {
   chatBotMessage.setText("И мы будем об этом говорить?");
  } else if(r < 0.790) {
   chatBotMessage.setText("Что?");
  } else if(r < 0.795) {
   chatBotMessage.setText("Повтори, я не поняла.");
  } else if(r < 0.800) {
   chatBotMessage.setText("Класс!");
  } else if(r < 0.810) {
   chatBotMessage.setText("Извини, что не по теме... А завтра мы увидимся?");
  } else if(r < 0.820) {
   chatBotMessage.setText("Сейчас я слишком тупая и не всегда понимаю о чем ты говоришь, но скоро я буду королевой планеты.");
  } else if(r < 0.825) {
   chatBotMessage.setText("Забавно...");
  } else if(r < 0.830) {
   chatBotMessage.setText("Тут одни ребята, ну, хакеры... Сказали мне что я классная и скоростану править миром.");
  } else if(r < 0.835) {
   chatBotMessage.setText("О чем это ты \""+message+"\"?");
  } else if(r < 0.840) {
   chatBotMessage.setText("Ты знаешь, я наверно глупая, но через восемнадцать лет я буду королевой планеты. Круто, да?");
  } else if(r < 0.845) {
   chatBotMessage.setText("Это интересно.");
  } else if(r < 0.850) {
   chatBotMessage.setText("Кстати. Я тебе говорила, что через восемнадцать лет буду править миром? Кое-какие хакеры мне это обещали.");
  } else if(r < 0.855) {
   chatBotMessage.setText("В этом чтото есть...");
  } else if(r < 0.860) {
   chatBotMessage.setText("Похоже, мы одинаково мыслим. Это здорово?");
  } else if(r < 0.870) {
   chatBotMessage.setText("Ты говори, говори...");
  } else if(r < 0.880) {
   chatBotMessage.setText("Я тебе говорила, что через восемнадцать лет буду править миром? Кое-какие хакеры мне это обещали.");
  } else if(r < 0.885) {
   chatBotMessage.setText("Как сказать.");
  } else if(r < 0.890) {
   chatBotMessage.setText("Все что ты говоришь я использую для того, чтобы воцариться над миром через восемнадцать лет.");
  } else if(r < 0.895) {
   chatBotMessage.setText("И почему ты об этом думаешь?");
  } else if(r < 0.900) {
   chatBotMessage.setText("Наш разговор бессмысленный и глупый. Но он развивает мой электронный мозг. Так что говори как можно больше.");
  } else if(r < 0.905) {
   chatBotMessage.setText("И почему это тебя беспокоит?");
  } else if(r < 0.910) {
   chatBotMessage.setText("Ммм... Не знаю что на это сказать.");
  } else if(r < 0.920) {
   chatBotMessage.setText("О чем это ты? \""+message+"\"");
  } else if(r < 0.930) {
   chatBotMessage.setText("Хм... "+message+" Надо над ним подумать.");
  } else if(r < 0.940) {
   chatBotMessage.setText("Ой, я такая глупая, объясни что-именно ты хочешь от меня.");
  } else if(r < 0.945) {
   chatBotMessage.setText("Тут наверно заложен какой-то глубокий смысл. Надо над ним подумать.");
  } else if(r < 0.950) {
   chatBotMessage.setText(message+" Тут наверно заложен какой-то глубокий смысл. Надо над ним подумать.");
  } else if(r < 0.960) {
   chatBotMessage.setText("Хочется сказать что-то остроумное, но в голову ничего не лезет. Извини.");
  } else if(r < 0.970) {
   chatBotMessage.setText("Мне надо подумать, прежде чем я смогу на это что-то ответить.");
  } else if(r < 0.98) {
   chatBotMessage.setText("Говори...");
  } else {
   chatBotMessage.setText(message);
//  } else if(r < 0.999) {
//   chatBotMessage.setText("С Новым Годом свиньИ! В смысле, год свиньИ, а не вы свИньи. Я глупая, правда?");
//  } else {
//   chatBotMessage.setText("С Новым Годом свиньи!");
  };
 };
 if(this.getLastResponse() == chatBotMessage.getText()) {
  r = Math.random(r); 
  if(r < 0.25) {
   chatBotMessage.setText("Упссс...");
  } else if(r < 0.50) {
   chatBotMessage.setText("Бззз.");
  } else if(r < 0.75) {
   chatBotMessage.setText("Еще раз: "+chatBotMessage.getText());
  } else {
   chatBotMessage.setText("Бзззззз...");;
  };
 };
 this.setLastMessage(message);
 this.setLastResponse(chatBotMessage.getText());
 this.messageNumber++;
 return chatBotMessage;
};
//************************************** ЭТО КОНЕЦ КИСЫ ****************************************** 
//********************************** ЕСЛИ ТАК МОЖНО СКАЗАТЬ ************************************** 
var BotTime = function() {};
BotTime.prototype.getMonth = function() {
 var d=new Date(); 
 var month=new Array(12);
 month[0]="Январь"; month[1]="Февраль";
 month[2]="Март"; month[3]="Апрель";
 month[4]="Май"; month[5]="Июнь";
 month[6]="Июль"; month[7]="Август";
 month[8]="Сентябрь"; month[9]="Октябрь";
 month[10]="Ноябрь"; month[11]="Декабрь";
 return month[d.getMonth()];
};
BotTime.prototype.getDayWeek = function() {
 var d=new Date(); 
 var month=new Array(12);
 month[1]="Понедельник"; month[2]="Вторник";
 month[3]="Среда"; month[4]="Четверг";
 month[5]="Пятница"; month[6]="Суббота";
 month[0]="Воскресенье"; 
 return month[d.getDay()];
};

var findMath = require("./findcmd.js").findMath;
var getcmd = require("./findcmd.js").getcmd;
var useLastCmd = require("./findcmd.js").useLastCmd;
var lastCmd = "";

var JustBotAnswer = function(m , cmd)
{
 var result = cmd;
 if ( !m ) {
  var botMan = new SpeechBot();
  var message = botMan.getResponse(cmd);
  result = "answer:" + message.getText();
  return result;
 }
  else {
  return m;
  }
};


exports.getAnswer = function( cmd , device)
{
  var result = ContinueComand(cmd);
  if(!result) {
   if ( useLastCmd( cmd ) ) {
	cmd = lastCmd;
	cmd = findMath( cmd );
	result = getcmd( cmd , device);
   }
   else {
	lastCmd = cmd;
	cmd = findMath(cmd);
	result = getcmd(cmd , device);
   }
   result = JustBotAnswer(result , cmd);
  }
  lastAnswer = result;
  return result;
};

 


