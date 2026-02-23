"use strict";
(self["webpackChunkdashboardAdmin"] = self["webpackChunkdashboardAdmin"] || []).push([["default-src_service_google-map_service_ts"],{

/***/ 79808:
/*!*******************************************!*\
  !*** ./src/service/google-map.service.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GoogleMapService: () => (/* binding */ GoogleMapService)
/* harmony export */ });
/* harmony import */ var d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../environments/environment */ 20553);
/* harmony import */ var google_maps__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! google-maps */ 25770);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./apiService/apiMain.service */ 7192);
/* harmony import */ var _runtime_storage_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./runtime-storage.service */ 24235);






class GoogleMapService {
  constructor(apiMainService, runtimeStorageService) {
    this.apiMainService = apiMainService;
    this.runtimeStorageService = runtimeStorageService;
    this.options = {
      libraries: ['places', 'drawing', 'geometry']
    };
    this.apiKey = _environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.googleAPIkey;
    this.googleQueue = [];
    this.callInProgess = false;
  }
  loadGoogleMap() {
    var _this = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const loader = new google_maps__WEBPACK_IMPORTED_MODULE_4__.Loader(_this.apiKey, _this.options);
      return yield loader.load();
    })();
  }
  getCurrentPosition() {
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return new Promise( /*#__PURE__*/function () {
        var _ref = (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (resolve, reject) {
          try {
            navigator.geolocation.getCurrentPosition(coordinates => {
              console.log('$$$$$$$', coordinates);
              resolve({
                lat: coordinates.coords.latitude,
                lng: coordinates.coords.longitude
              });
            });
          } catch (e) {
            console.log('error while fetching current position ', e);
            reject(e);
          }
        });
        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    })();
  }
  getGoogle() {
    var _this2 = this;
    return new Promise( /*#__PURE__*/function () {
      var _ref2 = (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (resolve, reject) {
        try {
          if (_this2.google) {
            resolve(_this2.google);
          } else {
            console.log('loading google queue');
            _this2.googleQueue.push(resolve);
            if (!_this2.callInProgess) {
              _this2.callInProgess = true;
              console.log('loading google api');
              _this2.google = yield _this2.loadGoogleMap();
              _this2.googleQueue.forEach(savedResolve => {
                savedResolve(_this2.google);
              });
              _this2.googleQueue = [];
              _this2.callInProgess = false;
            }
          }
        } catch (e) {
          reject(e);
        }
      });
      return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }());
  }
  getCenter() {
    var _this3 = this;
    return new Promise( /*#__PURE__*/function () {
      var _ref3 = (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (resolve, reject) {
        try {
          _this3.center = yield _this3.getCurrentPosition();
          resolve(_this3.center);
        } catch (e) {
          reject(e);
        }
      });
      return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
      };
    }());
  }
  formatAddress(place) {
    return {
      name: place.name,
      address: place.formatted_address,
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    };
  }
  getClusterName(latLngObj) {
    var _this4 = this;
    return (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return new Promise( /*#__PURE__*/function () {
        var _ref4 = (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (resolve, reject) {
          try {
            if (!_this4.google) {
              yield _this4.getGoogle();
            }
            // const geoFencinglist:any = await this.apiMainService.getGeoFencingList();
            let geoFencinglist;
            const mappedClusterList = [];
            let clusterDetails = {};
            if (geoFencinglist && geoFencinglist.length > 0) {
              if (!_this4.google) {
                yield _this4.getGoogle();
              }
              let clusterFound = false;
              geoFencinglist.forEach(cluster => {
                clusterFound = _this4.google.maps.geometry.poly.containsLocation(new _this4.google.maps.LatLng(latLngObj.lat, latLngObj.lng), new google.maps.Polygon({
                  paths: [[...cluster.clusterCoordinates]]
                }));
                console.log('Is new position inside fencing ', clusterFound, cluster);
                if (clusterFound) {
                  mappedClusterList.push(cluster.clusterId);
                  clusterDetails = cluster;
                }
              });
            }
            _this4.runtimeStorageService.setCacheData('CLUSTERS_details', clusterDetails);
            resolve(mappedClusterList);
          } catch (error) {
            console.log('error while fetching geo fencing list ', error);
            reject(error);
          }
        });
        return function (_x7, _x8) {
          return _ref4.apply(this, arguments);
        };
      }());
    })();
  }
  getKitchenDistance(kitchenObj, centerA) {
    var _this5 = this;
    const self = this;
    return new Promise( /*#__PURE__*/function () {
      var _ref5 = (0,d_Apurv_Workspace_deskdyneDashboard_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (resolve, reject) {
        let distanceInKms = 1;
        if (!_this5.google) {
          yield _this5.getGoogle();
        }
        if (_this5.google && _this5.google.maps) {
          if (!_this5.directionsService) {
            _this5.directionsService = new google.maps.DirectionsService();
          }
          let distanceInMeters = _this5.google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(centerA), new google.maps.LatLng(kitchenObj.geolocation));
          if (_this5.directionsService && _this5.directionsService.route) {
            _this5.directionsService.route({
              origin: centerA,
              destination: kitchenObj.geolocation,
              provideRouteAlternatives: true,
              avoidTolls: true,
              travelMode: google.maps.TravelMode.DRIVING
            }, function (response, status) {
              if (status === google.maps.DirectionsStatus.OK) {
                try {
                  console.log('response', response);
                  distanceInMeters = response.routes[0].legs[0].distance.value;
                  distanceInKms = parseFloat((distanceInMeters * 0.001).toFixed(1));
                  kitchenObj.distance = distanceInKms;
                  kitchenObj.deliveryTime = Math.ceil(distanceInKms * 5) + 10;
                  resolve(kitchenObj);
                } catch (e) {
                  distanceInKms = parseFloat((distanceInMeters * 0.001).toFixed(1));
                  kitchenObj.distance = distanceInKms;
                  kitchenObj.deliveryTime = Math.ceil(distanceInKms * 5) + 10;
                  resolve(kitchenObj);
                }
              } else {
                distanceInKms = parseFloat((distanceInMeters * 0.001).toFixed(1));
                kitchenObj.distance = distanceInKms;
                kitchenObj.deliveryTime = Math.ceil(distanceInKms * 5) + 10;
                console.log('calculating distance 3');
                resolve(kitchenObj);
              }
            });
          } else {
            console.log('calculating distance');
            distanceInKms = parseFloat((distanceInMeters * 0.001).toFixed(1));
            kitchenObj.distance = distanceInKms;
            kitchenObj.deliveryTime = Math.ceil(distanceInKms * 15);
            console.log('calculating distance 4');
            resolve(kitchenObj);
          }
        } else {
          const distance = _this5.getPerpendicularDistance(kitchenObj.geolocation.lat, kitchenObj.geolocation.lng, centerA.lat, centerA.lng);
          kitchenObj.distance = distance;
          kitchenObj.deliveryTime = Math.ceil(distance * 15);
          resolve(kitchenObj);
        }
      });
      return function (_x9, _x10) {
        return _ref5.apply(this, arguments);
      };
    }());
  }
  getPerpendicularDistance(lat1, lon1, lat2, lon2, unit = "K") {
    console.log('getPerpendicularDistance', lat1, lon1, lat2, lon2);
    if (lat1 == lat2 && lon1 == lon2) {
      return 0;
    } else {
      var radlat1 = Math.PI * lat1 / 180;
      var radlat2 = Math.PI * lat2 / 180;
      var theta = lon1 - lon2;
      var radtheta = Math.PI * theta / 180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") {
        dist = dist * 1.609344;
      }
      if (unit == "N") {
        dist = dist * 0.8684;
      }
      return parseFloat(dist.toFixed(1));
    }
  }
  static #_ = this.ɵfac = function GoogleMapService_Factory(t) {
    return new (t || GoogleMapService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_apiService_apiMain_service__WEBPACK_IMPORTED_MODULE_2__.ApiMainService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_runtime_storage_service__WEBPACK_IMPORTED_MODULE_3__.RuntimeStorageService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
    token: GoogleMapService,
    factory: GoogleMapService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 25770:
/*!****************************************************!*\
  !*** ./node_modules/google-maps/lib/esm/loader.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Loader: () => (/* binding */ Loader)
