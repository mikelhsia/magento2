/* Set website storage */
/***********************/
function onKeyPress () {
	var keycode;
	var enter_num = localStorage.getItem("NUM_ENTER");;

	if (window.event) {
		keycode = window.event.keyCode;
		enter_num++;
	} else if (e) {
		keycode = e.which;
		enter_num++;
	} else {
		return true;
		enter_num++;
	}

	if (keycode == 13) {
		alert("Enter Num = " + enter_num);
		if (enter_num < 12) {
			// 保存数据 JSON
			var site = new Object;
			site.keyname = '123';
			site.sitename = '321';
			site.siteurl = '3121123';
			var str = JSON.stringify(site);
			alert("Object in JSON string" + str);
			var site2 = JSON.parse(str);
			alert("Parsed JSON" + site2.sitename + ': ' + site2.siteurl);
			//*****************

			localStorage.setItem("NUM_ENTER",enter_num);
		} else {
			localStorage.removeItem("NUM_ENTER");
			// localStorage.clear();
		}
		return false;
	}
	return true;
}
document.onkeypress = onKeyPress;

/* Set progress value */
/***********************/
function valuePlus () {
	var z = document.getElementById("pg");
	z.value += 1;
	if (z.value === 100) {
		z.value = 0;
	}
}
setInterval(valuePlus, 200);

/* Get Geolocation */
/***********************/
var x = document.getElementById("demo");
function getLocation() {
	if (navigator.geolocation) {
		// watchPosition() - 返回用户的当前位置，并继续返回用户移动时的更新位置（就像汽车上的 GPS）。
		// clearWatch() - 停止 watchPosition() 方法
		navigator.geolocation.getCurrentPosition(showPosition,showError);
	} else {
		x.innerHTML="Geolocation is not supported by this browser.";
	}
}

function showPosition(position) {
	x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;

	/* Google Map kit
	var latlon = position.coords.latitude + "," + position.coords.longitude;
	var img_url = "https://maps.googleapis.com/maps/api/staticmap?center= "+latlon+"&zoom=14&size=400x300&sensor=false";
    document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
	*/
}

function showError(error) {
	switch(error.code) {
		case error.PERMISSION_DENIED:
			x.innerHTML="User denied the request for geolocation.";
			break;
		case error.POSITION_UNAVAILABLE:
			x.innerHTML="Location information is unavailable.";
			break;
		case error.TIMEOUT:
			x.innerHTML="The request to get user location timed out.";
			break;
		case error.UNKNOWN_ERROR:
			x.innerHTML="An unknown error occurred.";
			break;
	}
}


/* Drawing in Canvas */
/***********************/
function testing() {
	var canvas = document.getElementById("myCanvas");
	// Create context object
	// getContext("2d") object 是内建的HTML5 object 拥有多种绘制路径，矩形，圆形，字符，以及添加图像的方法
	var ctx = canvas.getContext("2d"); 
	// Draw Rectangle
	ctx.fillStyle="#FFFF00";
	ctx.fillRect(10,10,150,75);

	// Move, and line, and then Stroke to draw the line
	ctx.moveTo(0,0);
	ctx.lineTo(150,75);
	ctx.stroke();

	// Draw circle
	// beginPath() 方法开始一条路径，或重置当前的路径。
	ctx.beginPath(); 
	ctx.arc(95,50,40,0,2*Math.PI);
	ctx.stroke();

	// Draw text
	ctx.font="30px Arial";
	ctx.fillStyle="#DD00EA";
	ctx.fillText("Hello World!",30,50);
	ctx.strokeText("You're Welcome!",70,90);

	// Gradient shape
	// createLinearGradient(x,y,x1,y1) - 创建线条渐变
	// 1. Create Gradient
	var grd = ctx.createLinearGradient(0,0,200,0);
	grd.addColorStop(0,"red");
	grd.addColorStop(1,"white");
	// 2. Fill with gradient
	ctx.fillStyle=grd;
	ctx.fillRect(100,100,150,200);
	// createRadialGradient(x,y,r,x1,y1,r1) - 创建一个径向/圆渐变
	ctx.beginPath(); 
	var grd1 = ctx.createRadialGradient(75,50,5,90,60,100);
	grd1.addColorStop(0,"yellow");
	grd1.addColorStop(1,"green");
	// 2. Fill with gradient
	ctx.fillStyle=grd1;
	ctx.fillRect(80,100,150,80);

	// Draw image
	var image = document.getElementById("image");
	ctx.drawImage(image,300,100);
}


