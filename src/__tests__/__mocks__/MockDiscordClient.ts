import { Client, ClientEvents, ClientOptions, ClientUser } from 'discord.js';

export default class MockDiscordClient extends Client<true> {
  constructor(options: ClientOptions) {
    super(options);
    this.user = (<Partial<ClientUser>>{
      tag: this.constructor.name,
    }) as ClientUser;
  }

  public isReady(): this is Client<true> {
    return true;
  }

  on<Event extends keyof ClientEvents>(
    event: Event,
    listener: <E extends keyof ClientEvents>(...args: ClientEvents[E]) => void
  ): this {
    // console.log(
    //   `"${event}" registered with listener "${listener.name === '' ? 'anon' : listener.name}"`
    // );

    if (event === 'ready') {
      listener<'ready'>(this);
    }

    return this;
  }

  login(token?: string): Promise<string> {
    return new Promise((res) => res(`Token supplied ${token}`));
  }
}
