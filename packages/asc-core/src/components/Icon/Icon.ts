import { Theme } from '../../theme'
import styled from '../../styled-components'
import fillSVG from '../../utils/fillSVG'

type Props = {
  inline?: boolean
  color?: Theme.TypeLevel
  alignSelf?: 'top' | 'bottom' | 'left' | 'right'
  iconUrl?: string
  size?: number
  padding?: number
  rotate?: number
}

const defaultProps = {
  size: 20,
  padding: 0,
  rotate: 0,
}

const Icon = styled.span<Props>`
  display: ${({ inline }) => (inline ? 'inline-block' : 'block')};
  ${({ iconUrl }) => iconUrl && `background-image: ${iconUrl}`}
  ${({ size = defaultProps.size, padding = defaultProps.padding }) => `
    width: ${size - padding * 2}px;
    height: ${size - padding * 2}px;
  `}
  ${({ alignSelf }) => alignSelf && `position: absolute; ${[alignSelf]}: 0`};
  padding: ${({ padding }) => `${padding}px`};
  box-sizing: content-box;
  ${({ rotate = defaultProps.rotate }) => `transform: rotate(${rotate}deg)`};

  & > svg {
    width: inherit;
    height: inherit;
    ${({ color, theme }) => fillSVG(theme, color)};
`

export default Icon