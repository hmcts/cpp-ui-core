import { getOperationalUnitOptions, isMagistratesCourt } from '../operationalUnit';

describe('getOperationalUnitOptions', () => {
  it('should generate unique sorted operational unit options', () => {
    const input = [
      { oucodeL2Code: 'C', oucodeL2Name: 'South' },
      { oucodeL2Code: 'B', oucodeL2Name: 'North' },
      { oucodeL2Code: 'C', oucodeL2Name: 'South' } // duplicate
    ] as any;

    const result = getOperationalUnitOptions(input);
    expect(result).toEqual([
      { value: 'B', label: 'North' },
      { value: 'C', label: 'South' }
    ]);
  });
});

describe('isMagistratesCourt', () => {
  it('should return true if oucodeL1Code is B', () => {
    expect(isMagistratesCourt({ oucodeL1Code: 'B' } as any)).toBe(true);
  });

  it('should return false if oucodeL1Code is not B', () => {
    expect(isMagistratesCourt({ oucodeL1Code: 'X' } as any)).toBe(false);
  });
});
