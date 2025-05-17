function PriceRangeSlider({ minPrice, maxPrice, setMinPrice, setMaxPrice }) {
  const minLimit = 0;
  const maxLimit = 10000;

  const handleMinChange = (e) => {
    const value = Number(e.target.value);
    if (value <= maxPrice - 100) setMinPrice(value);
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value);
    if (value >= minPrice + 100) setMaxPrice(value);
  };

  const getPercent = (value) =>
    ((value - minLimit) / (maxLimit - minLimit)) * 100;

  return (
    <>
      <div className="w-full max-w-sm mx-auto px-4 py-6">
        <h2 className="text-lg font-bold mb-4">Choose Price &gt;</h2>

        <div className="relative h-2 bg-gray-300 rounded-full">
          <div
            className="absolute h-2 bg-red-500 rounded-full"
            style={{
              left: `${getPercent(minPrice)}%`,
              width: `${getPercent(maxPrice) - getPercent(minPrice)}%`,
            }}
          ></div>

          <input
            type="range"
            min={minLimit}
            max={maxLimit}
            value={minPrice}
            onChange={handleMinChange}
            className="range-thumb w-full absolute top-0 pointer-events-auto bg-transparent z-30"
          />
          <input
            type="range"
            min={minLimit}
            max={maxLimit}
            value={maxPrice}
            onChange={handleMaxChange}
            className="range-thumb w-full absolute top-0 pointer-events-auto bg-transparent z-20"
          />
        </div>

        <div className="flex justify-between text-sm mt-4">
          <span>{minPrice}€</span>
          <span>{maxPrice}€</span>
        </div>
      </div>
    </>
  );
}

export default PriceRangeSlider;
