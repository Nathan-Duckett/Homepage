function setDisplay(content) {
  let rootPanel = document.getElementById("rootPanel");
  let internalContent = "";
  for (let i = 0; i < content.Rows; i++) {
    internalContent += _processRow(content.Rows[i]);
  }

  rootPanel.innerHTML = internalContent;
}

function loadJSON(callback) {

  let xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'config.json', true);
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function init() {
  console.log("Yes");
  loadJSON(function(response) {
    // Parse JSON string into object
    let actual_JSON = JSON.parse(response);

    setDisplay(actual_JSON);
  });
}

window.onload = init()

function _processRow(rowContents) {
  let content = "";

  for (let section = 0; section < rowContents.length; section++) {
    let sectionCode = _build_heading(rowContents[section].Title);

    for (let row = 0; row < rowContents[section].Links.length; row++) {
      let rowCode = ""
      for (let subRow = 0; subRow < rowContents[section].Links[row].length; subRow++) {
        let link = rowContents[section].Links[row][subRow];
        rowCode += _build_link(link.Name, link.Link);
      }
      sectionCode += _build_internal_row(rowCode);
    }
    content += _build_section(sectionCode)
  }

  return _build_row(content);
}

function _build_link(name, address) {
  return '<div class="col-sm padded-col">' +
    '<a href="' + address + '" class="btn btn-dark">' +
    name + '</a>' +
    '</div>';
}

function _build_heading(title) {
  return '<div class="row indented-row">' +
    '<h1 class="display-4">' + title + '</h1></div>';
}

function _build_internal_row(content) {
  return '<div class="row indented-row">' +
    content + '</div>';
}

function _build_row(content) {
  return '<div class="row">' +
    content + '</div>';
}

function _build_gap() {
  return '<div class="row"><hr/></div>';
}

function _build_section(content) {
  return '<div class="col-md container bg-secondary text-white text-center">' +
    content + '</div>';
}