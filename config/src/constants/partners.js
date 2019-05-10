/**
 * Contructs the style values based from a given partner.
 * This could returns default AXA style or a combination of both styles.
 *
 * @param {string} name
 * Partner name you want to load
 *
 * @param {string} code
 * Partner code, can be considered as key
 */
const getPartnerStyle = (name = '', code = '') => {
  const PARTNERS = {
    cebupacific: {
      color: '#5c5c5c',
      borderTop: '5px solid #FEE014',
      backgroundColor: 'white',
      margin: '15px',
      boxShadow: '0px 3px 5px 0px rgba(209,209,209,1)'
    },
    hsbc: {
      color: '#000000',
      margin: '15px',
      boxShadow: '0px 3px 5px 0px rgba(209,209,209,1)',
      backgroundColor: 'white'
    },
    mcc: {
      backgroundColor: '#2162a1',
      margin: '15px',
      boxShadow: '3px 3px 5px 0px rgba(92,92,92,1)',
      color: 'white',
      fontSize: '15px'
    },
    worldnomads: {
      margin: '15px',
      border: '1px solid #dbdbdb',
      boxShadow: '0px 3px 5px 0px rgba(209,209,209,1)',
      borderRadius: '5px',
      backgroundColor: '#000',
      color: '#ffffff'
    }
  };

  const DEFAULT_AXA = {
    color: '#333',
    borderColor: '#ccc',
    backgroundColor: '#FFFFFF'
  };

  return {
    name,
    code,
    styles: Object.assign({}, DEFAULT_AXA, PARTNERS[code])
  };
};

export default getPartnerStyle;
