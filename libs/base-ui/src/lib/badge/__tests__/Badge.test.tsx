import { render } from '@testing-library/react';
import { Badge } from '../Badge';

describe('Badge', () => {
  it('should render successfully', () => {
    const { baseElement, getByText } = render(
      <Badge badgeContent={99}>This is the badge</Badge>
    );

    expect(baseElement).toBeTruthy();
    expect(getByText('This is the badge')).toBeTruthy();
    expect(getByText('99')).toBeTruthy();
  });
});
