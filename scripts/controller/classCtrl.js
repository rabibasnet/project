angular.module("rabi").controller("classCtrl", ["$scope", "classHttp", function($scope, classHttp){
refreshEntries();

	$scope.classList=[];
    $scope.updateId=0;

	
	$scope.formModels={
        id:"",
		title:"",
		classList:"",
		description:""//json obj has comma, not colons
		
	};
   function resetForm() {
    $scope.formModels={
		title:"",
		classList:"",
		description:""
	};
	};
    
    $scope.add=function(){
		var tempObj={
		title:$scope.formModels.title,
		classList:$scope.formModels.classList,
		description:$scope.formModels.description
		
            
		};
         
         alert(tempObj);
        if($scope.updateId==0){
           
        classHttp.postclassList(tempObj).then(function (response){
           refreshEntries();
            resetForm();
        });  
        }else
            
        {//for update
            alert("update" + $scope.updateId);
            classHttp.updateclassList(tempObj,$scope.updateId).then(function (response){
           refreshEntries();
            resetForm();
                $scope.updateId=0;
        }); 
            
        }
        
        };
 
	//for delete and update button
	$scope.delete=function(classId){
		alert("delete" + classId);
		classHttp.deleteclassList(classId);
		refreshEntries();
	};
	
		
	function refreshEntries(){
	 var promise=classHttp.getclassList();
            promise.then(function(response){
                $scope.classList=response;
               // console.log(response);
            });
	};
    
    
    
       $scope.update=function(classId){
        var promise=classHttp.getclassListUniq(classId);
        promise.then(function(response){
            console.log(response[0]);
            $scope.updateclasslist=response;
            $scope.formModels=response[0];
            $scope.formModels.ssn=parseInt(response[0].ssn);
            $scope.formModels.phoneNumber=parseInt(response[0].phoneNumber);
        }); 
 
        $scope.updateId = classId;
          
    };
    
//    $scope.update = function(classId){
//    	$scope.updateclassList=[];
//    $scope.updateId = 0;
//		$scope.update=function(classId){
//		alert("update" + classId);
//			classHttp.updateclassList(classId);
//		refreshEntries();
//	};
//
}
]);