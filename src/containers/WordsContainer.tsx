import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { WordApi } from "../api/word.api";
import { formatDate } from "../common/functions/formatDate";

interface WordsContainerProps {
  initialFilter?: string;
}

function WordsContainer(props: WordsContainerProps) {
  const [words, setWords] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const observer = useRef<any>();
  const timer = useRef<any>();

  // Filters
  const [offset, setOffset] = useState(0);
  const [canViewMore, setCanViewMore] = useState(false);
  const [filter, setFilter] = useState<string>(props.initialFilter || "");

  useEffect(() => {
    setLoading(true);

    const getData = async () => {
      const limit = 8;

      const res = await WordApi.getPublished({
        limit,
        offset,
        q: filter || "",
      });

      setCanViewMore(res.totalItems > limit * (offset + 1));

      setWords((oldWords) => {
        return [...oldWords, ...res.data];
      });

      setLoading(false);
    };

    getData();
  }, [filter, offset]);

  useEffect(() => {
    setWords([]);
  }, [filter]);

  const handleChange = (e: any) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      setFilter(e.target.value);
      setOffset(0);
    }, 1000);
  };

  const lastElement = (node: any) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && canViewMore) {
        setOffset((prev) => prev + 1);
      }
    });

    if (node) observer.current.observe(node);
  };

  return (
    <>
      <div id="words" className="bg-cream p-4">
        <div className="w-full md:w-1/2">
          <label className="text-black" htmlFor="filter">
            Buscar por nombre o categorías
          </label>
          <input
            id="filter"
            name="filter"
            type="text"
            placeholder="Saludar"
            defaultValue={props.initialFilter || ""}
            onChange={(e) => handleChange(e)}
            className="appearance-none block w-full px-4 py-3 leading-tight text-black bg-white border border-gray-200 focus:border-cwz-secondary rounded focus:outline-none"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-cream">
        {words.map((word, index) => {
          return (
            <div
              key={word.id}
              className="p-6 bg-white border border-gray-200 rounded-lg shadow"
              ref={words.length === index + 1 ? lastElement : null}
            >
              <div className="flex">
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  {word.word}
                </h2>
                <Link
                  to={"/word/" + word.id}
                  className="inline-flex items-center px-3 py-2 ml-auto text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  Ver más
                  <FontAwesomeIcon
                    className="w-4 h-4 ml-2 -mr-1"
                    icon={faArrowRight}
                  ></FontAwesomeIcon>
                </Link>
              </div>
              <h3 className="mb-2 font-light text-sm text-gray-900">
                Publicado el {formatDate(word.createdAt, false)}
              </h3>
              <h3 className="mb-2 text-gray-900">Categorías:</h3>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {word.categories.map((category: any) => (
                  <div
                    key={category.categoryId}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg "
                  >
                    {category.category.name}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default WordsContainer;
