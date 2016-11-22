angular.module('MainCtrl', [])
.controller('MainController',function ($scope,$http,$q,$mdToast,$mdDialog,$state,$mdToast) {

    $scope.mail={
      subject:"",
      email:"",
      body:""
    }

  $scope.sendMail = function () {
      var datas = ({
          contactSubject : $scope.mail.subject,
          contactEmail : $scope.mail.email,
          contactMsg : $scope.mail.body
      });
      // Simple POST request example (passing data) :
      $http.post('/api/mail', datas).
          success(function(data, status, headers, config) {
            $scope.mail.subject='';
            $scope.mail.email='';
            $scope.mail.body='';
            //$scope.status = "Votre mail a bien été envoyé"
              // this callback will be called asynchronously
              // when the response is available
              $mdToast.show(
                  $mdToast.simple()
                      .content('Merci pour le message ' + datas.contactEmail+ '. Je vous repondrai bientôt!')
                      .position('bottom right')
                      .theme('success-toast')
                      .hideDelay(4000)
              );
          }).
          error(function(data, status, headers, config) {
            console.log('Le mail ne passe pas pour le moment');
              $mdToast.show(
                  $mdToast.simple()
                      .content('Echec de routage mail')
                      //.position($scope.getToastPosition())
                      .hideDelay(5000)
              );            
              // called asynchronously if an error occurs
              // or server returns response with an error status.
          });  
  };


  $scope.tabs = [ 
                {
                title : "Compétences",
                icons : ["images/svg/ic_desktop_windows_black_24px.svg"],
                view : "comps"
                },
                {
                title : "Formations",
                icons : ["images/svg/ic_attach_money_black_24px.svg", "images/svg/ic_school_black_24px.svg"],
                view : "formations"
                },
                {
                title : "Expériences",
                icons : ["images/svg/ic_airplanemode_active_black_24px.svg"],
                view : "experiences"
                },
                {
                title : "Hobbies",
                icons : ["images/svg/ic_pool_black_24px.svg","images/svg/ic_directions_bike_black_24px.svg","images/svg/ic_directions_run_black_24px.svg"],
                view : "hobbies"
                },
                {
                title : "Interview",
                icons : ["images/svg/ic_contact_mail_black_24px.svg"],
                view : "interview"
                }];              
  $scope.selectedIndex = 0;
  $scope.myClickEvent = function() {
      switch($scope.selectedIndex) {
        case 0: $state.go('compState'); 
                  $scope.shortdesc="Voici une liste de mes compétences techniques acquises au cours de mes expériences professionnelles en ingénierie logiciel.<br>La programmation Java c'est pour le plaisir de résoudre des puzzle games.<br> JS et le dévelopement Angular pour la curiosité.";
                  break;
        case 1: $state.go('formationsState'); 
                $scope.shortdesc= "<br>Aidez moi à débloquer des formations en cliquant sur la bourse $.";
                  break;  
        case 2: $state.go('experiencesState'); 
                $scope.shortdesc= "<br>J'ai réalisé que je préfère le développement être consultant que R&D. Il y à une dimension d'échange en plus. Etre consultant est une position qui me motive à élargir mes compétences afin d'offrir des solutions pragmatiques et fonctionnelles.";
                  break;
        case 3: $state.go('hobbiesState'); 
                  $scope.shortdesc= "<br>Mon temps libre est majoritairement dédié au sport et la programmation, motivé par des challenges en tout genre.";
                  break;
        case 4: $state.go('interviewState'); 
                  $scope.shortdesc= "Des question?<br>Voyez si le génie des questions saurait y répondre. Il s'agit d'une petite API RESTful développée en MEAN stack.<br> Les questions sans réponses sont enregistrées en base afin de renforcer les algorithmes, alors n'hésitez pas. C'est anonyme.";
                  break;                                  
      }           
  };   
           //$scope.$watch('selectedIndex', function(current, old) {
            //  switch(current) {
            //    case 0: $location.url("/nerds"); break;
            //    case 1: $location.url("/geeks"); break;
            //    
            //  }
            //});
//Function pop up
    $scope.openFromLeft = function() {
    $mdDialog.show({
       clickOutsideToClose :true,
       openFrom : {top: 0,
          width: 30,
          height: 80},
     closeTo : {left: 1500},
     ok : 'Nice',
     controller : 'MainController',
     scope: $scope,        
         preserveScope: true,
       templateUrl: 'views/mail.html'
                
        }

    );
  };

});