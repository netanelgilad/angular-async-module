/**
 * Created by netanel on 09/01/15.
 */
(function() {
  var orig = angular.module;

  var moduleListeners = {};

  angular.asyncModule = function (moduleName, cb) {
    if (!moduleListeners[moduleName]) {
      moduleListeners[moduleName] = {
        loaded: false,
        listeners : []
      };
    }

    if (moduleListeners[moduleName].loaded) {
      cb(angular.module(moduleName));
    }
    else {
      moduleListeners[moduleName].listeners.push(function() {
        cb(angular.module(moduleName));
      });
    }
  }

  angular.module = function (moduleName, deps) {
    var result = orig(moduleName, deps);
    if (angular.isArray(deps)) {
      if (!moduleListeners[moduleName]) {
        moduleListeners[moduleName] = {
          loaded: true,
          listeners : []
        };
      }
      else {
        moduleListeners[moduleName].loaded = true
      }

      angular.forEach(moduleListeners[moduleName].listeners, function(listener) {
        listener();
      });
    }
    return result;
  }
})();