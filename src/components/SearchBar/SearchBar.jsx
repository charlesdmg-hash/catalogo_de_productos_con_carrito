export default function SearchBar ({
    value,
    onSearch
}) {
    return (

        <input type="text" value={ value } onChange={(e) => { onSearch( e.target.value )}}/>

    )
}