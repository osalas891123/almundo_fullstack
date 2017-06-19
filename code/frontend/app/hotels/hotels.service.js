(function () {
    'use strict';

    angular
        .module('hotelsResultModule')
        .factory('hotelsService', hotelsService);

    hotelsService.$inject = ['$http'];

    function hotelsService($http)
    {
        const factory =
            {
            hotels: null,

            getHotels: function ()
            {
                return $http.get('/api/v1/hotels').then(function (response)
                {
                    let data = response.data;
                    factory.hotels = data;
                    return data;
                }).catch(onFailed);
            }
            };

        return factory;

        function onFailed(e)
        {
            console.log('error' + e);
        }
    }
})();
