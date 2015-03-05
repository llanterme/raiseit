define(['kendo', 'data', 'utils', 'config'], function (kendo, data, utils, config) {
   var _runInit = false;
   var browseViewModel = kendo.observable({
      browseSource: data.browseServices(),
      itemClick: function (e) {
         window.localStorage["RequestId"] = e.dataItem.RequestId;
         utils.navigate('details.html', 'slide');
                                          
      }
   })

   return {
      init: function (initEvt) {

         //kendo.bind($('#serviceDetailsListview'), browseViewModel, kendo.mobile.ui);

      },
      beforeShow: function (beforeShowEvt) {},
      show: function (e) {
         
         if (e.view.params.fromView != "detailsPage") {
             browseViewModel.set("browseSource", data.browseServices());
       
         }

      },
      viewModel: browseViewModel
   }
});