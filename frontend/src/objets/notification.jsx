/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Button, notification } from 'antd';
// import io from 'socket.io-client';
import socket from '../socket';


const NotificationComponent = ({ userId }) => {
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    socket.on(`notification-${userId}`, (data) => {
      api.open({
        message: data.message,
        description: data.description,
        duration: 0, // Notification persisting until action is taken
        btn: (
          <>
            <Button type="primary" onClick={() => handleAccept(data.reservationId)}>Accepter</Button>
            <Button onClick={() => handleReject(data.reservationId)}>Refuser</Button>
          </>
        ),
        key: data.reservationId,
      });
    });

    return () => {
      socket.off(`notification-${userId}`);
    };
  }, [userId, api]);

  const handleAccept = (reservationId) => {
    // Logique pour accepter la réservation
    console.log(`Réservation ${reservationId} acceptée`);
    notification.close(reservationId);
  };

  const handleReject = (reservationId) => {
    // Logique pour refuser la réservation
    console.log(`Réservation ${reservationId} refusée`);
    notification.close(reservationId);
  };

  return <>{contextHolder}</>;
};

export default NotificationComponent;
