'use strict';
(function (win) {
    //配置baseUrl
    var baseUrl = document.getElementById('main').getAttribute('data-baseurl');

    /*
     * 文件依赖
     */
    var config = {
        baseUrl: baseUrl, //依赖相对路径
        waitSeconds: 60,
        paths: { //如果某个前缀的依赖不是按照baseUrl拼接这么简单，就需要在这里指出
            'jquery': 'js/jquery-2.1.3.min',
            'angular': 'js/angular.min',
            'angularAnimate': 'js/angular-animate.min',
            'angularDrag': 'js/angular-drag',
            'angularUiRouter': 'js/angular-ui-router.min',
            'uiBootstrapTpls': 'js/ui-bootstrap-tpls.min',
            'angularCgsUtil': 'script/directive/angular-cgs-utils',
            'angularSanitize': 'js/angular-sanitize.min',
            'angularTranslate': 'js/angular-translate',
            'angularLoader': 'js/loader-static-files',
            'wDatePicker': 'plugin/My97DatePicker/WdatePicker',
            'slimscroll': 'plugin/scrollbar/jquery.scrollbar.min',
            'ztreeCore': 'plugin/zTree/jquery.ztree.core.min',
            'ztreeExcheck': 'plugin/zTree/jquery.ztree.excheck.min',
            'ztreeExedit': 'plugin/zTree/jquery.ztree.exedit.min',
            'colResizable': 'plugin/colResizable-1.6',
            'app': 'script/app',
            'appCtrl': 'script/controller/appController',
            'midCtrl': 'script/controller/midController',
        },

        map: {
            '*': {
                // Backbone requires underscore. This forces requireJS to load lodash instead:
                'underscore': 'lodash'
            }
        },
        shim: { //引入没有使用requirejs模块写法的类库。例如underscore这个类库，本来会有一个全局变量'_'。这里shim等于快速定义一个模块，把原来的全局变量'_'封装在局部，并导出为一个exports，变成跟普通requirejs模块一样
            'angular': {
                exports: 'angular'
            },
            'angularAnimate': {
                deps: ['angular'] //依赖什么模块
            },
            'angularDrag': {
                deps: ['angular', 'jquery'] //依赖什么模块
            },
            'angularUiRouter': {
                deps: ['angular'] //依赖什么模块
            },
            'uiBootstrapTpls': {
                deps: ['angular'] //依赖什么模块
            },
            'wDatePicker': {
                deps: ['jquery']
            },
            'angularSanitize': {
                deps: ['angular']
            },
            'angularTranslate': {
                deps: ['angular']
            },
            'angularLoader': {
                deps: ['angular', 'angularTranslate']
            },
            'colResizable': {
                deps: ['jquery']
            },
            'ztreeCore': {
                deps: ['jquery']
            },
            'ztreeExcheck': {
                deps: ['jquery', 'ztreeCore']
            },
            'ztreeExedit': {
                deps: ['jquery', 'ztreeCore']
            },
            'authox': {
                deps: ['angular']
            }
        }
    };

    require.config(config);

    require(['jquery', 'angular', 'app', 'appCtrl','midCtrl'], function ($, angular) {
        angular.bootstrap(document, ['erp']); //动态方式启动angular 
    });

})(window);
