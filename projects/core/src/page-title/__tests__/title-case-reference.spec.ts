import { TitleCaseReference } from '../title-case-reference';

describe('TitleCaseReference', () => {
  const names = [
    { firstName: 'George', lastName: 'Washington' },
    { firstName: 'Harold', lastName: 'Winston' }
  ];

  it('should read as the lead name and the case reference', () => {
    expect(new TitleCaseReference({ names, caseReference: 'TVL12345678' }).toString()).toBe(
      'Washington G – TVL12345678'
    );
  });

  it('should leave out the case reference when there is none', () => {
    expect(new TitleCaseReference({ names }).toString()).toBe('Washington G');
    expect(new TitleCaseReference({ names, caseReference: null }).toString()).toBe('Washington G');
    expect(new TitleCaseReference({ names, caseReference: '  ' }).toString()).toBe('Washington G');
  });

  it('should leave out the name when there is none', () => {
    expect(new TitleCaseReference({ caseReference: 'TVL12345678' }).toString()).toBe('TVL12345678');
    expect(new TitleCaseReference({ names: null, caseReference: 'TVL12345678' }).toString()).toBe(
      'TVL12345678'
    );
    expect(new TitleCaseReference({ names: [], caseReference: 'TVL12345678' }).toString()).toBe(
      'TVL12345678'
    );
  });

  it('should be empty when it has nothing to show', () => {
    expect(new TitleCaseReference().toString()).toBe('');
  });

  it('should use an organisation name as it is', () => {
    expect(
      new TitleCaseReference({
        names: [{ firstName: 'Acme Ltd', lastName: '' }],
        caseReference: 'TVL12345678'
      }).toString()
    ).toBe('Acme Ltd – TVL12345678');
  });
});
