const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];

// Upsplash API
const trigger = 1000;
const count = 10;
const apiKey = "hsESSrxo1XmzRrV9pQKvKamdTCIMnoMAQUovTdunACg";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttributes(key, attributes[key]);
  }
}

// Create Elements for Links & Photos, Add to DOM!
function displayPhotos() {
  // Run Function for Each Object in PhotosArray
  photosArray.forEach((photo) => {
    // Create <a> to Link to upsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // Create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get Photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // Catch Error Here...
  }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener("scroll", () => {
  // window.innerHeight - 네비게이션 창을 제외한 높이 - Total height of browser window
  // window.scrollY - 사용자 스크롤 y 좌표 값 (사용자가 스크롤을 내리면 증가함) - distance from top of page user has scrolled
  // offsetHeight - 요소의 패딩, 보더, 스크롤바의 사이즈를 포함한 값을 리턴 - Height of everything in the body, including what is not within view
  // 1000px less (can be any vlaue) - We need to subtract from offsetHeight, to trigger event before bottm is reached.
  // - load more when user scroller to this point, before end of content
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - trigger
  ) {
    getPhotos();
    console.log("Load More...");
  }
});

// On Load
getPhotos();
