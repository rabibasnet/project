angular.module("rabi").service("studentHttp",["$http",function($http){
    this.test="val from service";
    this.studentList=[];
    var that=this;
    this.getstudentList=function(){     //table name correction from thd database
        return $http({
            method:"GET",
            url:"/service/studenttable"//check for the info inn the database table and check the table name
        }).then(function(result){
            that.studentList=result.data;
            return result.data;
        });
    };
    
    this.getstudentListUniq=function(studentId){
        return $http({
            method:"GET",
            url:"/service/studenttable/"+studentId
        }).then(function(result){
            that.studentList=result.data;
            return result.data;
        });
    };
    
    
     this.postStudentList=function(dataParam){
        return $http({
            method:"POST",
            url:"/service/studenttable",
            data:dataParam
            
        }).then(function(result){
            //that.studentList=result.data;
            return result.status;
        });
     }
     this.deleteStudentList=function(studentId){
         return $http({
             method:"DELETE",
             url:"/service/studenttable/"+studentId
         }).then(function(result){
             return result.status;
         })
     }
     this.updateStudentList=function(dataParam,studentId){
         return $http({
             method:"PUT",
             url:"/service/studenttable/"+studentId,
             data:dataParam
         }).then(function(result){
             return result.status;
         });
     }
     
}]);