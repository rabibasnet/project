angular.module("rabi").service("sessionHttp",["$http",function($http){
    this.test="val from service";
    this.sessionList=[];
    var that=this;
    this.getsessionList=function(){     //table name correction from thd database
        return $http({
            method:"GET",
            url:"/service/sessiontable"//check for the info inn the database table and check the table name
        }).then(function(result){
            that.sessionList=result.data;
            return result.data;
        });
    };
    
    this.getsessionListUniq=function(sessionId){
        return $http({
            method:"GET",
            url:"/service/sessiontable/"+sessionId
        }).then(function(result){
            that.sessionList=result.data;
            return result.data;
        });
    };
    
    
     this.postsessionList=function(dataParam){
        return $http({
            method:"POST",
            url:"/service/sessiontable",
            data:dataParam
            
        }).then(function(result){
            //that.sessionList=result.data;
            return result.status;
        });
     }
     this.deletesessionList=function(sessionId){
         return $http({
             method:"DELETE",
             url:"/service/sessiontable/"+sessionId
         }).then(function(result){
             return result.status;
         })
     }
     this.updatesessionList=function(dataParam,sessionId){
         return $http({
             method:"PUT",
             url:"/service/sessiontable/"+sessionId,
             data:dataParam
         }).then(function(result){
             return result.status;
         });
     }
     
}]);