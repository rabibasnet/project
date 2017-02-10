angular.module("rabi").controller("sessionCtrl", ["$scope", "sessionHttp", function($scope, sessionHttp){
refreshEntries();

	$scope.sessionList=[];
    $scope.updateId=0;
	
	$scope.formModels={
        id:"",
		startDate:"",
		endDate:"",
		startTime:"",//json obj has comma, not colons
		classId:"", 
	  teacherId:"",
        sessionTitle:""
	};
   function resetForm() {
    $scope.formModels={
		 
		startDate:"",
		endDate:"",
		startTime:"",//json obj has comma, not colons
		classId:"", 
	  teacherId:"",
        sessionTitle:""
	};
   };
    
    $scope.add=function(){
		var tempObj={
		startDate:$scope.formModels.startDate,
		endDate:$scope.formModels.endDate,
		startTime:$scope.formModels.startTime,
		classId:$scope.formModels.classId,
        teacherId:$scope.formModels.teacherId,
        sessionTitle:$scope.formModels.sessionTitle
            
		};
        alert(tempObj);
         if($scope.updateId==0){
           
        sessionHttp.postsessionList(tempObj).then(function (response){
           refreshEntries();
            resetForm();
        });  
        }else
            
        {//for update
            alert("update" + $scope.updateId);
            sessionHttp.updatesessionList(tempObj,$scope.updateId).then(function (response){
           refreshEntries();
            resetForm();
                $scope.updateId=0;
        }); 
            
        }  
        
        };
 
	//for delete and update button
	$scope.delete=function(sessionId){
		alert("delete" + sessionId);
		sessionHttp.deletesessionList(sessionId);
		refreshEntries();
	};
	
		
	function refreshEntries(){
	 var promise=sessionHttp.getsessionList();
            promise.then(function(response){
                $scope.sessionList=response;
               // console.log(response);
            });
	}
     $scope.update=function(sessionId){
        var promise=sessionHttp.getsessionListUniq(sessionId);
        promise.then(function(response){
            console.log(response[0]);
            $scope.updateSessionlist=response;
            $scope.formModels=response[0];
//            $scope.formModels.ssn=parseInt(response[0].ssn);
//            $scope.formModels.phoneNumber=parseInt(response[0].phoneNumber);
        }); 
 
        $scope.updateId = sessionId;
          
    };
    	
	
}
]);