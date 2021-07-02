self.addEventListener("install", function(event) {
	event.waitUntil(
		caches.open("images").then(function(cache) {
			return cache.addAll(
				[
					"ukiyo-e.png",
					"car.jpg",
					"nishida_2.jpeg"
				]
			);
		})
	);
});
self.addEventListener("fetch", function(event) {
	if (event.request.url.toLowerCase().match(/\.(jpg|png)/g)) {
		// This is an image
		// console.log("this is an image request");
		event.respondWith(
			caches.match(event.request).then(function(response) {
				if (response) {
					// Found response in cache
					// console.log("Found response in cache");
					return response;
				}
				// Image not found in cache
				// console.log("Image not found in cache");
				return fetch(event.request).then(function(response) {
					return response;
				}).catch(function(error) {
					// console.log(error);
					throw error;
				});
			})
		);
	}
});