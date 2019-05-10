export function scrollToTop() {
  try {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  } catch (e) {
    document
      .getElementsByTagName('body')[0]
      .scrollIntoView({ behavior: 'smooth' });
  }
}

export function scrollToId(id = '', additionalTop = 20) {
  const element = document.getElementById(id);

  if (element) {
    try {
      window.scroll({
        top:
          window.pageYOffset +
          element.getBoundingClientRect().y -
          additionalTop,
        left: 0,
        behavior: 'smooth'
      });
    } catch (e) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

export function scrollIntoView(element) {
  document.getElementById(element).scrollIntoView({ behavior: 'smooth' });
}
