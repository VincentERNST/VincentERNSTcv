angular.module('FormationCtrl', [])
.controller('FormationController',[ '$scope','$http','$q','$mdDialog',function ($scope, $http,$q,$mdDialog) {

  
    $scope.bourseMouseOver = function() {
    	$scope.try+=1;
      //document.getElementById("myBtn").value= 'Catch me !';
      document.getElementById("myBtn").style.top = -200*Math.random()+"px";
      document.getElementById("myBtn").style.left= 400*Math.random()+"px";
      document.getElementById("myBtn").style.color = $scope.getRandomColor();
      document.getElementById("myBtn").style.width= '80px';
      document.getElementById("myBtn").style.height= '87px';
      document.getElementById("myBtn").style.backgroundColor= $scope.getRandomColor();
      document.getElementById("myBtn").style.fontSize= '80%';
      $scope.updateStatus();
    }
    $scope.bourseClick = function() {
    	$scope.try=0;
      document.getElementById("myBtn").style.top = "30px";
      document.getElementById("myBtn").style.left= "100px";
      document.getElementById("myBtn").style.color = '#FFFF00';
      //document.getElementById("myBtn").value= 'You win';
      document.getElementById("myBtn").style.width= '200px';
      document.getElementById("myBtn").style.height= '200px';
      document.getElementById("myBtn").style.backgroundColor= 'white';
      document.getElementById("myBtn").style.fontSize= '300%';
      document.getElementById("myBtn").style.outline= 'none';
      $scope.updateStatus();
      $scope.comment="TADAAA!! Merci, continuez d'investir dans les formations";
    }
    $scope.getRandomColor= function() {
      var letters = '0123456789ABCDEF'.split('');
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }  
    $scope.updateStatus =function(){
    	if($scope.try<10){
    		$scope.statusImg="images/content.jpg";
    		$scope.comment="C'est sympa ce jeu";
    	}
    	else if($scope.try>=10 && $scope.try<20){
    		$scope.statusImg="images/blaze.png";
    		$scope.comment="Essaye encore";
    	}
    	else{
    		$scope.statusImg="images/fou.jpg";
    		$scope.comment="hihihi";
    	}
    }


    $scope.try=0;
    
  }]);