import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./style.scss";

const App = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [peopledata, setPeopleData] = useState({ results: [] });
  const [counter, setCounter] = useState(20);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const url = `https://randomuser.me/api/?results=${counter}`;
        const { data } = await axios(url);
        setLoading(false);
        setError(false);
        setPeopleData(data);
      } catch (error) {
        setLoading(false);
        setError(true);
        setPeopleData([]);
      }
    })();
  }, [counter]);

  return (
    <>
      <main>
        <section>
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              setCounter(input);
              setInput("");
            }}
          >
            <h1>Search</h1>
            <input
              type="number"
              min="1"
              max="200"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <button>Enter</button>
            <button
              onClick={() => {
                setInput(28);
                setCounter(28);
                console.log(counter);
              }}
            >
              Show 28
            </button>
            <button
              onClick={() => {
                setInput(parseFloat(counter) + parseFloat(2));
                console.log(counter);
              }}
            >
              I want 2 more
            </button>
          </form>
        </section>

        {peopledata.results.length > 0 && (
          <>
            <section>
              <h2>Resultaten</h2>
              {loading && <p>Loading</p>}
              {error && <p>Error !!!!</p>}
              <ul>
                {peopledata.results.map(
                  ({
                    gender,
                    location: { city },
                    name: { first, last },
                    picture: { thumbnail, medium, large },
                    login: { uuid },
                  }) => (
                    <aside key={uuid}>
                      <img
                        key={uuid}
                        src={thumbnail ?? medium ?? large}
                        alt="picture"
                      />
                      <ul>
                        <p>{gender}</p>
                        <p>
                          {first} {last}
                        </p>
                        <p>{city}</p>
                      </ul>
                    </aside>
                  )
                )}
              </ul>
            </section>
          </>
        )}
      </main>
    </>
  );
};

export default App;
