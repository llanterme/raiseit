define([], function () {
    var domain = "www.flickit.co.za",
        serverUrl = "http://" + domain,
        serviceUrl = serverUrl + "/RestService.svc";

    return {
        domain: domain,
        serverUrl: serverUrl,
        serviceUrl: serviceUrl,
        groupsUrl: serviceUrl + "/RangeGroups",
        servicesUrl: serviceUrl + "/RangeServices",
        browseUrl: serviceUrl + "/AroundMe",
        assetsUrl: serviceUrl + "/Groups",
        createUrl: serviceUrl + "/CreateRequest",
        uploadUrl: serviceUrl + "/UploadFile",
        userRequestsUrl: serviceUrl + "/UserRequests"
    };
});