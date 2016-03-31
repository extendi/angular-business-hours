'use strict';
angular.module("extendi.business-hours", ['pascalprecht.translate', 'extendi.business-hours.tpl']).config([
  '$translateProvider', function($translateProvider) {
    $translateProvider.translations('en', {
      "business-hours.weekdays": "Week days",
      "business-hours.weekend": "Weekend",
      "business-hours.alldays": "All days",
      "business-hours.add_opening": "Add opening hour",
      "business-hours.choose_day": "Choose a day"
    });
    $translateProvider.translations('it', {
      "business-hours.weekdays": "Giorni feriali",
      "business-hours.weekend": "Fine settimana",
      "business-hours.alldays": "Tutti i giorni",
      "business-hours.add_opening": "Aggiungi orari di apertura",
      "business-hours.choose_day": "Scegli un giorno"
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
    templateUrl: "templates/hours.html"
  };
}).directive('businessHoursInput', function() {
  return {
    restrict: 'E',
    scope: {
      model: "="
    },
    controller: "BusinessHoursCtrl",
    templateUrl: "templates/hours_input.html"
  };
}).directive('greaterThan', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ctrl) {
      var validate;
      validate = function(viewValue) {
        var comparisonModel, end, start;
        comparisonModel = attrs.greaterThan;
        if (!viewValue || !comparisonModel) {
          ctrl.$setValidity('greaterThan', true);
          return viewValue;
        }
        start = comparisonModel.split(":");
        end = viewValue.split(":");
        ctrl.$setValidity('greaterThan', (parseInt(start[0], 10) < parseInt(end[0], 10)) || (parseInt(start[0], 10) === parseInt(end[0], 10) && parseInt(start[1], 10) < parseInt(end[1], 10)));
        return viewValue;
      };
      ctrl.$parsers.unshift(validate);
      ctrl.$formatters.push(validate);
      return attrs.$observe('greaterThan', function(comparisonModel) {
        return validate(ctrl.$viewValue);
      });
    }
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
      _.flatten(_.map([0, 15, 30, 45], function(mins) {
        return _.map(hours, function(hour) {
          return hour + ":" + (_.padLeft(mins, 2, '0'));
        });
      }));
      return _.padLeft(mins, 2, '0');
    };
    $scope.hours_for = function(hours, day) {
      return _.sortBy(_.where(hours, {
        days: [day]
      }), function(item) {
        if (item.start.length === 4) {
          return "0" + item.start;
        } else {
          return item.start;
        }
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
      return "business-hours.choose_day";
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
