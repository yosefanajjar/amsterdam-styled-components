import styled from '../../styled-components'
import { MenuItemProps } from './types'
import Icon from '../Icon'
import { getColor, getTypography } from '../../utils/themeUtils'

const MenuItem = styled.li.attrs<MenuItemProps>(({ role }) => ({
  role,
}))<MenuItemProps>`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 36px;
  width: 100%;
  cursor: pointer;
  font-size: ${({ theme }) => getTypography(theme).fontWeightRegular};

  ${Icon} {
    margin: 5px 12px;
  }

  ${({ divider, theme }) =>
    divider && `border-bottom: 1px solid ${getColor(theme, 'tint', 'level4')}`}

  &:hover,
  &:focus {
    outline: none;
    background-color: ${({ theme }) => getColor(theme, 'tint', 'level2')};
  }
`

export default MenuItem
