import React from 'react';
import { render } from '@testing-library/react';

import getDiscordOAuthConfig from '@/utils/discord';
import Index from '../pages';

describe('pages > index', () => {
  it('should render feature menu', () => {
    const { baseElement } = render(
      <Index discordOAuthConfig={getDiscordOAuthConfig()} />
    );
    expect(baseElement).toBeTruthy();
  });
});
