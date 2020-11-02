import { Link } from '@reach/router';
import React, { FC } from 'react';
import styled from 'styled-components/macro';
import { fontSize } from '../theme';
import { Event } from '../util/gaTracking';

const Badge = styled(Link)`
  background-color: ${({ theme }) => theme.ui.siteTitle.badge.background || '#eee'};
  color: ${({ theme }) => theme.ui.siteTitle.badge.color || '#000'};
  font-size: ${fontSize[12]};
  font-weight: 600;
  line-height: ${fontSize[26]};
  vertical-align: top;
  padding: 1px 6px;
  border-radius: 8px;
  /* normally not a good practice, but this beta link is not meant to be prominent */
  &:focus {
    outline: none;
  }
  margin-left: 6px;
  position: relative;
  top: -3px;
  text-decoration: none;
`;

interface BetaBadgeProps {
  title?: string;
}

const BetaBadge: FC<BetaBadgeProps> = ({ title }: BetaBadgeProps) => (
  // eslint-disable-next-line new-cap
  <Badge to="beta" onClick={() => Event('beta', `${title} beta badge clicked`)}>
    Beta
  </Badge>
);

export { BetaBadge, BetaBadgeProps };
