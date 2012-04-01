NodoMoro
========
NodeJS + Pomodoro = NodoMoro


Pomodoro Technique
------------------

The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. The technique uses a timer to break down periods of work into 25-minute intervals called 'Pomodoros' (from the Italian word for 'tomatoes') separated by breaks. Closely related to concepts such as timeboxing and iterative and incremental development used in software design, the method has been adopted in pair programming contexts. The method is based on the idea that frequent breaks can improve mental agility.

There are five basic steps to implementing the technique:

- decide on the task to be done
- set the pomodoro (timer) to 25 minutes
- work on the task until the timer rings; record with an x
- take a short break (5 minutes)
- every four "pomodoros" take a longer break (15–20 minutes)

NodeJS
------
Node.js is a software system designed for writing scalable internet applications, notably web servers. Programs are written in JavaScript, using event-driven, asynchronous I/O to minimize overhead and maximize scalability. Node.js consists of Google's V8 JavaScript engine plus several built-in libraries.

Prerequisites and instructions
------------------------------
Nodomoro will (at some point in a near or far future) use a redis backend to store data. In order to make it work you should install redis from any source. App is configured to work with redis server listening on:

`127.0.0.1:6379`

To use redis inside node app nodomoro relies on redis_client and hiredis. To install them you can go to the app root and type:

`npm install`

Dependencies well be automagically satisfied.


Contact us
----------
This project follows the "just for fun"(TM) principle. We discuss, we reinvent the wheel and then we start it over. If you are italian and you are interested in it we have a google group[1] where you can share fun with us.

[1] https://groups.google.com/forum/#!forum/nodomoro