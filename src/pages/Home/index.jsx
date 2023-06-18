import { useEffect, useState } from 'react'
import api from '../../services/api'

// URL DA API: /movie/now_playing?api_key=d30221b61194d23fbc7c1d51d99d35c4&language=pt-BR

export function Home() {
    const [filmes, setFilmes] = useState([])

    async function loadFilmes() {
        const response = await api.get("movie/now_playing", {
            params: {
                api_key: "d30221b61194d23fbc7c1d51d99d35c4",
                language: "pt-BR",
                page: 1,
            }
        })
        // console.log(response.data)
        console.log(response.data.results)
    }

    useEffect(() => {
        loadFilmes()
    }, [])

    return (
        <div>
            <h1>Bem vindo a Home</h1>
        </div>
    )
}