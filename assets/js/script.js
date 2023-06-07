unSplashKey = 'tZgxG3ifL1I1t2iKVY7Pm9kjOxi7M06Ix8c29PJOxfM'
unsplashUrl = 'https://api.unsplash.com/photos/random?client_id=';


// call the unSplash API to fetch an image from a URL
fetch(unsplashUrl + unSplashKey)
    .then(response => response.json())
    .then(data => {
        var imageLink = data.urls.regular;
        var image = new Image();
        image.crossOrigin = '';
        image.src = imageLink;

        image.onload = function() {
            var colorPalette = generatePallet(image);

            displayPallet(colorPalette);

        };
    });