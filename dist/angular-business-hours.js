'use strict';
angular.module("extendi.business-hours", ['pascalprecht.translate']).config([
  '$translateProvider', function($translateProvider) {
    $translateProvider.translations('en', {
      "business-hours.weekdays": "Week days",
      "business-hours.weekend": "Weekend",
      "business-hours.alldays": "All days"
    });
    $translateProvider.translations('it', {
      "business-hours.weekdays": "Giorni feriali",
      "business-hours.weekend": "Fine settimana",
      "business-hours.alldays": "Tutti i giorni"
    });
    $translateProvider.preferredLanguage('it');
    return $translateProvider.useSanitizeValueStrategy('escapeParameters');
  }
]).directive('businessHours', function() {
  return {
    restrict: 'E',
    scope: {
      model: "="
    },
    controller: "BusinessHoursCtrl",
    templateUrl: "partials/templates/hours"
  };
}).directive('businessHoursInput', function() {
  return {
    restrict: 'E',
    scope: {
      model: "="
    },
    controller: "BusinessHoursCtrl",
    templateUrl: "partials/templates/hours_input"
  };
}).controller("BusinessHoursCtrl", [
  "$scope", "$q", "$translate", "$locale", function($scope, $q, $translate, $locale) {
    var dom;
    $scope.days = [0, 1, 2, 3, 4, 5, 6];
    $scope.days_label = angular.copy($locale.DATETIME_FORMATS.DAY);
    dom = $scope.days_label.shift();
    $scope.days_label.push(dom);
    $scope.weekdays = [0, 1, 2, 3, 4];
    $scope.weekend = [5, 6];
    $scope.range_hours = function() {
      var hours;
      hours = _.range(0, 24);
      return _.flatten(_.map([0, 15, 30, 45], function(mins) {
        return _.map(hours, function(hour) {
          return (_.padLeft(hour, 2, '0')) + ":" + (_.padLeft(mins, 2, '0'));
        });
      }));
    };
    $scope.hours_for = function(hours, day) {
      return _.sortBy(_.where(hours, {
        days: [day]
      }), function(item) {
        return item.start;
      });
    };
    $scope.toggle_day = function(hour, index) {
      var i;
      if ((i = _.indexOf(hour.days, $scope.days[index])) >= 0) {
        return hour.days.splice(i, 1);
      } else {
        hour.days.push($scope.days[index]);
        return hour.days = _.sortBy(hour.days, function(day) {
          return _.indexOf($scope.days, day);
        });
      }
    };
    $scope.days_group_label = function(days) {
      if (_.xor(days, $scope.weekdays).length === 0) {
        return "business-hours.weekdays";
      }
      if (_.xor(days, $scope.weekend).length === 0) {
        return "business-hours.weekend";
      }
      if (_.xor(days, $scope.days).length === 0) {
        return "business-hours.alldays";
      }
      if (days.length > 0) {
        return _.map(days, function(day) {
          return $scope.days_label[day].slice(0, 3);
        }).join(",");
      }
      return "Scegli un giorno";
    };
    $scope.add_hour = function() {
      var value;
      value = $scope.model.length > 0 ? {
        days: []
      } : {
        days: angular.copy($scope.weekdays)
      };
      return $scope.model.push(value);
    };
    $scope.remove_hour = function(index) {
      return $scope.model.splice(index, 1);
    };
    return $scope.checked_day = function(days, day) {
      if (_.include(days, day)) {
        return true;
      } else {
        return false;
      }
    };
  }
]);

//# sourceMappingURL=angular-business-hours.js.map
