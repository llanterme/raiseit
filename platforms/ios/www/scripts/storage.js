define(['jlinq'], function (linq) {

    return {
        persistServicesCollection: function (propertiesJson) {

            window.localStorage["allAssetRequest"] = JSON.stringify(propertiesJson);

        },
        getLocalRequests: function (requestId) {
            try {
       if(typeof requestId != "undefined") {
       
                var allRequests = JSON.parse(window.localStorage["allAssetRequest"]);
                var results = linq.from(allRequests)

                .where(function (r) { //or a delegate
                    return r.RequestId == requestId;
                })
                    .select();
                return results;
       }
            } catch (e) {
                alert(e);
            }
        },
        persistAssets: function (propertiesJson) {
            window.localStorage["AllAssets"] = JSON.stringify(propertiesJson);
        },
        getLocalAssets: function () {
            // console.log(JSON.parse(window.localStorage["AllAssets"]));
       try {
            return JSON.parse(window.localStorage["AllAssets"]);
       } catch (e) {
       console.log(e)
       }

        },
        getLocalServicesList: function (groupId) {
            try {

                var allRequests = JSON.parse(window.localStorage["AllAssets"]);
                var results = jLinq.from(allRequests)
                //.ignoreCase()
                .where(function (r) { //or a delegate
                    return r.GroupId == groupId;
                })
                    .select();
               return results;
     
            } catch (e) {
                alert(e);
            }
        }
    }
});