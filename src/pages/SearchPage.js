import { useNavigate } from 'react-router-dom';
import SearchComponent from '../components/SearchComponent';

const SearchPage = ({ query, setQuery }) => {
  const navigate = useNavigate();

  const handleSearch = (q) => {
    if (q) {
      setQuery(q);
      navigate('/results?q=' + encodeURIComponent(q));
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50">
      {/* Logo */}
        <h1 className="-mt-48 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          Vis<span className="text-indigo-600">Claimer</span>
        </h1>
        <p className="font-semibold text-xs md:text-sm text-gray-600">
          from visual evidence to clear claims.
        </p>

        {/* Subtext */}
        <p className="mt-5 mb-1 text-sm md:text-base text-gray-600">
          Search a topic to find relevant scientific visualizations and the claims they support.
        </p>
      {/* Search Box */}
      <SearchComponent onSearch={handleSearch} query={query} setQuery={setQuery} />
      {/* Footer */}
      <footer className="absolute bottom-0 w-full text-center py-4 text-gray-500 text-xs bg-transparent">
        © {new Date().getFullYear()} VisClaimer
      </footer>
    </div>
  );
};

export default SearchPage;
