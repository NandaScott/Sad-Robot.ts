import { AxiosRequestConfig, AxiosResponse } from 'axios';
import ScryfallCardModel from './src/handlers/ScryfallCard/ScryfallCardModel';

export interface CustomResponseData {
  scryfall: ScryfallCardModel;
  responseTime: number;
}

declare module 'axios' {
  interface AxiosInstance {
    get<T = CustomResponseData>(
      url: string,
      config?: AxiosRequestConfig<T>
    ): Promise<AxiosResponse<T, CustomResponseData>>;
  }
}
