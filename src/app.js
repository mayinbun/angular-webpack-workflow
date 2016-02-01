import angular from 'angular';
import ngAnimate from 'angular-animate';
import uiRouter from 'angular-ui-router';

//Modules
import HomeModule from './components/home/home';
import NavigationModule from './components/navigation/navigation';
import LegalModule from './components/legal/legal';
import PageTitleModule from './components/page-title/page-title';

//Global templates & css
import footerTemplate from "./components/footer/footer.html";
import './app.css';
import 'flexboxgrid/css/flexboxgrid.css';

angular.module('app', [
    uiRouter,
    ngAnimate,
    HomeModule.name,
    NavigationModule.name,
    LegalModule.name,
    PageTitleModule.name

])
.config(routeConfig)
.controller('AppController',()=>new AppController);



function routeConfig($stateProvider,$urlRouterProvider) {
    //URL rewritings
    $urlRouterProvider.otherwise('/404'); //Fallback URL (page not found)
    
    $urlRouterProvider.when('/login/*path', 'login');
    $urlRouterProvider.when('/auction/lot/:id?*path', '/auction/lot/:id?page');
    $urlRouterProvider.when('/auction/index/:id?*path', "/auction/lot/:id");
    $urlRouterProvider.when('/content/terms', '/terms');
    
    $stateProvider
        .state('root', {
            abstract: true,
            views: {
                '@': {
                    controller: "AppController",
                },
                'footer@': {
                    template:footerTemplate
                }
            }
        })
        .state('404', {
            parent: 'root',
            url: "/404",
            pageTitle: 'Error 404',
            views: {
                "@": {
                    template: 'error-404.html',
                }
            }
        })
}
routeConfig.$inject = ['$stateProvider','$urlRouterProvider'];

class AppController {
    constructor(){
      
    }
}

/*.config([
        '$httpProvider',
        '$urlRouterProvider',
        '$stateProvider',
        function ($httpProvider, $urlRouterProvider, $stateProvider) {
            //URL REWRITINGS
            $urlRouterProvider.when('/login/*path', 'login');
            $urlRouterProvider.when('/auction/lot/:id?*path', '/auction/lot/:id?page');
            $urlRouterProvider.when('/auction/index/:id?*path', "/auction/lot/:id");
            $urlRouterProvider.when('/content/terms', '/terms');
            //FALLBACK URL (Can be replaced with 404 page)
            $urlRouterProvider.otherwise("/404");
      
            //$locationProvider.html5Mode({ enabled: true, requireBase: false });
      
            //Interceptor
            $httpProvider.interceptors.push([
                '$injector',
                function ($injector) {
                    return $injector.get('sessionRecovery');
                }
            ]);
            $httpProvider.defaults.withCredentials = true; //needed for api-test

       
        }])*/