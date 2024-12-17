import React, { useState, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { storeContext } from "../store";
import FormRow from "./FormRow";
import Button from "./ui/Button";
import { PlusIcon } from "./ui/icons/PlusIcon";

interface FormData {
  id: number;
  locationID: number;
  envID?: number;
  servers: string;
  hint: string;
}

const FormContainer: React.FC = observer(() => {
  const store = useContext(storeContext);
  const [forms, setForms] = useState<FormData[]>([]);

  useEffect(() => {
    store.fetchData();
  }, [store]);

  const handleAddForm = () => {
    const firstLocationID = store.locations[0]?.locationID || 0;
    const firstEnvID = store.envs.find((env) =>
      store.servers.some(
        (server) =>
          server.locationID === firstLocationID && server.envID === env.envID
      )
    )?.envID;

    const newId =
      forms.length > 0 ? Math.max(...forms.map((form) => form.id)) + 1 : 1;

    setForms((prevForms) => [
      ...prevForms,
      {
        id: newId,
        locationID: firstLocationID,
        envID: firstEnvID,
        servers: "",
        hint: "",
      },
    ]);
  };

  const handleRemoveForm = (id: number) => {
    setForms(forms.filter((form) => form.id !== id));
  };

  const handleUpdateForm = (id: number, updatedData: Partial<FormData>) => {
    setForms((prevForms) => {
      return prevForms.map((form) =>
        form.id === id ? { ...form, ...updatedData } : form
      );
    });
  };

  const handlePrintResult = () => {
    console.log(forms);
  };

  if (!store.isLoaded) {
    return <div>Загрузка данных...</div>;
  }

  return (
    <div className="form-container">
      {!forms.length && <h3>Список пока пуст :/</h3>}
      {forms.map((form) => (
        <FormRow
          key={form.id}
          formData={form}
          store={store}
          onUpdate={handleUpdateForm}
          onRemove={handleRemoveForm}
        />
      ))}
      <Button
        className="form-button"
        onClick={handleAddForm}
        label={"Добавить тестовую локацию..."}
        icon={<PlusIcon className="plus-icon" />}
      />
      <Button
        className="form-button"
        onClick={handlePrintResult}
        label={"Вывести результат в консоль"}
      />
    </div>
  );
});

export default FormContainer;
