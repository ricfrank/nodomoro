/*
  nome classe: HttpRequest(ReqType,url,bool)

  Parametri istanza:
  ReqType = tipo richiesta GET o POST
  url = script php asp ecc. da eseguire sul server
  bool = true richesta asincrona - false richiesta sincrona

  Metodi Pubblici:
  debugResponse() Utilissimo per il debug della richiesta. Visualizza in una nuova
                  pagina in formato testo html o xml i dati ricevuti dalla richiesta
                  asincrona o sincrona.

  getRequest() Restituisce l'oggetto Request;
  setHeaderContentType() Imposta header ContentType default application/x-www-form-urlencoded;charset=utf-8 ;

  Eventi esportati oggetto Request:

  OnRequestCreate()         Evento generato alla creazione della richiesta
  OnRequestOpen()           Evento generato all'apertura della richiesta
  OnRequestSend()           Evento generato all'invio della richiesta con il metodo send
  OnRequestDataReceiving()  Evento generato durante la ricezione dei dati dal server
  OnRequestCompleted()      Evento gerato quando i dati sono stati ricevuti completamente.


  Eesempio utilizzo:

  function richiestaAsincrona(){
     var p = "chiave=valore";   // parametri richiesta POST
     var h = new HttpRequest('post',file.php,true,parametri_post); // oggetto xmlhttprequest

     // metodo per la gestione della risposta asincrona
     h.setHandleResponse(function(){
         // inserimento della risposta sulla pagina
         document.getElementById(id).innerHTML = h.getRequest().responseText;

         // debug della risposta
         h.debugResponse();
     })


     // eventi generati dall richiesta (facoltativi all'utilizzo)
     h.OnRequestCreate(function(){
       // alert("Inizializzazione...");

       })

     h.OnRequestOpen(function(){
          // alert("Request aperta...");
       })

     h.OnRequestSend(function(){
       // alert("Metodo send chiamato...");
       })

     h.OnRequestDataReceiving(function(){
        // alert("Ricezione dati in corso...");
       })

     h.OnRequestCompleted(function(){
       // alert("Ricezione dati completata...");
       })


  }


*/

function HttpRequest(reqType,url,bool){

     var p_request = null;
     var p_handleResp;
     var p_HeaderContentType="application/x-www-form-urlencoded;charset=utf-8";
     // risposta eventi Request
     var p_OnRequestCreate=false;
     var p_OnRequestOpen=false;
     var p_OnRequestSend=false;
     var p_OnRequestDataReceiving=false;
     var p_OnRequestCompleted=false;




     // tentativo di prima istanza all'oggetto XMLHttpRequest
     try {
         // Crea l'oggetto XMLHttpRequest (funziona con Firefox, Mozilla,
         // Opera, Safari e Internet Explorer dalla 7)
         p_request = new XMLHttpRequest();
     } catch (e) {
         // Per le versioni precedenti alla 7 di IE si procede tentando di
         // creare l'oggetto ActiveX XMLHttpRequest, che assume nomi diversi
         // a seconda delle versioni
         var IEXMLHttpRequestNames = new Array("Microsoft.XmlHttp", "MSXML4.XmlHttp", "MSXML3.XmlHttp",
             "MSXML2.XmlHttp", "MSXML.XmlHttp");

          for (var i = 0; i < IEXMLHttpRequestNames.length; i++) {
              try {
                 p_request = new ActiveXObject(IEXMLHttpRequestNames[i]);
              } catch (e) {
                throw new Error("Impossibile istanziare l'oggetto. \n Errore: "+ e.message);
              }
          }
      }



     // esporta la request all'esterno
     this.getRequest = function(){return p_request;}

     // setta la funzione di risposta alla request
     this.setHandleResponse=function(h){p_handleResp=h;}

     // setta il ContentType della risposta
     this.setHeaderContentType=function(c){p_HeaderContentType=c;}

     // attiva il debug della richiesta
     this.debugResponse=function(){
          win=window.open("","debug","left=0,top=0,scrollbars=yes,resizable=yes");
          win.document.open();
          win.document.write( "<xmp>"+p_request.responseText+"</xmp>");
     }


     /*
       Gestione eventi della Request
     */
     // risposta evento oggetto request creato 0
     this.OnRequestCreate=function(r){p_OnRequestCreate=r;}

     //risposta evento su Richiesat aperta   1
     this.OnRequestOpen=function(r){p_OnRequestOpen=r;}

     // risposta veneto su chiamata del metodo send 2
     this.OnRequestSend=function(r){p_OnRequestSend=r;}

     // risposta evento dati request in ricezione 3
     this.OnRequestDataReceiving=function(r){p_OnRequestDataReceiving=r;}

     // risposta evento ricezione dati completata
     this.OnRequestCompleted=function(r){p_OnRequestCompleted=r;}



          // Apre la request
          try{
              p_request.open(reqType,url,bool);

             // se reqType è POST allora il quarto argomento passato
             // contiene i dati da inviare
            if(reqType.toLowerCase() == "post") {
                //p_request.setRequestHeader("Content-length",arguments[3].length );
                p_request.setRequestHeader("Content-type",p_HeaderContentType);
               // p_request.setRequestHeader("Connection", "close")
                p_request.send(arguments[3]);
            } else {
               p_request.setRequestHeader("Content-type",p_HeaderContentType);
               //p_request.setRequestHeader("Connection", "close")
               p_request.send(null);
            }

             // risposta eventi alla richiesta asincrona
             if(bool){ // se la richiesta è asincrona
               // gestione eventi della richiesta
               p_request.onreadystatechange = function (){

                   if(p_request.readyState == 0){        // oggetto request creato
                      if(p_OnRequestCreate){
                        p_OnRequestCreate();
                      }
                   }else if(p_request.readyState == 1){ // la request è stata aperta
                         if(p_OnRequestOpen){
                            p_OnRequestOpen();
                         }
                   }else if(p_request.readyState == 2){ // il metodo send è stato chiamato
                         if(p_OnRequestSend){
                            p_OnRequestSend();
                         }
                   }else if(p_request.readyState == 3){ // i dati sono in ricezione
                         if(p_OnRequestDataReceiving){
                           p_OnRequestDataReceiving();
                         }
                   }else if(p_request.readyState == 4){ // tutti i dati sono stati ricevuti
                         if(p_OnRequestCompleted){
                           p_OnRequestCompleted();
                         }
                      //Inoltre accertiamoci di aver ottenuto il messaggio 200 dal server (tutto Ok),
                     if (p_request.status == 200){
                         // funzione che gestisce la risposta della request
                         p_handleResp();
                     }else{
                        alert("Errore HTTP: " + p_request.status);
                     }
                 }
               }
             }
          }catch(e){
            throw new Error("L'applicazione non è al momento in grado di contattare il "+
                             "server. Riprovare tra qualche istante. \n Errore: "+e.message);
          }


}