/* ondragover, ondragstart, ondrop */
/***********************/
// ondragstart 属性调用了一个函数，drag(event)，它规定了被拖动的数据。 dataTransfer.setData() 方法设置被拖数据的数据类型和值：
// 在这个例子中，数据类型是 "Text"，值是可拖动元素的 id ("drag1")。
function drag(ev) {
	ev.dataTransfer.setData("Text", ev.target.id);
}

// 调用 preventDefault() 来避免浏览器对数据的默认处理（drop 事件的默认行为是以链接形式打开）
// 通过 dataTransfer.getData("Text") 方法获得被拖的数据。该方法将返回在 setData() 方法中设置为相同类型的任何数据。
// 被拖数据是被拖元素的 id ("drag1") 把被拖元素追加到放置元素（目标元素）中
function drop(ev) {
	ev.preventDefault();

	var data = ev.dataTransfer.getData("Text");
	var el = document.getElementById(data);
	ev.target.appendChild(el);
	el.style.width = el.parentNode.style.width;
	el.style.height = el.parentNode.style.height;
	//alert( "Node name: " + el.parentNode.nodeName + ", x: " + el.parentNode.style.width + ", y: " + el.parentNode.style.height);
}

// ondragover 事件规定在何处放置被拖动的数据。
// 默认地，无法将数据/元素放置到其他元素中。如果需要设置允许放置，我们必须阻止对元素的默认处理方式。 这要通过调用 ondragover 事件的 event.preventDefault() 方法：
function allowDrop(ev) {
	ev.preventDefault();
}


/* HTML5 Web SQL */
/***********************/
// openDatabase：这个方法使用现有的数据库或者新建的数据库创建一个数据库对象。
// transaction：这个方法让我们能够控制一个事务，以及基于这种情况执行提交或者回滚。
// executeSql：这个方法用于执行实际的 SQL 查询。

// 参数：数据库名称 版本号 描述文本 数据库大小 创建回调;第五个参数，创建回调会在创建数据库后被调用。
var db = openDatabase('mydb', '1.0', 'Test DB description', 2*1024*1024);
var msg;
var db_id = 3;
var db_log = "www.runoob.com";
db.transaction(function(tx) {
	tx.executeSql('create table if not exists logs(id unique, log)');
	tx.executeSql('insert into logs (id, log) values (1, "Birdy Runboo")');
	tx.executeSql('insert into logs (id, log) values (2, "123123")');
	var ttt = 'insert into logs (id, log) values (' + db_id + ', \"' + db_log +'\")';
	tx.executeSql(ttt);
//	tx.executeSql('insert into logs (id, log) values (?, ?'), [db_id, db_log];
	msg = '<p>数据表已创建，且插入了两条数据。</p>';
    document.querySelector('#status').innerHTML =  msg;
});

db.transaction(function(tx) {
	tx.executeSql('select * from logs', [], function (tx, results){
		var len = results.rows.length, i;
		msg = "<p>查询记录条数： " + len + "</p>";
		document.querySelector('#status').innerHTML += msg;

		msg = "<ul>";
	    document.querySelector('#status').innerHTML +=  msg;
		for (var i = 0; i < len; i++) {
			msg = "<p><li><b>" + results.rows.item(i).log + "</b></li></p>";
	        document.querySelector('#status').innerHTML +=  msg;
			// alert(results.rows.item(i).log);
		}
		msg = "</ul>";
	    document.querySelector('#status').innerHTML +=  msg;
	}, null);
});

