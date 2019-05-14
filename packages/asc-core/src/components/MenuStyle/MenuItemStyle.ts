import styled from '../../styled-components'
import { MenuStyleProps } from './types'
import IconStyle from '../IconStyle'
import { svgFill, color, getTypographyFromTheme } from '../../utils'

export const MenuItemLabelStyle = styled.span<
  MenuStyleProps.MenuItemStyleProps
>`
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: ${({ focused }) =>
    focused ? color('secondary', 'main') : 'transparent'};
  line-height: 22px;
  font-family: 'AvenirNextLTW01-Medium';
  color: ${color('tint', 'level6')};
`

export const MenuItemStyle = styled.li<MenuStyleProps.MenuItemStyleProps>`
  padding: 10px 15px 10px 11px;
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: ${({ height }) => `${height}px`};
  cursor: pointer;
  box-sizing: border-box;
  font-size: ${({ theme }) => getTypographyFromTheme(theme, 'fontSize')};
  position: relative;

  ${({ borderBottom }) =>
    borderBottom &&
    `
    border-bottom-style: solid;
    border-bottom-width: 1px;
  `}};

  border-bottom-color: ${color('tint', 'level3')};

  ${IconStyle} {
    &:not(:last-child) {
      margin-right: 5px;
    }

    & svg {
      ${svgFill('tint', 'level7')};
    }
  }

  &:hover,
  &:focus {
    outline: none;

    ${MenuItemLabelStyle} {
      border-bottom-color: ${color('secondary', 'main')};
      color: ${color('secondary', 'main')};
    }

    &:hover > ${IconStyle}, &:focus > ${IconStyle} {
      & svg {
        ${svgFill('secondary')};
      }
    }
  }

  &:last-of-type {
    border-bottom-width: 0px;
  }
`

export default MenuItemStyle
