import styled from '@datapunt/asc-core'
import { getColorFromTheme } from '../../utils'

const DownloaderStyle = styled.div<{}>`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: ${({ theme }) =>
    getColorFromTheme(theme, 'tint', 'level2')};
`

export default DownloaderStyle
