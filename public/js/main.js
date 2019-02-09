var app = angular.module('blackbird',['ui.router']);
app.config(config);
app.controller('blackbirdsController', blackbirdsController);

config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(false);
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('blackbirdsHome', {
            'url': '/home',
            'templateUrl': '../views/home.html',
            'controller': 'blackbirdsController',
            'controllerAs': 'homeCtrl'
        }).state('blackbirdsCheckout', {
            'url': '/checkout',
            'templateUrl': '../views/checkout.html',
            'controller': 'checkoutController',
            'controllerAs': 'checkoutCtrl'
        }).state('blackbirdsPayment', {
            'url': '/payment',
            'templateUrl': '../views/payment.html',
            'controller': 'paymentController',
            'controllerAs': 'paymentCtrl'
        });
};

function blackbirdsController() {

};