angular.module("rabi").controller("studentCtrl", ["$scope", "studentHttp", function($scope, studentHttp){
refreshEntries();

	$scope.studentList=[];
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
           
        studentHttp.postStudentList(tempObj).then(function (response){
           refreshEntries();
            resetForm();
        });  
        }else
            
        {//for update
            alert("update" + $scope.updateId);
            studentHttp.updateStudentList(tempObj,$scope.updateId).then(function (response){
           refreshEntries();
            resetForm();
                $scope.updateId=0;
        }); 
            
        }
        
        };
 
	//for delete and update button
	$scope.delete=function(studentId){
		alert("delete" + studentId);
		studentHttp.deleteStudentList(studentId);
		refreshEntries();
	};
	
		
	function refreshEntries(){
	 var promise=studentHttp.getstudentList();
            promise.then(function(response){
                $scope.studentList=response;
               // console.log(response);
            });
	}
    
    
    
       $scope.update=function(studentId){
        var promise=studentHttp.getstudentListUniq(studentId);
        promise.then(function(response){
            console.log(response[0]);
            $scope.updateStudentlist=response;
            $scope.formModels=response[0];
            $scope.formModels.ssn=parseInt(response[0].ssn);
            $scope.formModels.phoneNumber=parseInt(response[0].phoneNumber);
        }); 
 
        $scope.updateId = studentId;
          
    };
    
//    $scope.update = function(studentId){
//    	$scope.updateStudentList=[];
//    $scope.updateId = 0;
//		$scope.update=function(studentId){
//		alert("update" + studentId);
//			studentHttp.updateStudentList(studentId);
//		refreshEntries();
//	};
//
}
]);