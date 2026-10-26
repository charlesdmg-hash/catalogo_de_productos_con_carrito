import './SearchBar.css'

export default function SearchBar({ value, onSearch }) {
  return (
    <div id="search-bar-div">
      <label htmlFor="search-bar">Buscar: </label>
      <input
        id="search-bar"
        type="text"
        value={value}
        onChange={(e) => {
          onSearch(e.target.value);
        }}
      />
    </div>
  );
}
