import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { toast } from 'react-toastify'
import './filme.css'

export function Filme() {
    const { id } = useParams()
    const [filme, setFilme] = useState(true)
    const [loading, setLoading] = useState(true)
    
    const navigate = useNavigate()

    const handleRedirect = () => navigate('/');

    function salvarFilme(){
       const minhaLista = localStorage.getItem("@primeflix")
       let filmesSalvos = JSON.parse(minhaLista) || []

       const hasFilme = filmesSalvos.some( 
        (filmeSalvo) => filmeSalvo.id === filme.id )

        if(hasFilme){
            toast.warn("Esse filme já está na lista")
            return
        }
        filmesSalvos.push(filme)
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))

        toast.success("Filme Salvo com sucesso!")

        handleRedirect()
    }

    useEffect(() => {
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: 'd30221b61194d23fbc7c1d51d99d35c4',
                    language: 'pt-BR'
                }
            })
            .then((response) => {
                // console.log(response.data)
                setFilme(response.data)
                setLoading(false)
            })
            .catch(() => {
                console.log('filme não carregou')
                navigate("/", { replace: true})
                return
            })
        }
        loadFilme();

        return() => {
            console.log("COMPONENTE FOI DESMONTADO")
        }
    }, [navigate, id])

    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando...</h1>
            </div>
        )
    }

    return (
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinope</h3>
            
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.vote_average} / 10 </strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target='blank' rel='external' href={`https://youtube.com/results?search_query=${filme.title} trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}