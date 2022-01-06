import { render, screen } from "@testing-library/react";
import { Button } from ".";

describe('<Button />', () => {
    it('should render the button with the text', () => {
        render(<Button text='teste' />);

        expect.assertions(1);

        const button = screen.getByRole('button', { name: /teste/i });
        expect(button).toHaveAttribute('class', 'button');
    });

    it('should call fuction on button click', () => {
        render(<Button text='teste' disabled={true}/>);

        const button = screen.getByRole('button', { name: /teste/i });

        expect(button).toBeDisabled()

    });
});