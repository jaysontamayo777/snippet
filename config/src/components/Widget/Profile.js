import profileValidator from '../../lib/validators/profileValidator';
import _ from 'lodash';

export default class Profile {
  constructor(profile = {}) {
    this.travelType = profile.travelType;
    this.startDate = profile.startDate;
    this.endDate = profile.endDate;
    this.channel = profile.channel || 'Direct';
    this.numberOfAdults = !isNaN(profile.numberOfAdults) ? +profile.numberOfAdults : 0;
    this.numberOfChildren = !isNaN(profile.numberOfChildren) ? +profile.numberOfChildren : 0;
    this.currency = profile.currency;
    this.discount = profile.discount;
    this.origin = profile.origin;
    this.destinations = profile.destinations;
    this.coverage = profile.coverage;
    this.region = profile.region;
    this.promoCode = profile.promoCode;
  }

  isValid() {
    const errors = profileValidator(this);
    this.errors = _.cloneDeep(errors);
    return Object.keys(errors).length === 0;
  }
}
