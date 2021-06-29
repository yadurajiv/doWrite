var documentList = new Map();
var currentDocument = "welcome";
var quill;

// https://stackoverflow.com/a/6248722
function generateUID() {
    // I generate the UID from two parts here 
    // to ensure the random number provide enough bits.
    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
}

// https://stackoverflow.com/questions/12168909/blob-from-dataurl
function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  var ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], {type: mimeString});
  return blob;

}

/*

function imageHandler(dataUrl, type, imageData) {
  imageData.minify({
    maxWidth: 320,
    maxHeight: 320,
    quality: .7
  }).then((miniImageData) => {
    var blob = miniImageData.toBlob()
    var file = miniImageData.toFile('my_cool_image.png')
    
    console.log(`type: ${type}`)
    console.log(`dataUrl: ${dataUrl}`)
    console.log(`blob: ${blob}`)
    console.log(`file: ${file}`)

    /*
    
    // display preview image from blob url
    var blobUrl = URL.createObjectURL(blob)
    var preivew = document.getElementById('preview')
    var previewImage = document.createElement('img')
    previewImage.src = blobUrl
    previewImage.onload = function() {
      preview.appendChild(previewImage)
      preview.style.display = 'block'
    }
*/
    /*
    // display file infomation from file object
    var info = document.getElementById('info')
    document.getElementById('file-name').textContent = file.name
    document.getElementById('file-size').textContent = file.size
    document.getElementById('file-type').textContent = file.type
    info.style.display = 'block'
     // * /
  })
}
*/



// soon to be done!!
function saveHandler() {
  alert("Save to dropbox!!");
}

function downloadImageHandler() {

  quill.setSelection();

  const element = document.querySelector(".ql-tooltip");
  element.classList.add("ql-hidden");

  html2canvas($("#editor-container")[0]).then(function(canvas) {
    //document.body.appendChild(canvas);
    var image = canvas.toDataURL();
    var blob = dataURItoBlob(image);
    saveAs(blob, currentDocument+".png");
  });
}

// print current document
function printHandler() {
  const element = document.querySelector(".ql-tooltip");
  element.classList.add("ql-hidden");
  window.print();
}


// dowload as docx
function downloadHandler() {
  var delta = quill.getContents();
  var qdc = new window.QuillDeltaToHtmlConverter(delta.ops, window.opts_ || {});
  var html = qdc.convert();

  var converted = htmlDocx.asBlob(html);
  saveAs(converted, currentDocument+'.docx');

}

// please to donate
function donationHandler() {
  window.open("https://www.buymeacoffee.com/yadurajiv");
}

