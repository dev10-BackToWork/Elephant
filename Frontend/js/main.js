$(document).ready(function () {
   console.log("main.js");
   
});


//$(document).ready(function () {
//   console.log("schedule.js!");
//   loadTimes();
//   
//   });
//   
//    function loadTimes() {
//     //id = 1;
//     
//     $.ajax({
//        type: 'GET',
//        url: 'http://localhost:8080/api/users/times/' + id,
//        success: function(arrTimeArray) {
//            console.log(arrTimeArray);
//            $('#arrival-btn-div').empty();
//            
//            var arrivalDiv = $('arrival-btn-div');
//            
//            $.each(arrTimeArray, function (index, time) {
//                
//            }
//            var itemCard = "<div class='col-3'>";
//                itemCard += "<button class='item-card' id='" + item.id + "'>";
//                itemCard += "<p class='item'>Id: " + item.id + "<br /></p>";
//                itemCard += "<h5 class='item'>" + item.name + "<br /></h5>";
//                itemCard += "<p class='item'>$" + parseFloat(item.price) + "<br /></p>";
//                itemCard +=
//                "<p class='item'>Quantity Left: " + item.quantity + "<br /></p>";
//                //itemCard += "<button class='btn item-btn' id="+item.id + " value="+item.id + " 'onclick='getSelectedItem()>Select Item</button>";
//                itemCard += "</button>";
//               itemCard += "</div>";
//
//        $(function () {
//          $(".item-card").click(function () {
//            //console.log(this.id);
//            var input = this.id;
//            var itemId = parseInt(input);
//            console.log("Your item selected: " + itemId);
//            $("#item-input").val(itemId);
//            console.log(input);
//            console.log(itemId);
//          });
//          itemsDiv.append(itemCard);
//        });
//      });
//    },
//    });