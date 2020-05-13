$(document).ready(function () {
   
    $('#questionDiv').hide();
    console.log("hello!");
});

    $(function () {
        $('#q2').change(function () {
          var answerTwo = $(this).prop('checked');
           console.log(answerTwo);
           if (answerTwo === true) {
               $('#questionDiv').show();
               console.log("YES!");
           }else {
               console.log("Q2 = FALSE");
               $('#questionDiv').hide();
           }
        
            $('#q2Equals').html('Toggle: ' + $(this).prop('checked'));
            
            });
    $("#q2").trigger("change");

    });
//         
//                
//            if ($(this).val() === "on") {
//                var answer = true;
//                console.log(answer);
//            }else if ($(this).val() !== "on") {
//                var answer = false;
//                console.log(answer);
//            };
                
               
                
                
//            } else {
//                $('#questionDiv').hide();
////                console.log("false");
//            }
//            $('#q1').hide();
//                $('#questionDiv').hide();


 


// $('#screenerDiv').hide();