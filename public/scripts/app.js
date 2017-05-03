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
  console.log('home controller');

  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay;
  // map
   var map = new google.maps.Map(document.getElementById('map'), {
     zoom:13,
     center: {lat: 37.785636, lng: -122.397119},
     mapTypeId: google.maps.MapTypeId.ROADMAP
   });

   $('input.mode').on('change', function() {
       $('input.mode').not(this).prop('checked', false);
   });




   //show stopover input boxes
 $('#add_stop').click(function(){
   $('#stop1').show();
   $('#stop2').show();
   $('#stop3').show();
   $('#add_stop').hide();
   $('#no_stop').show();
 });
 $('#no_stop').click(function(){
   $('#stop1').hide();
   $('#stop2').hide();
   $('#stop3').hide();
   $('#add_stop').show();
   $('#no_stop').hide();
 });

  $('#submit').click(function() {

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
         if ($('#waypoint_1').val()){
           wypnt.push({location: $('#waypoint_1').val(), stopover: true});
         }
         if ($('#waypoint_2').val()) {
           wypnt.push({location: $('#waypoint_2').val(), stopover: true});
         }
         if ($("#waypoint_3").val()){
           wypnt.push({location: $("#waypoint_3").val(), stopover: true});
         }
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
       }
      });
  });

}
