//Initial box up animation

setTimeout(() => {
  $(".color-inputs").css("bottom", "30%");
}, 100);

//Typing animation

let introText = "Pick colors to mix..";
let introInd = 0;

setInterval(() => {
  let currText = $(".color-inputs .info-note").html();

  if (introInd < introText.length) {
    $(".color-inputs .info-note").html(currText + introText[introInd]);
    introInd++;
  }
}, 60);

//..................

let fHexToRgb = "rgb(255 174 0)";
let sHexToRgb = "rgb(255 47 137)";

let firstColrValue = "#ffae00";
let secColorValue = "#ff2f89";

$(".first-color-input").on("input", () => {
  firstColrValue = $(".first-color-input").val();
  $("button").html('<i class="bi bi-magic"></i>Mix colors');
  $("button").css(
    "background",
    "linear-gradient(90deg," + firstColrValue + "," + secColorValue + ")"
  );
  $("body").css(
    "background",
    "linear-gradient(90deg," + firstColrValue + "," + secColorValue + ")"
  );
});

$(".first-color-input").on("change", () => {
  let finalFColor = $(".first-color-input").val();

  fHexToRgb = hexToRGB(finalFColor);

  function hexToRGB(j) {
    let finalCode = j.replace("#", "");

    let r = parseInt(finalCode.slice(0, 2), 16);
    let g = parseInt(finalCode.slice(2, 4), 16);
    let b = parseInt(finalCode.slice(4, 6), 16);

    return "rgb(" + r + "," + g + "," + b + ")";
  }
});

//................

$(".second-color-input").on("input", () => {
  secColorValue = $(".second-color-input").val();
  $("button").html('<i class="bi bi-magic"></i>Mix colors');

  $("button").css(
    "background",
    "linear-gradient(90deg," + firstColrValue + "," + secColorValue + ")"
  );
  $("body").css(
    "background",
    "linear-gradient(90deg," + firstColrValue + "," + secColorValue + ")"
  );
});

$(".second-color-input").on("change", () => {
  let finalSColor = $(".second-color-input").val();

  sHexToRgb = hexToRGB(finalSColor);

  function hexToRGB(j) {
    let finalCode = j.replace("#", "");

    let r = parseInt(finalCode.slice(0, 2), 16);
    let g = parseInt(finalCode.slice(2, 4), 16);
    let b = parseInt(finalCode.slice(4, 6), 16);

    return "rgb(" + r + "," + g + "," + b + ")";
  }
});

//Mixing colors

$(".wrapper button").click(() => {
  $(".check-accur").show();

  //.........

  let rgb1 = rgbToArray(fHexToRgb);
  let rgb2 = rgbToArray(sHexToRgb);

  let mixedColor = [
    Math.floor((rgb1[0] + rgb2[0]) / 2),
    Math.floor((rgb1[1] + rgb2[1]) / 2),
    Math.floor((rgb1[2] + rgb2[2]) / 2),
  ];

  function rgbToArray(x) {
    let fHexNum = x.match(/\d+/g);
    return fHexNum.map(Number);
  }

  $("body").css("background", "none");
  $("body").css("background-color", "rgb(" + mixedColor + ")");

  $("button").css("background", "none");
  $("button").css("background-color", "rgb(" + mixedColor + ")");

  //.........

  navigator.clipboard
    .writeText("rgb(" + mixedColor + ")")
    .then(() => {
      $("button").html('<i class="bi bi-clipboard2-check-fill"></i>Copied');
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });

  //.........

  $(".check-accur").click(() => {
    let bdBgColor = $("body").css("background-color");
    let googleSearchUrl =
      "https://www.google.com/search?q=" + encodeURIComponent(bdBgColor);
    window.open(googleSearchUrl, "_blank");
  });
});
