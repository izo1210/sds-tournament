import { DisplayNameProvider } from './display-name-provider';

describe('DisplayNameProvider', () => {
  it('should create an instance', () => {
    expect(new DisplayNameProvider(true, [])).toBeTruthy();
  });
});
