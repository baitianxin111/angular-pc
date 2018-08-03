define(['app','jquery','angularCgsUtil',], function (app) {
    app.controller("leftCtrl", function ($scope,$http,$filter) {


    });
    app.controller("midCtrl", function ($scope, $http) { //供应商管理
        $scope.test1 = "suss1";
    })
    app.controller("rightCtrl", function ($scope, $http,$filter) { //供应商管理
        $scope.test1 = "suss1";
        //时间
        var today = new Date();
        $scope.formatedDateToday = $filter('date')(today,'HH:mm');
        $scope.year = $filter('date')(today,'yyyy.M.d');
        $scope.test = "suss";
    });;
});
