import styled from '../../styled-components'
import { getColorFromTheme, getFocusStyle } from '../../utils'

const ContextMenuButton = styled.button`
  ${getFocusStyle()}
  display: flex;
  background-color: ${({ theme }) =>
    getColorFromTheme(theme, 'tint', 'level1')};
  align-items: center;
  height: 32px;
  padding: 0 4px;
  justify-content: space-between;

  & > span:last-child:not(:first-child) {
    margin-left: 4px;
  }
`

export default ContextMenuButton
