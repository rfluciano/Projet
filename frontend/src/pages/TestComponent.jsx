/* eslint-disable no-unused-vars */
// import React from "react";
// import { test } from '@testing-library/jest-dom';
// import { render, screen } from "@testing-library/react";
// import { ContextProvider, useStateContext } from "../context/ContextProvider";

// // Composant de test qui utilise le contexte fourni par ContextProvider
// function TestComponent() {
//   const { membre, token, notification, setMembre, setToken, setNotification } =
//     useStateContext();

//   return (
//     <div>
//       <div data-testid="membre">{membre}</div>
//       <div data-testid="token">{token}</div>
//       <div data-testid="notification">{notification}</div>
//       <button onClick={() => setMembre("John")}>Set Membre</button>
//       <button onClick={() => setToken("token123")}>Set Token</button>
//       <button onClick={() => setNotification("Notification message")}>
//         Set Notification
//       </button>
//     </div>
//   );
// }

// // Test unitaire
// test("ContextProvider provides correct values to children", () => {
//   render(
//     <ContextProvider>
//       <TestComponent />
//     </ContextProvider>
//   );

//   // Vérifie si les valeurs de contexte sont correctement affichées dans le composant de test
//   expect(screen.getByTestId("membre")).toHaveTextContent("");
//   expect(screen.getByTestId("token")).toHaveTextContent("");
//   expect(screen.getByTestId("notification")).toHaveTextContent("");

//   // Simule les actions qui modifient les valeurs de contexte
//   screen.getByText("Set Membre").click();
//   screen.getByText("Set Token").click();
//   screen.getByText("Set Notification").click();

//   // Vérifie si les valeurs de contexte ont été mises à jour
//   expect(screen.getByTestId("membre")).toHaveTextContent("John");
//   expect(screen.getByTestId("token")).toHaveTextContent("token123");
//   expect(screen.getByTestId("notification")).toHaveTextContent(
//     "Notification message"
//   );
// });
// export default TestComponent;
import React from 'react'

export default function TestComponent() {
  return (
    <div>TestComponent</div>
  )
}
