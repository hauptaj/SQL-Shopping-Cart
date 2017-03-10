var app = angular.module('myMod');

app.controller('cartCtrl', function($scope, cartService) {

  cartService.getItems().then(function() {
    $scope.shoppingList = cartService.updateItems();
    console.log($scope.shoppingList);
  });

  $scope.addToCart = function(item){
    console.log(item);
    cartService.addItem(item).then(function() {
      $scope.shoppingList = cartService.updateItems();
    });
  };


});
