$(document).ready(function () {
    $('#questionDiv').hide();
   // console.log("hello!");
    $(function() {
        $('#q1').change(function() {
        if ($(this).val() == "on") {
          $('#q1Equals').html('Toggle: ' + $(this).prop('checked'));
          $('#questionDiv').show();
        } else {
           
          // $('#q1Equals').hide();
           $('#questionDiv').hide();
        }

      });
     //$("#q1").trigger("change");
});

});