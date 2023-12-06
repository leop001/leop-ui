import { fireEvent, render } from "@testing-library/react"
import Button, {ButtonSize, ButtonType} from "./button"
import { screen } from '@testing-library/react'

const defaultProps = {
  onClick: jest.fn()
}
const testProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: 'clss'
}
describe('test button component', () => {
  it('should render the correct default button', () => {
    render(<Button {...defaultProps}>Nice</Button>)
    const element = screen.getByText('Nice') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element.disabled).toBeFalsy()
    expect(element).toHaveClass('btn btn-default')
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
  it('should render the correct component based on different props', () => {
    render(<Button {...testProps}>Nice</Button>)
    const element = screen.getByText('Nice')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn btn-primary btn-lg clss')
  })
  it('should render a link when btnType equals link and href is provided', () => {
    render(<Button btnType={ButtonType.Link} href="http://a.com">Link</Button>)
    const element = screen.getByText('Link')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')
  })
  it('should render disabled button when disabled set to true', () => {
    render(<Button disabled {...testProps}>Nice</Button>)
    const element = screen.getByText('Nice') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(defaultProps.onClick).not.toHaveBeenCalled()
  })
})