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
      <h1 className="text-4xl font-bold mb-6 text-gray-800">VisClaimer</h1>
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
