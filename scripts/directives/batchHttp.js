angular.module("rabi").service("batchHttp",["$http",function($http){
    this.test="val from service";
    this.batchList=[];
    var that=this;
    this.getbatchList=function(){     //table name correction from thd database
        return $http({
            method:"GET",
            url:"/service/batchtable"//check for the info inn the database table and check the table name
        }).then(function(result){
            that.batchList=result.data;
            return result.data;
        });
    };
    
    this.getbatchListUniq=function(batchId){
        return $http({
            method:"GET",
            url:"/service/batchtable/"+batchId
        }).then(function(result){
            that.batchList=result.data;
            return result.data;
        });
    };
    
    
     this.postbatchList=function(dataParam){
        return $http({
            method:"POST",
            url:"/service/batchtable",
            data:dataParam
            
        }).then(function(result){
            //that.batchList=result.data;
            return result.status;
        });
     }
     this.deletebatchList=function(batchId){
         return $http({
             method:"DELETE",
             url:"/service/batchtable/"+batchId
         }).then(function(result){
             return result.status;
         })
     }
     this.updatebatchList=function(dataParam,batchId){
         return $http({
             method:"PUT",
             url:"/service/batchtable/"+batchId,
             data:dataParam
         }).then(function(result){
             return result.status;
         });
     }
     
}]);