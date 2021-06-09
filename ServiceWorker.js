
console.log("am i being loaded!!");

const VERSION = '{version}';
const ressourcesToSaveInCache = [
	{files}
];



self.addEventListener('install', function(event) {

    return caches.open(VERSION).then(function (cache) {
        return Promise.all(
            ressourcesToSaveInCache.map(function (url) {
                return cache.add(url).catch(function (reason) {
                    return console.log(url + "failed: " + String(reason));
                })
            })
        );
    });

});

self.addEventListener('activate', function(event) {

	console.log("we are now activated!!");

	event.waitUntil(
        caches.keys().then(function(keys){
            return Promise.all(keys.map(function(key, i){
                if(key !== VERSION){
                    return caches.delete(keys[i]);
                }
            }))
        })
    )

});

self.addEventListener('fetch', function(event) {
	
	event.respondWith(caches.match(event.request).then(function(res) {
		
		if(res) {
			console.log("%s loaded from cache", event.request.url);
			return res;
		}

		return requestBackend(event);

	}));

});

/*
self.addEventListener('fetch', function(event) {
	
	event.respondWith(async function() {
		
		const cachedResponse = await caches.match(event.request);
		// Return it if we found one.
	    if (cachedResponse) return cachedResponse;
		// If we didn't find a match in the cache, use the network.
		return fetch(event.request);

	});


});
*/

const fillServiceWorkerCache = function () {
    /* save in cache some static ressources 
    this happens before activation */
    return caches.open(VERSION).then(function(cache) {
        return cache.addAll(ressourcesToSaveInCache);
    });
};


function requestBackend(event){

    var url = event.request.clone();
	console.error("%s requested from backend", event.request.url);

    return fetch(url).then(function(res){
        return res;
    });

}
