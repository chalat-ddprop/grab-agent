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
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify(params)
    })
  }

  createEnquiry(clientId, userProfile, conditions) {
    return this.post(`${this.url}/api/create-enquiry`, {
      clientId,
      userProfile,
      conditions,
    })
  }

  getEnquiry(clientId, enquiryKey) {
    return this.post(`${this.url}/api/get-enquiry`, {
      clientId,
      key: enquiryKey,
    })
  }

  cancelEnquiry(clientId, enquiryKey) {
    return this.post(`${this.url}/api/cancel-enquiry`, {
      clientId,
      key: enquiryKey,
    })
  }

  acceptAgent(clientId, enquiryKey, agentId) {
    return this.post(`${this.url}/api/consumer-accept`, {
      clientId,
      key: enquiryKey,
      agentId: agentId,
    })
  }

  denyAgent(clientId, enquiryKey, agentId) {
    return this.post(`${this.url}/api/consumer-deny`, {
      clientId,
      key: enquiryKey,
      agentId: agentId,
    })
  }
}

export default EnquiryService
