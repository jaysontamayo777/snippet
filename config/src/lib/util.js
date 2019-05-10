import _ from 'lodash';
import moment from 'moment';
import { I18n } from 'react-redux-i18n';
import { Base64 } from 'js-base64';
import currencyFormatter from 'currency-formatter';
import smoothScroll from 'smoothscroll';
import rules from '../constants/rules';

export function getArrayFromNumber(num, skip) {
  const arr = [];

  let i = 0;
  let max = num;

  if (skip) {
    i++;
  }

  for (; i <= max; i++) {
    arr.push({
      value: i,
      label: i
    });
  }

  return arr;
}

export function getArrayFromNumberWithLabel(arrayOfNumber, label) {
  const arr = [];
  arrayOfNumber.map(number => {
    if (label.includes(I18n.t('quote-details.child'))) {
      if (number.value > 1) {
        arr.push({
          value: `${number.value} ${I18n.t('quote-details.children')}`,
          label: `${number.value} ${I18n.t('quote-details.children')}`
        });
      } else {
        arr.push({
          value: `${number.value} ${I18n.t('quote-details.child')}`,
          label: `${number.value} ${I18n.t('quote-details.child')}`
        });
      }
    } else {
      if (number.value > 1) {
        arr.push({
          value: `${number.value} ${I18n.t('quote-details.adults')}`,
          label: `${number.value} ${I18n.t('quote-details.adults')}`
        });
      } else {
        arr.push({
          value: `${number.value} ${I18n.t('quote-details.adult')}`,
          label: `${number.value} ${I18n.t('quote-details.adult')}`
        });
      }
    }
  });
  return arr;
}

export function formatCurrency(currency, value) {
  if (currency === 'IDR') {
    return currencyFormatter.format(value, {
      symbol: currency,
      decimal: '.',
      thousand: ',',
      precision: 0,
      format: '%s %v'
    });
  }

  return currencyFormatter.format(value, {
    symbol: currency,
    decimal: '.',
    thousand: ',',
    precision: 2,
    format: '%s %v'
  });
}

export function encode(value) {
  if (_.isString(value)) {
    return Base64.encode(value);
  }

  return '';
}

export function decode(encodedValue = '') {
  try {
    const decodedObject = Base64.decode(encodedValue);
    const toObject = JSON.parse(decodedObject);
    if (_.isString(encodedValue) && _.isObject(toObject)) {
      return decodedObject;
    }
  } catch (err) {
    return '';
  }
}

export function parseJson(jsonString) {
  let obj;

  try {
    obj = JSON.parse(jsonString);
  } catch (e) {
    /* */
  }

  return obj;
}

export function getAge(birthdate, referenceDate, format, countBy = 'years') {
  if (birthdate && referenceDate && format) {
    const _startDate = moment(referenceDate, format);
    const _birthDate = moment(birthdate, format);
    const _age = _startDate.diff(_birthDate, countBy);

    return isNaN(_age) ? 0 : _age;
  }

  return 0;
}

/**
 * Compares the Month and Day of 'birthdate' if it's equal to
 * 'dateReference' object.
 *
 * @param {string} birthdate
 * String that can be parsed to a moment date object
 *
 * @param {string} dateReference
 * String that can be parsed to a moment date object
 *
 */
export function isTodayYourBirthday(birthdate, dateReference = new Date()) {
  const _dateReference = moment(dateReference, rules.DATE_FORMAT);
  const _birthDate = moment(birthdate, rules.DATE_FORMAT);
  _birthDate.year(_dateReference.year());
  return (
    birthdate &&
    _birthDate.format(rules.DATE_FORMAT) ===
      _dateReference.format(rules.DATE_FORMAT)
  );
}

export function getDaysDifference(startDate) {
  if (startDate) {
    const _currentDate = moment(new Date(), rules.DATE_FORMAT);
    const _startDate = moment(startDate, rules.DATE_FORMAT);
    const _numOfDays = _startDate.diff(_currentDate, 'days');
    return isNaN(_numOfDays) ? 0 : _numOfDays;
  }

  return 0;
}

export function scrollToId(id) {
  const element = document.getElementById(id);

  if (element) {
    smoothScroll(element);
  }
}

export function getPathname(payload) {
  if (payload && _.isString(payload.pathname)) {
    return payload.pathname
      .replace(/^\/[a-z]{2}\//, '/:locale/')
      .replace(/\/$/g, '')
      .replace(
        /\/payment-confirmation\/[a-z]*/g,
        '/payment-confirmation/:status'
      );
  }

  return '/not-found';
}

export function saveToStorage(name, obj) {
  if (window && window.sessionStorage) {
    window.sessionStorage.setItem(name, JSON.stringify(obj));
  }
}

export function getFromStorage(name) {
  try {
    return JSON.parse(window.sessionStorage.getItem(name));
  } catch (e) {
    return {};
  }
}

export function decodePaymentPayload(payload) {
  let decodedPayload = {};
  if (_.isString(payload) && payload.length > 0) {
    const part = Base64.decode(payload).split('>>>>');

    if (part.length === 5) {
      decodedPayload = {
        paymentCode: part[0],
        paymentChannel: part[1],
        convertedCurrency: part[2],
        amount: part[3],
        policyNumber: part[4]
      };
    }
  }

  return decodedPayload;
}
