var sampleApp = angular.module('sampleApp', 
	[
    'ui.router',
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',	
    'ngMaterial',
	'appRoutes', 
    'CompCtrl',
    'ExperienceCtrl',
    'FormationCtrl',
    'HobbieCtrl',
    'InterviewCtrl',
    'InterviewService',
    'MainCtrl'               
    ])

sampleApp.directive('geniusAnswering', function ($animate) { 
    return {
        restrict: 'A',
        link: function postLink(scope, iElement, iAttrs) { 
            iElement.on('click',function(){
                // OK ->  document.getElementById("response").style.color='#FFFF00';
                var ele = document.getElementById("response");
                $animate.enter(ele, $element);
                //var css="type2 8s steps(60, end);@keyframes type2{  0%{width: 0;}  50%{width: 0;}  100%{ width: 100;}}" 
                //@keyframes emptyanim {}
                //document.getElementById("response").style.keyframe.Name="emptyanim";
                //document.getElementById("response").style.webkitAnimationPlayState='go';
            })
        }, 
        //compile: function compile(tElement, tAttrs, transclude) {
        //    return {
        //        pre: function preLink(scope, iElement, iAttrs, controller) { ... }, 
        //        post: function postLink(scope, iElement, iAttrs, controller) { ... }
        //    }
        //}
    };
});

sampleApp.directive('geniusAnswer', function() { 
    return {
        restrict: 'A',
        template: '<div ng-transclude></div><p class="answer"><Strong>{{genius.geniusAnswer}}</Strong></p>',
        transclude: true
    };
});