define(['jquery', 'angular', 'controllers/searchOptionsCtrl', 'controllers/wallHomeCtrl', 'controllers/wallInsectaCtrl', 'controllers/wallAvesCtrl', 'controllers/wallPlantaeCtrl', 'controllers/wallMammaliaCtrl', 'controllers/wallReptiliaCtrl', 'controllers/wallAmphibiaCtrl', 'controllers/wallFungiCtrl', 'services', 'nginfinitescroll', 'angularSanitize'], function ($, angular) {
	'use strict';

	/* Controllers */
				
	return angular.module('catalogFrontend.controllers', ['catalogFrontend.services', 'infinite-scroll', 'ngSanitize'])
		// Home site records of species wall controller
		.controller('SearchOptionsCtrl', ['$scope', '$injector', function($scope, $injector) {
			require(['controllers/searchOptionsCtrl'], function(searchOptions) {
				// injector method takes an array of modules as the first argument
				// if you want your controller to be able to use components from
				// any of your other modules, make sure you include it together with 'ng'
				// Furthermore we need to pass on the $scope as it's unique to this controller
				$injector.invoke(searchOptions, this, {'$scope': $scope});
			});
		}])
		// Home site records of species wall controller
		.controller('WallHomeCtrl', ['$scope', '$routeParams', '$injector', function($scope, $routeParams, $injector) {
			require(['controllers/wallHomeCtrl'], function(wallctrl) {
				// injector method takes an array of modules as the first argument
				// if you want your controller to be able to use components from
				// any of your other modules, make sure you include it together with 'ng'
				// Furthermore we need to pass on the $scope as it's unique to this controller
				$injector.invoke(wallctrl, this, {'$scope': $scope});
			});
		}])
		// Home site insecta records wall controller
		.controller('WallInsectaCtrl', ['$scope', '$injector', function($scope, $injector) {
			require(['controllers/wallInsectaCtrl'], function(wallinsectactrl) {
				// injector method takes an array of modules as the first argument
				// if you want your controller to be able to use components from
				// any of your other modules, make sure you include it together with 'ng'
				// Furthermore we need to pass on the $scope as it's unique to this controller
				$injector.invoke(wallinsectactrl, this, {'$scope': $scope});
			});
		}])
		// Home site birds records wall controller
		.controller('WallAvesCtrl', ['$scope', '$injector', function($scope, $injector) {
			require(['controllers/wallAvesCtrl'], function(wallavesctrl) {
				// injector method takes an array of modules as the first argument
				// if you want your controller to be able to use components from
				// any of your other modules, make sure you include it together with 'ng'
				// Furthermore we need to pass on the $scope as it's unique to this controller
				$injector.invoke(wallavesctrl, this, {'$scope': $scope});
			});
		}])
		// Home site plantae records wall controller
		.controller('WallPlantaeCtrl', ['$scope', '$injector', function($scope, $injector) {
			require(['controllers/wallPlantaeCtrl'], function(wallplantaectrl) {
				// injector method takes an array of modules as the first argument
				// if you want your controller to be able to use components from
				// any of your other modules, make sure you include it together with 'ng'
				// Furthermore we need to pass on the $scope as it's unique to this controller
				$injector.invoke(wallplantaectrl, this, {'$scope': $scope});
			});
		}])
		// Home site mammalia records wall controller
		.controller('WallMammaliaCtrl', ['$scope', '$injector', function($scope, $injector) {
			require(['controllers/wallMammaliaCtrl'], function(wallmammaliactrl) {
				// injector method takes an array of modules as the first argument
				// if you want your controller to be able to use components from
				// any of your other modules, make sure you include it together with 'ng'
				// Furthermore we need to pass on the $scope as it's unique to this controller
				$injector.invoke(wallmammaliactrl, this, {'$scope': $scope});
			});
		}])
		// Home site reptilia records wall controller
		.controller('WallReptiliaCtrl', ['$scope', '$injector', function($scope, $injector) {
			require(['controllers/wallReptiliaCtrl'], function(wallreptiliactrl) {
				// injector method takes an array of modules as the first argument
				// if you want your controller to be able to use components from
				// any of your other modules, make sure you include it together with 'ng'
				// Furthermore we need to pass on the $scope as it's unique to this controller
				$injector.invoke(wallreptiliactrl, this, {'$scope': $scope});
			});
		}])
		// Home site amphibia records wall controller
		.controller('WallAmphibiaCtrl', ['$scope', '$injector', function($scope, $injector) {
			require(['controllers/wallAmphibiaCtrl'], function(wallamphibiactrl) {
				// injector method takes an array of modules as the first argument
				// if you want your controller to be able to use components from
				// any of your other modules, make sure you include it together with 'ng'
				// Furthermore we need to pass on the $scope as it's unique to this controller
				$injector.invoke(wallamphibiactrl, this, {'$scope': $scope});
			});
		}])
		// Home site fungi records wall controller
		.controller('WallFungiCtrl', ['$scope', '$injector', function($scope, $injector) {
			require(['controllers/wallFungiCtrl'], function(wallfungictrl) {
				// injector method takes an array of modules as the first argument
				// if you want your controller to be able to use components from
				// any of your other modules, make sure you include it together with 'ng'
				// Furthermore we need to pass on the $scope as it's unique to this controller
				$injector.invoke(wallfungictrl, this, {'$scope': $scope});
			});
		}]);
});