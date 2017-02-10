angular.module("rabi").controller("batchCtrl", ["$scope", "batchHttp", function($scope, batchHttp){
refreshEntries();

	$scope.batchList=[];
    $scope.updateId=0;
	
	$scope.formModels={
        id:"",
		sessionId:"",
		studentId:""
		
	};
   function resetForm() {
    $scope.formModels={
		 
		sessionId:"",
		studentId:""
		
   }
   };
    
    $scope.add=function(){
		var tempObj={
		sessionId:$scope.formModels.sessionId,
		studentId:$scope.formModels.studentId
		
            
		};
            alert(tempObj);
         if($scope.updateId==0){
           
        batchHttp.postbatchList(tempObj).then(function (response){
           refreshEntries();
            resetForm();
        });  
        }else
            
        {//for update
            alert("update" + $scope.updateId);
            batchHttp.updatebatchList(tempObj,$scope.updateId).then(function (response){
           refreshEntries();
            resetForm();
                $scope.updateId=0;
        }); 
            
        }
        
        };
 
	//for delete and update button
	$scope.delete=function(batchId){
		alert("delete" + batchId);
		batchHttp.deletebatchList(batchId);
		refreshEntries();
	};
//		$scope.update=function(batchId){
//		alert("update" + batchId);
//			batchHttp.updatebatchList(batchId);
//		refreshEntries();
//	};
//		
	function refreshEntries(){
	 var promise=batchHttp.getbatchList();
            promise.then(function(response){
                $scope.batchList=response;
               // console.log(response);
            });
	};
           $scope.update=function(batchId){
        var promise=batchHttp.getbatchListUniq(batchId);
        promise.then(function(response){
            console.log(response[0]);
            $scope.updateBatchlist=response;
            $scope.formModels=response[0];
//            $scope.formModels.ssn=parseInt(response[0].ssn);
//            $scope.formModels.phoneNumber=parseInt(response[0].phoneNumber);
        }); 
 
        $scope.updateId = batchId;
          
    };
    
    	
	

}]);