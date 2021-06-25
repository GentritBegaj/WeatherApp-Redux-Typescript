import React, { FC, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { setAlert } from "../store/actions/alertActions";
import { getWeather, setLoading } from "../store/actions/weatherActions";

interface SearchProps {
  title: string;
}

const Search: FC<SearchProps> = ({ title }) => {
  const [city, setCity] = useState<string>("");
  const dispatch = useDispatch();

  const changeHandler = (e: FormEvent<HTMLInputElement>) => {
    setCity(e.currentTarget.value);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (city.trim() === "") {
      return dispatch(setAlert("City is required!"));
    }

    dispatch(setLoading());
    dispatch(getWeather(city));
    setCity("");
  };

  return (
    <div className="hero is-light has-text-centered">
      <div className="container">
        <h1 className="title">{title}</h1>
        <form className="py-5" onSubmit={submitHandler}>
          <input
            type="text"
            className="input has-text-centerd mb-2"
            style={{ maxWidth: 300 }}
            placeholder="Enter city name"
            value={city}
            onChange={changeHandler}
          />
          <button
            className="button is-primary is-fullwidth"
            style={{ maxWidth: 300, margin: "0 auto" }}
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;
