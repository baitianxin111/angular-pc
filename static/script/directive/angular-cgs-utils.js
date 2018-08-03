/*
 * 通用的指令集合
 */
define(['app', 'wDatePicker', 'ztreeCore', 'ztreeExcheck', 'ztreeExedit', 'colResizable'], function (module) {

    /**
     * echarts
     * ------------------------------------------------------------------
     */
    module.directive('cgsEcharts', function ($timeout) {
        return {
            restrict: 'A',
            scope: {
                options: '='
            },
            link: function (scope, element, attrs) {
                var chart, timer;
                var chartId = attrs.cgsEcharts ? attrs.cgsEcharts : 'autoid';
                scope.$watch('options', function (n, o) {
                    if (scope.options) {
                        //init();
                        if (!chart) {
                            init();
                        }
                        if (chart) {
                            chart.setOption(scope.options);
                        }
                    }
                }, true);

                function dispose() {
                    if (chart) {
                        chart.dispose();
                        $(window).unbind('resize.' + chartId);
                    }
                }

                function init() {
                    dispose();
                    // 安全检测，未显示却加载则不init
                    if ($(element).width()) {
                        chart = echarts.init(element[0], 'macarons');
                        chart.showLoading({
                            text: '正在努力读取数据中……'
                        });
                        // 为echarts对象加载数据
                        chart.setOption(scope.options);
                        chart.hideLoading();
                        $(window).bind('resize.' + chartId, function () {
                            //						console.log(chartId);
                            chart.resize();
                            //chart.refresh();
                        });

                        //监控饼图扇形切换选中状态的事件
                        chart.on('pieselectchanged', function (params) {
                            scope.$emit("pieselectchanged", params);
                        });
                        chart.on('click', function (params) {
                            scope.$emit("barClick", params);
                        });
                        chart.on('brushSelected', function (params) {
                            scope.$emit("brushSelected", params);
                        });
                    }
                }
                if (timer) {
                    $timeout.cancel(timer);
                }
                timer = $timeout(init, 0);
                //init();

                scope.$on('$destroy', function () {
                    dispose();
                });
            }
        }
    });
    // module.directive('cgsEcharts', function () {
    //     return {
    //         restrict: 'A',
    //         scope: {
    //             options: '='
    //         },
    //         link: function (scope, element, attrs) {
    //             var chart;
    //             var chartId = attrs.cgsEcharts ? attrs.cgsEcharts : 'autoid';
    //             scope.$watch('options', function (n, o) {
    //                 if (scope.options) {
    //                     //init();
    //                     if (chart) {
    //                         chart.setOption(scope.options);
    //                     }
    //                 }
    //             }, true);
    //
    //             function dispose() {
    //                 if (chart) {
    //                     chart.dispose();
    //                     $(window).unbind('resize.' + chartId);
    //                 }
    //             }
    //
    //             function init() {
    //                 dispose();
    //                 // 安全检测，未显示却加载则不init
    //                 if (element.width()) {
    //                     chart = echarts.init(element[0], 'macarons');
    //                     chart.showLoading({
    //                         text: '正在努力读取数据中……'
    //                     });
    //                     // 为echarts对象加载数据
    //                     chart.setOption(scope.options);
    //                     chart.hideLoading();
    //                     $(window).bind('resize.' + chartId, function () {
    //                         //						console.log(chartId);
    //                         chart.resize();
    //                         chart.refresh();
    //                     });
    //
    //                     //监控饼图扇形切换选中状态的事件
    //                     chart.on('pieselectchanged', function (params) {
    //                         scope.$emit("pieselectchanged", params);
    //                     });
    //                 }
    //             }
    //             init();
    //
    //             scope.$on('$destroy', function () {
    //                 dispose();
    //             });
    //         }
    //     }
    // });
    module.directive('repeatFinish', function () {
        return {
            link: function (scope, element, attr) {
                console.log(scope.$index)
                if (scope.$last == true) {
                    console.log('ng-repeat执行完毕')
                    scope.$eval(attr.repeatFinish)
                }
            }
        }
    })

    //滚动条 支持Chrome FireFox Opera IE6+
    //    module.directive('cgsSlim', [
    //	function () {
    //            return {
    //                restrict: 'AC',
    //                scope: {
    //                    options: '='
    //                },
    //                link: function (scope, element, attrs) {
    //                    var options;
    //                    if (scope.options) {
    //                        options = scope.options;
    //                    } else options = {
    //                        height: '490px',
    //                        size: '7px'
    //                    };
    //                    $(element).slimscroll(options);
    //                }
    //            }
    //	}]);
    //滚动条 edited by zjf
    //    module.directive('cgsSlimz', [
    //	function () {
    //            return {
    //                restrict: 'AC',
    //                scope: {
    //                    options: '='
    //                },
    //                link: function (scope, element, attrs) {
    //                    var options;
    //                    var watcher = scope.$watch('options', function () {
    //                        if (scope.options) {
    //                            options = scope.options;
    //                        } else options = {
    //                            height: '490px',
    //                            size: '7px'
    //                        };
    //                        for (var i in options) {
    //                            if (options[i]) {
    //                                $(element).slimscroll(options);
    //                                break;
    //                            }
    //                        }
    //                    }, true);
    //                    scope.$on('$destroy', function () {
    //                        if (watcher) {
    //                            watcher = null;
    //                        }
    //                    });
    //                }
    //            }
    //	}]);
    //表格拖动列宽，需设置每列宽度
    module.directive('colResizable', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                setTimeout(function () {
                    element.colResizable({
                        'liveDrag': true
                    });
                }, 0)
            }
        };
    });

    /**
     * My97 datePicker
     * @author linyh
     * ------------------------------------------------------------------
     */
    module.directive('cgsDatePicker', function ($filter) {
            return {
                require: '?ngModel',
                restrict: 'A',
                link: function (scope, element, attrs, ngModel) {
                    if (typeof WdatePicker == 'function') {
                        var options = {};
                        options.dateFmt = attrs.dateFmt ? attrs.dateFmt : 'yyyy-MM-dd HH:mm:ss';
                        options.dchanging = function (dp) {
                            setModel(dp);
                        };

                        options.Mchanging = function (dp) {
                            setModel(dp);
                        };

                        options.ychanging = function (dp) {
                            setModel(dp);
                        };

                        options.dchanged = function (dp) {
                            setModel(dp);
                        };

                        options.Mchanged = function (dp) {
                            setModel(dp);
                        };

                        options.ychanged = function (dp) {
                            setModel(dp);
                        };

                        options.onpicked = function (dp) {
                            setModel(dp);
                        };

                        function setModel(dp) {
                            var object = dp.cal.newdate;
                            var date = new Date(object.y, object.M - 1, object.d, object.H, object.m, object.s);
                            if (!!ngModel)
                                ngModel.$setViewValue($filter('date')(date, options.dateFmt));
                        };
                        options.oncleared = function (dp) {
                            if (!!ngModel)
                                ngModel.$setViewValue(null);
                        };
                        scope.$watch(attrs.ngModel, function (n, o) {
                            element.val($filter('date')(n, options.dateFmt));
                        });
                        var wdateFun = function () {
                            WdatePicker(options);
                        };
                        element.focus(wdateFun);
                        element.click(wdateFun);
                    }
                }
            }
        })
        /**
         * 模拟单选框组
         * @author hucj
         * ------------------------------------------------------------------
         */
        .directive('cgsRadio', function ($interval, dateFilter) {
            return {
                restrict: 'EA',
                require: '?ngModel',
                scope: {
                    items: '=',
                    curItem: '=ngModel'
                },

                template: ' <ul class="radio-list">\
	<li ng-repeat="item in items" ng-click="select(item,$index)" ng-class="{\'selected\':($index==0)}">{{item.name}}</li>\
				</ul>',
                link: function (scope, element, attrs, ctrls) {

                    var $ul = $(element).children('ul');
                    scope.select = function (item, index) {
                        ctrls.$setViewValue(item);
                        $ul.children('li.selected').removeClass('selected');
                        $ul.children('li').eq(index).addClass('selected');

                    };

                }
            }
        })
        /**
         * ztree
         * @author hecb
         * ------------------------------------------------------------------
         */
        .directive('cgsTree', function ($http) {
            return {
                require: '^ngModel',
                restrict: 'A',
                scope: {
                    zNodes: '=',
                    zSettings: '='
                },
                link: function (scope, element, attrs, ngModel) {
                    function initTree() {
                        if (!!scope.zNodes && !!scope.zSettings) {
                            var zObj = $.fn.zTree.init(element, scope.zSettings, scope.zNodes);
                            var zTreeObj = $.fn.zTree.getZTreeObj(attrs['id']);
                            zTreeObj.expandAll(true);
                            if (!!ngModel) {
                                ngModel.$setViewValue(zObj);
                            }
                        }
                    }
                    scope.$watch('zNodes', function (o, n) {
                        initTree();
                    });
                    scope.$watch('zSettings', function (o, n) {
                        initTree();
                    })
                    scope.$on('$destroy', function () {
                        var zTreeObj = $.fn.zTree.getZTreeObj(attrs['id']);
                        if (!!zTreeObj) {
                            zTreeObj.destroy();
                        }
                    });
                }
            };
        })
        .filter("ellipsis", function () {
            return function (string, length) {
                var out = "";
                if (string) {
                    if (string.length > length) {
                        out = string.substr(0, length) + "...";
                    } else {
                        out = string;
                    }
                }
                return out;
            }
        })

    //回车Enter
    module.directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    });

    //自定义指令test
    module.directive('cgsSearchSelect', function () {
        return {
            template: '<div>Name:<input type="text"/></div>',
            link: function ($scope, element, attrs) {
                console.log('execute in every directive');
                element.bind('click', function () {
                    alert("点击!");
                });
            }
        }
    });
});
