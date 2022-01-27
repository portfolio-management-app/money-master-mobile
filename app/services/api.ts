import { storage } from './storage';
import axios, { AxiosRequestHeaders } from 'axios';
import { BASE_URL, TOKEN_KEY } from 'config';

class HttpRequest {
  token: string = '';

  constructor() {
    const init = async () => {
      await this.getBearToken();
    };
    init();
  }

  private async getBearToken() {
    try {
      const res = await storage.load({ key: TOKEN_KEY });
      this.token = `Bearer ${res}`;
    } catch (error: any) {
      console.log(error);
    }
  }

  async sendGet(url: string, token?: string) {
    try {
      const response = await axios.get(`${BASE_URL}${url}`, {
        headers: this.getHeader(token),
      });

      return response.data;
    } catch (error) {
      return null;
    }
  }

  async sendPost(url: string, body: any, token?: string) {
    try {
      const response = await axios.post(
        `${BASE_URL}${url}`,
        JSON.stringify(body),
        {
          headers: this.getHeader(token),
        }
      );
      return response.data;
    } catch (error) {
      return null;
    }
  }

  async sendPut(url: string, body: never, token?: string) {
    try {
      const response = await axios.put(
        `${BASE_URL}${url}`,
        JSON.stringify(body),
        {
          headers: this.getHeader(token),
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async sendDelete(url: string, token?: string) {
    try {
      const response = await axios.delete(`${BASE_URL}${url}`, {
        headers: this.getHeader(token),
      });

      return response.data;
    } catch (error) {
      return null;
    }
  }

  getHeader(token?: string) {
    const headers: AxiosRequestHeaders = token
      ? {
          Authorization: token,
          'Content-Type': 'application/json',
        }
      : {
          'Content-Type': 'application/json',
        };
    return headers;
  }

  async sendFile(
    url: string,
    method: 'POST' | 'PUT',
    formData: any,
    token?: string
  ) {
    try {
      const response = await axios({
        url: `${BASE_URL}${url}`,
        method: method,
        data: formData,
        headers: token ? { Authorization: token } : {},
      });

      return response.data;
    } catch (error: any) {
      console.log(error);
      return null;
    }
  }
}

export const httpRequest = new HttpRequest();
