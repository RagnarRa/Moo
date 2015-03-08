angular.module("evaluationApp").filter("TextQuestionFilter", function() {
	//Tekur inn array-id og skilar filtered array (ur ng-repeat)
	return function(items) {
		var filtered = [];
		angular.forEach(items, function(item) {
			if (item.Type === "text") {
				filtered.push(item);
			}
		});

		return filtered; 
	};
});