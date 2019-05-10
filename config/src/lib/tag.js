/*global tc_events_3, tc_vars*/
export function tagVirtualPage(options) {
  if (typeof tc_vars === 'undefined') {
    return;
  }

  const opts = Object.assign(
    tc_vars,
    {
      page_name: window.location.href,
      language: 'en'
    },
    options
  );
  return sendTag('virtualpage', opts);
}

export function tagClick(options) {
  return sendTag('click', options);
}

export function tagClickPH(options) {
  return sendTag('interaction', options);
}

function sendTag(name, options) {
  if (!options || typeof tc_events_3 === 'undefined') {
    return false;
  }

  try {
    const tagOptions = Object.assign({}, options);
    tc_events_3(this, name, tagOptions);
  } catch (e) {
    return false;
  }

  return true;
}
