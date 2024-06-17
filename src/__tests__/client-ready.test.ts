import { describe, expect, it } from 'bun:test';
import ClientReady from '../event-listeners/discord/ClientReady';
import MockDiscordClient from './__mocks__/MockDiscordClient';
import intents from '../utils/intents';

const mockClient = new MockDiscordClient({ intents });

describe('client-ready-event', () => {
  it('Logs into discord', () => {
    const ready = new ClientReady();
    expect(() => ready.exec(mockClient)).not.toThrow('Failed to ready');
  });

  it('Throws an error', () => {
    const ready = new ClientReady();
    mockClient.isReady = () => false;
    expect(() => ready.exec(mockClient)).toThrow('Failed to ready');
  });
});