/* harmony export */ });
class Loader {
  constructor(apiKey = null, options = {}) {
    this.apiKey = apiKey;
    this.options = options;
    if (typeof window === 'undefined') {
      throw new Error('google-maps is supported only in browser environment');
    }
  }
  load() {
    if (typeof this.api !== 'undefined') {
      return Promise.resolve(this.api);
    }
    if (typeof this.loader !== 'undefined') {
      return this.loader;
    }
    window[Loader.CALLBACK_NAME] = () => {
      this.api = window['google'];
      if (typeof this.resolve === 'undefined') {
        throw new Error('Should not happen');
      }
      this.resolve(this.api);
    };
    window['gm_authFailure'] = () => {
      if (typeof this.reject === 'undefined') {
        throw new Error('Should not happen');
      }
      this.reject(new Error('google-maps: authentication error'));
    };
    return this.loader = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      const script = document.createElement('script');
      script.src = this.createUrl();
      script.async = true;
      script.onerror = e => reject(e);
      document.head.appendChild(script);
    });
  }
  createUrl() {
    const parameters = [`callback=${Loader.CALLBACK_NAME}`];
    if (this.apiKey) {
      parameters.push(`key=${this.apiKey}`);
    }
    for (let name in this.options) {
      if (this.options.hasOwnProperty(name)) {
        let value = this.options[name];
        if (name === 'version') {
          name = 'v';
        }
        if (name === 'libraries') {
          value = value.join(',');
        }
        parameters.push(`${name}=${value}`);
      }
    }
    return `https://maps.googleapis.com/maps/api/js?${parameters.join('&')}`;
  }
}
Loader.CALLBACK_NAME = '_dk_google_maps_loader_cb';

/***/ })

}]);
//# sourceMappingURL=default-src_service_google-map_service_ts.js.map