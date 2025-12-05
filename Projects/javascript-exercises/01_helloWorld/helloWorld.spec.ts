import {describe, expect, test} from '@jest/globals';
import helloWorld from './helloWorld';

describe('Hello World', () => {
  test('says "Hello, World!"', () => {
    expect(helloWorld()).toEqual('Hello, World!');
  });
});
