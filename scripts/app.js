
"use strict";
angular.module("rabi",['ui.router','ui.bootstrap']);
angular.module("rabi").config(['$locationProvider','$stateProvider','$urlRouterProvider',function($locationProvider, $stateProvider, $urlRouterProvider){
    $locationProvider.html5Mode(true);
    //$urlRouterProvider.otherwise("/home");
    
    $stateProvider.state("error",{
        url:"/error",
        templateUrl:"/views/error.html"
        
    }).state("student",{
        url:"/student",
        templateUrl:"/views/student.html",
        //controller:'appCtrl'
    }).state("teacher",{
        url:"/teacher",
        templateUrl:"/views/teacher.html",
        //controller:'appCtrl'
    }).state("class",{
        url:"/class",
        templateUrl:"/views/class.html",
       // controller:'appCtrl'
        
        }).state("session",{
        url:"/session",
        templateUrl:"/views/session.html",
       // controller:'appCtrl'
        
        }).state("batch",{
        url:"/batch",
        templateUrl:"/views/batch.html",
       // controller:'appCtrl'
    });
}]);
