import * as utils from './util';
import { expect } from 'chai';
import validator from 'validator';

describe('Format Currency Function', () => {
  it('should return correct currency', () => {
    const currency = utils.formatCurrency('PHP', 20);
    expect(currency).to.equal('PHP 20.00');
  });

  it('should round down currency', () => {
    const currency = utils.formatCurrency('PHP', 21.123);
    expect(currency).to.equal('PHP 21.12');
  });

  it('should round up currency', () => {
    const currency = utils.formatCurrency('PHP', 21.456);
    expect(currency).to.equal('PHP 21.46');
  });
});

describe('Encode function', () => {
  it('should encode string', () => {
    const encode = utils.encode('test');

    expect(validator.isBase64(encode)).to.be.true;
  });

  it('should return empty string', () => {
    const encode = utils.encode();
    expect(encode).to.equal('');
  });

  it('should return empty string when encoding object', () => {
    const encode = utils.encode({ test: 'test' });
    expect(encode).to.equal('');
  });
});

describe('Decode function', () => {
  it('should decode string', () => {
    const decode = utils.decode('dGVzdA==');

    expect(decode).to.equal('test');
  });

  it('should return empty string', () => {
    const decode = utils.decode();
    expect(decode).to.equal('');
  });

  it('should return empty string when decoding object', () => {
    const decode = utils.decode({ test: 'test' });
    expect(decode).to.equal('');
  });
});

describe('Parse JSON function', () => {
  it('should parse if string is in JSON format', () => {
    const json = utils.parseJson(
      '{"menu":{"header":"SVG Viewer","items":[{"id":"Open"},{"id":"OpenNew","label":"Open New"},null,{"id":"ZoomIn","label":"Zoom In"},{"id":"ZoomOut","label":"Zoom Out"},{"id":"OriginalView","label":"Original View"},null,{"id":"Quality"},{"id":"Pause"},{"id":"Mute"},null,{"id":"Find","label":"Find..."},{"id":"FindAgain","label":"Find Again"},{"id":"Copy"},{"id":"CopyAgain","label":"Copy Again"},{"id":"CopySVG","label":"Copy SVG"},{"id":"ViewSVG","label":"View SVG"},{"id":"ViewSource","label":"View Source"},{"id":"SaveAs","label":"Save As"},null,{"id":"Help"},{"id":"About","label":"About Adobe CVG Viewer..."}]}}'
    );

    expect(typeof json).to.equal('object');
  });

  it('should not parse if string is in incorrect JSON format', () => {
    const json = utils.parseJson(
      'enNew","label":"Open New"},null,{"id":"ZoomIn","label":"Zoom In"},{"id":"ZoomOut","label":"Zoom Out"},{"id":"OriginalView","label":"Original View"},null,{"id":"Quality"},{"id":"Pause"},{"id":"Mute"},null,{"id":"Find","label":"Find..."},{"id":"FindAgain","label":"Find Again"},{"id":"Copy"},{"id":"CopyAgain","label":"Copy Again"},{"id":"CopySVG","label":"Copy SVG"},{"id":"ViewSVG","label":"View SVG"},{"id":"ViewSource","label":"View Source"},{"id":"SaveAs","label":"Save As"},null,{"id":"Help"},{"id":"About","label":"About Adobe CVG Viewer..."}]}}'
    );

    expect(json).to.be.undefined;
  });
});

describe('getAge()', () => {
  it('should return correct age', () => {
    const age = utils.getAge('31/03/2000', '01/04/2017', 'DD/MM/YYYY');
    expect(age).to.equal(17);
  });

  it('should return correct age case 2', () => {
    const age = utils.getAge('02/04/2000', '01/04/2017', 'DD/MM/YYYY');
    expect(age).to.equal(16);
  });

  it('should return correct age case 3', () => {
    const age = utils.getAge('09/07/2000', '10/07/2018', 'DD/MM/YYYY');
    expect(age).to.equal(18);
  });

  it('should return correct age case 4', () => {
    const age = utils.getAge('10/07/2000', '10/07/2018', 'DD/MM/YYYY');
    expect(age).to.equal(18);
  });

  it('should return correct age case 5', () => {
    const age = utils.getAge('11/07/2000', '10/07/2018', 'DD/MM/YYYY');
    expect(age).to.equal(17);
  });

  it('should return 0 - without supplying dob and format', () => {
    const age = utils.getAge();
    expect(age).to.equal(0);
  });

  it('should return 0 - without supplying profile', () => {
    const age = utils.getAge(utils.getAge('09/30/2000', 'DD/MM/YYYY'));
    expect(age).to.equal(0);
  });

  it('should return 0 - incorrect date format', () => {
    const age = utils.getAge('09/30/2000', 'DD/MM/YYYY');
    expect(age).to.equal(0);
  });
});

describe('getArrayFromNumber()', () => {
  it('should return array start from 1 with skip', () => {
    const arr = utils.getArrayFromNumber(5, true);
    expect(arr[0]).to.deep.equal({
      label: 1,
      value: 1
    });
    expect(arr.length).to.equal(5);
  });

  it('should return array start from 0 without skip', () => {
    const arr = utils.getArrayFromNumber(5);
    expect(arr[0]).to.deep.equal({
      label: 0,
      value: 0
    });
    expect(arr.length).to.equal(6);
  });
});

describe('getPathname()', () => {
  it('should return /', () => {
    const pathname = utils.getPathname({
      pathname: '/'
    });
    expect(pathname).to.equal('/');
  });

  it('should return path name with one /', () => {
    const pathname = utils.getPathname({
      pathname: '/path-name'
    });
    expect(pathname).to.equal('/path-name');
  });

  it('should return path name with multiple /', () => {
    const pathname = utils.getPathname({
      pathname: '/path-name/level-1/level-2'
    });
    expect(pathname).to.equal('/path-name/level-1/level-2');
  });

  it('should return not-found', () => {
    const pathname = utils.getPathname();
    expect(pathname).to.equal('/not-found');
  });
});
