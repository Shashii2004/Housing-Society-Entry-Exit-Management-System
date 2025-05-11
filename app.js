var app = angular.module('visitorApp', []);

app.controller('VisitorController', function($scope) {
    const STORAGE_KEY = 'visitorList';

    // Load visitor list from localStorage
    $scope.visitors = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    function updateLocalStorage() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify($scope.visitors));
    }

    $scope.addVisitor = function() {
        const now = new Date();
        const newVisitor = {
            name: $scope.visitor.name,
            contact: $scope.visitor.contact,
            flat: $scope.visitor.flat,
            purpose: $scope.visitor.purpose,
            entryTime: now.toLocaleString(),
            exitTime: null,
            status: "In"
        };
        $scope.visitors.push(newVisitor);
        $scope.visitor = {}; // Reset form
        updateLocalStorage();
    };

    $scope.markExit = function(visitor) {
        const now = new Date();
        visitor.exitTime = now.toLocaleString();
        visitor.status = "Out";
        updateLocalStorage();
    };

    $scope.deleteVisitor = function(index) {
        $scope.visitors.splice(index, 1);
        updateLocalStorage();
    };
});
