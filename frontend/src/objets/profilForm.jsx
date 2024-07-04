/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import { useStateContext } from "../context/ContextProvider";
import "../style/profil.css"

const App = () => {
  const [form] = Form.useForm();
  const [componentSize, setComponentSize] = useState("default");
  const { membre_connected } = useStateContext();

  useEffect(() => {
    if (membre_connected) {
      form.setFieldsValue({
        nom: membre_connected.Nom,
        prenom: membre_connected.Prenom,
        email: membre_connected.Email,
        numeroTelephone: membre_connected.NumeroTelephone,
      });
    }
  }, [membre_connected, form]);

  const [Nom, setNom] = useState('');
  const [Prenom, setPrenom ] = useState("");
  const [Email, setEmail] = useState("");
  const [NumeroTelephone, setNumeroTelephone] = useState("");
  const [HaveACar, setHaveACar] = useState(false);

  const payload = [
    Nom,
    Prenom,
    Email,
    NumeroTelephone,
    HaveACar
  ]


  const onFinish = (values) => {
    console.log(values);
  };

  const onSubmit = () => {

  }

  return (
    <div className="izy">
      <form action="" method="get" onSubmit={onSubmit}>
        <label htmlFor="">Nom:</label>
        <input className="input" label="Nom" type="text" name="nom" value={membre_connected.Nom} onChange={(e) => setNom(e.target.value)}/>
        <label htmlFor="">Prénom:</label>
        <input className="input" label="Prenom" type="text" name="prenom" value={membre_connected.Prenom} onChange={(e) => setPrenom(e.target.value)} />
        <label htmlFor="">Email:</label>
        <input className="input" label="Email" type="email" name="email" value={membre_connected.Email} onChange={(e) => setEmail(e.target.value)}/>
        <label htmlFor="">Numéro de téléphone:</label>
        <input className="input" label="Numero Telephone" type="text" value={membre_connected.NumeroTelephone} name="numeroTelephone" onChange={(e) => setNumeroTelephone(e.target.value)}/>
        {/* <label htmlFor="">Date de naissance:</label>
        <input className="input" label="Date de naissance" type="date" onChange={(e) => set(e.target.value)}/> */}
        <label htmlFor="">J'ai une voiture</label>
        <Switch />
        <button className="btn btn-block" id="letabory" type="submit" >
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default App;
