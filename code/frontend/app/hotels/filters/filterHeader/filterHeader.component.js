(function (){

    'use strict';

    angular.module('filterModule')
        .component('headerSearchComponent',
            {
            bindings:{
                "filters":'<'
            },
                require:
                    {
                        hotelsResultController : "^almundoHotels"
                    },
                controller: filterHeaderController,
                templateUrl:'hotels/filters/filterHeader/filterHeader.html'
            });

    function filterHeaderController() {
        var self = this;
        this.$onInit = function () {}
    }

})();