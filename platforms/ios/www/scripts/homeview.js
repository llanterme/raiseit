define(['kendo', 'data', 'utils', 'config'], function (kendo, data, utils, config) {

   var groupsViewModel = kendo.observable({
      groupsSource: data.groups(),
      itemClick: function (e) {
         window.localStorage["GroupId"] = e.dataItem.GroupId;
         utils.navigate('services.html', 'slide');
      }
   })

   return {
      init: function (initEvt) {
        
    //     kendo.bind($('#assetListView'), groupsViewModel, kendo.mobile.ui);

      },
      beforeShow: function (beforeShowEvt) {},
      show: function (showEvt) {},
      refresh: function (e) {
         var scroller = e.view.scroller;
         scroller.setOptions({
            pullToRefresh: true,
            pull: function () {
               console.log('pulling');

               groupsViewModel.set("groupsSource", data.groups());

               setTimeout(function () {
                  scroller.pullHandled();
               }, 100);
            }
         })
      },
      viewModel: groupsViewModel
   }
});