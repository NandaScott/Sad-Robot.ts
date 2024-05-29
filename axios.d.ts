import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import ScryfallCardModel from './src/handlers/ScryfallCard/ScryfallCardModel';

export interface CustomResponseData {
  scryfall: ScryfallCardModel;
  responseTime: number;
}

export interface CustomScryfallConfig extends AxiosRequestConfig<T> {
  ctx?: {
    author: string;
    sentAt: number;
    content: string;
    callingFunction: string;
  };
}

declare module 'axios' {
  interface AxiosInstance {
    get<T = CustomResponseData>(
      url: string,
      config?: CustomScryfallConfig<T>
    ): Promise<AxiosResponse<T, T>>;
  }
}
