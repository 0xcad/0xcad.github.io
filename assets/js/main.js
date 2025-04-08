function throttle(callback, wait) {
  var timeout
  return function(e) {
    if (timeout) return;
    timeout = setTimeout(() => (callback(e), timeout=undefined), wait)
  }
}

// header shadow js
const heroHeader = document.querySelector('.hero h1');
const heroShadow = document.querySelector('.hero h1.shadow');

document.body.addEventListener('mousemove', throttle(function (e) {
  /* Draw a vector between the mouse and the position of the header element
   * Get the magnitude and use the angle between points to modify the X/Y
   * offsets of header shadow */
  const hhRect = heroHeader.getBoundingClientRect();
  const hhX = hhRect.x + hhRect.width / 2;
  const hhY = hhRect.y + hhRect.height / 2;

  // mouse: e.ClientX, e.clientY
  // heroHeader: hhX hhY
  let deltaY = hhY - e.clientY;
  let deltaX = hhX - e.clientX;
  var angle = Math.atan2(deltaY, deltaX);
  var dist = Math.sqrt(deltaY * deltaY + deltaX * deltaX);

  dist = Math.min(dist / 3, 24);

  let xDist = -1 * dist * Math.cos(angle);
  let yDist = -1 * dist * Math.sin(angle);
  heroShadow.style.transform = `translate(${xDist}px, ${yDist}px)`;
}, 100));

// navbar js
const NAV_HEIGHT = 58;
const navListEl = document.querySelector('.nav-list');
const navProjects = document.createElement("ul");
function extendNav() {
  /* get all of the projects on the page
   * for each one, get their title. slugify it, and set that as its id
   *  add an anchor link to that in the alt navbar
   */
  const projects = document.querySelectorAll('.project');

  projects.forEach((project) => {
    var title = project.querySelector('h2').innerText;
    var slug = title.toLowerCase().replaceAll(" ", "-").replaceAll(":", "-").replaceAll(".", "-");
    project.id = slug;

    var li = document.createElement("li");
    var link = document.createElement("a");
    //link.setAttribute('title', title);
    link.href = "#" + slug;
    link.innerHTML = title;
    li.appendChild(link);
    li.classList = project.classList;
    navProjects.appendChild(li);
  });

  navProjects.classList.add('width-0');
  navProjects.classList.add("hide-scrollbars");
  navListEl.appendChild(navProjects);
}
extendNav();
const anchorEls = document.querySelectorAll('a[href^="#"]');

document.addEventListener('scroll', throttle(function (e) {
  /* get all hash links on the page
   * get the elements they link to
   * if the current scroll window eclipses that elements' position on the
   *  page, then make the respective hash link bold
   */
  anchorEls.forEach(anchor => {
    var href = anchor.getAttribute('href');
    if (href === "#")
      return;
    var targetEl = document.querySelector(href);
    var targetRect = targetEl.getBoundingClientRect();
    if (targetRect.top <= NAV_HEIGHT + 2 && NAV_HEIGHT + 2 <= targetRect.top + targetRect.height) {
      anchor.classList.add('active');

      if (targetEl.id === "projects")
        navProjects.classList.remove('width-0');
      // scroll anchor into view if it's in the top nav
      else if (navProjects.contains(anchor))
        anchor.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
    else {
      anchor.classList.remove('active');

      if (targetEl.id === "projects")
        navProjects.classList.add('width-0');
    }
  });
}, 200));

// smoothscrolling js
function scrollIntoView(targetEl) {
  if (!targetEl)
      return;
    var targetElPosition = targetEl.getBoundingClientRect().top;
    var targetElOffset = targetElPosition + window.pageYOffset - NAV_HEIGHT;
    window.scrollTo({
         top: targetElOffset,
         behavior: "smooth"
    });
}

anchorEls.forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    var targetEl = document.querySelector(this.getAttribute('href'));
    scrollIntoView(targetEl);
  });
});

window.addEventListener('load', (e) => {
  if (window.location.hash) {
    var targetEl = document.querySelector(window.location.hash);
    scrollIntoView(targetEl);
  }
});

// lightbox js
const lightboxEl = document.querySelector(".lightbox");
const lightboxImageContainer = lightboxEl.querySelector('.lightbox-image-container');
const lightboxTextContainer = lightboxEl.querySelector('.text-container');
function toggleLightbox(event, el = null) {
  if (el) {
    var imageContainer = el.parentElement;
    var project = imageContainer.parentElement;
    var textContainer = project.querySelector('.text-container');

    lightboxImageContainer.innerHTML = imageContainer.innerHTML;
    lightboxTextContainer.innerHTML = textContainer.innerHTML;
  }

  lightboxEl.classList.toggle('hidden');
  document.body.classList.toggle('no-scroll');
  lightboxEl.scrollTop = -10000;
}

document.querySelectorAll('.project .image-container img').forEach(el => {
  el.addEventListener('click', (event) => toggleLightbox(event, el));
});
lightboxEl.querySelector('.lightbox-image-wrapper').addEventListener('click', toggleLightbox);
lightboxEl.querySelector('.close').addEventListener('click', toggleLightbox);


// projects js
const funProjects = document.querySelectorAll(".fun");
function toggleProjectsVisibility(val = undefined) {
  if (val == 'all') {
    funProjects.forEach((el) => {el.classList.remove('hidden')});
  } else {
    funProjects.forEach((el) => {el.classList.add('hidden')});
  }
}

