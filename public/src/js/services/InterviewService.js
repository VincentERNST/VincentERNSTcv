angular.module('InterviewService', []).factory('InterviewFactory', ['$http','$q', function($http,$q) {

  return {  
 
        get : function() {
            return $http.get('/api/enigmas');
        },
        
        addEnigma : function(data){
          return $http.post('/api/enigmas',{question : data.question , answer : data.answer, create_date : data.create_date})
        },

        testRange : function(d){
            return $http.get('/api/enigmasInRange/'+d);
        },
        
        getAnswer : function(q){
          return $http.get('/api/answers/'+q);
        },
        
        remove : function(id){
          return  $http.delete('/api/enigmas/'+id)
        },
        
        edit : function(id){
          return  $http.get('/api/enigmas/'+id)
        },
        update : function(data){
          return  $http.put('/api/enigmas/'+data._id,data)
        }
  }

}]);