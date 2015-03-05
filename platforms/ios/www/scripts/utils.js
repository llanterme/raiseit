define([], function () {
    var _kendoApp;

    return {
        init: function (kendoApp) {
            _kendoApp = kendoApp;
        
        },
        setViewTitle: function (view, title) {
            view.data("kendoMobileView").title = title;
            var navbar = view.find(".km-navbar").data("kendoMobileNavBar");
            if (navbar) {
                navbar.title(title);
            }
        },

        navigate: function (location) {
            _kendoApp.navigate(location);
        },

        redirect: function (location) {
            _kendoApp.pane.history.pop();
            _kendoApp.navigate(location);
        },

        scrollViewToTop: function (viewElement) {
            viewElement.data("kendoMobileView").scroller.reset();
        },
        
        showLoading: function () {
            _kendoApp.showLoading();
        },
        
        hideLoading: function () {
            _kendoApp.hideLoading();
        },

        showError: function (message, error) {
            var errorMessage = message + (error === undefined ? "" : "\n" + error.status + ": " + error.statusText);
            $("#error-view .message").text(errorMessage);
            $("#error-view").show().data().kendoMobileModalView.open();
        },

        closeError: function () {
            $("#error-view").data().kendoMobileModalView.close();
        },

        closeAllPopovers: function() {
            $(".km-popup").each(function (idx, item) {
                var popover = $(item).data().kendoMobilePopOver;
                if(popover) {
                    popover.close();
                }
            });
        },
        getCurrentSettings: function () {
        try {
            var userSettings = new Object();
            if (window.localStorage["HasFirstRun"] == null) {

                userSettings.RequestRange = '1';
                window.localStorage["HasFirstRun"] = 'Yes';
                window.localStorage["LocalPreferences"] = JSON.stringify(userSettings);


            }
            var localPreferences = window.localStorage["LocalPreferences"];
       
            return JSON.parse(localPreferences);

        } catch (e) {
            alert("getCurrentSettings" + e);
        }

    },
    saveSettings: function (userSettings) {
        try {
            window.localStorage["LocalPreferences"] = JSON.stringify(userSettings);
        } catch (e) {
            alert(e);
        }

    }
    };
});