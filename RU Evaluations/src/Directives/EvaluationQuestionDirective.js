angular.module("evaluationApp").directive("evaluationQuestion", function() {
	return {
		restrict: 'E', //Bara element
		/* scope: { //Buum til separate scope inn i directive fra scope outside.. mappa svo scocpe outside vid thetta inner scope.. med thvi ad bua til thetta "isolate scope".. <evaluation-question question="object" myndi bindast vid thetta..
										//Tl;dr, default scope a directive er sama og scope a enclsoing controller.. erum ad bua til okkar eigid.. 
			question: '=question' 
		} */
		templateUrl: function(elem, attr) { //teacher eda course
			return 'src/Directives/evaluation-' + attr.type + '-question.html';
		}
	};
});