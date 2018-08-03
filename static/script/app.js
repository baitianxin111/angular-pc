define(
    [
        'angular',
        'slimscroll',
        'angularAnimate',
        'angularUiRouter',
        'uiBootstrapTpls',
        'angularTranslate',
        'angularLoader',
        'jquery',
        ],
    function (angular) {

        var app = angular.module('erp', ['pascalprecht.translate', 'ui.router', 'ui.bootstrap', 'ngAnimate']);
        app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider', '$translateProvider', function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, $translateProvider) {
            // $locationProvider.hashPrefix('');
            $urlRouterProvider.otherwise("/home");
            $stateProvider
                .state('home', { //主页
                    url: "/home",
                    templateUrl: "partials/index.html",
                    controllerUrl:"script/controller/midController.js"
                })
                .state('left', { //左边
                url: "/left",
                templateUrl: "partials/left.html",
                    controllerUrl:"script/controller/midController.js"
            })
                .state('mid', { //中间
                    url: "/mid",
                    templateUrl: "partials/mid.html",
                    controllerUrl:"script/controller/midController.js"
                })

        }]);
        return app;
    }
);
