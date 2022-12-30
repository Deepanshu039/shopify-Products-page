import {
  AppProvider,
  Page,
  Card,
  ResourceList,
  Avatar,
  Text,
} from "@shopify/polaris";
import React from "react";
import NewList from "./NewList";

function App() {
  return (
    <div>
      <AppProvider
        i18n={{
          Polaris: {
            ResourceList: {
              sortingLabel: "Sort by",
              defaultItemSingular: "item",
              defaultItemPlural: "items",
              showing: "Showing {itemsCount} {resource}",
              Item: {
                viewItem: "View details for {itemName}",
              },
            },
            Common: {
              checkbox: "checkbox",
            },
          },
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "2rem auto" }}>
          <NewList />
        </div>
      </AppProvider>
    </div>
  );
}

export default App;
