define(['config', 'utils', 'storage'], function (config, utils, storage) {
       
   // ######## Range Groups ########
   var getGroups = function () {
      var groupsDataSource = new kendo.data.DataSource({
         requestStart: function (e) {

            //utils.showLoading();
         },
         requestEnd: function (e) {
            //utils.hideLoading();
         },
         error: function (e) {
            var xhr = e.xhr;
            var statusCode = e.status;
            var errorThrown = e.errorThrown;
            alert("A error has occured fetching data from the server.");
                                                       utils.hideLoading();
         },
         transport: {
            read: {
               url: config.groupsUrl,
               dataType: "json",
               cache: false
            },
            parameterMap: function (options, type) {

               var theSettings = utils.getCurrentSettings();

               return {
                  phonelat: window.localStorage["gpsLat"],
                  phonelon: window.localStorage["gpsLong"],
                  range: theSettings.RequestRange

               }
            }
         },
         change: function (e) {
            var data = this.data();

         },
         schema: {
            data: function (response) {
               //console.log(response.Collection);
               return response.Collection;
            }
         }
      });

      return groupsDataSource;
   };

   // ######## Range Services ########

   var getServices = function () {
       console.log('calling range services');
      var serviceDataSource = new kendo.data.DataSource({
         requestStart: function (e) {

            utils.showLoading();
         },
         requestEnd: function (e) {
            utils.hideLoading();
         },
         error: function (e) {
            var xhr = e.xhr;
            var statusCode = e.status;
            var errorThrown = e.errorThrown;
            alert("A error has occured fetching data from the server.");
         },
         transport: {
            read: {
               url: config.servicesUrl,
               dataType: "json",
               cache: false
            },
            parameterMap: function (options, type) {

               var theSettings = utils.getCurrentSettings();
               return {
                  phonelat: window.localStorage["gpsLat"],
                  phonelon: window.localStorage["gpsLong"],
                  groupId: window.localStorage["GroupId"],
                  range: theSettings.RequestRange

               }
            }
         },
         change: function (e) {
            var data = this.data();

         },
         schema: {
            data: function (response) {
              // console.log(response.Collection);
               // storageManager.persistAssets(response.Collection);
               return response.Collection;
            }
         }
      });
      return serviceDataSource;
   };

   // ######## Browse Services ########

   var browseServices = function () {

      var browseDataSource = new kendo.data.DataSource({
         requestStart: function (e) {

            utils.showLoading();
         },
         requestEnd: function (e) {
            utils.hideLoading();
         },
         error: function (e) {
            var xhr = e.xhr;
            var statusCode = e.status;
            var errorThrown = e.errorThrown;
            alert("A error has occured fetching data from the server.");
         },
         transport: {
            read: {
               url: config.browseUrl,
               dataType: "json",
               cache: false
            },
            parameterMap: function (options, type) {

               var theSettings = utils.getCurrentSettings();
               return {
                  phonelat: window.localStorage["gpsLat"],
                  phonelon: window.localStorage["gpsLong"],
                  assetId: window.localStorage["AssetId"],
                  groupId: window.localStorage["GroupId"],
                  serviceId: window.localStorage["ServiceId"],
                  range: theSettings.RequestRange

               }
            }
         },
         change: function (e) {
            var data = this.data();

         },
         schema: {
            data: function (response) {
               storage.persistServicesCollection(response.Collection);
               return response.Collection;
            }
         }
      });
      return browseDataSource;

   }
       
  // ######## User Requests  ########

   var userRequests = function () {

      var userRequestsDataSource = new kendo.data.DataSource({
         requestStart: function (e) {

            utils.showLoading();
         },
         requestEnd: function (e) {
            utils.hideLoading();
         },
         error: function (e) {
            var xhr = e.xhr;
            var statusCode = e.status;
            var errorThrown = e.errorThrown;
            alert("A error has occured fetching data from the server.");
         },
         transport: {
            read: {
               url: config.userRequestsUrl,
               dataType: "json",
               cache: false
            },
            parameterMap: function (options, type) {

               var theSettings = utils.getCurrentSettings();
               return {
                  phonelat: window.localStorage["gpsLat"],
                 phonelon: window.localStorage["gpsLong"],
                 udid: device.uuid

               }
            }
         },
         change: function (e) {
            var data = this.data();

         },
         schema: {
            data: function (response) {
                                                     
               storage.persistServicesCollection(response.Collection);
               return response.Collection;
            }
         }
      });
      return userRequestsDataSource;

   }


   // ######## Local Service details ########

   var getLocalRequestDetails = function () {
      try {

         var localRequests = storage.getLocalRequests(window.localStorage["RequestId"]);

         var requestDetailsDataSource = new kendo.data.DataSource({
            requestStart: function (e) {

               utils.showLoading();
            },
            requestEnd: function (e) {
               utils.hideLoading();
            },
            change: function (e) {
               var data = this.data();

            },
            data: localRequests

         });
       
         return requestDetailsDataSource;
      } catch (e) {
         alert(e);
      }

   };

   // ######## Get all assets for dropdowns ########
  
   var getAssets = function () {
       
       try {

      var assetsDataSource = new kendo.data.DataSource({
         error: function (e) {
            var xhr = e.xhr;
            var statusCode = e.status;
            var errorThrown = e.errorThrown;
           // alert("A error has occured fetching data from the server.");
         },
         transport: {
            read: {
               url: config.assetsUrl,
               dataType: "json",
               cache: false
            }

         },
         schema: {
            data: function (response) {
           //    console.log(response.Collection);
               storage.persistAssets(response.Collection);
               return response.Collection;
            }
         }
      });
       } catch (e) {
       alert(e);
       }
       assetsDataSource.read();
   };
       

   // ######## Get Address details ########

   var getBingAddressDetails = function (captureLat, captureLong) {
      try {

         var url = "http://dev.virtualearth.net/REST/v1/Locations/" + captureLat + "," + captureLong + "?o=json&key=Aq2050-jdjEDuiGuRLrPd__aqqbPY4RcmFt63N0SozBM3kDe-cthBPpkxLYbjMt0";
         var debugUrl = "http://10.211.55.4/ScoutIt/Mock/address.json";

         var addressDetailsDataSource = new kendo.data.DataSource({
            
            requestStart: function (e) {

               utils.showLoading();
            },
            requestEnd: function (e) {
               utils.hideLoading();
            },
            error: function (e) {
               var xhr = e.xhr;
               var statusCode = e.status;
               var errorThrown = e.errorThrown;
               alert("An error occured fetching your address details. Please enter them manually.");
            },
            transport: {
               read: {
                  url: url,
                  dataType: "json",
                  cache: false
               }

            },
            change: function (e) {
               var data = this.data();

            },
            schema: {
               data: function (data) {

                  return [data]
               }
            }
         });
         return addressDetailsDataSource;

      } catch (e) {
         alert(e);
      }

   }
       
// ######## Create Request ########
       
       var createNewRequest = function (payLoadObject){
       
        try {
     
            var dataSource = new kendo.data.DataSource({
                requestStart: function (e) {
                    utils.showLoading();
                },
                requestEnd: function (e) {
                    utils.hideLoading();
                },
                error: function (e) {
                    var xhr = e.xhr;
                    var statusCode = e.status;
                    var errorThrown = e.errorThrown;
                    alert("A error has occured while capturing the restaurant details.");
                },
                transport: {
                    read: {
                        type: "POST",
                        url: config.createUrl,
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json'
                    },
                     change: function (e) {
               var data = this.data();

            },
                    parameterMap: function (options, operation) {
                        
                        var Location = new Object();
                        Location.City = payLoadObject.City
                        Location.District = payLoadObject.District;
                        
                        var newRequest = new Object();
                        newRequest.Request = payLoadObject;
                        newRequest.Location = Location;
                                                       
                        var dto = {
                            'newRequest': newRequest
                        };
                      
                        return JSON.stringify(dto);
                    }
                },
                schema: {
                    data: function (response) {
                        
                     return [response];
                    
                    }
                }
            });
       return dataSource;
       
    } catch (e) {
        utils.hideLoading();
        alert(e);
    }
       
       }
       
       
 // ######## Return ########
       
   return {
      groups: getGroups,
      services: getServices,
      browseServices: browseServices,
      localRequestDetails: getLocalRequestDetails,
      getAssets: getAssets,
      bingAddress: getBingAddressDetails,
      createNewRequest: createNewRequest,
       userRequests: userRequests
     
   }
});