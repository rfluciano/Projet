/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Avatar, Col, Divider, Drawer, Row } from 'antd';

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const App = () => {
  const [open, setOpen] = useState(false);

  const membreData = {
    "ID_Membre": 1,
    "Nom": "Rabearimanana",
    "Prenom": "Luciano",
    "Email": "rfluciano@gmail.com",
    "MotDePasse": "$2b$08$asdnAIK9LaDISCirN99ZNee7io1Vab693ATpQCVTFzQ55FoFsqiki",
    "NumeroTelephone": "0344530958",
    "TypeMembre": "standard",
    "Token": null,
    "photo": null
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <a onClick={showDrawer}>View Profile</a>
      <Drawer width={640} placement="right" closable={false} onClose={onClose} open={open}>
        <p
          className="site-description-item-profile-p"
          style={{
            marginBottom: 24,
          }}
        >
          User Profile
        </p>
        <p className="site-description-item-profile-p">Personal</p>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Full Name"
              content={`${membreData.Nom} ${membreData.Prenom}`}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Email" content={membreData.Email} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Phone Number"
              content={membreData.NumeroTelephone}
            />
          </Col>
        </Row>
        <Divider />
        <p className="site-description-item-profile-p">Additional Info</p>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Member Type"
              content={membreData.TypeMembre}
            />
          </Col>
        </Row>
      </Drawer>
    </>
  );
};

export default App;
