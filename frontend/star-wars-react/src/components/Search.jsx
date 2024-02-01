export function Search({chars, setChars}) {
    const filterCharacters = (e) => {
        const searchString = e.target.value;
        const re = new RegExp(searchString, "i");
        let matchingCharacters = chars.filter(character => re.test(character.name));
        setChars(matchingCharacters);
    }
    return (
        <>
            <label for="searchString">Who are you looking for?
                <span class="small">(Regular expressions are cool here)</span></label>
            <input id="searchString" onChange={e=>filterCharacters(e)} autocomplete="off" />
        </>
    )
}