// ----------------------- React -----------------------
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// ----------------------- Hooks -----------------------
import { useField } from "../../../common/hooks/useField";
// ----------------------- Functions -----------------------
import { notification } from "../../../common/functions/notification";
// ----------------------- Components -----------------------
import Input from "../../../components/Input";
import Button from "../../../components/Button";
// ----------------------- Api -----------------------
import { ProductApi } from "../../../api/product.api";

function ProductForm() {
  const params = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (params.id) {
      setId(params.id);
      getData(params.id);
    }
  }, [params]);

  const getData = async (id: string) => {

    try {
      let res = await ProductApi.getOne(id);

      setName(res.name);
      setDescription(res.description);
      setPrice(res.price);
      setCategoryId(res.categoryId);
    } catch (error: any) {
      notification("error", error.message);
    }
  };

  const [name, setName] = useField({ name: "name", type: "text" });
  const [description, setDescription] = useField({ name: "description", type: "text" });
  const [price, setPrice] = useField({ name: "price", type: "text" });
  const [categoryId, setCategoryId] = useField({ name: "categoryId", type: "text" });

  const handleSubmit = async () => {
    setIsLoading(true);

    const data: any = {
      name: name.value,
      description: description.value,
      price: Number(price.value),
      categoryId: Number(categoryId.value),
    };

    await (id ? edit(data) : create(data));

    setIsLoading(false);
  };

  const create = async (data: any) => {

    try {
      await ProductApi.create(data);

      notification("success", "Producto creada satisfactoriamente");
      navigate("/admin/product");
    } catch (error: any) {
      notification("error", error.message);
    }
  };

  const edit = async (data: any) => {
    if (!id) return;

    try {
      await ProductApi.edit(id, data);

      notification("success", "Producto editada satisfactoriamente");
      navigate("/admin/product");
    } catch (error: any) {
      notification("error", error.message);
    }
  };

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 md:gap-2 w-full px-4">
      <div className="mb-3">
        <Input
          label="Nombre"
          id="name"
          placeholder="Jhon Doe"
          inputProps={name}
        />
      </div>
      <div className="mb-3">
        <Input
          label="Descripcion"
          id="description"
          placeholder=""
          inputProps={description}
        />
      </div>
      <div className="mb-3">
        <Input
          label="Precio"
          id="price"
          placeholder="0"
          inputProps={price}
        />
      </div>
      <div className="mb-3">
        <Input
          label="Category Id"
          id="categoryId"
          placeholder="0"
          inputProps={categoryId}
        />
      </div>
      <div className="mb-3 col-start-1">
        <Button
          text={id ? "Editar" : "Crear"}
          onClick={() => {
            handleSubmit();
          }}
          isLoading={isLoading}
        />
      </div>
    </form>
  );
}

export default ProductForm;
