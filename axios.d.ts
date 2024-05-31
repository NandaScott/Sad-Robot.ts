import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import ScryfallCardModel from './src/types/ScryfallCardModel/ScryfallCardModel';
import ScryfallResponseError from './src/types/ScryfallResponseError/ScryfallResponseError';

export interface CustomResponseData<T> {
  scryfall: T;
  responseTime: number;
}

export interface CustomScryfallConfig extends AxiosRequestConfig<T> {
  ctx?: {
    author: string;
    sentAt: number;
    callingFunction: string;
    message: {
      content: string;
      reply: (msg: string) => void;
    };
  };
}

export type AxiosScryfallSuccess = AxiosResponse<
  CustomResponseData<ScryfallCardModel>,
  CustomResponseData<ScryfallCardModel>
>;
export type AxiosScryfallError = AxiosError<
  CustomResponseData<ScryfallResponseError>,
  CustomResponseData<ScryfallResponseError>
>;

declare module 'axios' {
  interface AxiosInstance {
    get<T = CustomResponseData>(
      url: string,
      config?: CustomScryfallConfig<T>
    ): Promise<AxiosResponse<T, T>>;
  }
}