const projectsRadioEl = document.querySelector(".projects-radio");
projectsRadioEl.querySelectorAll("input").forEach((el) => {
  el.addEventListener("change", () => {toggleProjectsVisibility(el.value)});
  if (el.checked)
    toggleProjectsVisibility(el.value);
});

// pgp scroller
function pgpScroller() {
  const pgpKey = `mDMEYxPOTBYJKwYBBAHaRw8BAQdAm84G4TmHcETBbtekUNxIAA92l4w7S+gegY8X
K0UGfJK0IkNhc3NpZHkgRGlhbW9uZCA8Y2RpYW1vbmRAY211LmVkdT6IlgQTFgoA
PhYhBAzwWx0vulXX8nguXb3K5WG4HrpABQJjE85MAhsBBQkJZgGABQsJCAcDBRUK
CQgLBRYCAwEAAh4BAheAAAoJEL3K5WG4HrpAb1gBALVmuepfS/qXCu6ve5x3gHo4
uklKgRI55LtXkaxm66GlAQCMcZ7Td/WTKOSmu/X8kFWRwlahust0CZKL+Ozh/j56
DrgzBGMT1owWCSsGAQQB2kcPAQEHQJu/y9jDINQk9I0bc9lehwTP9viUBqz4jolZ
B8y3X4PWiPUEGBYKACYWIQQM8FsdL7pV1/J4Ll29yuVhuB66QAUCYxPWjAIbAgUJ
CWYBgACBCRC9yuVhuB66QHYgBBkWCgAdFiEEiAjfeG119cHMmAXeRxHt+OTwPwsF
AmMT1owACgkQRxHt+OTwPwt4MwEAn9OWW6eJHmGJrNd+YrSDUzq7XK2SqNSYN1ji
H+E84UYBAMFmfTY/9FpqQozOujV3/jQKgOScZWNssx6SVVuUyWMP++YA/RJPvSQ6
N/5W5UaZ2Tkzt72pnpZczE+EjxgwjkjMvv1OAP4+nu0tvoPxAQ1/M8SkTCOUdlsV
CPX+87hvtMLxy1LiDLkCDQRjE9arARAAyuu7hxc1wPWujeSc/8KP60sYDWbDK7vb
bFUXJWmLZGbI4HunWI1vraBM0QpQuajqTrher8iqVMZNnhkU0fGvdWAkg5szEF2X
1Hw5fgk03Rilbo25VvVRRyhqYywyHXZY0hy8oie8DUELPv14CO5UiZy0+atxA4Oj
ECY/3yWFmCK3RkW/kRt3qRm84JD9liwL/P+jZLUua6Vw2p6D4YMG4I1JIdXqoX27
SaPpRn1RqrfK9dVu6RpBeuDuMlOzjzqdFeFPqxAiXq4EhEpzbGEjWj04z053DtCN
FNuiuaM1YcPVna03fgTiVUBfl4S589Uw2SdlBwNld3IM8/hpuei6DVzIMkfwiUow
rgtLOpzm7/Q2RHE1e7Uh204rZ+2f/imVYSqo2uEl+wXejLxRTTH/YVIdKEu+XLz6
bL9+dVPJMG5VS7LS+J6Cnm7355k6qFBrf9JVFj4TfkxP+tLAB6I17Cer7EgGYU1T
K9g6YdT2OgX91HWgbLelBPTaJzZbeAm3CTL0JXX5tqPrL9zoJ33GyKo2SNPpunfw
eSG7yjNNVd9tNBAze1SKAC6/lo5VPR3e52eZvMm+cpUt71K8c/Hc40SnQK8rQfbB
phvvBGB633jKqka60T2CPGw0yDIWwHiqFd8tokAhxzKEKH00d7y7ogZMWCP462vD
XxgYrjhc940AEQEAAYh+BBgWCgAmFiEEDPBbHS+6VdfyeC5dvcrlYbgeukAFAmMT
1qsCGwwFCQlmAYAACgkQvcrlYbgeukDw1QEA0XiLOD8jThr94XiWIIXLevBKTmNi
JZ+KNGbluCFtVQABAJEjQUOl4rRfVt0+GbWYLkCwSazwEFzPqyroM5RRsssGuDME
YxPW4xYJKwYBBAHaRw8BAQdAkTRWpq3+S8zPALlYQ09qZpqiToqMOTimt+fmqJdl
YRyIfgQYFgoAJhYhBAzwWx0vulXX8nguXb3K5WG4HrpABQJjE9bjAhsgBQkJZgGA
AAoJEL3K5WG4HrpAGfkA/1YAIc9aRjs6OVXsTd7PaPYEcDEvCPZ48E/PNX5a+4pj
AQCdFvDXKB8lXcMsuUJFcXGgJIw0GrhI44VcxRiDxUyNBA==
=MsDJ`
  const pgpScrollEl = document.querySelector('.pgp-scroll');
  const pgpScrollText = pgpScrollEl.querySelector('.pgp-scroll span');
  //console.log(pgpScrollEl);
  //pgpScrollEl.style.textOverflow = 'clip';
  pgpScrollText.innerText = pgpKey.replaceAll('\n', '');

  function doScroll(i) {
    setTimeout(() => {doScroll(i+1)}, 1500);
    var w = pgpScrollEl.getBoundingClientRect().width;
    pgpScrollText.style.marginLeft = `calc(-${i} * ${w}px)`;

    var wText = pgpScrollText.getBoundingClientRect().width;
    if (i > Math.floor(wText / w)) {
      i = 0
    }
  }
  doScroll(0);
}
const pgpScrollEl = document.querySelector('.pgp-scroll');
pgpScroller();
