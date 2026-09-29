import {
  getOperationalUnitOptions,
  isMagistratesCourt,
  isCrownCourt,
  operationalUnitAllCourtsPlaceholder
} from '../operationalUnit';

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

describe('isCrownCourt', () => {
  it('should return true if oucodeL1Code is C', () => {
    expect(isCrownCourt({ oucodeL1Code: 'C' } as any)).toBe(true);
  });

  it('should return false if oucodeL1Code is not C', () => {
    expect(isCrownCourt({ oucodeL1Code: 'B' } as any)).toBe(false);
  });
});

describe('operationalUnitAllCourtsPlaceholder', () => {
  it('should set L1 and L2 for magistrates', () => {
    expect(operationalUnitAllCourtsPlaceholder('B', '1')).toMatchObject({
      oucodeL1Code: 'B',
      oucodeL2Code: '1',
      oucodeL3Name: 'All courts'
    });
  });

  it('should set L1 for crown', () => {
    expect(operationalUnitAllCourtsPlaceholder('C')).toMatchObject({
      oucodeL1Code: 'C',
      oucodeL3Code: 'All courts'
    });
  });
});