// show about screen
function aboutHandler() {
  newDocument();

  quill.setContents({"ops":[{"insert":"Do Writing"},{"attributes":{"align":"center","header":1},"insert":"\n"},{"insert":"\nWelcome to dowrite.in a small tool to quickly jot down your ideas in a distraction free space."},{"attributes":{"align":"center"},"insert":"\n\n"},{"attributes":{"italic":true},"insert":"by"},{"attributes":{"align":"center"},"insert":"\n\n"},{"attributes":{"link":"https://yadurajiv.com/"},"insert":"Yadu Rajiv"},{"insert":" ("},{"attributes":{"link":"https://twitter.com/yadurajiv"},"insert":"@yadurajiv"},{"insert":")"},{"attributes":{"align":"center"},"insert":"\n\n\n"},{"attributes":{"bold":true},"insert":{"emoji":"fire"}},{"attributes":{"bold":true},"insert":" [ Tips ] "},{"insert":{"emoji":"fire"}},{"attributes":{"align":"center","header":2},"insert":"\n"},{"attributes":{"align":"center"},"insert":"\n"},{"insert":"Move your mouse up to the top of the screen to access the title bar"},{"attributes":{"list":"bullet"},"insert":"\n"},{"insert":"Shift + Click a title to delete it"},{"attributes":{"list":"bullet"},"insert":"\n"},{"insert":"Select any text to get more options!"},{"attributes":{"list":"bullet"},"insert":"\n"},{"insert":"All docs are stored in the browser's local storage & "},{"attributes":{"bold":true},"insert":"not online"},{"insert":". Remember to back things up."},{"attributes":{"list":"bullet"},"insert":"\n"},{"insert":"Select all this text and delete it to start writing or delete this document"},{"attributes":{"list":"bullet"},"insert":"\n"},{"insert":"Please reach out to me on twitter if you would like to see more features or bump into bugs!"},{"attributes":{"list":"bullet"},"insert":"\n"},{"insert":"You can support me here - "},{"attributes":{"link":"https://www.buymeacoffee.com/yadurajiv"},"insert":"https://www.buymeacoffee.com/yadurajiv"},{"attributes":{"list":"bullet"},"insert":"\n"},{"attributes":{"align":"center"},"insert":"\n"},{"attributes":{"bold":true},"insert":{"emoji":"warning"}},{"attributes":{"bold":true},"insert":" [ Important Note ] "},{"insert":{"emoji":"warning"}},{"attributes":{"align":"center","header":2},"insert":"\n"},{"insert":"doWrite saves every time a document is modified. These documents are saved in your browser's local storage. Depending on your browser, this local storage can get deleted when clearing cache or other means. It is a temporary means of storage and hence, please back up your documents as and when needed."},{"attributes":{"align":"center"},"insert":"\n\n"},{"insert":"[Updates]"},{"attributes":{"align":"center","header":2},"insert":"\n"},{"attributes":{"align":"center"},"insert":"\n"},{"attributes":{"italic":true,"bold":true},"insert":"April 24, 2020"},{"attributes":{"align":"center"},"insert":"\n"},{"insert":"Initial Release"},{"attributes":{"align":"center"},"insert":"\n"},{"insert":"-"},{"attributes":{"align":"center"},"insert":"\n"},{"insert":"Current document selected is now highlighted in the title bar"},{"attributes":{"align":"center"},"insert":"\n"},{"insert":"Better editing experience in longer documents"},{"attributes":{"align":"center"},"insert":"\n"},{"insert":"-"},{"attributes":{"align":"center"},"insert":"\n"},{"insert":{"emoji":"heart"}},{"insert":" Added emoji support - insert using toolbar or type "},{"attributes":{"bold":true},"insert":":"},{"insert":" and start typing "},{"insert":{"emoji":"heart"}},{"attributes":{"align":"center"},"insert":"\n"},{"insert":"Added important note!"},{"attributes":{"align":"center"},"insert":"\n"},{"insert":"Can now download the whole document as an image!"},{"attributes":{"align":"center"},"insert":"\n"},{"insert":"-"},{"attributes":{"align":"center"},"insert":"\n"},{"insert":"Copy pasted images embed into document properly (for word-docx and image exports)"},{"attributes":{"align":"center"},"insert":"\n"}]});


/*
  quill.update();

  documentList.set(currentDocument, quill.getContents());
  */
}

// new doc toolbar item call back
function newdocHandler() {  
  newDocument();
}

// kill document
function killHandler() {
  deleteDocument(currentDocument);
}

// switch document
function switchDocument(event, doc) {

  $(`#doc-${currentDocument}`).removeClass("selected");
  $(`#doc-${doc}`).addClass("selected");

  if(event == null) {
    currentDocument = doc;
    quill.setContents(documentList.get(currentDocument));
    return;
  }

  if(event.shiftKey) {
    currentDocument = doc;
    quill.setContents(documentList.get(currentDocument));  
    deleteDocument(doc);
  } else {
    currentDocument = doc;
    quill.setContents(documentList.get(currentDocument));
    quill.update();
  }
}

// delete document
function deleteDocument(doc) {
  var r = confirm("Delete document? \'" + doc + "\'");
  if (r == true) {
    documentList.delete(doc);

    if(documentList.size <= 0) {
      newDocument();
    } else if(doc == currentDocument) {
      switchDocument(null, documentList.entries().next().value[0]);
    }

    $('#doc-button-'+doc).remove();

  }
}

