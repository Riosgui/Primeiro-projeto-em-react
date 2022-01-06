import { render, screen } from "@testing-library/react";
import { PostCard } from ".";
import { PropsPostCardMock } from "./mock";

const props = PropsPostCardMock

describe('<PostCard />', () => {
    it('should render PostCard correctly', () => {
        render(<PostCard {...props} />);     
        
        expect(screen.getByRole('img', {name: /Algo/i})).toHaveAttribute('src', props.cover);
        expect(screen.getByText('Que')).toBeInTheDocument();
    });

    it('should match snapshot', () => {
        const { container } = render(<PostCard {...props} />);
        // eslint-disable-next-line testing-library/no-node-access
        expect(container.firstChild).toMatchSnapshot();
    });
});