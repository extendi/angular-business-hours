'use strict'

angular.module("extendi.business-hours", []).
  directive('myDirective', function(){
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
        console.log("test fir directive");
      }
    }
  });