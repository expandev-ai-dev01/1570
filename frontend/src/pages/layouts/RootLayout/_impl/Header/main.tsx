import { Link } from 'react-router-dom';

/**
 * @component Header
 * @summary Application header with navigation
 * @domain core
 * @type layout-component
 * @category navigation
 */
export const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gray-900">
            Pastelaria
          </Link>
          <nav className="flex gap-6">
            <Link to="/" className="text-gray-700 hover:text-gray-900">
              Início
            </Link>
            <Link to="/cardapio" className="text-gray-700 hover:text-gray-900">
              Cardápio
            </Link>
            <Link to="/galeria" className="text-gray-700 hover:text-gray-900">
              Galeria
            </Link>
            <Link to="/estabelecimento" className="text-gray-700 hover:text-gray-900">
              Sobre Nós
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
