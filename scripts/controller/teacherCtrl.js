angular.module("rabi").controller("teacherCtrl", ["$scope", "teacherHttp", function($scope, teacherHttp){
refreshEntries();

	$scope.teacherList=[];
    $scope.updateId=0;

	
	$scope.formModels={
        id:"",
		firstName:"",
		lastName:"",
		address:"",//json obj has comma, not colons
		phoneNumber:"", 
	   email:"",
        ssn:""
	};
   function resetForm() {
    $scope.formModels={
		firstName:"",
		lastName:"",
		address:"",//json obj has comma, not colons
		phoneNumber:"", //phone to phoneNumber for the database
	   email:"",
        ssn:""
	};
	};
    
    $scope.add=function(){
		var tempObj={
		firstName:$scope.formModels.firstName,
		lastName:$scope.formModels.lastName,
		address:$scope.formModels.address,
		phoneNumber:$scope.formModels.phoneNumber,
        email:$scope.formModels.email,
        ssn:$scope.formModels.ssn
            
		};
         
        if($scope.updateId==0){
           
        teacherHttp.postteacherList(tempObj).then(function (response){
           refreshEntries();
            resetForm();
        });  
        }else
            
        {//for update
            alert("update" + $scope.updateId);
            teacherHttp.updateteacherList(tempObj,$scope.updateId).then(function (response){
           refreshEntries();
            resetForm();
                $scope.updateId=0;
        }); 
            
        }
        
        };
 
	//for delete and update button
	$scope.delete=function(teacherId){
		alert("delete" + teacherId);
		teacherHttp.deleteteacherList(teacherId);
		refreshEntries();
	};
	
		
	function refreshEntries(){
	 var promise=teacherHttp.getteacherList();
            promise.then(function(response){
                $scope.teacherList=response;
               // console.log(response);
            });
	}
    
    
    
       $scope.update=function(teacherId){
        var promise=teacherHttp.getteacherListUniq(teacherId);
        promise.then(function(response){
            console.log(response[0]);
            $scope.updateteacherlist=response;
            $scope.formModels=response[0];
            $scope.formModels.ssn=parseInt(response[0].ssn);
            $scope.formModels.phoneNumber=parseInt(response[0].phoneNumber);
        }); 
 
        $scope.updateId = teacherId;
          
    };
    
//    $scope.update = function(teacherId){
//    	$scope.updateteacherList=[];
//    $scope.updateId = 0;
//		$scope.update=function(teacherId){
//		alert("update" + teacherId);
//			teacherHttp.updateteacherList(teacherId);
//		refreshEntries();
//	};
//
}
]);