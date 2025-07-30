import { useEffect, useState } from "react";

const FilteringAnalytics = ({ data }) => {
  const { handleDataFiltering, incomeDataset, expenseDataset, setDataBalance } = data;
  const [yearOptions, setYearOptions] = useState([]);
  const [monthOptions, setMonthOptions] = useState([]);

  const [filter, setFilter] = useState({
    type: "",
    year: "",
    month: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "type" && e.target.value === "") {
      setFilter({
        type: "",
        year: "",
        month: "",
      });
      return;
    }

    if (e.target.name === "type") {
      if (e.target.value === "income" || e.target.value === "expense") {
        const type = e.target.value;
        setFilter({
          type: type,
          year: "",
          month: "",
        });

        const getYear = setDataBalance[type].map((yearItems) => {
          return yearItems.year;
        });

        setYearOptions(getYear);
      }
    }

    if (e.target.name === "year") {
      setFilter((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
        month: "",
      }));
    }

    if (e.target.name === "month") {
      setFilter((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  useEffect(() => {
    if (filter.type && filter.year) {
      const targetYear = Number(filter.year);
      const targetData = setDataBalance[filter.type]?.find((item) => item.year === targetYear);

      if (targetData) {
        setMonthOptions(Object.keys(targetData.data));
      }
    }
  }, [filter.year]);

  useEffect(() => {
    handleDataFiltering(filter);
  }, [filter]);

  const filteringYears = [...new Set(yearOptions)];

  return (
    <div className="flex gap-2 mb-4 ml-2 md:mb-5 lg:mb-7">
      <select id="category" name="type" className="mt-1 block  border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500 bg-card" value={filter.type} onChange={(e) => handleChange(e)}>
        <option value="">All Type</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      {filter.type && (
        <select id="year" name="year" className="mt-1 block  border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500 bg-card" value={filter.year} onChange={(e) => handleChange(e)}>
          <option value="">All Year</option>
          {filteringYears
            .sort((a, b) => a - b)
            .map((yearItems, i) => (
              <option value={yearItems} key={i}>
                {yearItems}
              </option>
            ))}
        </select>
      )}
      {filter.year && (
        <select id="month" name="month" className="mt-1 block  border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500 bg-card" value={filter.month} onChange={(e) => handleChange(e)}>
          <option value="">All Month</option>
          {monthOptions.map((monthItems, i) => (
            <option value={monthItems} key={i}>
              {monthItems}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default FilteringAnalytics;
