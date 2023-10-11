"use client";

import Image from 'next/image';
import { useState } from 'react';

interface Result {
  poster: string;
  title: string;
  year: string;
}

const Search = () => {
  const [query, setQuery] = useState<string>();
  const [results, setResults] = useState<Array<{ item: Result }> | undefined>();

  async function handleOnChange(e: React.SyntheticEvent) {
    const target = e.target as typeof e.target & {
      value: string;
    };

    setQuery(target.value);
    setResults(undefined);

    const response = await fetch('/api/search', {
      method: 'POST',
      body: JSON.stringify({
        query: target.value
      })
    })

    const data = await response.json();
    
    setResults(data.results);
  }

  return (
    <div className="w-full px-6 max-w-4xl mx-auto">
      <form className="max-w-sm mx-auto mb-4">
        <input className="w-full rounded" type="text" name="query" onChange={handleOnChange} />
      </form>
      {query && (
        <p className="mb-6">
          Results for <strong>{ query }</strong>
        </p>
      )}
      {Array.isArray(results) && results.length > 0 && (
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-6">
          { results.map(({ item }) => {
            return (
              <li key={item.title}>
                <Image className="block rounded shadow mb-2" width="640" height="960" src={item.poster} alt="Poster" />
                <span className="block font-semibold">{ item.title }</span>
                <span className="block text-sm">{ item.year }</span>
              </li>
            );
          })}
        </ul>
      )}
      {Array.isArray(results) && results.length === 0 && (
        <p className="font-bold text-xl">No results found!</p>
      )}
    </div>
  )
}

export default Search;