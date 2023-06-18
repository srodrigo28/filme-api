import './header.css'
import { Link } from 'react-router-dom'

export function Header() {
    return (
        <header>
            <Link className='logo' to="/">App Flix</Link>
            <Link className='favoritos' to="/favoritos">Meus Filmes</Link>
        </header>
    )
}