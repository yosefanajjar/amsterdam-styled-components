import styled from '../../styled-components'

interface IProps {
  error: boolean
}

const FormLabel = styled.label.attrs({
  type: 'text',
})`
  margin-bottom: 5px;
  color: ${(props: IProps) => props.error ? 'blue' : 'black'};
`

export default FormLabel
