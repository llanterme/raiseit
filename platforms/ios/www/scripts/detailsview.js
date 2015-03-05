define(['kendo', 'data', 'utils', 'config'], function (kendo, data, utils, config) {

   var requestDetailsViewModel = kendo.observable({
      detailsSource: data.localRequestDetails()

   })

   return {
      init: function (initEvt) {

     
       
       },
      beforeShow: function (beforeShowEvt) {},
      show: function () {

       requestDetailsViewModel.set("detailsSource", data.localRequestDetails());
      // kendo.bind($('#requestOverviewListview'), requestDetailsViewModel, kendo.mobile.ui);
      },
      viewModel: requestDetailsViewModel
   }
});