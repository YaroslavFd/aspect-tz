import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Store } from "../store";
import ServersList from "./ServersList";
import Select from "./ui/Select";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { TrashIcon } from "./ui/icons/TrashIcon";
import { VialIcon } from "./ui/icons/VialIcon";
import { LocationDotIcon } from "./ui/icons/LocationDotIcon";
import { EnviraIcon } from "./ui/icons/EnviraIcon";
import { QuestionIcon } from "./ui/icons/QuestionIcon";

interface FormData {
  id: number;
  locationID: number;
  envID?: number;
  servers: string;
  hint: string;
}

interface FormRowProps {
  formData: FormData;
  store: Store;
  onUpdate: (id: number, data: Partial<FormData>) => void;
  onRemove: (id: number) => void;
}

const FormRow: React.FC<FormRowProps> = observer(
  ({ formData, store, onUpdate, onRemove }) => {
    const [selectedLocation, setSelectedLocation] = useState<number>(
      formData.locationID
    );
    const [selectedEnv, setSelectedEnv] = useState<number | undefined>(
      formData.envID
    );

    const filteredEnvs = store.envs.filter((env) =>
      store.servers.some(
        (server) =>
          server.locationID === selectedLocation && server.envID === env.envID
      )
    );

    const servers = store.servers
      .filter(
        (server) =>
          server.locationID === selectedLocation && server.envID === selectedEnv
      )
      .map((server) => server.name)
      .join(", ");

    const onChangeLocation = (locationID: number) => {
      const availableEnvs = store.envs.filter((env) =>
        store.servers.some(
          (server) =>
            server.locationID === locationID && server.envID === env.envID
        )
      );
      const envID =
        availableEnvs.length > 0 ? availableEnvs[0].envID : undefined;
      setSelectedLocation(locationID);
      setSelectedEnv(envID);
      onUpdate(formData.id, {
        locationID,
        envID,
        servers: "",
      });
    };

    const onChangeEnv = (envID: number) => {
      setSelectedEnv(envID);
      onUpdate(formData.id, { envID });
    };

    useEffect(() => {
      onUpdate(formData.id, { servers });
    }, [selectedLocation, selectedEnv]);

    return (
      <div className="form">
        <div className="form-header">
          <h4>
            <VialIcon className="vial-icon" />
            Тестовая локация {formData.id}
          </h4>
          <Button
            className="delete-button"
            onClick={() => onRemove(formData.id)}
            icon={<TrashIcon />}
          />
        </div>
        <div className="form-content">
          <Select
            options={store.locations.map(({ locationID, name }) => ({
              id: locationID,
              name,
            }))}
            selectedValue={selectedLocation}
            onChange={onChangeLocation}
            label="Локация"
            icon={<LocationDotIcon />}
          />
          <Select
            options={filteredEnvs.map(({ envID, name }) => ({
              id: envID,
              name,
            }))}
            selectedValue={selectedEnv}
            onChange={onChangeEnv}
            label="Среда"
            disabled={!selectedLocation}
            icon={<EnviraIcon />}
          />
          <ServersList servers={servers} />
          <Input
            className={"hint"}
            label="Подсказка"
            value={formData.hint}
            placeholder="Комментарий по локации"
            onChange={(hint) => onUpdate(formData.id, { hint })}
            icon={<QuestionIcon />}
          />
        </div>
      </div>
    );
  }
);

export default FormRow;
