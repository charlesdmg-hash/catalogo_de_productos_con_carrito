export default function SearchBar({ value, onSearch }) {
  return (
    <>
      <label htmlFor="search-bar">Buscar: </label>
      <input
        id="search-bar"
        type="text"
        value={value}
        onChange={(e) => {
          onSearch(e.target.value);
        }}
      />
    </>
  );
}
