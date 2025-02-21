import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async () => {
        try {
            const json = JSON.parse(input);
            const res = await axios.post('https://your-backend-url/bfhl', json);
            setResponse(res.data);
            setError('');
        } catch (err) {
            setError('Invalid JSON input');
        }
    };

    const handleOptionChange = (e) => {
        const options = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedOptions(options);
    };

    const renderResponse = () => {
        if (!response) return null;

        const { numbers, alphabets, highest_alphabet } = response;
        const filteredResponse = {};

        if (selectedOptions.includes('numbers')) filteredResponse.numbers = numbers;
        if (selectedOptions.includes('alphabets')) filteredResponse.alphabets = alphabets;
        if (selectedOptions.includes('highest_alphabet')) filteredResponse.highest_alphabet = highest_alphabet;

        return JSON.stringify(filteredResponse, null, 2);
    };

    return (
        <div>
            <h1>ABCD123</h1>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={handleSubmit}>Submit</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {response && (
                <div>
                    <select multiple onChange={handleOptionChange}>
                        <option value="numbers">Numbers</option>
                        <option value="alphabets">Alphabets</option>
                        <option value="highest_alphabet">Highest Alphabet</option>
                    </select>
                    <pre>{renderResponse()}</pre>
                </div>
            )}
        </div>
    );
};

export default App;
