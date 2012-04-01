// https://github.com/WebReflection/wru
function wru(wru){var assert=wru.assert,async=wru.async,log=wru.log;
    
    var createMockDateTime = function(timestamp){
        var dateTime = {
            now : function(){
                return timestamp;
            }
        };
        return dateTime;
    }

    var createMockUniqueIdGenerator = function(){
        var currentId = 0;
        var generator = {
            getId : function(params){
                currentId += 1;
                params.success(currentId);
            }
        }
        return generator;
    }

wru.test([
    {
        name: "Can't create task without userId. Task creation is async.",
        test: function () {

            //We can't tell WRU to wait for it... it will never be called
            var taskCreationSuccess =  function(task){
                wru.assert(false);
            };

            //We tell WRU to wait for it with async
            var taskCreationError =  async(function(error){
                wru.assert(true);
            });

            var taskFactory = require('../model/task');
            taskFactory.create(
                {
                    success: taskCreationSuccess,
                    error  : taskCreationError
                }
            );
        }
    },
    {
        name: "Task shoud be created with userId and dateTime object and unique generator",
        test: function () {

            var taskCreationSuccess =  async(function(task){
                wru.assert(true);
            });

            var taskCreationError =  function(error){
                assert(false);
            };

            var taskFactory = require('../model/task');
            taskFactory.create(
                {
                    userId:"1234",
                    dateTime: createMockDateTime(1234),
                    uniqueIdGenerator: createMockUniqueIdGenerator(),
                    success: taskCreationSuccess,
                    error: taskCreationError
                }
            );
            
        }
    },
    {
        name: "Task can be created with an optional description",
        test: function () {
           var taskCreationSuccess =  async(function(task){
                wru.assert(true);
            });

            var taskCreationError =  function(error){
                assert(false);
            };

            var taskFactory = require('../model/task');
            taskFactory.create(
                {
                    userId:"1123323",
                    dateTime:createMockDateTime(1234),
                    description:"Bla bla bla",
                    uniqueIdGenerator: createMockUniqueIdGenerator(),
                    success: taskCreationSuccess,
                    error: taskCreationError
                }
            );
            
        }
    },
    {
        name: "Newly created task should have a creation timestamp",
        test: function(){
            var taskCreationSuccess =  async(function(task){
                assert(task.wasBorn() === 1331837030);
            });

            var taskCreationError =  function(error){
                assert(false);
            };

            var taskFactory = require('../model/task');
            taskFactory.create(
                {
                    userId:"123",
                    dateTime: createMockDateTime(1331837030),
                    uniqueIdGenerator: createMockUniqueIdGenerator(),
                    success: taskCreationSuccess,
                    error: taskCreationError
                }
            );
            
        }
    },
    {
        name: "Task should be able to expose a dto of his internal state",
        test: function(){
            var taskCreationSuccess =  async(function(task){
                assert(task.getDto() !== undefined);
            });

            var taskCreationError =  function(error){
                assert(false);
            };

            var taskFactory = require('../model/task');
            taskFactory.create(
                {
                    userId:"123",
                    dateTime: createMockDateTime(1331837030),
                    uniqueIdGenerator: createMockUniqueIdGenerator(),
                    description: "Task description",
                    success: taskCreationSuccess,
                    error: taskCreationError
                }
            );
        }
    },
    {
        name: "Task should notyfy its creation to external observers",
        test: function(){
            var taskCreationSuccess =  async(function(task){
                assert(true);
            });

            var taskCreationError =  function(error){
                assert(false);
            };

            var taskFactory = require('../model/task');
            
            var observerCb = async(function(data){
                assert(true);
            });
            
            taskFactory.create(
                {
                    userId:"123",
                    dateTime: createMockDateTime(1331837030),
                    uniqueIdGenerator: createMockUniqueIdGenerator(),
                    description: "Task description",
                    onTaskCreated: observerCb,
                    success: taskCreationSuccess,
                    error: taskCreationError
                }
            );
        }
    }
]);




}





