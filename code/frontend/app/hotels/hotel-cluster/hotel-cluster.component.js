(function ()
{

    'use strict';

    angular
        .module('hotelsResultModule')
        .component('resultContainerItemsComponent',
            {
            controller: itemListController,
            bindings:
                {
                hotels: '<',
                filters: '<'
                },
            templateUrl: "hotels/hotel-cluster/hotel-cluster.html"
            });
        function itemListController ()
        {
            let self = this;
            let slicehotel = [];
            this.loadMore = function () {}
        }
})();
