# angular-async-module
Write your angular apps without caring for script order!

## Getting Started
`bower install angular-async-module`

## Usage
No better explanation than an example. Here it is:
<pre>
angular.asyncModule('myModule', function(module) {
    module.controller('MyController', function ($scope) {
        $scope.name = 'Netanel';
    });
});
angular.module('myModule', ['secondModule']);
angular.module('secondModule', []);
angular.asyncModule('secondModule', function(module) {
    module.filter('cool', function() {
        return function(item) {
            return item + ' Gilad';
        }
    });
});
</pre>
As you can see you can define your injectables before the module has been instantiated, or afterwards ofcourse. :)
Enjoy.
