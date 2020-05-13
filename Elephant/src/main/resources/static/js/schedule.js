$(document).ready(function () {
   console.log("schedule.js!");
   loadTimes();
   
   });
   
    function loadTimes() {
     $.ajax({

    url: 'http://localhost:8080/api/users/times/1',
    type: 'GET',
    data : {
        'numberOfWords' : 10
    },
    dataType:'json',
    success : function(data) {              
        alert('Data: '+data);
    },
    error : function(request,error)
    {
        alert("Request: "+JSON.stringify(request));
    }
    
    });



};