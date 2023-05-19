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
import { CategoryApi } from "../../../api/category.api";

function UserForm() {
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
      let res = await CategoryApi.getOne(id);

      setName(res.name);
    } catch (error: any) {
      notification("error", error.message);
    }
  };

  const [name, setName] = useField({ name: "name", type: "text" });

  const handleSubmit = async () => {
    setIsLoading(true);

    const data: any = {
      name: name.value,
    };

    await (id ? edit(data) : create(data));

    setIsLoading(false);
  };

  const create = async (data: any) => {

    try {
      await CategoryApi.create(data);

      notification("success", "Categoría creada satisfactoriamente");
      navigate("/admin/category");
    } catch (error: any) {
      notification("error", error.message);
    }
  };

  const edit = async (data: any) => {
    if (!id) return;

    try {
      await CategoryApi.edit(id, data);

      notification("success", "Categoría editada satisfactoriamente");
      navigate("/admin/category");
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

export default UserForm;
