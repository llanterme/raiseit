define(['kendo', 'data', 'utils', 'config'], function (kendo, data, utils, config) {
   
   var userViewModel = kendo.observable({
      usersSource: data.userRequests(),
      itemClick: function (e) {
         window.localStorage["RequestId"] = e.dataItem.RequestId;
         utils.navigate('details.html', 'slide');
                                          
      }
   })

   return {
      init: function (initEvt) {},
      beforeShow: function (beforeShowEvt) {},
      show: function (e) {
         
         if (e.view.params.fromView != "detailsPage") {
             userViewModel.set("usersSource", data.userRequests());
       
         }

      },
      viewModel: userViewModel
   }
});