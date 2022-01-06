import { render, screen } from "@testing-library/react"
import { Posts } from "."

const props = {
    posts: [
        {
            id: 1,
            title: 'title 1',
            body: 'body 1',
            cover: 'img/img1.pnh'
        },
        {
            id: 2,
            title: 'title 2',
            body: 'body 2',
            cover: 'img/img1.pnh'
        },
        {
            id: 3,
            title: 'title 3',
            body: 'body 3',
            cover: 'img/img1.pnh'
        },
        {
            id: 4,
            title: 'title 4',
            body: 'body 4',
            cover: 'img/img1.pnh'
        }
    ]
}

describe('<Posts />' , () => {
    it('should render posts', () => {
        render(<Posts {...props} />)

        expect(screen.getAllByRole('heading', {name: /title/i})).toHaveLength(4);
        expect(screen.getAllByRole('img', {name: /title/i})).toHaveLength(4);
        expect(screen.getAllByText(/body/i)).toHaveLength(4);
    })

    it('should make snapshot', () => {
        const {container} = render(<Posts {...props} />)
        // eslint-disable-next-line testing-library/no-node-access
        expect(container.firstChild).toMatchSnapshot()
    })
})