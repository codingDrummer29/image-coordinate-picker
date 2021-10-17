var arr = [];

var myImg = document.getElementById("myImgId");
myImg.onmousedown = GetCoordinates;

var output = document.getElementById("output");
myImg.onmousemove = getCursorPos;

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

document.addEventListener("DOMContentLoaded", function () {
  myImg.addEventListener("click", function appendOnTextArea(a) {
    if (a.altKey) {
      var posx = a.clientX - 10;
      var posy = a.clientY - 82;
      textArea.value += `X: ${posx}px, Y: ${posy}px\n`;
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  myImg.addEventListener("mousemove", function appendOnTextArea(e) {
    if (e.altKey) {
      var PosX = 0;
      var PosY = 0;
      var ImgPos;
      ImgPos = FindPosition(myImg);
      if (!e) var e = window.event;
      if (e.pageX || e.pageY) {
        PosX = e.pageX;
        PosY = e.pageY;
      } else if (e.clientX || e.clientY) {
        PosX =
          e.clientX +
          document.body.scrollLeft +
          document.documentElement.scrollLeft;
        PosY =
          e.clientY +
          document.body.scrollTop +
          document.documentElement.scrollTop;
      }
      PosX = PosX - ImgPos[0];
      PosY = PosY - ImgPos[1];

      textArea.value += `X: ${PosX} px, Y: ${PosY} px\n`;

      var obj = {
        x: PosX,
        y: PosY,
      };

      arr.push(obj);
    }
  });
});

function handleSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const value = Object.fromEntries(data.entries());

  console.log("arr: ", arr);
}

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $("#myImgId").attr("src", e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
  }
}

function FindPosition(oElement) {
  if (typeof oElement.offsetParent != "undefined") {
    for (var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent) {
      posX += oElement.offsetLeft;
      posY += oElement.offsetTop;
    }
    return [posX, posY];
  } else {
    return [oElement.x, oElement.y];
  }
}

function GetCoordinates(e) {
  var PosX = 0;
  var PosY = 0;
  var ImgPos;
  ImgPos = FindPosition(myImg);
  if (!e) var e = window.event;
  if (e.pageX || e.pageY) {
    PosX = e.pageX;
    PosY = e.pageY;
  } else if (e.clientX || e.clientY) {
    PosX =
      e.clientX +
      document.body.scrollLeft +
      document.documentElement.scrollLeft;
    PosY =
      e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  PosX = PosX - ImgPos[0];
  PosY = PosY - ImgPos[1];
  document.getElementById("staticSingle").innerHTML =
    "X: " + PosX + "px & Y: " + PosY + "px";
}

function getCursorPos(e) {
  var PosX = 0;
  var PosY = 0;
  var ImgPos;
  ImgPos = FindPosition(myImg);
  if (!e) var e = window.event;
  if (e.pageX || e.pageY) {
    PosX = e.pageX;
    PosY = e.pageY;
  } else if (e.clientX || e.clientY) {
    PosX =
      e.clientX +
      document.body.scrollLeft +
      document.documentElement.scrollLeft;
    PosY =
      e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  PosX = PosX - ImgPos[0];
  PosY = PosY - ImgPos[1];

  output.innerHTML = "X: " + PosX + "px & Y: " + PosY + "px";
}
