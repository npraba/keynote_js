
// Prints to console
console.log("Hello world!");


/**
 * Prints the available properties in the JS object.
 *
 * @param {object} object Any generic JS object.
 */
function print_properties(object) {
    for (var prop in object.properties()) {
        console.log(prop);
    }
}

/**
 * Creates a document with the given theme
 *
 * @param {string} theme_name Theme name available in Keynote. Defaults to "Basic White".
 */
function create_document(title, theme_name="Basic White") {
    // Instantiate
    var document = Keynote.Document({
        documentTheme: Keynote.themes[theme_name],
        width: 1920,
        height: 1080,
    });

    // Push the document
    Keynote.documents.push(document);

    // Get title slide
    tslide = document.slides[0];

    // Set the title
    tslide.defaultTitleItem().objectText = title;
    tslide.textItems[0].objectText = "- by a droid";
    tslide.textItems[2].objectText = "Collection";

    return document;
}

/**
 * Creates the content slide with given text.
 *
 * @param {object} document Keynote.Document instance.
 * @param {string} title Title of the slide.
 * @param {string} subtitle Subtitle of slide.
 * @param {string} content_txt Contents of the slide.
 * @param {string} img_filepath Absolute path to the image file.
 */
function create_content_slide(document, title, subtitle, content_txt, img_filepath) {
    // Create a slide with the
    var slide = Keynote.Slide({
        baseSlide: document.masterSlides["Title & Bullets"]
    });
    document.slides.push(slide);

    // Insert the title and subtitle
    slide.textItems[0].objectText = title;
    slide.textItems[1].objectText = subtitle;

    // Insert the content
    slide.textItems[2].objectText = content_txt;
    slide.textItems[2].width = 800;

    // Insert the image
    var img = Keynote.Image({
        file: Path(img_filepath),
        description: "rear image",
        position: {x: 1200, y: 104,},
        width: 600,
    });
    slide.images.push(img);

    return 0;
}



/////////////////////////////////////////////////


// Application
var Keynote = Application("Keynote");
Keynote.includeStandardAdditions = true


// Create a new document
docum = create_document("Logo");

// Create contents slide
create_content_slide(
    document=docum,
    title="Apple's First Logo",
    subtitle="Apple Computer Co.",
    content_txt="Newton… a mind forever voyaging through strange seas of thought",
    img_filepath="res/apple_first_logo.png",
);

// Save the file
docum.save({in: Path("res/sample_output.key")});
