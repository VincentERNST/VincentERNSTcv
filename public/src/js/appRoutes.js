angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider',"$stateProvider", "$urlRouterProvider", function($routeProvider, $locationProvider,$stateProvider, $urlRouterProvider) {

$stateProvider
  .state({
  	name : "compState",
    url: "/comps",
    	views: {
	      'comps': {
	        templateUrl: 'views/comps.html',
			controller: 'CompetenceController'	
	      }
      }
  })
  .state({
  	name : "formationsState",
    url: "/formations",
    	views: {
	      'formations': {
	        templateUrl: 'views/formations.html',
			controller: 'FormationController'	
	      }, 
      }
  })    
  .state({
  	name : "experiencesState",
    url: "/experiences",
    	views: {
	      'experiences': {
	        templateUrl: 'views/experiences.html',
			controller: 'ExperienceController'	
	      }
      }
  }) 
  .state({
  	name : "hobbiesState",
    url: "/hobbies",
    	views: {
	      'hobbies': {
	        templateUrl: 'views/hobbies.html',
			controller: 'HobbieController'	
	      }
      }
  })  
  .state({
  	name : "interviewState",
    url: "/interview",
    	views: {
	      'interview': {
	        templateUrl: 'views/interview.html',
			controller: 'InterviewController'	
	      }
      }
  })    
//routage classique :
	//$routeProvider
//
	//	// home page
	//	.when('/', {
	//		templateUrl: 'views/home.html',
	//		controller: 'MainController'
	//	})
//
	//	.when('/nerds', {
	//		templateUrl: 'views/nerd.html',
	//		controller: 'NerdController'
	//	})
//
	//	.when('/geeks', {
	//		templateUrl: 'views/geek.html',
	//		controller: 'GeekController'	
	//	});
	$urlRouterProvider.otherwise('/comps');//cette url doit être définie dans un state
	$locationProvider.html5Mode(true);

}]);