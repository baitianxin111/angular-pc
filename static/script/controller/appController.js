define(['app', 'slimscroll', 'angularCgsUtil', 'angularTranslate', 'angularLoader'], function (app) {
    app.controller("appCtrl", function ($scope,$filter,$http, $translate, $rootScope, $state, $uibModal, $interval,$timeout) {
     //主控制器
        $http.get("")
            .then(function (results) {
                console.log(results);
            })



    });
});
