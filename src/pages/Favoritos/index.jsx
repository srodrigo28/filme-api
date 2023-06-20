import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import './styles.css'

export function Favoritos(){
    const [filmes, setFilmes] = useState([])

    function excluirFilme(id){
        // alert("ID clicado" + id)
        let filtroFilmes = filmes.filter( (item) => {
            return(item.id !== id)
        })
        setFilmes(filtroFilmes)
        localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes))
        toast.success("Removido com sucesso!")
    }

    useEffect(() => {
        const minhaLista = localStorage.getItem('@primeflix')
        setFilmes(JSON.parse(minhaLista) || [])
    }, [])
    return(
        <div className="meus-filmes">
            <h1>Meus Favoritos</h1>

            {
                filmes.length === 0 && <span>Você não possui nenhum favorito! :( </span>
            }

            <ul>
                {filmes.map((item) => {
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`} >Ver detalhes</Link>
                                <button onClick={ () => excluirFilme(item.id) }>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}