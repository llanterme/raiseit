define(['kendo', 'data', 'utils', 'config'], function (kendo, data, utils, config) {

   var servicesViewModel = kendo.observable({
      servicesSource: data.services(),
      itemClick: function (e) {
         window.localStorage["ServiceId"] = e.dataItem.ServiceId;
         utils.navigate('browse.html?fromView="browseServices', 'slide');
      }
   });

   return {
      init: function (initEvt) {

      },
      beforeShow: function (beforeShowEvt) {},
      show: function (showEvt) {

      servicesViewModel.set("servicesSource", data.services());
 
      },
      viewModel: servicesViewModel
   }
});