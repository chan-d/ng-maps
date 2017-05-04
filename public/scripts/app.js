angular.module('directions_app', ['ui.router','satellizer'])
       .controller('HomeController', HomeController)
       .config(config);

config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function config($stateProvider, $urlRouterProvider, $locationProvider) {
  console.log('config in app.js');

          $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
          });
          //catch for unmatched urls
          $urlRouterProvider.otherwise('/');

          $stateProvider
            .state('home', {
              url: '/',
              templateUrl: 'templates/map.html',
              controller: 'HomeController',
              controllerAs: 'home'
            })
}

//controllers
HomeController.$inject = ['$http']; //minification protection
function HomeController ($http) {
  var vm = this;
  var key_wypnt = [];
  var waypoint1;
  var waypoint2;
  var waypoint3;

  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay;
  var places;
  // map
   var map = new google.maps.Map(document.getElementById('map'), {
     zoom:13,
     center: {lat: 37.785636, lng: -122.397119},
     mapTypeId: google.maps.MapTypeId.ROADMAP
   });
   //add places
   places = new google.maps.places.PlacesService(map);

   $('input.mode').on('change', function() {
       $('input.mode').not(this).prop('checked', false);
   });

   function doSearch() {

     var keyword = document.getElementById('keyword').value;
     //keyword 1
    var type = document.getElementById('type').value;
    var rankBy = document.getElementById('rankBy').value;
    var search = {};

    if (keyword) {
      search.keyword = keyword;
    }
    if (!keyword) {
      console.log('doSearch now keyword 1');
      return;
    }

    if (type != 'establishment') {
      search.types = [type];
    }

    if (rankBy == 'distance' && (search.types || search.keyword)) {
      search.rankBy = google.maps.places.RankBy.DISTANCE;
      search.location = map.getCenter();
    } else {
      search.bounds = map.getBounds();
    }

    places.search(search, function(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      var lat = results[0].geometry.location.lat();
      var lng = results[0].geometry.location.lng();
      waypoint1 = {
       location: {lat, lng},
       stopover: true
      }
      console.log("waypoint1", waypoint1);
    }
  });
}

function doSearch2() {
  //keyword 2
var keyword2 = document.getElementById('keyword2').value;
 var type2 = document.getElementById('type2').value;
 var rankBy = document.getElementById('rankBy').value;
 var search2 = {};

 if (keyword2) {
   search2.keyword = keyword2;
 }
 if (!keyword2) {
   //stop function if no keyword
   return;
 }

 if (type2 != 'establishment') {
   search2.types = [type2];
 }

 if (rankBy == 'distance' && (search2.types || search2.keyword2)) {
   search2.rankBy = google.maps.places.RankBy.DISTANCE;
   search2.location = map.getCenter();
 } else {
   search2.bounds = map.getBounds();
 }

 places.search(search2, function(results, status) {
 if (status == google.maps.places.PlacesServiceStatus.OK) {
   var lat = results[0].geometry.location.lat();
   var lng = results[0].geometry.location.lng();
   waypoint2 = {
    location: {lat, lng},
    stopover: true
   }
   console.log("waypoint2", waypoint2);
 }
});
}


function doSearch3() {
  var keyword3 = document.getElementById('keyword3').value;
  //keyword 3
 var type3 = document.getElementById('type3').value;
 var rankBy = document.getElementById('rankBy').value;
 var search3 = {};

 if (keyword3) {
   search3.keyword = keyword3;
 }
 if (!keyword3) {
   //stop funtion if no keyword
   return;
 }

 if (type3 != 'establishment') {
   search3.types = [type3];
 }

 if (rankBy == 'distance' && (search3.types || search3.keyword3)) {
   search3.rankBy = google.maps.places.RankBy.DISTANCE;
   search3.location = map.getCenter();
 } else {
   search3.bounds = map.getBounds();
 }

 places.search(search3, function(results, status) {
 if (status == google.maps.places.PlacesServiceStatus.OK) {
   var lat = results[0].geometry.location.lat();
   var lng = results[0].geometry.location.lng();
   waypoint3 = {
    location: {lat, lng},
    stopover: true
   }
   console.log("waypoint3", waypoint3);
 }
});
}

  $('#kw_submit').click(function(){
      doSearch();
      doSearch2();
      doSearch3();
    $('#submit').show();
    $('#kw_submit').hide();
  });


   //show stopover input boxes
 $('#add_stop').click(function(){
   if ($('#transit')){
     $('#transit').prop("checked", false);
     $('#transit').hide();
     $('#t_label').hide();
   }
   $('#add_stop').hide();
   $('#no_stop').removeClass('hide_btn');
   $('.waypoints').show();
   $('#kw_submit').removeClass('hide_btn');
   $('#submit').hide();
   $('.s_msg').show();
 });

 $('#no_stop').click(function(){
   $('#add_stop').show();
   $('#no_stop').addClass('hide_btn');
   $('.waypoints').hide();
   $('#kw_submit').addClass('hide_btn');
   $('.s_msg').hide();
   $('#transit').show();
   $('#t_label').show();
 });

  $('#submit').click(function() {
    var tMOde;
    if($('#walking').is(":checked")){
      tMode = "WALKING";
    } else if($('#biking').is(":checked")) {
      tMode = "BICYCLING";
    } else if($('#transit').is(":checked")) {
      tMode = "TRANSIT";
    } else {
      alert("select transit type");
    }
    setTimeout(function(){
      var org = $('#address').val();
      if (!org) {
        alert('please enter origin address');
        return;
      }
      map = new google.maps.Map(document.getElementById('map'), {
        zoom:13,
        center: {lat: 37.785636, lng: -122.397119},
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      $('#panel').empty();
       directionsDisplay = new google.maps.DirectionsRenderer();
        var address = $('#address').val();
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('panel'));
        var wypnt = [];
           //check for waypoints
           if (waypoint1){
             wypnt.push(waypoint1);
           } else if($('#waypoint_1').val()) {
             wypnt.push({location: $('#waypoint_1').val(), stopover: true});
           }

           if (waypoint2) {
             wypnt.push(waypoint2);
           } else if ($('#waypoint_2').val()) {
             wypnt.push({location: $('#waypoint_2').val(), stopover: true});
           }

           if (waypoint3){
             wypnt.push(waypoint3);
           } else if ($("#waypoint_3").val()){
             wypnt.push({location: $("#waypoint_3").val(), stopover: true});
           } 



        var request = {
         origin: address,
         destination: '37.785636, -122.397119',
         waypoints: wypnt,
         optimizeWaypoints:true,
         travelMode: tMode
        };

        directionsService.route(request, function(response, status) {
         if (status == google.maps.DirectionsStatus.OK) {
             directionsDisplay.setDirections(response);
             waypoint1;
             waypoint2;
             waypoint3;
         }
        });



    }, 5000);



  });

}
