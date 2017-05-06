var myApp = angular.module("myApp", ["ngRoute", "ngAnimate"]);

myApp.config(function($routeProvider) {
	$routeProvider
		.when("/skills", {
			templateUrl: "partials/skill-list.html",
			controller: "BookListCtrl"
		})
        .when("/about", {
            templateUrl: "partials/about.html",
            controller: "aboutCtrl"
        })
        .when("/exp", {
            templateUrl: "partials/exp.html",
            controller: "expCtrl"
        })
        .when("/proj", {
            templateUrl: "partials/proj.html",
            controller: "projCtrl"
        })
        .when("/conn", {
            templateUrl: "partials/conn.html",
            controller: "connCtrl"
        })
        .when("/acad", {
            templateUrl: "partials/acad.html",
            controller: "acadCtrl"
        })
	.otherwise({
		redirectTo: "/about"
	});
});



myApp.factory("bookService", function() {
	var books = [
		{

			name: "Java",
			rating: 85,
			//content: "Content Goes Here"
		},
        {

            name: "SQL",
            rating: 90,
           // content: "Content"
        },
    {

		name: "HTML5, CSS3, Java Script",
        rating: 80,
        //content: "Content"
    },
        {

            name: "Angular JS & Angular2",
            rating: 80,
           // content: "Content"
        },
        {

            name: "Typescript",
            rating: 80,
            //content: "Content"
        },
        {

            name: "Spring MVC",
            rating: 90,
            // content: "Content"
        },
        {

            name: "Balsamiq",
            rating: 90,
           // content: "Content"
        }


	];
	
	return {
		getBooks: function() {
			return books;
		},

	}
});



myApp.controller("HeaderCtrl", function($scope, $location) {
	$scope.appDetails = {};
	$scope.appDetails.title = "Pratik Nellutla";
	$scope.appDetails.tagline = "Software Developer";
	
	$scope.nav = {};
	$scope.nav.isActive = function(path) {
		if (path === $location.path()) {
			return true;
		}
		
		return false;
	}
});

myApp.controller("BookListCtrl", function($scope, bookService) {
	$scope.books = bookService.getBooks();
	

});