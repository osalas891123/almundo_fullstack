(function ()
{
    'use strict';

    angular
        .module('filterModule')
        .component('filterComponent',
            {
            controller : filtersController,
            bindings:
                {
                "filters" :'<',
                },
            templateUrl: 'hotels/filters/filterComponent.html'
            });

    function filtersController (){}
})();
