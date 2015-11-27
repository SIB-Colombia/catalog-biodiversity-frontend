define([], function() {
	return ['$scope', '$location', '$routeParams', '$http', 'SearchOptions', function($scope, $location, $routeParams, $http, SearchOptions) {
		$scope.searchOptions = SearchOptions;
		$scope.currentTextSearch = "";
		//$scope.currentPath = $location.$$path;
		//$scope.currentPath = "sopas";

		$scope.switchTaxon = function(currentTaxon) {
			if(currentTaxon == "all") {
				$scope.searchOptions.setCurrentTaxon("all");
			} else if(currentTaxon == "insecta") {
				$scope.searchOptions.setCurrentTaxon("insecta");
			} else if(currentTaxon == "bird") {
				$scope.searchOptions.setCurrentTaxon("bird");
			} else if(currentTaxon == "plantae") {
				$scope.searchOptions.setCurrentTaxon("plantae");
			} else if(currentTaxon == "mammal") {
				$scope.searchOptions.setCurrentTaxon("mammal");
			} else if(currentTaxon == "reptilia") {
				$scope.searchOptions.setCurrentTaxon("reptilia");
			} else if(currentTaxon == "amphibia") {
				$scope.searchOptions.setCurrentTaxon("amphibia");
			} else if(currentTaxon == "fungi") {
				$scope.searchOptions.setCurrentTaxon("fungi");
			}
			else if(currentTaxon == "mollusca") {
				$scope.searchOptions.setCurrentTaxon("mollusca");
			}
		};

		$scope.switchShowRecordsWithPicture = function() {
			if($scope.searchOptions.getShowRecordsWithPicture() == true) {
				$scope.searchOptions.setShowRecordsWithPicture(false);
			} else {
				$scope.searchOptions.setShowRecordsWithPicture(true);
			}
		};

		$scope.switchOrderDirection = function(direction) {
			$scope.searchOptions.setOrderDirection(direction);
		};

		$scope.go = function () {
			if($scope.currentTextSearch != "") {
				SearchOptions.setSearchCondition($scope.currentTextSearch);
				$location.search('q', $scope.currentTextSearch);
			} else {
				SearchOptions.setSearchCondition("");
				$location.search('q', $scope.currentTextSearch);
			}
		};

		// because this has happened asynchroneusly we've missed
		// Angular's initial call to $apply after the controller has been loaded
		// hence we need to explicityly call it at the end of our Controller constructor
		$scope.$apply();
	}];
});