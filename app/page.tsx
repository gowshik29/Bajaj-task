'use client';

import { useState } from 'react';
import axios from 'axios';

// Define the expected response structure
interface ApiResponse {
  is_success: boolean;
  user_id: string;
  numbers: string[];
  alphabets: string[];
  highest_lowercase_alphabet: string;
  file_valid: boolean;
}

const Home: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [response, setResponse] = useState<ApiResponse | null>(null); // Use specific type for response
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const parsedInput = JSON.parse(input);
      const res = await axios.post('/api/bfhl', parsedInput);
      setResponse(res.data);
    } catch {
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
      
      {/* Form for JSON input */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="json-input">Enter JSON Input:</label>
        <textarea
          id="json-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"data": ["A", "B", "c", "1", "2", "3"], "email": "test@example.com", "roll_number": "123456"}'
          rows={10}
          cols={50}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
  
      {/* Show error if there's an issue with the input */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
  
      {/* Render filters */}
      {response && (
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
      )}
  
      {/* Render the response based on selected filters */}
      {response && (
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
      )}
    </div>
  );
  
};

export default Home;
