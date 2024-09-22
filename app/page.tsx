'use client';

import { useState } from 'react';
import axios from 'axios';

const Home: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const parsedInput = JSON.parse(input);
      const res = await axios.post('/api/bfhl', parsedInput);
      setResponse(res.data);
    } catch (err) {
      setError('Invalid JSON input');
    }
  };

  const handleFilterChange = (option: string) => {
    if (filter.includes(option)) {
      setFilter(filter.filter((f) => f !== option));
    } else {
      setFilter([...filter, option]);
    }
  };

  return (
    <div>
      <h1>Backend Challenge</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON'
          style={{ width: '100%', height: '150px' }}
        />
        <button type='submit' style={{ marginTop: '10px' }}>Submit</button>
      </form>

      {error && <p>{error}</p>}

      {response && (
        <>
          <div>
            <h2>Filter Options:</h2>
            <label>
              <input
                type="checkbox"
                value="numbers"
                checked={filter.includes('numbers')}
                onChange={() => handleFilterChange('numbers')}
              />
              Numbers
            </label>
            <label>
              <input
                type="checkbox"
                value="alphabets"
                checked={filter.includes('alphabets')}
                onChange={() => handleFilterChange('alphabets')}
              />
              Alphabets
            </label>
            <label>
              <input
                type="checkbox"
                value="highest_lowercase_alphabet"
                checked={filter.includes('highest_lowercase_alphabet')}
                onChange={() => handleFilterChange('highest_lowercase_alphabet')}
              />
              Highest Lowercase Alphabet
            </label>
          </div>

          <div>
            <h2>Response:</h2>
            {filter.includes('numbers') && (
              <div>
                <h3>Numbers:</h3>
                <pre>{JSON.stringify(response.numbers, null, 2)}</pre>
              </div>
            )}
            {filter.includes('alphabets') && (
              <div>
                <h3>Alphabets:</h3>
                <pre>{JSON.stringify(response.alphabets, null, 2)}</pre>
              </div>
            )}
            {filter.includes('highest_lowercase_alphabet') && (
              <div>
                <h3>Highest Lowercase Alphabet:</h3>
                <pre>{JSON.stringify(response.highest_lowercase_alphabet, null, 2)}</pre>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
