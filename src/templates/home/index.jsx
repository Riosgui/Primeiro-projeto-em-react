import './style.css';
import { loadPost } from '../../util/load-post';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';
import { useCallback, useEffect, useState } from 'react';



export const Home = () => {
    const [ posts, setPosts ] = useState([]);
    const [ allPosts, setAllPosts ] = useState([]);
    const [ page, setPage ] = useState(0);
    const [ postsPerPage] = useState(3);
    const [ searchValue, setSearchValue ] = useState('');


    const noMorePosts = page + postsPerPage >= allPosts.length;
    const filteredPosts = !!searchValue ? allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    }) : posts;

    const handleLoadPosts = useCallback(async (page, postsPerPage) => {
      const postsAndPhotos = await loadPost();

      setPosts(postsAndPhotos.slice(page, postsPerPage));
      setAllPosts(postsAndPhotos);
    }, [])

    useEffect(() => {
      handleLoadPosts(0, postsPerPage);
    }, [handleLoadPosts, postsPerPage]);

    const loadMorePosts = () => {
      const nextPage = page + postsPerPage;
      const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
      posts.push(...nextPosts)


      setPosts(posts);
      setPage(nextPage);
    }

    const handleChange = (e) => {
      const { value } = e.target;
      setSearchValue(value);
    }

  return (
    <section className='container'>
      <div className='search-container'>
        {!!searchValue && (
            <h1>{searchValue}</h1>
        )}
      </div>

      <TextInput searchValue={searchValue} handleChange={handleChange} />
      {filteredPosts.length > 0 && (
        <Posts posts={filteredPosts} />
      )}
      {filteredPosts.length === 0 && (
        <p>Não existem posts</p>
      )}

      <div className="button-container">
        {!searchValue && (
          <Button onClick={loadMorePosts} text="teste" disabled={noMorePosts} />
        )}
      </div>
    </section>
  );
}

//export class Home2 extends Component{
//  state = {
//    posts: [],
//    allPosts: [],
//    page: 0,
//    postsPerPage: 3,
//    searchValue: ''
//  };
//
//  async componentDidMount(){
//    await this.loadPosts()
//  }
//
//  loadPosts = async () => {
//    const { page, postsPerPage } = this.state;
//    const postsAndPhotos = await loadPost();
//    this.setState({
//      posts: postsAndPhotos.slice(page, postsPerPage),
//      allPosts: postsAndPhotos,
//    });
//  }
//
//  loadMorePosts = () => {
//    const {
//      page,
//      postsPerPage,
//      allPosts,
//      posts
//    } = this.state;
//    const nextPage = page + postsPerPage;
//    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
//    posts.push(...nextPosts)
//
//    this.setState({posts, page: nextPage})
//  }
//
//  handleChange = (e) => {
//    const { value } = e.target;
//    this.setState({searchValue: value});
//  }
//
//  render() {
//    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
//    const noMorePosts = page + postsPerPage >= allPosts.length;
//    const filteredPosts = !!searchValue ? allPosts.filter(post => {
//      return post.title.toLowerCase().includes(searchValue.toLowerCase());
//    }) : posts;
//
//    return (
//      <section className='container'>
//        <div className='search-container'>
//          {!!searchValue && (
//              <h1>{searchValue}</h1>
//          )}
//        </div>
//
//        <TextInput searchValue={searchValue} handleChange={this.handleChange} />
//        {filteredPosts.length > 0 && (
//          <Posts posts={filteredPosts} />
//        )}
//        {filteredPosts.length === 0 && (
//          <p>Não existem posts</p>
//        )}
//
//        <div className="button-container">
//          {!searchValue && (
//            <Button onClick={this.loadMorePosts} text="teste" disabled={noMorePosts} />
//          )}
//        </div>
//      </section>
//     
//    );
//  }
//}

export default Home;
