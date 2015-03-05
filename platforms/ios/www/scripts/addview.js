define(['kendo', 'data', 'utils', 'config', 'storage'], function (kendo, data, utils, config, storage) {

    var registerViewModel = kendo.observable({
        createGroupSource: storage.getLocalAssets(),
        isEnabled: false,
        pictureSource: navigator.camera.PictureSourceType,
        destinationType: navigator.camera.DestinationType,
        bindServicesSource: [],
        GroupId: null,
        ServiceId: null,
        onChange: function (e) {

            this.set("bindServicesSource", storage.getLocalServicesList(this.GroupId)[0].Service);
            this.set("isEnabled", true);
            this.set("ServiceId", $("#createService").val());
        },
        onServicesChange: function (e) {
            //console.log(this.get("ServiceId"));
        },
        CreateNewRequest: function (e) {

            var payLoad = new Object();
            payLoad.Description = this.get("createAssetDescription");
            payLoad.Address = this.get("createAssetAddress");
            payLoad.Latitude = this.get("createAssetLat");
            payLoad.Longitude = this.get("createAssetLon");
            payLoad.Status = "New";
            payLoad.Rating = this.get("createAssetRating");
            payLoad.GroupId = this.get("GroupId");
            payLoad.ServiceId = this.get("ServiceId");
            payLoad.City = this.get("createAssetCity");
            payLoad.District = this.get("createAssetDistrict");
            payLoad.Udid = device.uuid;

            var servicesResponse = data.createNewRequest(payLoad);

            servicesResponse.fetch(function () {
                var response = servicesResponse.data();

                if (response[0].Status == "success") {

                    var createdRequestId = response[0].Message.split('|');
                    window.localStorage["CreatedRequestId"] = createdRequestId[1];

                    navigator.notification.confirm(
                        'Request for service created successfully! Upload image?',
                        onConfirmRequestCreated,
                        'Info',
                        'Yes,No'
                    );

                } else {
                    alert(response[0].Message);
                }

            });

        },
        capturePhoto: function (e) {

            navigator.camera.getPicture(onPhotoSuccess, onPhotoFail, {
                quality: 40,
                targetWidth: 250,
                targetHeight: 250,
                destinationType: this.destinationType.FILE_URI
            });

        },
        getPhoto: function (e) {
            try {
                var source = Camera.PictureSourceType.PHOTOLIBRARY;
                navigator.camera.getPicture(onPhotoSuccess, onPhotoFail, {
                    quality: 50,
                    targetWidth: 250,
                    targetHeight: 250,
                    destinationType: this.destinationType.FILE_URI,
                    sourceType: source
                });
            } catch (e) {
                alert(e);
            }
        },
        saveOnlinePhoto: function (e) {
            try {
                console.log('dsds');
                utils.showLoading();
                var imageSrc = $('.listItemImagePreview').attr('src');
                var imageFileName = imageSrc.substr(imageSrc.lastIndexOf('/') + 1);

                var options = new FileUploadOptions();
                options.fileKey = "file";
                options.fileName = imageFileName;
                options.mimeType = "image/jpeg";
                var params = {};
                params.RequestId = window.localStorage["CreatedRequestId"];
                options.params = params;
                var ft = new FileTransfer();
                ft.upload(imageSrc, config.uploadUrl, uploadWin, uploadFail, options);
            } catch (e) {
                alert(e);
            }

        }

    });

    var uploadWin = function (r) {
        utils.hideLoading();
        var serviceResponse = JSON.parse(r.response);
        alert(serviceResponse.Status);
        if (serviceResponse.Status == "success") {
            navigator.notification.alert(
                'Image uploaded sucessfully.',
                alertItemCreatedDismissed,
                'Information',
                'Done'
            );
        } else {
            navigator.notification.alert('an error has occured.');
        }
    };
    var uploadFail = function (error) {
        utils.hideLoading();
        navigator.notification.alert('an error has occured.');
    };

    var onConfirmRequestCreated = function (buttonIndex) {

        if (buttonIndex == 1) {
            openCaptureImage();
        } else {
            clearFormData();
        }

    };

    var onPhotoSuccess = function (imageURI) {
        var html = '<li>';
        html += '<img class="listItemImagePreview" src=' + "'" + imageURI + "'" + '/></li>';
        $('#itemImageList').append(html);
        $('#itemCompleteWrapper').show();
        $('#imagePreviewWrapper').show();

    };

    var onPhotoFail = function (message) {
        alert('Failed because: ' + message);
    };

    var openCaptureImage = function () {
        $("#captureImageActionSheet").data("kendoMobileActionSheet").open();
    };

    var setAddressDetails = function () {

        try {

            var servicesResponse = data.bingAddress(window.localStorage["gpsLat"], window.localStorage["gpsLong"]);
            servicesResponse.fetch(function () {
                var addressData = this.data();

                if (addressData[0].statusDescription == "OK" && addressData[0].statusCode == "200") {

                    var completeAddress = addressData[0].resourceSets[0].resources[0].address.formattedAddress;
                    var chunkedAddress = addressData[0].resourceSets[0].resources[0].address;

                    registerViewModel.set("createAssetCity", chunkedAddress.locality);
                    registerViewModel.set("createAssetAddress", completeAddress);
                    registerViewModel.set("createAssetLat", window.localStorage["gpsLat"]);
                    registerViewModel.set("createAssetLon", window.localStorage["gpsLong"]);

                    if (completeAddress.indexOf(",") != -1) {
                        var district = completeAddress.split(",");
                        if (district.length == 4) {

                            registerViewModel.set("createAssetDistrict", val(district[1]));
                        } else {
                            registerViewModel.set("createAssetDistrict", "");
                        }
                    }

                } else {
                    alert("Address not found. Please check and enter manually!");
                }

            });

        } catch (e) {
            alert(e);
        }

    };

    return {
        init: function (initEvt) {

            setAddressDetails();
            kendo.bind($("#addListview"), registerViewModel);

        },
        beforeShow: function (beforeShowEvt) {},
        show: function (e) {},
        viewModel: registerViewModel
    }
});