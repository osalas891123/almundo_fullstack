(function ()
{
    'use strict';

    angular
        .module('filterModule')
        .component('searchNameComponent',
            {
            bindings:
                {
                "filters" : '<'
                },
            templateUrl: 'hotels/filters/searchName/searchName.html'
            }).filter('filterHotel', function()
    {
        var self = this;
        return function (hotels,targetName)
        {
            return hotels.filter(function (hotel)
            {
                return hotel.name.toLowerCase().indexOf(targetName.toLowerCase()) != -1;
            })
        }
    })
})();
