define(['uiRouter','angular-animate'], 
    function() {
    'use strict';
    angular.module('blackbird',['ui.router','ngAnimate'])
    .config(config)
    .controller('blackbirdsController', blackbirdsController);
    blackbirdsController.$inject = [];
    config.$inject = ['$stateProvider','$urlRouterProvider','$locationProvider'
    ];
    function config(
        $stateProvider,
        $urlRouterProvider,
        $locationProvider
    ) {
        $locationProvider.html5Mode(false);
        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('blackbirdsHome', {
                'url': '/home',
                'templateUrl': '/views/home.html',
                'controller': 'blackbirdsController',
                'controllerAs': 'homeCtrl'
            }).state('blackbirdsCheckout', {
                'url': '/checkout',
                'templateUrl': '/views/checkout.html',
                'controller': 'checkoutController',
                'controllerAs': 'checkoutCtrl'
            }).state('blackbirdsPayment', {
                'url': '/payment',
                'templateUrl': '/views/payment.html',
                'controller': 'paymentController',
                'controllerAs': 'paymentCtrl'
            });
    };
    
    function blackbirdsController() {
        
    };
    return function(widget) {
        angular.module('blackbird')
        .config([]);
    };
});