// new document
function newDocument() {

  if(documentList.size==1) {
    alert("doWrite saves every time a document is modified. These documents are saved in your browser's local storage. Depending on your browser, this local storage can get deleted when clearing cache or by other means. It is a temporary means of storage and hence, please back up your documents as and when needed.");
  }

  var currentDoc = generateUID();
  documentList.set(currentDoc, quill.getContents());

  switchDocument(null, currentDoc);
  
  quill.setText("");

  var docList = "";
  documentList.forEach(function (value, key, map) {
    docList += `<span id="doc-button-${key}" class="doc-button"><button id="doc-${key}" class="doc" onclick="switchDocument(event, '${key}')">${key}</button></span>`;
  });

  docList += '<span id="doc-button-newdoc" class="doc-button"><button id="newdoc" class="doc" onclick="newDocument()"><i class="fa fa-plus"></i></button></span>';

  //var docList = $("#docs").html();
//  docList += '<span id="doc-button-'+currentDoc+'" class="doc-button"><button id="doc-'+currentDoc+'" class="doc" onclick="switchDocument(\''+currentDoc+'\')">'+currentDoc+'</button><i id="del-'+currentDoc+'" onclick="deleteDocument(\''+currentDoc+'\')" class="delete fa fa-skull"></i></span>';  
    //docList += '<span id="doc-button-'+currentDoc+'" class="doc-button"><button id="doc-'+currentDoc+'" class="doc" onclick="switchDocument(\''+currentDoc+'\')">'+currentDoc+'</button></span>';  
  $("#docs").html(docList);  

  switchDocument(null, currentDoc);

  localStorage.setItem("doWriteData", JSON.stringify([...documentList]));

}


$(document).ready(function() {

  // init quill
  quill = new Quill("#editor", {
    modules: {
      toolbar: {
        container: '#toolbar',
        handlers: {
          'save': saveHandler,
          'print': printHandler,
          'download': downloadHandler,
          'donate': donationHandler,
          'about': aboutHandler,
          'newdoc': newdocHandler,
          'kill': killHandler,
          'dlimg': downloadImageHandler
        }
      },
      imageResize: {
          displaySize: true
      },
      imageDropAndPaste: {},
      "emoji-toolbar": true,
      "emoji-shortname": true,
      "emoji-textarea": true
    },

    placeholder: 'Do some awesome writing.',
    theme: 'bubble'
  });

  var cumulativeOffset = function(element) {
    var top = 0, left = 0;
    do {
        top += element.offsetTop  || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while(element);

    return {
        top: top,
        left: left
    };
};

  // quill on change callback
  quill.on('text-change', function(delta, oldDelta, source) {
    documentList.set(currentDocument, quill.getContents());
    localStorage.setItem("doWriteData", JSON.stringify([...documentList]));

    var sel = quill.root.ownerDocument.getSelection().baseNode;
    if(sel!=null) {
      var node = sel.nodeType == 3 ? sel.parentElement : sel;
      var pos = cumulativeOffset(node)
      //console.log(node, pos);
      window.scroll({
        top: pos.top - 300,
        left: 0,
        behavior: 'smooth'
      }); 
    }

    //console.log(JSON.stringify(quill.getContents()));
    
  });

/*
  var ImageData = QuillImageDropAndPaste.ImageData
  quill.getModule('toolbar').addHandler('image', function(clicked) {
    if (clicked) {
      var fileInput = this.container.querySelector('input.ql-image[type=file]')
      if (fileInput == null) {
        fileInput = document.createElement('input')
        fileInput.setAttribute('type', 'file')
        fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon')
        fileInput.classList.add('ql-image')
        fileInput.addEventListener('change', function(e) {
          var files = e.target.files, file
          if (files.length > 0) {
            file = files[0]
            var type = file.type
            var reader = new FileReader()
            reader.onload = (e) => {
              // handle the inserted image
              var dataUrl = e.target.result
              imageHandler(dataUrl, type, new ImageData(dataUrl, type))
              fileInput.value = ''
            }
            reader.readAsDataURL(file)
          }
        })
      }
      fileInput.click()
    }
  });
  */

  // re-show toolbar after loading all css
  $("#toolbar").css("display", "block");

  // get local storage data
  var data = localStorage.getItem('doWriteData');

  // reload documents
  if(data == null) {
    aboutHandler();
  } else {
    documentList = new Map(JSON.parse(data));

    var docList = "";
    documentList.forEach(function (value, key, map) {
      docList += `<span id="doc-button-${key}" class="doc-button"><button id="doc-${key}" class="doc" onclick="switchDocument(event, '${key}')">${key}</button></span>`;
    });

    docList += '<span id="doc-button-newdoc" class="doc-button"><button id="newdoc" class="doc" onclick="newDocument()"><i class="fa fa-plus"></i></button></span>';

    $("#docs").html(docList);

    switchDocument(null, documentList.entries().next().value[0]);

  }

  

});
