import { AxiosInstance } from 'axios';
import { CustomResponseData } from '../../axios';
import { ScryfallReturn } from './ScryfallService';
import ScryfallCardModel from '../types/ScryfallCardModel/ScryfallCardModel';
import ScryfallResponseError from '../types/ScryfallResponseError/ScryfallResponseError';

export default abstract class AbstractHTTPService {
  abstract axios: AxiosInstance;

  // TODO: This should be strongly typed
  static async allSettled(cards: Promise<ScryfallReturn>[]): Promise<{
    successful: (CustomResponseData<ScryfallCardModel> | undefined)[];
    failed: (CustomResponseData<ScryfallResponseError> | undefined)[];
  }> {
    throw new Error('allSettled: Method not implemented! Use derived class');
  }
}
