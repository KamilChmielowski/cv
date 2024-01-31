import { ValidatorUtil } from './validator.util';

describe('ValidatorUtil', () => {
  it('should handle URL exceptions', () => {
    const invalidData: any = false;
    const validation = ValidatorUtil.isValidHttpUrl(invalidData);
    expect(validation).toBeFalse();
  });
});
