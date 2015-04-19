'use strict';
angular.module('happy')
    .factory('MapService', ['$resource', function ($resource) {
        console.info("dans lemapService");
        return $resource('http://127.0.0.1:8080/emotions/:_id', {
            _id: '@_id'
        }, {
            'query': {
                method: 'GET',
                isArray: true
            },
            'get': {
                method: 'GET' ,
                isArray: true
            }, 
            'update': {
                method: 'PUT'
            },
            'DELETE': {
                method: 'DELETE'
            }
        });
  }]);