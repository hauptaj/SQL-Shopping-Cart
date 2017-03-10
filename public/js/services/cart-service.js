var app = angular.module('myMod');

// Need to inject something to make AJAX calls
app.factory('cartService', function($http) {
   var shoppingList = [];
  return{
    addItem: addItem,
    getItems: getItems,
    updateItems: updateItems
  };

  function updateItems(){
    return shoppingList;
  }

function getItems(){
  var promise = $http({
    method: 'GET',
    url: '/get-item'
  }).then(function successCallback(response) {
    console.log(response);
    shoppingList = response.data;
  });
  return promise;
};

function addItem(item){
  var promise = $http({
    method: 'POST',
    url: '/add-item',
    data: item
  }).then(function successCallback(response) {
    console.log(response);
    shoppingList = response.data;
  });
  return promise;
};

});
