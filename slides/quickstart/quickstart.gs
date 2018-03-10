/**
  * Creates a Slides API service object and logs the number of slides and
  * elements in a sample presentation:
  * https://docs.google.com/presentation/d/1EAYk18WDjIG-zp_0vLm3CsfQh_i8eXc67Jo2O9C6Vuc/edit
  */
function logSlidesAndElements() {
  var presentationId = '1EAYk18WDjIG-zp_0vLm3CsfQh_i8eXc67Jo2O9C6Vuc';
  var presentation = Slides.Presentations.get(presentationId);
  var slides = presentation.slides;
  Logger.log('The presentation contains %s slides:', slides.length);
  for (i = 0; i < slides.length; i++) {
    Logger.log(
      '- Slide # %s contains %s elements.',
      i + 1,
      slides[i].pageElements.length);
  }
}
