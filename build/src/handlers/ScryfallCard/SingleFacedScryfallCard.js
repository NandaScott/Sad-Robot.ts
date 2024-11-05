import ImageUriError from "../../errors/ImageUriError.js";
import OracleNotFound from "../../errors/OracleNotFound.js";
export default class SingleFacedScryfallCard {
  constructor(data, ctx) {
    this.data = data;
    this.ctx = ctx;
  }
  get frontFace() {
    if (!this.data.image_uris) {
      throw new ImageUriError(`No images available for ${this.data.name}`, this.ctx);
    }
    if (!this.data.image_uris.normal) {
      throw new ImageUriError(`No normal images available for ${this.data.name}`, this.ctx);
    }
    return this.data.image_uris.normal;
  }
  get backFace() {
    if (!this.data.image_uris) {
      throw new ImageUriError(`No images available for ${this.data.name}`, this.ctx);
    }
    if (!this.data.image_uris.normal) {
      throw new ImageUriError(`No normal images available for ${this.data.name}`, this.ctx);
    }
    return this.data.image_uris.normal;
  }
  get name() {
    return this.data.name;
  }
  get oracle() {
    if (!this.data.oracle_text) {
      throw new OracleNotFound(`No oracle_text available for ${this.data.name}`, this.ctx);
    }
    return this.data.oracle_text;
  }
  get uri() {
    return this.data.scryfall_uri;
  }
}