import { api as config } from '../constants/api';
import 'whatwg-fetch';

class EnquiryService {
  constructor() {
    this.url = `${config.scheme}://${config.host}:${config.port}`;
  }

  post(url, params) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
  }

  createEnquiry(userProfile, conditions) {
    return this.post(`${this.url}/api/create-enquiry`, {
      userProfile,
      conditions,
    })
  }
}

export default EnquiryService
