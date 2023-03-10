import "./style/Home.css";

//ROUTE PAGES GO IN ANOTHER FOLDER, not COMPONENT

import { useEffect, useState } from "react";
import { Card_Home } from "../components/Card_Home";
import { CustomFooter } from "../components/CustomFooter";
import { Error } from "../components/Error";
import { List } from "../components/List";
import { Loading } from "../components/Loading";
import { NavbarNEW } from "../components/NavbarNEW";

function Home() {
  //I use useEffect to start fetchGetAll() once Home is launched
  //AVOID to use a button or event to trigger a fetch

  const [error, setError] = useState(null);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchGetAll = async () => {
    console.log("I start when page loads");

    try {
      setIsLoading(true);

      const response = await fetch("http://localhost:8080/api/movie/all");

      if (!response.ok) {
        throw new Error("Something went Wrong! Probably wrong URL!");
      }
      console.log(response);

      const data = await response.json();
      console.log(data);

      const dataMapped = await data.map((elem, index) => {
        return {
          title: elem.title,
          sanitizeTitle: elem.sanitizeTitle,
          url: elem.image,
          genre: elem.genre,
          comingSoon: elem.comingSoon,
        };
      });
      console.log(dataMapped);

      // ---> .filter() ---> here I exclude movies wich have boolean ComingSoon:true

      const dataFiltered = await dataMapped.filter(
        (elem) => elem.comingSoon == false
      );

      console.log(dataFiltered);

      setContent(dataFiltered);
      console.log(content); //Here I AM NOT FILLED!
    } catch (error) {
      setError(error);
      console.log(error);
    }
    setIsLoading(false);
  };

  let final;

  if (isLoading == true) {
    final = <Loading />;
  }

  if (content.length > 0) {
    console.log(content); //Here I AM FILLED!
    final = <List content={content} />; //metti props
  }

  if (error) {
    final = <Error />;
  }

  //This useEffect to load when page loads!
  useEffect(() => {
    fetchGetAll();
  }, []);

  return (
    <div >
      <section className="mainSectionBg ">
        <NavbarNEW />
        <section className=" pb-5">{final}</section>
        <CustomFooter />
      </section>
    </div>
  );
}

export default Home;
