unSplashKey = 'tZgxG3ifL1I1t2iKVY7Pm9kjOxi7M06Ix8c29PJOxfM'
unsplashUrl = 'https://api.unsplash.com/photos/random?client_id=';


// // call the unSplash API to fetch an image from a URL
// fetch(unsplashUrl + unSplashKey)
//     .then(response => response.json())
//     .then(data => {
//         //fetch image url
//         var imageLink = data.urls.regular;

//         //create an image element
//         var image = new Image();
//         image.crossOrigin = '';

//         //set the image source url
//         image.src = imageLink;

//         // Generate the color palette when the image is loaded
//         image.onload = function() {
//             var colorPalette = generatePallet(image);

//             // Display the color palette
//             displayPallet(colorPalette);

//         };
//     });

//     //This function will generate the color pallet from the image
//     function generatePallet(image) {

//     }