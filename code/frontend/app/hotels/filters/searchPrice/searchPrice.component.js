(function ()
{

    'use strict';

    angular
        .module('filterModule')
        .component('searchPriceComponent',
            {
            controller: filterNightController,
            require:
                {
                hotelsResultController : '^almundoHotels'
                },
            bindings:
                {
                "filters" : '<'
                },
            templateUrl: "hotels/filters/searchPrice/searchPrice.html"
            }).filter('filterNight',function ()
    {
        return function (hotels,price)
        {
            return hotels.filter(function (hotel)
            {
                return (hotel.price >= price.priceMin && hotel.price <= price.priceMax);
            });
        }
    }).filter('comma2dot', [
  function() {
    return function(value) {
      return value.toString().replace(',','.');
    };
  }]);;

    function filterNightController ()
    {
        let self = this;

        this.slider =
            {
            value: 150,
            options:
                {
                minRange: 200,
                noSwitching: true,
                pushRange: true,
                onChange : this.filterNight
                }
            };
    }
})();
