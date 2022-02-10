import axios, { AxiosRequestHeaders } from 'axios';
import { BASE_URL } from 'config';
import { HttpError } from 'errors/base';

class HttpRequest {
  async sendGet(url: string, token?: string) {
    try {
      const response = await axios.get(`${BASE_URL}${url}`, {
        headers: this.getHeader(token),
      });

      return response.data;
    } catch (error: any) {
      console.log(error);
      return new HttpError(error.response);
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
    } catch (error: any) {
      console.log('----call error', error);
      return new HttpError(error.response);
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
    } catch (error: any) {
      console.log(error);
      return new HttpError(error.response);
    }
  }

  async sendDelete(url: string, token?: string) {
    try {
      const response = await axios.delete(`${BASE_URL}${url}`, {
        headers: this.getHeader(token),
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      return new HttpError(error.response);
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
      return new HttpError(error.response);
    }
  }
}

export const httpRequest = new HttpRequest();
