// [START create]
var NAME = "My favorite images";
var deck = SlidesApp.create(NAME);
// [END create]

// [START addImageSlide]
 function addImageSlide(imageUrl, index) {
     var slide = deck.appendSlide(SlidesApp.PredefinedLayout.BLANK);
     var image = slide.insertImage(imageUrl);
 }
// [END addImageSlide]

// [START main]
function main() {
    var images = [
        "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        "http://www.google.com/services/images/phone-animation-results_2x.png",
        "http://www.google.com/services/images/section-work-card-img_2x.jpg",
        "http://gsuite.google.com/img/icons/product-lockup.png",
        "http://gsuite.google.com/img/home-hero_2x.jpg"
    ];
    var [title, subtitle] = deck.getSlides()[0].getPageElements();
    title.asShape().getText().setText(NAME);
    subtitle.asShape().getText().setText("Google Apps Script\nSlides Service demo");
    images.forEach(addImageSlide);
}
// [END main]

// [START addImageSlide]
function addImageSlide(imageUrl, index) {
    var slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
    var image = slide.insertImage(imageUrl);
    var imgWidth   = image.getWidth();
    var imgHeight  = image.getHeight();
    var pageWidth  = presentation.getPageWidth();
    var pageHeight = presentation.getPageHeight();
    var newX = pageWidth/2.  - imgWidth/2.;
    var newY = pageHeight/2. - imgHeight/2.;
    image.setLeft(newX).setTop(newY);
}
// [END addImageSlide]


// [START fullscript]
var NAME = "My favorite images";
var presentation = SlidesApp.create(NAME);

/**
 * Creates a single slide using the image from the given link;
 * used directly by foreach(), hence the parameters are fixed.
 *
 * @param {Date} link A String object representing an image URL
 * @param {Date} index The index into the array; unused (req'd by forEach)
 */
function addImageSlide(imageUrl, index) {
    var slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
    var image = slide.insertImage(imageUrl);
    var imgWidth   = image.getWidth();
    var imgHeight  = image.getHeight();
    var pageWidth  = presentation.getPageWidth();
    var pageHeight = presentation.getPageHeight();
    var newX = pageWidth/2.  - imgWidth/2.;
    var newY = pageHeight/2. - imgHeight/2.;
    image.setLeft(newX).setTop(newY);
}

/**
 * The driver application features an array of image URLs, setting of the
 * main title & subtitle, and creation of individual slides for each image.
 */
function main() {
    var images = [
        "http://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        "http://www.google.com/services/images/phone-animation-results_2x.png",
        "http://www.google.com/services/images/section-work-card-img_2x.jpg",
        "http://gsuite.google.com/img/icons/product-lockup.png",
        "http://gsuite.google.com/img/home-hero_2x.jpg"
    ];
    var [title, subtitle] = presentation.getSlides()[0].getPageElements();
    title.asShape().getText().setText(NAME);
    subtitle.asShape().getText().setText("Google Apps Script\nSlides Service demo");
    images.forEach(addImageSlide);
}
// [END fullscript]
