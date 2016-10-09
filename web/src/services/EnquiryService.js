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

  getEnquiry(enquiryKey) {
    return this.post(`${this.url}/api/get-enquiry`, {
      key: enquiryKey,
    })
  }

  cancelEnquiry(enquiryKey) {
    return this.post(`${this.url}/api/cancel-enquiry`, {
      key: enquiryKey,
    })
  }

  acceptAgent(enquiryKey, agentId) {
    return this.post(`${this.url}/api/consumer-accept`, {
      key: enquiryKey,
      agentId: agentId,
    })
  }

  denyAgent(enquiryKey, agentId) {
    return this.post(`${this.url}/api/consumer-deny`, {
      key: enquiryKey,
      agentId: agentId,
    })
  }
}

export default EnquiryService
