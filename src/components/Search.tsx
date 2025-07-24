import { Input, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const handler = setTimeout(() => {
      if (value) {
        setSearchParams({ search: value });
      } else {
        searchParams.delete("search");
        setSearchParams({});
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [value, searchParams, setSearchParams]);

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="border-2"
      placeholder="Search Pokemon"
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
    />
  );
};

export default Search;
