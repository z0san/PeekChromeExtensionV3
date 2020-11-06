console.log('peek is running');

//stores the current url that the mouse is over or was last over
var currentUrl;
//stores current key down
var currentKeyCode;
//stores weather or not key is currently down
var keyDown = false;
//stores the key code that is the trigger for the extension whis hard codded
//to 17 (ctrl) for testing but in future should be able to be changed in settings
//by the user
var triggerKeyCode = 17
//stores the width and height of the peek window
var width = 300;
var height = width * (9/16);
//sores the popup elemet
var popup;

//add the html popup window to the page on load
window.onload=function(){
  document.getElementsByTagName('html')[0].innerHTML += popuphtml;
  popup = document.getElementById('PeekPopUp');
  popup.width = width;
  popup.height = height;
  popup.src = "https://google.com";
  console.log('adding popup html');
}

// runs on mouse over and gets the url that is being hovered over and if it's new
// updates the current url and startes the screen shot for the new url
window.onmouseover=function(e) {
  //item that will be recured into paretent items until we get an 'a' or 'html' tag
  var currentItem = e.target;
  //escilate untill we reach end of document (we are not over a link) or get a link
  while(currentItem != undefined &&
    !(currentItem.tagName == 'a' || currentItem.tagName == 'A') &&
    !(currentItem.tagName == "html" || currentItem.tagName == "HTML")) {
    currentItem = currentItem.parentNode;
  }
  //if we reached a link
  if(currentItem.tagName == 'a' || currentItem.tagName == 'A' &&
    currentItem.href != currentUrl){
    currentUrl = currentItem.href;
    //call the update function incase action needs to be taken
    urlUpdate();
  }

};

//function to get url if needed and is called whenever it is possible that a new url should be downloaded
function urlUpdate() {
  if(currentUrl && currentKeyCode == triggerKeyCode && keyDown){
    popup.style.visibility = "visable";
    console.log('starting popup window');
 }
}


document.onkeydown = function(evt) {
  evt = evt || window.event;
  var key = evt.keyCode || evt.which;
  //only want to continue if there is something to update
  if(!keyDown || currentKeyCode == key){
    currentKeyCode = key;
    keyDown = true;
    popup.style.visibility = "visible";
    //call the update function incase action needs to be taken
    urlUpdate();
  }
};

//when key up set keyDown to false so the extension will no longer run
document.onkeyup = function(evt) {
  keyDown = false;
  popup.style.visibility = "hidden";
  console.log('closing popup window');
};


//event listener to move the popup to the mouse
document.addEventListener('mousemove', function(e) {
  let body = document.querySelector('html');
  let left = e.pageX + (width/2) + 5;
  let top = e.pageY + (height/2) + 5;
  popup.style.left = left + 'px';
  popup.style.top = top + 'px';
});



var popuphtml = "<iframe id=PeekPopUp style='position:absolute; transform:translate(-50%, -50%);'>test</iframe>";
