import getDiscordOAuthConfig from '@/utils/discord';
import { render } from '@testing-library/react';
import FeatureMenu from '../FeatureMenu';

describe('containers > FeatureMenu', () => {
  it('should render feature menu', () => {
    const { baseElement } = render(
      <FeatureMenu discordOAuthConfig={getDiscordOAuthConfig()} />
    );
    expect(baseElement).toBeTruthy();
  });
});
