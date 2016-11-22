angular.module('InterviewCtrl', [])
.controller('InterviewController',[ '$scope','$http','$q','$mdDialog','$mdToast','InterviewFactory',function ($scope,$http,$q,$mdToast,$mdDialog,InterviewFactory) {

  $scope.sendMail = function () {
      var data = ({
          contactName : 'r',
          contactEmail : 'r',
          contactMsg : 'r'
      });
      // Simple POST request example (passing data) :
      $http.post('/api/mail', data).
          success(function(data, status, headers, config) {
              // this callback will be called asynchronously
              // when the response is available
              console.log('$mdShow');
              $mdToast.show(
                  $mdToast.simple()
                      .content('Thanks for your message ' + data.contactName + ' You Rock!')
                      //.position($scope.getToastPosition())
                      .hideDelay(5000)
              );
          }).
          error(function(data, status, headers, config) {
            console.log('$mdPasShow');
              // called asynchronously if an error occurs
              // or server returns response with an error status.
          });
    
  };




  var refresh = function() {
       InterviewFactory.get()
        .success(function(response){
          $scope.enigmas = response;
      })
      .error(function() {
          console.log("error in fetching data");
      }); 
  }
  refresh();






  $scope.addEnigma= function(){
    $scope.post.create_date=Date.now();
    InterviewFactory.addEnigma($scope.post).success(function(response){
      //InterviewFactory.addEnigma({question : "ca va?", answer : "oui", mail : "ernst.vincent@live.fr", create_date : '65421'}).success(function(response){
  refresh()
    }); 
    };

  $scope.addEnigma2= function(){
    var date=Date.now();
    var question=$scope.genius.question;
    if(question.length<3){
      $scope.genius.geniusAnswer = "Question has to be larger";
      $scope.genius.isHungry = !$scope.genius.isHungry;
    }
    var enigma = {question : question, answer : "",create_date : date};
    $scope.userEnigmas.push(enigma);
    InterviewFactory.addEnigma(enigma).success(function(response){
      //InterviewFactory.addEnigma({question : "ca va?", answer : "oui", mail : "ernst.vincent@live.fr", create_date : '65421'}).success(function(response){
  refresh()
    }); 
    };

    $scope.remove=function(id){
      InterviewFactory.remove(id).success(function(response){
    refresh()
      });
    };


    $scope.edit=function(id){
      InterviewFactory.edit(id).success(function(response){
        $scope.post = response;
      });
    };


    $scope.update=function(){
      $scope.post.create_date=Date.now();
      InterviewFactory.update($scope.post).success(function(response){
  refresh()
      });
    };

    $scope.deselect=function(){
      $scope.post="";
    };


   	$scope.model={
  		name:"",
  		price:""
  	}
  	$scope.genius={
  		isHungry: false,
  		image:"images/Génie3.png",
  		question : "",
    	geniusAnswer : "Désolé, je ne trouve pas la réponse."
    }

    $scope.enigma = function(){
        return $scope.genius.question;
    };  
    function goMad(newValue, oldValue, scope){
    	console.log(newValue);
        if(newValue > 100 && !$scope.genius.isHangry){
          $scope.genius.isHangry =! $scope.genius.isHangry;
          if( $scope.genius.isHangry ){
            $scope.genius.image = "images/Génie4.png";
          }
          else{
            $scope.genius.image = "images/Génie3.png";
          }
        }
        if(newValue <= 100 && $scope.genius.isHangry){
          $scope.genius.isHangry =! $scope.genius.isHangry;
          if( $scope.genius.isHangry ){
            $scope.genius.image = "images/Génie4.png";
          }
          else{
            $scope.genius.image = "images/Génie3.png";
          }
        }        
    };
    $scope.$watch($scope.enigma, goMad);









//Function pop up
    $scope.openFromLeft = function() {
    $mdDialog.show({
    	 clickOutsideToClose :true,
    	 openFrom : {top: -50,
					width: 30,
					height: 80},
		 closeTo : {left: 1500},
		 ok : 'Nice',
		 controller : 'InterviewController',
		 scope: $scope,        
         preserveScope: true,
    	 template:
           '<md-dialog><br>' +
           '<form name ="form" role="form" novalidate ng-submit="processForm()">' +
            //'  <div class="row margin:0">' +
            ' <div layout-align="center center" style="width:80%;margin-left:2%;padding:2%;">' +
            '      <label class="sr-only" for="item-name">Your item</label>' +
            '      <input' +
            '        class="form-control"' +
            '        ng-model="model.name"' +
            '        id="item-name"' +
            '        name="item-name"' +
            '        placeholder="Votre question" '+
            'required' +
            'ng-pattern=ng-pattern="/[a-z]+?/i"><md-tooltip  md-direction="left">question?</md-tooltip></input>' +
            '   </div>' +
            ' <div layout-align="center center" style="width:80%;margin-left:2%;padding:2%;">' +
            '      <label class="sr-only" for="item-price">Price in xxx.xxx</label>' +
            '      <input' +
            '        class="form-control"' +
            '        ng-model="model.price"' +
            '        id="item-price"' +
            '        name="item-price"' +
            '        placeholder="votre email"' +
            '    required' +
            '    ng-pattern="/.+@+.+\\.+./i"><md-tooltip  md-direction="left">exemple : ernst.vincent@live.fr</md-tooltip></input>' +
                    //    '    ng-pattern="/[a-z]+@+[a-z]+\\.+[a-z]/i"><md-tooltip  md-direction="left">exemple : ernst.vincent@live.fr</md-tooltip></input>' +
            //'    ng-pattern="/\\d+\\.\\d\\d$/"><md-tooltip  md-direction="left">requis : ?</md-tooltip></input>' +
            //var formPattern="/\d+\.\d\d$/";
            '   </div>' +
            //'  </div>' +
            '  <div>' +

            ' <div layout-align="center center" style="width:90%;margin-bottom:2%;padding:2%;">' +            
            '<button' +
            '  class="btn btn-primary pull-right"' +
            '  type="submit"' +
            '  ng-disabled="form.$invalid">Save</button>' +
            '   </div>' +

            '  </div>' +
            '  <div class="status">' +
            '  {{ status }}' +
            '</div>' +
            '  <div class="status">' +
            ' <h01> {{n}}</h01> ' +
            '  <h02> {{p}}</h02> ' +
            '</div>' +
          '</form>' +
        '</md-dialog>'       
       	}
      //$mdDialog.alert()
      //  .clickOutsideToClose(true)
      //  .title('Postez votre question')
      //  .textContent('Closing to the right!')
      //  .ariaLabel('Left to right demo')
      //  .ok('Nice!')
      //  // You can specify either sting with query selector or element
      //  .openFrom({
      //    top: -50,
      //    width: 30,
      //    height: 80
      //  })
      //  .closeTo({
      //    left: 1500
      //  })
    );
  };










/***********************************************
* Floating image script- By Virtual_Max (http://www.geocities.com/siliconvalley/lakes/8620)
* Modified by Dynamic Drive for various improvements
* Visit Dynamic Drive at http://www.dynamicdrive.com/ for full source code
***********************************************/


var vmin=2;
var vmax=5;
var vr=2;
var timer1;

function iecompattest(){
	return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
}

function Chip(chipname,width,height){
 this.named=chipname;
 this.vx=vmin+vmax*Math.random();
 this.vy=vmin+vmax*Math.random();
 this.w=width+20;
 this.h=height;
 this.xx=0;
 this.yy=0;
 this.timer1=null;
}



//Step 1: Define unique variable names depending on number of flying images (ie:3):
var flyimage1;

function pagestart(){
//Step 2: Using the same variable names as 1), add or delete more of the below lines (60=width, height=80 of image):
 flyimage1=new Chip("flyimage1",47,68);


//Step 3: Using the same variable names as 1), add or delete more of the below lines:
movechip("flyimage1");

}

if (window.addEventListener)
window.addEventListener("load", pagestart, false)
else if (window.attachEvent)
window.attachEvent("onload", pagestart)
else if (document.getElementById)
window.onload=pagestart


function movechip(chipname){
if (document.getElementById){
eval("chip="+chipname);
   if (window.innerWidth || window.opera){
	 pageX=window.pageXOffset;
     pageW=window.innerWidth-40;
     pageY=window.pageYOffset;
     pageH=window.innerHeight-20;
    }
   else if (document.body){
		 pageX=iecompattest().scrollLeft;
     pageW=iecompattest().offsetWidth-40;
     pageY=iecompattest().scrollTop;
     pageH=iecompattest().offsetHeight-20;
    } 

   chip.xx=chip.xx+chip.vx;
   chip.yy=chip.yy+chip.vy;
   
   chip.vx+=vr*(Math.random()-0.5)*0.5;
   chip.vy+=vr*(Math.random()-0.5)*0.5;
   if(chip.vx>(vmax+vmin))  chip.vx=(vmax+vmin)*2-chip.vx;
   if(chip.vx<(-vmax-vmin)) chip.vx=(-vmax-vmin)*2-chip.vx;
   if(chip.vy>(vmax+vmin))  chip.vy=(vmax+vmin)*2-chip.vy;
   if(chip.vy<(-vmax-vmin)) chip.vy=(-vmax-vmin)*2-chip.vy;

   if(chip.xx<=pageX){
			chip.xx=pageX;
      chip.vx=vmin+vmax*Math.random();
     }
   if(chip.xx>=pageX+pageW-chip.w){
			chip.xx=pageX+pageW-chip.w;
      chip.vx=-vmin-vmax*Math.random();
     }
   if(chip.yy<=pageY)
     {chip.yy=pageY;
      chip.vy=vmin+vmax*Math.random();
     }
   if(chip.yy>=pageY+pageH-chip.h)
     {chip.yy=pageY+pageH-chip.h;
      chip.vy=-vmin-vmax*Math.random();
     }

document.getElementById(chip.named).style.left=chip.xx+"px";
document.getElementById(chip.named).style.top=chip.yy+"px";


   chip.timer1=setTimeout("movechip('"+chip.named+"')",100);
  }
}





  }]);