//---->/*2*/ //import React and useLocation

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CustomFooter } from "../components/CustomFooter";
import { Loading } from "../components/Loading";
import { NavbarNEW } from "../components/NavbarNEW";

import "./style/Media_Query_Single_Movie.css";

const SingleMovie = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [content, setContent] = useState(null);

  /*3 */ //---> useLocation and useEffect
  const location = useLocation();

  React.useEffect(() => {
    console.log("location from new user", location);
  }, []);

  /*4 */ //---> location.state.title is the name
  //---> I'm using it to form the correct URL (WICH IS AN API GETBYNAME)*/

  // CONTROLLA

  const getMovieInfo = async () => {
    //use effect ---> controlla lezioni
    //---> aggiungi .then

    try {
      setIsLoading(true);
      console.log(location.state);
      console.log(location.state.sanitizeTitle);

      const response = await fetch(
        "http://localhost:8080/api/movie/title?sanitizeTitle=" +
          location.state.sanitizeTitle
      );

      if (!response.ok) {
        throw new Error("Something went wrong! Try it again!");
      }

      const data = await response.json();
      setContent(data[0]);
      //[0]--->DATA IS AN ARRAY made by 1 objecy (0 is the first position)
      console.log(data);

      /*
        I DO NOT USE .map because data is a single Object, not an array---> 
        this api returns a movie by title--->
        ONLY ONE, NOT MANY!
      */
    } catch (error) {
      setError(error);
      console.log(error);
    }
    setIsLoading(false);
  };

  let final = "";
  let finalDirector = "";

  if (isLoading) {
    final = <Loading />;
  }

  //I do not use content.length because my content isn't an array
  // but a single object!
  if (content != null) {
    final = content;
    finalDirector = content.director;
    //Using this finalDirector because I cannot re-render a
    //property of an object which is already a property of an object
    //---> go in "return" when I re-render Director Name
    console.log(final);
  }

  useEffect(() => {
    getMovieInfo();

    //important: THIS RETURN inside useEffect()---> it activates
    //when function is "dismounted"--->ex. when I refresh or Close the page
    // return () => {
    //   console.log("EVENT ON DISMOUT ");
    // };
  }, []);

  return (
    <section className="bg-dark pb-5">
      <NavbarNEW></NavbarNEW>
      <section className="container ">
        <section className="row mt-5 align-items-around justify-content-around gx-5">
          {isLoading && final}

          <img
            className="col-8 col-sm-4 p-0 img-fluid h-100 rounded  border border-2 border-white "
            src={final.image}
            alt=""
          />
          <div className="d-flex flex-column align-items-around justify-content-around col-8 col-sm-7 pt-3 pt-sm-0 ps-sm-5 pe-sm-5  singleMovieMediaQuery">
            <div className=" cssFontTitleSingleMovie">{final.title}</div>
            <div className="">Director: {finalDirector.fullName}</div>
            <div className="">Year: {final.year}</div>
            <div className="">Running time: {final.running_time} min.</div>
            <div className="">Genre: {final.genre}</div>
            <div className=" ">Plot: {final.plot}</div>
            {/* HERE I'M POINTING THE full property in the object director in the object final */}
            <div className="container">
              <div className="row mt-3 justify-content-center ">
                <img className="col-3 " src="src\logo\bluray.png" alt="" />
                <img className="col-3" src="src\logo\dvd.png" alt="" />
                <img className="col-3" src="src\logo\prime_video.png" alt="" />
              </div>
            </div>
          </div>
        </section>
      </section>
      <CustomFooter />
    </section>
  );
};

export { SingleMovie };
