angular.module("evaluationApp").filter("SingleMultipleQuestionFilter", function() {
	//Tekur inn array-id og skilar filtered array (ur ng-repeat)
	return function(items) {
		var filtered = [];
		angular.forEach(items, function(item) {
			if (item.Type === "single" || item.Type === "multiple") {
				filtered.push(item);
			}
		});

		return filtered; 
	};
});