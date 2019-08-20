import styled, { css } from '@datapunt/asc-core'
import { color } from '../../utils'
import { focusStyleText, svgFill } from '../../utils/themeUtils'
import Typography, { TypographyProps } from '../Typography'
import IconStyle from '../Icon/IconStyle'

export enum LinkVariants {
  inline,
  blank,
  withChevron = 'with-chevron',
}

export type Props = {
  variant?: keyof typeof LinkVariants
  /**
   * @deprecated
   */
  linkType?: keyof typeof LinkVariants
  color?: string
} & TypographyProps

export const BlankLinkStyleCSS = css`
  display: inline-block;
  text-decoration: none;
  color: inherit;
`
export const InlineLinkStyleCSS = css`
  display: inline-block;
  color: ${color('primary')};

  &:hover {
    color: ${color('secondary')};
  }
`
export const DefaultLinkStyleCSS = css<Props>`
  display: inline-flex;
  text-decoration: none;
  font-weight: 700;
  color: ${({ color: colorOverride, theme }) =>
    color('tint', 'level7', colorOverride)({ theme })};

  ${IconStyle} {
    margin: 3px;
    ${({ color: colorOverride, theme }) =>
      svgFill('tint', 'level7', colorOverride)({ theme })};
  }

  &:hover {
    color: ${({ color: colorOverride, theme }) =>
      color('secondary', 'main', colorOverride)({ theme })};
    text-decoration: underline;
    ${IconStyle} {
      ${({ color: colorOverride, theme }) =>
        svgFill('secondary', 'main', colorOverride)({ theme })};
    }
  }
`

export default styled(Typography)<Props>`
  ${focusStyleText()}
  ${({ variant }) => {
    switch (variant) {
      case 'blank':
        return BlankLinkStyleCSS
      case 'inline':
        return InlineLinkStyleCSS
      default:
        return DefaultLinkStyleCSS
    }
  }}
`
