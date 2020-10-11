import { useContext } from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import useConstant from "use-constant";
import { useAsync } from "react-async-hook";
import { AppContext } from "./context";

const useDebouncedSearch = (searchFunction: any) => {
  const { changeContext, ...context } = useContext(AppContext);
  const inputText = context.search.inputText;
  const setInputText = (text: string) => {
    changeContext!({
      ...context,
      search: {
        ...context.search,
        inputText: text,
      },
    });
  };
  let searchResults = context.search.results;

  const debouncedSearchFunction = useConstant(() =>
    AwesomeDebouncePromise(searchFunction, 1000)
  );

  searchResults = useAsync(async () => {
    if (inputText.length === 0) {
      return [];
    } else {
      return debouncedSearchFunction(inputText);
    }
  }, [debouncedSearchFunction, inputText]);

  return {
    inputText,
    setInputText,
    searchResults,
  };
};

export default useDebouncedSearch;
