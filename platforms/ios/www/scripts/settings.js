define(['kendo', 'utils'], function (kendo, utils) {
    return {
        init: function (initEvt) {

        },

        beforeShow: function (beforeShowEvt) {
            
        },

        show: function (showEvt) {
          var theSettings = utils.getCurrentSettings();
           $("#requestRange").val(theSettings.RequestRange);
        },
       viewModel: kendo.observable({
            // message: "This rocks!",
            saveSettings: function (e) {
            var userSettings = new Object();
            userSettings.RequestRange = $('#requestRange').val();
            utils.saveSettings(userSettings);
            }
        })
    }
});