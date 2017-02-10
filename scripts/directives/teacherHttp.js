angular.module("rabi").service("teacherHttp",["$http",function($http){
    this.test="val from service";
    this.teacherList=[];
    var that=this;
    this.getteacherList=function(){     //table name correction from thd database
        return $http({
            method:"GET",
            url:"/service/teachertable"//check for the info inn the database table and check the table name
        }).then(function(result){
            that.teacherList=result.data;
            return result.data;
        });
    };
    
    this.getteacherListUniq=function(teacherId){
        return $http({
            method:"GET",
            url:"/service/teachertable/"+teacherId
        }).then(function(result){
            that.teacherList=result.data;
            return result.data;
        });
    };
    
    
     this.postteacherList=function(dataParam){
        return $http({
            method:"POST",
            url:"/service/teachertable",
            data:dataParam
            
        }).then(function(result){
            //that.teacherList=result.data;
            return result.status;
        });
     }
     this.deleteteacherList=function(teacherId){
         return $http({
             method:"DELETE",
             url:"/service/teachertable/"+teacherId
         }).then(function(result){
             return result.status;
         })
     }
     this.updateteacherList=function(dataParam,teacherId){
         return $http({
             method:"PUT",
             url:"/service/teachertable/"+teacherId,
             data:dataParam
         }).then(function(result){
             return result.status;
         });
     }
     
}]);