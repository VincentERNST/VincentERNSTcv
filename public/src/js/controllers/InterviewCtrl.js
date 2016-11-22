angular.module('InterviewCtrl', [])
.controller('InterviewController',[ '$scope','$http','$q','$mdDialog','$mdToast','InterviewFactory',function ($scope,$http,$q,$mdToast,$mdDialog,InterviewFactory) {


$scope.userEnigmas = [];

  $scope.mod={
    modifying : []
  };

var grosMots=[['enculé','va te faire enculé'],['salop','toi même'],['bite','Euuhh']];
var grosMotsMap = new Map(grosMots);
 

$scope.genius={
  isHungry: false,
  image:"images/Génie3.png",
  question : "",
  geniusAnswer : ""
}



    $scope.enigma = function(){
        return $scope.genius.question;
    };  
function goMad(newValue, oldValue, scope){
      $scope.affichageReponse=false;
      if(/cul|con|bite|nouille|tocar|enculé|gole|sex|salop|connasse|pédale|chié|chier|tronche|gueul|anus|boudin|andouille|nul|zéro|nigo|branleur|ramass|laideron|clown|crev|débile|empoté|étron|épave|glan|punaise|porc|niak|connard|pute|merde|souillon|moule|bouffon|guignol|mariol|feignasse|tanche|malade|imbécile|crétin|kéké|nase|arrogant|idiot|abruti|burne|casos|saperlipo|puant|bollos|enfoiré|batar|manche|autiste|pédé|PD|tapette|baltringue|lavette|vantar|prout|chiasse|chien|bordel|niais|taré|pauvre|ordure|fumier|abject|bidet|ignoble|couill|sodom/i.test(newValue)){
        $scope.genius.geniusAnswer='Pas de gros mots svp!';$scope.affichageReponse=true;
        $scope.genius.image = "images/Génie4.png";
      }
      // for (var key of grosMotsMap.keys()) {
      //   if(key == newValue){
      //     
      //   }
      // }


      //if(grosMotsMap.containsKey(newValue)){
      // $scope.genius.geniusAnswer=grosMotsMap.get(key);$scope.affichageReponse=true;
      // $scope.genius.image = "images/Génie4.png";
      //} 

        //if(newValue > 100 && !$scope.genius.isHangry){
        //  $scope.genius.isHangry =! $scope.genius.isHangry;
        //  if( $scope.genius.isHangry ){
        //    $scope.genius.image = "images/Génie4.png";
        //  }
        //  else{
        //    $scope.genius.image = "images/Génie3.png";
        //  }
        //}
        //if(newValue <= 100 && $scope.genius.isHangry){
        //  $scope.genius.isHangry =! $scope.genius.isHangry;
        //  if( $scope.genius.isHangry ){
        //    $scope.genius.image = "images/Génie4.png";
        //  }
        //  else{
        //    $scope.genius.image = "images/Génie3.png";
        //  }
        //}        
    };
    $scope.$watch($scope.enigma, goMad);



  var detect = function(data) {
     for(i=0;i<$scope.userEnigmas.length;i++){
      if(data==$scope.userEnigmas[i]._id){
        return i;
      }
    }
  }

//var checkRange = function(){
//    InterviewFactory.testRange(60000).success(function(response){
//      if(response>3){
//        $scope.genius.geniusAnswer = 'Assez de questions pour le moment, attendez 1 minute';
//        $scope.genius.image = "images/Génie4.png";
//        $scope.block =true;
//      }
//      else{
//        $scope.block=false;
//      }
//    });
//    InterviewFactory.testRange(3600000).success(function(response){
//      if(response>100){
//        $scope.genius.geniusAnswer = 'Assez de questions pour le moment, attendez 1 heure';
//        $scope.genius.image = "images/Génie4.png";
//        $scope.block =true;
//      }   
//    });  
//}


    $scope.addEnigma= function(){
      $scope.affichageReponse=true;
      var date=Date.now();
      var question=$scope.genius.question;
      if(question.length<3 ){$scope.genius.geniusAnswer='';return;}
      
      ////tests basiques
      //if(question.length<3){
      //  $scope.genius.geniusAnswer = "Question has to be larger<br>Question has to be largerQuestion has to be largerQuesti<br>on has to be largerQuestion has to be <br>largerQuestion has to be largerQuestion has to be largerQuestion has to be largerQuestion has to be largerQuestion has to be largerQuestion has to be largerQuestion has to be larger";
      //  $scope.genius.isHungry = !$scope.genius.isHungry;
      //}
      //else{
      //  $scope.genius.geniusAnswer="Que";
      //}
      //          :D
      InterviewFactory.testRange(3600000).success(function(response){
        if(response>41){
          $scope.genius.geniusAnswer = 'Assez de questions pour le moment, attendez 15 minutes';
          $scope.genius.image = "images/Génie4.png";
        }
        else{
            InterviewFactory.getAnswer(question).success(function(response){
              $scope.genius.geniusAnswer = response;
              var enigma = {question : question, answer : $scope.genius.geniusAnswer,create_date : date};
              InterviewFactory.addEnigma(enigma).success(function(response){
                $scope.userEnigmas.push(response);
              }); 
            });      
        }
      });
  
     //InterviewFactory.getAnswer(question).success(function(response){
     //  $scope.genius.geniusAnswer = response;
     //  var enigma = {question : question, answer : $scope.genius.geniusAnswer,create_date : date};
     //  InterviewFactory.addEnigma(enigma).success(function(response){
     //    $scope.userEnigmas.push(response);
     //  }); 
     //}); 
  
      //          :D
      
    };
    $scope.remove=function(id){
      $scope.mod.modifying=[];
      $scope.userEnigmas.splice(detect(id), 1);
      InterviewFactory.remove(id).success(function(response){
      });
    };


    $scope.edit=function(id){
      $scope.mod.modifying=[];
      InterviewFactory.edit(id).success(function(response){
        $scope.post = response;
      });
    };


    $scope.update=function(id){
      $scope.userEnigmas[detect(id)].create_date=Date.now();
      $scope.userEnigmas[detect(id)].question=$scope.post.question;


     //$scope.userEnigmas[detect(id)].answer='nouveau calcul de réponse';



     //InterviewFactory.update($scope.userEnigmas[detect(id)]).success(function(response){
     //  $scope.userEnigmas[detect(id)]=response;
     //});

    $scope.genius.question =$scope.post.question;
    
    InterviewFactory.testRange(3600000).success(function(response){
      if(response>41){
        $scope.genius.geniusAnswer = 'Assez de questions pour le moment, attendez 15 minutes';
        $scope.genius.image = "images/Génie4.png";
      }
      else{
          InterviewFactory.getAnswer($scope.post.question).success(function(response){
            $scope.userEnigmas[detect(id)].answer = response;

            InterviewFactory.update($scope.userEnigmas[detect(id)]).success(function(response){
              $scope.userEnigmas[detect(id)]=response;
              $scope.genius.geniusAnswer = response.answer;
              
              $scope.affichageReponse=true;              
            }); 
          });      
      }
    });


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

//document.getElementById(chip.named).style.left=chip.xx+"px";
//document.getElementById(chip.named).style.top=chip.yy+"px";


   chip.timer1=setTimeout("movechip('"+chip.named+"')",100);
  }
}





  }]);