db.transaction(function(tx) {
	tx.executeSql('Delete from logs where id = 1');
	tx.executeSql('Delete from logs where id = 2');
	tx.executeSql('Delete from logs where id = 3');
	msg = '<p>删除 id 为 1,2,3 的记录。</p>';
	document.querySelector('#status').innerHTML +=  msg;

});

/* Test web worker and create web worker accordingly */
/***********************/
if (typeof(w) == 'undefined') {
	w = new Worker("test_workers.js");
}

w.onmessage = function(event) {
	document.getElementById("result".innerHTML = event.data);
}

var w;
 
function startWorker() {
	if(typeof(Worker) !== "undefined") {
		if(typeof(w) == "undefined") {
			w = new Worker("test_workers.js");
		}
		w.onmessage = function(event) {
			// Or I can append child element or replace innerHTML when data is fetched
			document.getElementById("result").innerHTML = event.data;
		};
	} else {
		document.getElementById("result").innerHTML = "抱歉，你的浏览器不支持 Web Workers...";
	}
}
 
function stopWorker() { 
	if (w) {
		w.terminate();
		w = undefined;
	}
}


/* Server-Sent events */
/***********************/
/* 方法
 - onopen		当通往服务器的连接被打开
 - onmessage	当接收到消息
 - onerror		当发生错误
*/
/*
if (typeof(EventShource)) {	
	var source = new EventSource("test_sse.php");

	source.onmessage=function() {
		document.getElementById('result').innerHTML += event.data + "<br/>";
	}
} else {
	document.getElementById('result').innerHTML += "浏览器不支持Server-Sent<br/>";
}
*/


/* HTML5 websocket */
// http://www.runoob.com/html/html5-websocket.html
/***********************/
/*
----------------------------------------------------------------------------------
| WebSocket 协议本质上是一个基于 TCP 的协议。
| 为了建立一个 WebSocket 连接，客户端浏览器首先要向服务器发起一个 HTTP 请求，这个请求和通常的 HTTP 请求不同，
| 包含了一些附加头信息，其中附加头信息"Upgrade: WebSocket"表明这是一个申请协议升级的 HTTP 请求，服务器端解析
| 这些附加的头信息然后产生应答信息返回给客户端，客户端和服务器端的 WebSocket 连接就建立起来了，双方就可以通
| 过这个连接通道自由的传递信息，并且这个连接会持续存在直到客户端或者服务器端的某一方主动的关闭连接。
----------------------------------------------------------------------------------
var Socket = new WebSocket(url, [protocal] );
**********************************************
WebSocket 属性
 - Socket.readyState	只读属性 readyState 表示连接状态，可以是以下值：
	0 - 表示连接尚未建立。
	1 - 表示连接已建立，可以进行通信。
	2 - 表示连接正在进行关闭。
	3 - 表示连接已经关闭或者连接不能打开。
 - Socket.bufferedAmount	只读属性 bufferedAmount 已被 send() 放入正在队列中等待传输，但是还没有发出的 UTF-8 文本字节数
**********************************************
WebSocket 属性
 - open	    Socket.onopen	    连接建立时触发
 - message	Socket.onmessage	客户端接收服务端数据时触发
 - error	Socket.onerror	    通信发生错误时触发
 - close	Socket.onclose	    连接关闭时触发
**********************************************
WebSocket 方法
 - Socket.send()	使用连接发送数据
 - Socket.close()	关闭连接
*/

/* Create element */
/***********************/
//document.createElement("");




/*****************************************************************************
 It's a good idea to place scripts at the bottom of the <body> element. This can improve page load, because HTML display is not blocked by scripts loading.
 Also placing a Vavascript in an external file has the following advantages:
 - It seperates HTML and code
 - It makes HTML and Javascript easier to read and maintain
 - Cached JavaScript files can speed up page loads
*****************************************************************************/
