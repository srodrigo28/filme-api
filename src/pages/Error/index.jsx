import { Link } from 'react-router-dom'
import './error.css'

export function Error() {
    return (
        <div className='not-found'>
            <h1>Error código: 404</h1>
            <h2>Página não encontrada!</h2>
            <Link to="/"> Volte a nossa lista! </Link>
        </div>
    )
}