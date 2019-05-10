function MenuData(menudata) {
  const headerData = menudata;

  function flattenArray(arr) {
    return [].concat(...arr);
  }

  function hasNoTitle({ title }) {
    return title === 'no_title';
  }

  const getMenuTitle = (data, locale) => {
    return data.value[0][`title_${locale}`];
  };

  const getTitleAndSlug = locale => (value) => {
    if (!value.target.slug) {
      const resultingObj = {
        title: value[`title_${locale}`],
      };

      if (value.target.url) {
        resultingObj.url = value.target.url;
      } else {
        resultingObj.slug = `/${value.target.type}`;
      }

      return resultingObj;
    }
    return {
      title: value[`title_${locale}`],
      slug: `/${value.target.slug}`
    };
  };

  const getSubMenu = (data, locale) => {
    if (!data) return [];
    const subMenuArray = data.value;

    const subMenu = [];

    const hasSubMenus = !!subMenuArray.find(item => item.level === 'sub-sub-menu');

    if (!hasSubMenus || subMenuArray[0].level !== 'sub-menu') {
      subMenu.push({
        items: []
      });
    }

    subMenuArray.forEach((item) => {
      if (item.level === 'sub-menu' && hasSubMenus) {
        subMenu.push({
          ...item,
          items: []
        });
      } else {
        subMenu[subMenu.length - 1].items.push(item);
      }
    });

    let result = subMenu
      .map((item) => {
        const items = item.items.map(getTitleAndSlug(locale));

        return {
          title: item[`title_${locale}`] ? item[`title_${locale}`] : 'no_title',
          items
        };
      });

    if (result.some(hasNoTitle)) {
      const items = result.map((item) => {
        return item.items;
      });

      const flattened = flattenArray(items);

      result = [{
        title: 'no_title',
        items: flattened
      }];
    }

    return result;
  };

  const getMenuHighlights = (item, locale) => {
    if (!item || item.sliceType !== 'menu-highlight') return [];

    const highlights = item.value;

    const result = highlights.map((highlight) => {
      return {
        title: highlight[`title_${locale}`],
        thumbnail: highlight.thumbnail,
        url: highlight.target.url || ''
      };
    });
    return result;
  };
  const getMenuMyAxa = (item, locale) => {
    if (!item || item.sliceType !== 'menu-myaxa') return [];

    const myaxa = item.value;

    const result = myaxa.map((ob) => {
      return {
        title_service: ob[`title_service_${locale}`],
        title_smartapp:ob[`title_smartapp_${locale}`],
        description_service:ob[`description_service_${locale}`],
        description_smartapp:ob[`description_smartapp_${locale}`],
        description_text_service:ob[`description_text_service_${locale}`],
        description_text_smartapp:ob[`description_text_smartapp_${locale}`],
        button_login:ob[`button_login_${locale}`],
        button_login_link:ob.button_login_link.url,
        button_register:ob[`button_register_${locale}`],
        button_register_link: ob.button_register_link.url,
        button_download:ob[`button_download_${locale}`],
        button_download_link_ios:ob.button_download_link_ios.url,
        button_download_link_android:ob.button_download_link_android.url,
        button_learnmore:ob[`button_learnmore_${locale}`],
        button_learnmore_link:ob.button_learnmore_link.url
      };
    });
    return result;
  };
  const getHeader = (data, locale) => {
    const menusConcatenated = [];

    data._menu.forEach((item) => { // eslint-disable-line no-underscore-dangle
      if (item.sliceType === 'menu') {
        menusConcatenated.push({
          menu: item
        });
      } else if (item.sliceType === 'submenu') {
        menusConcatenated[menusConcatenated.length - 1].submenu = item;
      } else if (item.sliceType === 'menu-highlight') {
        menusConcatenated[menusConcatenated.length - 1].highlight = item;
      } else if(item.sliceType === 'menu-myaxa'){
        menusConcatenated[menusConcatenated.length - 1].myaxa = item;
      }
    });

    const menus = menusConcatenated
      .map((menu) => {
        return {
          title: getMenuTitle(menu.menu, locale),
          items: getSubMenu(menu.submenu, locale),
          highlights: getMenuHighlights(menu.highlight, locale),
          myaxa:getMenuMyAxa(menu.myaxa,locale)
        };
      });

    return { menus };
  };

  return {
    en: getHeader(headerData, 'en'),
    zh: getHeader(headerData, 'zh')
  };
}

export default MenuData;
