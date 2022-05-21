let currentPage = 0;
const pages = document.querySelectorAll(".page");
const pageCounter = document.getElementById("page-counter");
const cssFilesLoaded = {};

function goToPage(pageNumber = currentPage, relative = false) {
  console.log(currentPage);
  let targetPageIndex;
  if (relative) {
    targetPageIndex = currentPage + pageNumber;
  } else {
    targetPageIndex = pageNumber;
  }
  targetPageIndex = Math.min(Math.max(0, targetPageIndex), pages.length - 1);
  window.scrollTo({
    top: pages[targetPageIndex].offsetTop,
    behavior: "smooth",
  });
  currentPage = targetPageIndex;
  initPage(currentPage);
  pageCounter.innerText = `${currentPage + 1} / ${pages.length}`;
}

function initPage(pageNumber = currentPage) {
  const page = pages[pageNumber];
  const cssFileName = "styles/" + page.getAttribute("data-import");
  if (!cssFileName || cssFilesLoaded[cssFileName]) {
    return;
  }

  var head = document.querySelector("head");
  var linkTag = document.createElement("link");
  linkTag.href = cssFileName;
  linkTag.type = "text/css";
  linkTag.rel = "stylesheet";
  head.append(linkTag);
  cssFilesLoaded[cssFileName] = true;
  const classNameToAdd = "loaded-" + cssFileName.replace(".css", "").replace("styles/", "");
  document.body.classList.add(classNameToAdd);
}

document.addEventListener("keydown", e => {
  let targetPage = currentPage;
  switch (e.code) {
    case "ArrowUp":
      goToPage(-1, true);
      e.preventDefault();
      break;
    case "ArrowDown":
      e.preventDefault();
      goToPage(1, true);
      break;
  }
});

document.addEventListener("wheel", function (event) {
  if (event.wheelDelta > 0) {
    goToPage(-1, true);
  } else if (event.wheelDelta < 0) {
    goToPage(1, true);
  }
});

window.addEventListener("resize", function(e) {
  window.scrollTo({
    top: pages[currentPage].offsetTop
  });
})

// main code
goToPage(0);