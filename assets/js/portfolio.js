var imgList = Array.from(document.querySelectorAll(".portfolio img"));
var innerbox = document.querySelector(".innerBox");
var boxmodel = document.getElementById("boxModal");
var nextbtn = document.getElementById("next");
var prevbtn = document.getElementById("prev");
var closebtn = document.getElementById("close");
for (var i = 0; i < imgList.length; i++) {
  imgList[i].addEventListener("click", (e) => {
    boxmodel.style.display = "flex";
    var imgs = e.target.getAttribute("src");
    innerbox.style.backgroundImage = `url(${imgs})`;
    currentIndex = imgList.indexOf(e.target);
    console.log(currentIndex);
  });
}
closebtn.addEventListener("click", closeElement);
nextbtn.addEventListener("click", nextElement);
prevbtn.addEventListener("click", prevElement);
function closeElement() {
  boxmodel.style.display = "none";
}
function nextElement() {
  currentIndex++;
  if (currentIndex == imgList.length) {
    currentIndex = 0;
  }
  var imgs = imgList[currentIndex].getAttribute("src");
  innerbox.style.backgroundImage = `url(${imgs})`;
}
function prevElement() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = imgList.length - 1;
  }
  var imgs = imgList[currentIndex].getAttribute("src");
  innerbox.style.backgroundImage = `url(${imgs})`;
}
document.addEventListener("keyup", function (e) {
  if (e.key == "ArrowRight") {
    nextElement();
  } else if (e.key == "ArrowLeft") {
    prevElement();
  } else if (e.key == "Escape") {
    closeElement();
  }
});
boxmodel.addEventListener("click", function (e) {
  if (e.target.getAttribute("id") == "boxModal") {
    closeElement();
  }
});
