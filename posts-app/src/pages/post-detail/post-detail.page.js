import React, { useCallback, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PageTop from '../../components/page-top/page-top.component';
import authService from '../../services/auth.service';
import postsService from '../../services/posts.service';
import './post-detail.page.css';

const PostDetailPage = (props) => {

    const [post, setPost] = useState(null)
    const [redirectTo, setRedirectTo] = useState(null)

    // Função que é executada assim que o componente carrega
    useEffect(() => {
        
        let userData = authService.getLoggedUser();

        if(!userData){
            setRedirectTo("/login")
        }else{
            // Recuperando os id do post na url
            let postId = props.match.params.id
            // Chamando a função que carrega os dados do post
            loadPost(postId)
        }

    }, [])

    // Função que carrega os dados do post e salva no state
    const loadPost = async (postId) => {
        try {
            let res = await postsService.getOne(postId)
            setPost(res.data.data[0])
        } catch (error) {
            console.log(error);
            alert("Não foi possível carregar post.")
        }
    }

    // Função que exclui o post, chamada ao clicar no botão "Excluir"
    const deletePost = useCallback((postId) => {
        
        if (!window.confirm("Deseja realmente excluir este post?")) return;

        postsService.delete(postId)
            .then(res => {
                alert("Post excluído com sucesso")
                props.history.replace('/post-list')
            })
            .catch(error => {
                console.log(error);
                alert("Não foi excluir o post.")
            })

    }, [])

    if(redirectTo){
        return(
            <Redirect to={redirectTo}/>
        )
    }

    return (
        <div className="container">

            <PageTop title={"Post"} desc={"Detalhes do post"}>
                <button className="btn btn-light" onClick={() => props.history.goBack()}>
                    Voltar
                </button>
            </PageTop>

            <div className="row">
                <div className="col-6">
                    <img className="post-img" src={post?.imageUrl} alt="image" />
                </div>
                <div className="col-6">
                    <div className="post-info">
                        <h4>ID</h4>
                        <p>{post?.id}</p>
                    </div>
                    <div className="post-info">
                        <h4>Título</h4>
                        <p>{post?.title}</p>
                    </div>
                    <div className="post-info">
                        <h4>Conteúdo</h4>
                        <p>{post?.content}</p>
                    </div>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => deletePost(post.id)}>
                            Excluir
                        </button>
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => props.history.push('/post-edit/' + post.id)}>
                            Editar
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default PostDetailPage