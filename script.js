$(document).ready(function () {
  $(".page").scroll(function () {
    if ($(window).width() < 378) {
      $(".nav").css("background-color", "rgba(243,191,2,0.98)");
      $(".nav").css("border-bottom", "1px solid #f3bf02");
      return;
    }
    if ($(this).scrollTop() > 70) {
      $(".nav").css("background-color", "rgba(243,191,2,0.98)");
      $(".nav").css("border-bottom", "1px solid #f3bf02");
    } else {
      $(".nav").css("background-color", "transparent");
      $(".nav").css("border-bottom", "none");
    }
    if ($(this).scrollTop() > 340) {
      $(".button-nav-cta").css("display", "block");
      $(".button-nav-cta").removeClass("anim_fadeInLeft");
      $(".button-nav-cta").addClass("anim_fadeInRight");
    } else {
      $(".button-nav-cta").css("display", "none");
      $(".button-nav-cta").removeClass("anim_fadeInLeft");
      $(".button-nav-cta").addClass("anim_fadeInRight");
    }
  });

  $("#scrollup").on("click", function () {
    $(".page").animate({ scrollTop: 0 }, 500);
  });

  $(".page")
    .animate(
      { scrollTop: 2200 },
      {
        duration: 0,
      }
    )
    .animate(
      { scrollTop: 0 },
      {
        duration: 2500,
        easing: "easeOutExpo",
      }
    );
});

function jump(h) {
  var container = $(".page"),
    scrollTo = $("#" + h);
  container.animate(
    {
      scrollTop:
        scrollTo.offset().top -
        container.offset().top +
        container.scrollTop() -
        70,
    },
    500
  );
}

var $bg = $("body");
const checkbox = document.getElementById("checkbox");

function changeBackgroundColor() {
  const screenWidth = window.innerWidth;
  const isDarkMode = localStorage.getItem("theme") === "dark";

  if (screenWidth < 1350) {
    $bg.css({ background: "#F2BE22" });
  } else {
    if (isDarkMode || checkbox.checked) {
      $bg.css({ background: "#41424C" });
    } else {
      $bg.css({ background: "#FFFBE9" });
    }
  }
}

// Function to save the user's theme choice to localStorage
function saveThemeChoice() {
  localStorage.setItem("theme", checkbox.checked ? "dark" : "light");
  changeBackgroundColor(); // Update the background color immediately when the theme is saved
}

// Function to load the user's theme choice from localStorage
function loadSavedTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    checkbox.checked = true;
  } else {
    checkbox.checked = false;
  }
}

// Call the function to load the saved theme when the page loads
loadSavedTheme();

// Event listener for the checkbox
checkbox.addEventListener("change", function () {
  saveThemeChoice();
});

// Event listener for window resize
window.addEventListener("resize", changeBackgroundColor);

changeBackgroundColor();

checkbox.addEventListener("change", changeBackgroundColor);

window.addEventListener("resize", changeBackgroundColor);
