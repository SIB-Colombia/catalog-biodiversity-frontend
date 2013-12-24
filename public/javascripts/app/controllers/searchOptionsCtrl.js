define([], function() {
	return ['$scope', '$http', 'SearchOptions', function($scope, $http, SearchOptions) {
		$scope.searchOptions = SearchOptions;

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
		};

		// because this has happened asynchroneusly we've missed
		// Angular's initial call to $apply after the controller has been loaded
		// hence we need to explicityly call it at the end of our Controller constructor
		$scope.$apply();
	}];
});