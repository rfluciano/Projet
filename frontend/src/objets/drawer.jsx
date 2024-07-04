/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { useStateContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const App = () => {
  const { membre_connected } = useStateContext();
  const [positionDepart, setPositionDepart] = useState("");
  const [positionArrive, setPositionArrive] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [heure, setHeure] = useState("");
  const [role, setRole] = useState("");
  const [placeRecherche, setPlaceRecherche] = useState("");
  const [placeDisponible, setPlaceDisponible] = useState("");
  const [prixParPlace, setPrixParPlace] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      
      <Drawer
        title="Recherche d'annonce"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        // extra={
        //   <Space>
        //     <Button onClick={onClose}>Cancel</Button>
        //     <Button onClick={onClose} type="primary">
        //       Submit
        //     </Button>
        //   </Space>
        // }
      >
        <form>
          {/* <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="position_depart"
                label="Adresse de départ :"
                rules={[
                  {
                    required: true,
                    message: 'Veuillez ajouter un lieu',
                  },
                ]}
              >
                <Input placeholder="Lieu de départ" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="position_arrive"
                label="Destination :"
                rules={[
                  {
                    required: true,
                    message: 'Veuillez ajouter un lieu',
                  },
                ]}
              >
                <Input placeholder="Lieu de destination" />
              </Form.Item>
            </Col>
          </Row> */}
          <Row gutter={16}>
            <div className="flex">
              <label>
                Position de départ:
                <input
                  required
                  className="input"
                  type="text"
                  value={positionDepart}
                  onChange={(e) => setPositionDepart(e.target.value)}
                />
              </label>
              <label>
                Position d'arrivée:
                <input
                  required
                  className="input"
                  type="text"
                  value={positionArrive}
                  onChange={(e) => setPositionArrive(e.target.value)}
                />
              </label>
            </div>
          </Row>
          <Row gutter={16}>
            <div className="flex">
              <label>
                Date de début:
                <input
                  required
                  className="input"
                  type="date"
                  value={dateDebut}
                  onChange={(e) => setDateDebut(e.target.value)}
                />
              </label>
              <label>
                Date de fin:
                <input
                  required
                  className="input"
                  type="date"
                  value={dateFin}
                  onChange={(e) => setDateFin(e.target.value)}
                />
              </label>
            </div>
          </Row>
          <Row gutter={16}>
            <label>Rôle recherché : </label>
            <div className="radio-group">
              <div className="radio-option">
                <input
                  type="radio"
                  id="passager"
                  name="role"
                  value="Passager"
                  checked={role === "Passager"}
                  required
                  onChange={(e) => setRole(e.target.value)}
                />
                <label htmlFor="passager">Passager</label>
              </div>
              <div className="radio-option">
                <input
                  type="radio"
                  id="conducteur"
                  name="role"
                  value="Conducteur"
                  checked={role === "Conducteur"}
                  required
                  onChange={(e) => setRole(e.target.value)}
                />
                <label htmlFor="conducteur">Conducteur</label>
              </div>
            </div>
          </Row>
          <Row gutter={16}>
            <div className="flex">
              {role === "Conducteur" && (
                <>
                  <label htmlFor="place_disponible">Places recherchées:
                  <input
                    className="input"
                    type="number"
                    id="place_disponible"
                    value={placeDisponible}
                    onChange={(e) => setPlaceDisponible(e.target.value)}
                    required
                  />
                  </label>
                </>
              )}
              {role === "Passager" && (
                <>
                  <label htmlFor="place_recherche">Places recherchées:
                  <input
                    className="input"
                    type="number"
                    id="place_recherche"
                    value={placeRecherche}
                    onChange={(e) => setPlaceRecherche(e.target.value)}
                    required
                  />
                  </label>
                </>
              )}
              <label htmlFor="prix_par_place">Prix par place (Ar):
              <input
                className="input"
                type="number"
                id="prix_par_place"
                value={prixParPlace}
                onChange={(e) => setPrixParPlace(e.target.value)}
                required
              />
              </label>
            </div>
          </Row>
        </form>
      </Drawer>
    </>
  );
};
export default App;
