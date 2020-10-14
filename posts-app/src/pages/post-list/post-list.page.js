import React, { useEffect, useRef, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PageTop from '../../components/page-top/page-top.component';
import authService from '../../services/auth.service';
import postsService from '../../services/posts.service';
import './post-list.page.css';

const PostListPage = (props) => {

    const [posts, setPosts] = useState([])
    const [redirectTo, setRedirectTo] = useState(null)
    const [search, setSearch] = useState("")
    const inputRef = useRef()

    useEffect(() => {
        let userData = authService.getLoggedUser();
        if(!userData){
            setRedirectTo("/login")
        }else{
            loadPosts()
            inputRef.current.focus()
        }
    }, [])

    useEffect(() => {

        let timeId = setTimeout(() => {
            if (search != "") {
                loadPosts({ search })
            } else {
                loadPosts()
            }
        }, 500)

       return () => { clearTimeout(timeId) }

    }, [search])

    // Função responsável por chamar o serviço e carregar os posts.
    const loadPosts = async (query) => {
        try {
            let res = await postsService.list(query)
            setPosts(res.data.data)
        } catch (error) {
            console.log(error);
            alert("Não foi possível listar os posts.")
        }
    }

    if (redirectTo) {
        return (
            <Redirect to={redirectTo} />
        )
    }

    return (
        <div className="container">

            <PageTop title={"Posts"} desc={"Listagem dos posts"}>
                <button className="btn btn-primary" onClick={() => props.history.push('/post-add')}>
                    Adicionar
                </button>
            </PageTop>

            <div className="form-group">
                <label htmlFor="search">Pesquisa</label>
                <input
                    ref={inputRef}
                    type="text"
                    className="form-control"
                    id="search"
                    placeholder="Digite para buscar"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Percorrendo o array de posts do state e renderizando cada um
            dentro de um link que leva para a página de detalhes do post específico */}
            {posts.map(post => (
                <Link to={"/post-detail/" + post.id} key={post.id}>
                    <div className="post-card">
                        <div className="post-card__img">
                            <img src={post.imageUrl} />
                        </div>
                        <div className="post-card__text">
                            <h4>{post.title}</h4>
                            <p>{post.content}</p>
                        </div>
                    </div>
                </Link>
            ))}

        </div>
    )

}

export default PostListPage;