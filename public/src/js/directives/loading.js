'use strict';

/**
 * @ngdoc directive
 * @name sampleApp.directive:loading
 * @description
 * # loading
 */




//angular.module('sampleApp')
//  .directive('loading', function () {
//    return {
//      template: '<div><div ng-show="loading" class="loading-container"></div><div ng-hide="loading" ng-transclude></div></div>',
//      restrict: 'A',
//      transclude: true,
//      replace: true,
//      scope:{
//          loading: "=loading"
//      },
//      compile: function compile(element, attrs, transclude){
//        var spinner = new Spinner().spin();
//        var loadingContainer = element.find(".loading-container")[0];
//        loadingContainer.appendChild(spinner.el);
//        //target.appendChild(spinner.el);
//        }
//    };
//  });
//.directive('ngEnter', function () {
//    return function (scope, element, attrs) {
//        element.bind("keydown keypress", function (event) {
//            if(event.which === 13) {
//                scope.$apply(function (){
//                    scope.$eval(attrs.ngEnter);
//                });
//
//                event.preventDefault();
//            }
//        });
//    };
//});





//angular.module('sampleApp')
//  .directive('tabChange', function () {
//    return{
//      restrict : 'E',
//      
//    }