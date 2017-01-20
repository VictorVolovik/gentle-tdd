FlickrFetcher.fetchPhotos('8060d4cdac3ceb86af470aae29af3a56')
  .then(PhotoLister.photoListToHTML)
  .then(function(photosHTML) {
    PhotoLister.addPhotosToElement($, '#app', photosHTML);
  });
