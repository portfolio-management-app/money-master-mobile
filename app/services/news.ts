import { HttpError } from 'errors/base';
import { httpRequest } from './http';

class NewsService {
  private url = 'https://newsapi.org/v2/everything';
  private query = 'finance';
  private pageSize = 20;
  private pageNumber = 0;
  private apiToken = '93d987577904497ea945f520e6e272f5';
  async getNews() {
    this.pageNumber++;
    const res = await httpRequest.sendGet(
      `${this.url}?q=${this.query}&apiKey=${this.apiToken}&pageSize=${this.pageSize}&page=${this.pageNumber}`
    );
    if (res instanceof HttpError) {
      return res;
    } else {
      return this.mapData(res.articles);
    }
  }
  mapData(res: any) {
    const result = [];
    for (const item of res) {
      if (item.urlToImage !== null)
        result.push({
          author: item.author,
          title: item.title,
          description: item.description,
          url: item.url,
          urlToImage: item.urlToImage,
          publishedAt: item.publishedAt,
          content: item.content,
        });
    }

    return result;
  }

  reset() {
    this.pageNumber = 0;
  }
}

export const newsService = new NewsService();
