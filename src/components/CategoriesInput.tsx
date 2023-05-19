import { useEffect, useState } from "react";
import { CategoryApi } from "../api/category.api";
import { useField } from "../common/hooks/useField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import CategoryForm from "../pages/admin/Word/components/CategoryForm";

interface CategoriesInputProps {
  selected: any[];
  old: any[];
  addCategory: (obj: any) => void;
  deleteCategory: (id: string) => void;
  updateCategory: (obj: any) => void;
  deleteOldCategory: (id: string) => void;
  updateOldCategory: (obj: any) => void;
}

function CategoriesInput({
  selected,
  old,
  addCategory,
  deleteCategory,
  updateCategory,
  deleteOldCategory,
  updateOldCategory,
}: CategoriesInputProps) {
  const [category, setCategory] = useField({
    name: "category",
    type: "text",
    defaultValue: undefined,
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (category.value) onFilterChange(category.value);
      else setData([]);
    }, 500);

    // Delay when finish input
    return () => clearTimeout(delay);
  }, [category.value]);

  const onFilterChange = async (filter: string) => {
    const res = await CategoryApi.getAll({ limit: 10, offset: 0, q: filter });
    setData(res.data);
  };

  return (
    <>
      <div className="flex gap-4">
        <label htmlFor="select" className="block py-2">
          Selecciona categorías:
        </label>

        <div className="relative">
          <div className="h-10 bg-white flex border border-gray-200 rounded items-center">
            <input
              className="px-4 appearance-none outline-none text-gray-800 w-full"
              {...category}
            />
          </div>

          {data.length >= 1 && (
            <div
              className={`absolute rounded shadow bg-white overflow-hidden flex-col w-full mt-1 border border-gray-200`}
            >
              {data.map((obj: any) => {
                return (
                  <div key={obj.id} className="cursor-pointer group">
                    <button
                      type="button"
                      className="block w-full text-start p-2 border-transparent border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100"
                      onClick={(e: any) => {
                        setCategory("");
                        setData([]);

                        addCategory(obj);
                      }}
                    >
                      {obj.name}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {selected.map((obj: any) => {
        return (
          <div
            key={obj.categoryId}
            className="w-full mt-4 p-6 bg-white border border-gray-200 rounded-lg shadow"
          >
            <div className="flex items-center">
              <h5 className="inline-block text-2xl font-bold tracking-tight text-gray-900">
                {obj.category.name}
              </h5>
              <button
                type="button"
                className="px-4 py-2 ml-4 text-sm font-medium text-white bg-red-500 hover:bg-red-700 border border-gray-200"
                onClick={(e: any) => {
                  deleteCategory(obj.categoryId);
                }}
              >
                <FontAwesomeIcon
                  className="text-white pr-2"
                  icon={faTrash}
                ></FontAwesomeIcon>
                Eliminar
              </button>
            </div>

            <div className="my-3">
              <CategoryForm
                obj={obj}
                categoryChange={(newVals) => {
                  updateCategory({ ...obj, ...newVals });
                }}
              />
            </div>
          </div>
        );
      })}

      {old.map((obj: any) => {
        return (
          <div
            key={obj.categoryId}
            className="w-full mt-4 p-6 bg-white border border-gray-200 rounded-lg shadow"
          >
            <div className="flex items-center">
              <h5 className="inline-block text-2xl font-bold tracking-tight text-gray-900">
                {obj.category.name}
              </h5>
              <button
                type="button"
                className="px-4 py-2 ml-4 text-sm font-medium text-white bg-red-500 hover:bg-red-700 border border-gray-200"
                onClick={(e: any) => {
                  deleteOldCategory(obj.id);
                }}
              >
                <FontAwesomeIcon
                  className="text-white pr-2"
                  icon={faTrash}
                ></FontAwesomeIcon>
                Eliminar
              </button>
            </div>

            <div className="my-3">
              <CategoryForm
                obj={obj}
                categoryChange={(newVals) => {
                  updateOldCategory({ ...obj, ...newVals });
                }}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}

export default CategoriesInput;
