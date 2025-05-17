function SortBy({ sortBy, setSortBy }) {
  return (
    <>
      <form>
        <select
          id="sort-by"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-red-600 text-white border rounded-full block w-full py-2.5 px-6 cursor-pointer font-semibold text-center shadow-xs trasition-all duration-300 hover:bg-red-800 md:w-40">
        
          <option value="SortBy">Sort By</option>
          <option value="A-Z">Sort by: A-Z</option>
          <option value="Z-A">Sort by: Z-A</option>
          <option value="ASC">Sort by: price asc</option>
          <option value="DESC">Sort by: price desc</option>
        </select>
      </form>
    </>
  );
}

export default SortBy;