// wru related code
var setTimeout=global.setTimeout,setInterval=global.setInterval,clearInterval=global.clearInterval,clearTimeout=global.clearTimeout;setTimeout||(function(h,c,g,a){setInterval=global.setInterval=function b(j,i){return e(j,i,g.call(arguments,2),1)};setTimeout=global.setTimeout=function d(j,i){return e(j,i,g.call(arguments,2))};clearInterval=global.clearInterval=clearTimeout=global.clearTimeout=function f(i){c[i].cancel();h.purge();delete c[i]};function e(l,k,j,i){var m=++a;c[m]=new JavaAdapter(java.util.TimerTask,{run:function(){l.apply(null,j)}});i?h.schedule(c[m],k,k):h.schedule(c[m],k);return m}})(new java.util.Timer(),{},[].slice,0);
/*!
(C) Andrea Giammarchi, @WebReflection - Mit Style License
*/
wru(function(U){
/*!
(C) Andrea Giammarchi, @WebReflection - Mit Style License
*/
function h(){w=F.call(j);if(w){if(typeof w=="function"){w={name:w[O]||"anonymous",test:w}}l(Z);l((ad(w,O)&&w[O])||(ad(w,e)&&w[e])||L);a=[];q=[];P=[];X={};b("setup");P[ae]||b("test");I||n()}else{p()}}function l(ah,ag){ah=ah+(ag?"":"\n");try{require("util").print(ah)}catch(af){try{require("sys").print(ah)}catch(af){try{java.lang.System.out.print(ah)}catch(af){console.log(ah)}}}}function p(){l(g);l(Z);switch(true){case !!aa:l(N+"   "+aa+" Errors");case !!z:l(J+g+z+" Failures");default:l(y+"      "+o+" Passes")}l(Z);l(g);try{process.exit()}catch(af){quit()}}function c(af){for(var ag=0,ah=af[ae];ag<ah;l("    "+(++ag)+". "+af[ag-1])){}}function n(){f();o+=a[ae];z+=q[ae];aa+=P[ae];if(P[ae]){S=N;c(P)}else{if(q[ae]){S=J;c(q)}else{S=y}}l(S+" passes: "+a[ae]+", fails: "+q[ae]+", errors: "+P[ae]);H=0;S=g;h()}
/*!
(C) Andrea Giammarchi, @WebReflection - Mit Style License
*/
function b(af){if(ad(w,af)){try{w[af](X)}catch(ag){W.call(P,g+ag)}}}function ad(ag,af){return m.call(ag,af)}function s(){return B()<0.5?-1:1}function f(){if(M){C(M);M=0}b("teardown")}
/*!
(C) Andrea Giammarchi, @WebReflection - Mit Style License
*/
var V={assert:function Q(ag,af){if(arguments[ae]==1){af=ag;ag=L}v=D;W.call(af?a:q,S+ag);return af},async:function R(ag,aj,ah,ai){ai=++I;if(typeof ag=="function"){ah=aj;aj=ag;ag="asynchronous test #"+ai}ah=T(function(){ai=0;W.call(q,ag);--I||(M=T(n,0))},G(ah||u)||u);return function af(){if(!ai){return}v=ab;S=ag+": ";try{aj.apply(this,arguments)}catch(ak){v=D;W.call(P,S+ak)}S=g;if(v){C(ah);--I||(M=T(n,0))}}},test:function k(af){j=E.apply(j,[af]);V.random&&ac.call(j,s);I||h()}}
/*!
(C) Andrea Giammarchi, @WebReflection - Mit Style License
*/
,D=true,ab=!D,u=100,g=" ",L="unknown",ae="length",O="name",e="description",A="<li>",d="</li>",i="\\|/-",m=V.hasOwnProperty,S=g,Y=S.charAt,t=S.slice,j=[],E=j.concat,r=j.join,W=j.push,F=j.shift,ac=j.sort,I=0,H=0,o=0,z=0,aa=0,M=0
/*!
(C) Andrea Giammarchi, @WebReflection - Mit Style License
*/
,N="\033[1;31mERROR\033[0m",J="\033[0;31mFAILURE\033[0m",y="\033[0;32mOK\033[0m",Z="------------------------------"
/*!
(C) Andrea Giammarchi, @WebReflection - Mit Style License
*/
,x,G,B,T,C,w,K,a,q,P,X,v;
/*!
(C) Andrea Giammarchi, @WebReflection - Mit Style License
*/
V.log=function(ah,ag){try{if(ag){throw new Error}console.log(ah)}catch(af){l(ah,0)}};
/*!
(C) Andrea Giammarchi, @WebReflection - Mit Style License
*/
if(typeof global!="function"){U.wru=V;U.assert=V.assert;U.async=V.async;U.test=V.test;U.log=V.log;U.random=false;U=global;
/*!
(C) Andrea Giammarchi, @WebReflection - Mit Style License
*/
}x=U.Math;G=x.abs;B=x.random;T=U.setTimeout;C=U.clearTimeout;
/*!
(C) Andrea Giammarchi, @WebReflection - Mit Style License
*/
U.setInterval(function(){I&&l(g+Y.call(i,H++%4)+"\b\b",true)},u);
/*!
(C) Andrea Giammarchi, @WebReflection - Mit Style License
*/
/*!
(C) Andrea Giammarchi, @WebReflection - Mit Style License
*/
undefined;u*=u;V.random=ab;return V}(this));