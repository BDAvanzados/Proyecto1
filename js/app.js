var app = angular.module("B1", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/login", {
        templateUrl : "./../html/login.html",
        controller : 'loginCtrl'
    })
    .when("/view1", {
        templateUrl : "red.htm",
        controller : 'view1Ctrl'
    })
    
    .otherwise({
        redirectTo: '/login'
    });
});


app.controller('loginCtrl', function($scope){

$scope.shit = "Shit";
})

app.controller('view1Ctrl', function($scope){


})




app.directive('menu', function() {
    return {
       templateUrl: 'html/menu.html',
         controller:"menuCtrl"
   };
})

/////////// hay que corregir la que el mae hace con las respueestas despues de jalarlas , pero este es el get y el post basico 

//sevice que sobrecarga http con el fin de hacerlo accesible desde todos los comtroladores
.service('connectApi',function($http){
	//implementacion del gttp.get
	this.httpGet= function(method,requestJson){
		var getPromise=$http.get(webSeviceIp + method+'?frase='+JSON.stringify(requestJson)).then(function (response){
	    	return angular.fromJson(response.data.substring(73, response.data.length - 9));
		});
		return getPromise;
	},
	//implementacion del http.post
	this.httpPost= function(method,requestJson){
		var postPromise=$http.post(webSeviceIp+method, {frase:JSON.stringify(requestJson)}).then(function(response) {
            console.log(response);
	  		return angular.fromJson(response.data.d);
       	});
		return postPromise;
	}
})