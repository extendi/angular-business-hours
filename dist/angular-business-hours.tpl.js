angular.module('extendi.business-hours.tpl', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/hours.html',
    "<div ng-repeat=\"day in days\">\n" +
    "  <span ng-show=\"hours_for(model, day).length\"><span class=\"size-sm ly-inline-block\">{{days_label[day]}}</span> <span class=\"push-left\" ng-repeat=\"hour in hours_for(model, day)\">{{hour.start}} &ndash; {{hour.end}}</span></span>\n" +
    "</div>"
  );


  $templateCache.put('templates/hours_input.html',
    "<div ng-repeat=\"hour in model\" class=\"push-small-bottom form-inline\">\n" +
    "  <a ng-click=\"remove_hour($index)\" class=\"close push-xsmall-top\"><i class=\"fa fa-times-circle text-md\"></i></a>\n" +
    "  \n" +
    "  <div class=\"btn-group push-small-right\" auto-close=\"outsideClick\" dropdown>\n" +
    "    <button type=\"button\" class=\"btn btn-default text-left-m size-md\" dropdown-toggle aria-expanded=\"false\">\n" +
    "      <span class=\"caret pull-right push-small-top\"></span>\n" +
    "      <span class=\"text-sm text-boldy\">{{days_group_label(hour.days) | translate}}</span>\n" +
    "    </button>\n" +
    "    <ul class=\"dropdown-menu dropdown-menu-right user-select-none\" role=\"menu\">\n" +
    "      <li ng-repeat=\"day in days\"><a ng-click=\"toggle_day(hour, $index)\"> <i ng-class=\"{'fa-check': checked_day(hour.days, day), 'text-blank': !checked_day(hour.days, day)}\" class=\"fa fa-fw\"></i> {{days_label[day]}}</a></li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "  <input type=\"text\" size=\"5\" ng-model=\"hour.start\" ng-pattern=\"/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/\" typeahead=\"range_hour for range_hour in range_hours() | filter:$viewValue | limitTo:8\" class=\"text-center form-control\" required typeahead-on-select=\"choosen($item, $model, $label)\"> &mdash; \n" +
    "  <input type=\"text\" size=\"5\" ng-model=\"hour.end\" ng-pattern=\"/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/\" typeahead=\"range_hour for range_hour in range_hours() | filter:$viewValue | limitTo:8\" class=\"text-center form-control\" required typeahead-on-select=\"choosen($item, $model, $label)\">\n" +
    "</div>\n" +
    "<div class=\"push-top\"><a ng-click=\"add_hour()\"><i class=\"fa fa-plus-circle push-xsmall-right\"></i>{{'business-hours.add_opening' | translate}}</a></div>\n"
  );

}]);
