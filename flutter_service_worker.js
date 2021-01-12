'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "b3f1a3d69402276273f4fffba08796df",
"index.html": "de085c331b2ed4d83e2665a5b131fb24",
"/": "de085c331b2ed4d83e2665a5b131fb24",
"main.dart.js": "fb9db972cfae111cd294e9c22123ffec",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "a2bd7c83023109def7e2262486b17a0b",
"assets/AssetManifest.json": "84aa2dec3db76ad3564fc3da87a825f3",
"assets/NOTICES": "136ad642f31dc14bc140190d3e590a3a",
"assets/FontManifest.json": "204f215bd7c903dd1fe169397a3ab968",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "b14fcf3ee94e3ace300b192e9e7c8c5d",
"assets/fonts/MaterialIcons-Regular.otf": "1288c9e28052e028aba623321f7826ac",
"assets/assets/images/basics/basics_chat.png": "1a92a7917382d085e5e5cca9479b5e97",
"assets/assets/images/basics/basics_live.png": "3f3798ce4f66083a31b5af9af0beb953",
"assets/assets/images/basics/basics_image_0.jpg": "56a7bcc5f546e80fe6d2cfb2a9083a14",
"assets/assets/images/basics/basics_arrow_down.png": "37a1aba034a6aed485a3d687807abb47",
"assets/assets/images/basics/basics_top.png": "83446558076e43dcf8d22b461de01caa",
"assets/assets/images/basics/basics_crown.png": "846db36f3ac883933e57dfa1cd873a7d",
"assets/assets/images/basics/basics_bg.jpg": "1b993702409df5f1383496b47c2d984f",
"assets/assets/images/basics/basics_image_1.gif": "5e2de402ce34ddae42a95c10fbc35ab2",
"assets/assets/images/basics/basics_light.png": "cc04ca476b03af87dc31fcd9ca4a3359",
"assets/assets/images/home/category_ios.png": "9c65c8123fd719a9cfb61c85282d62be",
"assets/assets/images/home/category_android.png": "87c7d12f7fe38cd62f8ecf8ee0dc3213",
"assets/assets/images/home/category_json.png": "7b7481154e9c3f495f2dbb02d7c994f2",
"assets/assets/images/home/category_state.png": "b8b409b1886dbf7eccd5a745a491c4fb",
"assets/assets/images/home/category_http.png": "3c7be16c5177fc31c81f82cea5e2fab3",
"assets/assets/images/home/category_layout.png": "8306b961c33c8978c3ceff33d71aed08",
"assets/assets/images/home/category_pin.png": "e6b4bf97473cc2514e41c146f8dbc680",
"assets/assets/images/home/category_simple.png": "841c441f0960006b615c8e7996ce7748",
"assets/assets/images/home/category_sync.png": "969c6c6e1daa9915eff27b594f6aaccb",
"assets/assets/images/home/category_tips.png": "914c9eecb6f9055ee75f460af91206e2",
"assets/assets/images/home/category_func.png": "e0c1e61ccec36a560a00f379c674f09e",
"assets/assets/images/home/category_struct.png": "b60cfcf93dc54fef14c3722f9d2876ce",
"assets/assets/images/home/category_widget.png": "fcd22caaf03d619bfe67803e2b2450fc",
"assets/assets/images/home/category_business.png": "4568357b06400085b0a0ca61eafcdb00",
"assets/assets/images/home/category_mixing.png": "57824980447b7ed261caf8f4efea2311",
"assets/assets/images/home/category_login.png": "a3cdeb6777021b63b8ccae7ff4444fac",
"assets/assets/images/common/add.png": "0ad711722e8d8a141cccf5db4d4cf997",
"assets/assets/images/common/avatar.jpg": "56a7bcc5f546e80fe6d2cfb2a9083a14",
"assets/assets/json/simples_list.json": "b7129d16549ee4e3d4f5627701a5ac58",
"assets/assets/json/basic_widget.json": "75d813aa00ab8148ebc5a832917dbfb3",
"assets/assets/json/simple_home.json": "12816fad5bcea954049e78f6ee1c498a",
"assets/assets/json/basic_func.json": "429ac448f9da33ecbdab29f5c0161ba8",
"assets/assets/json/basic_layout.json": "dcfd56376aab530b8f8fe1a0b8c353ac",
"assets/assets/fonts/Brush.ttf": "93b29bebc7455079ea303adb3a108a39"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value + '?revision=' + RESOURCES[value], {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey in Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
