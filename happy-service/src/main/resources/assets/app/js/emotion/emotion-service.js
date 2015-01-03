'use strict';

angular.module('happy')
  .factory('Emotion', ['$resource', function ($resource) {
    return $resource('http://127.0.0.1:8080/emotions/:id', {id:'@id'}, {
     'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'},
      'DELETE': { method: 'DELETE'}
    });
  }]);
