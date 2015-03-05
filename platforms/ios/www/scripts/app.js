define(["jQuery", "kendo", "homeview", "utils", "servicesview", "browseview", "detailsview", "addview", "data", "settings", "userView"], function ($, kendo, homeView, utils, servicesView, browseView, detailsView, addView, data, settingsView, userView) {
    var _kendoApplication;
    var watchID = null;

    var _onError = function (error, url, line) {
       // utils.showError(error);
    };

    var onDeviceReady = function () {
        try {
             window.onerror = _onError;
            watchID = navigator.geolocation.watchPosition(onSuccess, onError, {
                timeout: 50000
            });
            _kendoApplication = new kendo.mobile.Application(document.body, {
                transition: 'slide',
               // useNativeScrolling: true,
                skin: 'flat',
                initial: '#assetView',
                init: function () {
                    setTimeout(function () {
                        utils.init(_kendoApplication);
                   //     homeView.init();
                       data.getAssets();


                    }, 1);
                }
            });


        } catch (e) {
            alert("onDeviceReady" + e);
        }

    };



    var onSuccess = function (position) {
        window.localStorage["gpsLat"] = position.coords.latitude;
        window.localStorage["gpsLong"] = position.coords.longitude;

    };

    var onError = function (error) {
        console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
        watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
       alert("re");
    };

    var init = function () {
        window.onerror = _onError;
        document.addEventListener("deviceready", onDeviceReady, false);
    }

    return {
        init: init,
        homeView: homeView,
        servicesView: servicesView,
        browseView: browseView,
       detailsView:detailsView,
       addView:addView,
       settingsView:settingsView,
       userView:userView


    }
});