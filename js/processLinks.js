/*
  Author: Nathan Duckett
  Provides functionality to load JSON configuration and build
  the homepage website to match the specification I require.
*/

/**
 * Set the contents of the Display. Processes the content from the JSON file and
 * set the content values inside the HTML.
 * @param {JSON} content Imported JSON config file.
 */
function setDisplay(content) {
  let rootPanel = document.getElementById("rootPanel");
  let internalContent = "";
  // Loop through every row on Homepage
  for (let i = 0; i < content.Rows.length; i++) {
    internalContent += _processRow(content.Rows[i]);
  }

  // Set the HTML to match the content
  rootPanel.innerHTML = internalContent;
}

/**
 * Load the JSON. Using XMLHttpRequest can asynchronously load the JSON content.
 * @param {Function} callback Callback function to process the loaded JSON.
 */
function loadJSON(callback) {
  let xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'config.json', true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

/**
 * Init function to begin loading of JSON and set the display content.
 */
function init() {
  loadJSON(function (response) {
    // Parse JSON string into object
    let actual_JSON = JSON.parse(response);

    setDisplay(actual_JSON);
  });
}

window.onload = init()

/**
 * Process the logical row of sections on the homepage.
 * @param {JsonArray} rowContents Array of Sections to display.
 */
function _processRow(rowContents) {
  let content = "";

  for (let section = 0; section < rowContents.length; section++) {
    content += _processSection(rowContents[section]);
  }

  return _build_row(content);
}

/**
 * Process each section within the row on the Homepage.
 * @param {Json} section Json Object containing title, and rows of links.
 */
function _processSection(section) {
  let sectionCode = _build_heading(section.Title);

  for (let row = 0; row < section.Links.length; row++) {
    sectionCode += _processLinks(section.Links[row]);
  }
  return _build_section(sectionCode)
}

/**
 * Process each row of links within the section.
 * @param {JsonArray} links Array of Link objects to add to the Section
 */
function _processLinks(links) {
  let rowCode = ""
  for (let link = 0; link < links.length; link++) {
    let linkContents = links[link];
    // Check if it is a link or GAP
    if (linkContents.Type == "GAP") {
      rowCode += _build_gap();
    } else {
      rowCode += _build_link(linkContents.Name, linkContents.Link);
    }
  }
  return _build_internal_row(rowCode);
}

/**
 * Build a link HTML object for displaying a button with access.
 * @param {String} name String name to quick describe the link.
 * @param {String} address String URL this button links to.
 */
function _build_link(name, address) {
  return '<div class="col-sm padded-col">' +
    '<a href="' + address + '" class="btn btn-dark">' +
    name + '</a>' +
    '</div>';
}

/**
 * Build a section heading with the specified title.
 * @param {String} title 
 */
function _build_heading(title) {
  return '<div class="row indented-row">' +
    '<h1 class="display-4">' + title + '</h1></div>';
}

/**
 * Build an internal row within a section for links.
 * @param {String} content 
 */
function _build_internal_row(content) {
  return '<div class="row indented-row">' +
    content + '</div>';
}

/**
 * Build an external row to contain different sections.
 * @param {String} content 
 */
function _build_row(content) {
  return '<div class="row">' +
    content + '</div>';
}

/**
 * Build a gap row.
 */
function _build_gap() {
  return '<div class="row"><hr/></div>';
}

/**
 * Build a section with the content containing the expected links
 * to go within the section.
 * @param {String} content 
 */
function _build_section(content) {
  return '<div class="col-md container bg-secondary text-white text-center">' +
    content + '</div>';
}