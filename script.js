$(document).ready( function() {
  $('.page').scroll( function (){
    if ($(window).width() < 378) {
      $('.nav').css("background-color","rgba(243,191,2,0.98)");
      $('.nav').css("border-bottom","1px solid #f3bf02");
      return;
    }
    if ($(this).scrollTop() > 70) {
      $('.nav').css("background-color","rgba(243,191,2,0.98)");
      $('.nav').css("border-bottom","1px solid #f3bf02");
    } else {
      $('.nav').css("background-color","transparent");
      $('.nav').css("border-bottom","none");
    }
    if ($(this).scrollTop() > 340) {
      $('.button-nav-cta').css("display","block");
      $(".button-nav-cta").removeClass("anim_fadeInLeft");
      $(".button-nav-cta").addClass("anim_fadeInRight");
    } else {
      $('.button-nav-cta').css("display","none");
      $(".button-nav-cta").removeClass("anim_fadeInLeft");
      $(".button-nav-cta").addClass("anim_fadeInRight");
    }
  });
  
  $('#scrollup').on('click', function () {
    $('.page').animate({ scrollTop: 0 }, 800);
  });
  
  $('.page').animate({ scrollTop: 2200 }, 0).animate({ scrollTop: 0 }, 4000);
});

function jump(h){
  var container = $('.page'), scrollTo = $('#'+h);
  container.animate({ scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop() - 70 }, 800);
}




// Function to change the background color
function changeBackgroundColor() {
  const screenWidth = window.innerWidth;
  const isDarkMode = localStorage.getItem('theme') === 'dark';

  if (screenWidth < 1350) {
    $bg.css({ 'background': '#F2BE22' });
  } else {
    if (isDarkMode) {
      $bg.css({ 'background': '#41424C' });
    } else {
      $bg.css({ 'background': '#FFFBE9' });
    }
  }
}

// Function to change the background color
var $bg = $('body');
const checkbox = document.getElementById("checkbox");

function changeBackgroundColor() {
  const screenWidth = window.innerWidth;
  if (screenWidth < 1350) {
    $bg.css({ 'background': '#F2BE22' });
  } else {
    if (checkbox.checked) {
      $bg.css({ 'background': '#41424C' });
    } else {
      $bg.css({ 'background': '#FFFBE9' });
    }
  }
}







// Function to save the user's theme choice to localStorage
function saveThemeChoice() {
  localStorage.setItem('theme', checkbox.checked ? 'dark' : 'light');
  changeBackgroundColor(); // Update the background color immediately when the theme is saved
}

// Function to load the user's theme choice from localStorage
function loadSavedTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    checkbox.checked = true;
  } else {
    checkbox.checked = false;
  }
}

// Call the function to load the saved theme when the page loads
loadSavedTheme();

// Event listener for the checkbox
checkbox.addEventListener("change", function() {
  saveThemeChoice();
});

// Event listener for window resize
window.addEventListener("resize", changeBackgroundColor);


changeBackgroundColor();

checkbox.addEventListener("change", changeBackgroundColor);

window.addEventListener("resize", changeBackgroundColor);









// Skills Graphs


var skills = [
  {"header" : "INTERESTS",
    "captions" : [
      "Volunteering",
      "Tech",
      "Travel",
      "Video Game",
      "Design"
    ],
    "values" : [
      0.80,
      0.90,
      0.60,
      0.80,
      0.65
    ]
  },
  {"header" : "TECH",
    "captions" : [
      "Prompt Engineering",
      "AI",
      "Hardware",
      "Software",
      "Web"
    ],
    "values" : [
      0.85,
      0.85,
      0.75,
      0.90,
      0.65
    ]
  }
];

var pentagonIndex = 0;
var valueIndex = 0;
var width = 0;
var height = 0;
var radOffset = Math.PI/2
var sides = 5; // Number of sides in the polygon
var theta = 2 * Math.PI/sides; // radians per section

function getXY(i, radius) {
  return {"x": Math.cos(radOffset +theta * i) * radius*width + width/2,
    "y": Math.sin(radOffset +theta * i) * radius*height + height/2};
}

var hue = [];
var hueOffset = 25;

for (var s in skills) {
  $(".content").append('<div class="pentagon" id="interests"><div class="header"></div><canvas class="pentCanvas"/></div>');
  hue[s] = (hueOffset + s * 255/skills.length) % 255;
}

$(".pentagon").each(function(index){
  width = $(this).width();
  height = $(this).height();
  var ctx = $(this).find('canvas')[0].getContext('2d');
  ctx.canvas.width = width;
  ctx.canvas.height = height;
  ctx.font="15px Monospace";
  ctx.textAlign="center";
  
  /*** LABEL ***/

  // Change the color of the title text here based on your requirements
  if (pentagonIndex === 0) {
    ctx.fillStyle = "#484849";
  } else {
    ctx.fillStyle = "#484849";
  }

  ctx.fillText(skills[pentagonIndex].header, width/2, 15);

  ctx.font="13px Monospace";


  /*** PENTAGON BACKGROUND ***/
  for (var i = 0; i < sides; i++) {
    // For each side, draw two segments: the side, and the radius
    ctx.beginPath();
    xy = getXY(i, 0.3);
    colorJitter = 25 + theta*i*2;

    // Change the color here based on your requirements
    if (pentagonIndex === 0) {
      color = "";
    } else {
      color = "#";
    }

    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.moveTo(0.5*width, 0.5*height); //center
    ctx.lineTo(xy.x, xy.y);
    xy = getXY(i+1, 0.3);
    ctx.lineTo(xy.x, xy.y);
    xy = getXY(i, 0.37);
    console.log();
    ctx.fillText(skills[pentagonIndex].captions[valueIndex],xy.x, xy.y +5);
    valueIndex++;
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  
  valueIndex = 0;
  ctx.beginPath();
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
  ctx.lineWidth = 5;
  var value = skills[pentagonIndex].values[valueIndex];
  xy = getXY(i, value * 0.3);
  ctx.moveTo(xy.x,xy.y);
  /*** SKILL GRAPH ***/
  for (var i = 0; i < sides; i++) {
    xy = getXY(i, value * 0.3);
    ctx.lineTo(xy.x,xy.y);
    valueIndex++;
    value = skills[pentagonIndex].values[valueIndex];
  }
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
  valueIndex = 0;  
  pentagonIndex++;
});
