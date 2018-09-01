  var app = angular.module("tagsApp", ["ngRoute"]);

  

  app.config(function($routeProvider) {
    $routeProvider
    .when("/tags", {
        templateUrl : "MainPage.html",
        controller: "MainPageController"
    })
    .otherwise({
        redirectTo: '/'
    });
});

app.directive('tag', function ($timeout) {
    return {
        restrict: 'E',
        scope:{
            tagitem: '=',
            deletetag: '&'

        },
        templateUrl: 'tagTemplate.html',
        controller: function($scope, $element, $attrs, $rootScope){
            $scope.tagEntered =false;

            $scope.displayTag = function(event){
                event.preventDefault();
                if (event.keyCode === 13) {
                 if(event.currentTarget.value.length>0){
                    $scope.tagEntered =true;

                }
                }
            }

            $scope.editTag = function(){
                $scope.tagEntered =false;
            }
            

            $scope.deleteTag = function(id){
                
                $rootScope.$emit('delete-tag', { 'id': id});


            }

             
        },
        link: function(scope, element, attrs) {
            var button = angular.element(element.find('img')[0].parentElement)
            button.on('click', function () {
                scope.$apply(function() {
                scope.deleteTag(scope.tagitem.id);
            });

            
        });

            if(scope.tagitem.new){
                element.find('input')[0].focus();
            }
            delete(scope.tagitem.new);
        }

    };
});


app.controller("MainPageController", function ($scope, $rootScope) {

    $scope.tags=[];

    var id =0;

    $rootScope.$on('delete-tag', function (event, args) {

        var item = $scope.tags.find(function(tag){
            if(tag.id == args.id){
                return true;
            }
        })

        var index = $scope.tags.indexOf(item);

        $scope.tags.splice(index, 1);
 });

    $scope.createTag = function(){

        $scope.tags.unshift({'id':id++,'new' : 'true'})

    }


});
