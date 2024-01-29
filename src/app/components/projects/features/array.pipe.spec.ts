import { ArrayPipe } from './array.pipe';

describe('ArrayPipe', () => {
  let pipe: ArrayPipe;

  beforeEach(() => pipe = new ArrayPipe());

  it('should return array of numbers from 0 to n', () => {
    expect(pipe.transform(5)).toEqual([0,1,2,3,4]);
  });
});
