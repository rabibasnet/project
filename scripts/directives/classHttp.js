angular.module("rabi").service("classHttp",["$http",function($http){
    this.test="val from service";
    this.classList=[];
    var that=this;
    this.getclassList=function(){     //table name correction from thd database
        return $http({
            method:"GET",
            url:"/service/classtable"//check for the info inn the database table and check the table name
        }).then(function(result){
            that.classList=result.data;
            return result.data;
        });
    };
    
    this.getclassListUniq=function(classId){
        return $http({
            method:"GET",
            url:"/service/classtable/"+classId
        }).then(function(result){
            that.classList=result.data;
            return result.data;
        });
    };
    
    
     this.postclassList=function(dataParam){
        return $http({
            method:"POST",
            url:"/service/classtable",
            data:dataParam
            
        }).then(function(result){
            //that.classList=result.data;
            return result.status;
        });
     }
     this.deleteclassList=function(classId){
         return $http({
             method:"DELETE",
             url:"/service/classtable/"+classId
         }).then(function(result){
             return result.status;
         })
     }
     this.updateclassList=function(dataParam,classId){
         return $http({
             method:"PUT",
             url:"/service/classtable/"+classId,
             data:dataParam
         }).then(function(result){
             return result.status;
         });
     }
     
}]);