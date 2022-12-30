import {
  ChoiceList,
  TextField,
  IndexTable,
  Card,
  Filters,
  Select,
  useIndexResourceState,
  Text,
  Stack,
  Avatar,
  Modal,
  TextContainer,
  Tabs,
  Button,
  ButtonGroup,
  Thumbnail,
} from "@shopify/polaris";
import { useEffect, useState, useCallback } from "react";
import { getProductsData } from "./ProductsData";
import "./PageStyles.css";

export default function NewList() {
  const [data, setData] = useState([]);
  const [active, setActive] = useState(false);
  const [modalData, setModatData] = useState({
    title: "",
    image: "",
    desc: "",
    rating: "",
  });
  const [category, setCategory] = useState();
  const [selectedData, setSelectedData] = useState(data);
  const [selected, setSelected] = useState(0);
  const [popoverActive, setPopoverActive] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await getProductsData();
      setData(res);
      setSelectedData(res);
      console.log("res ", res);
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log("category ", category);
    const results = data.filter((obj) => {
      return true;
      //   category.includes(obj.category) || !category;
    });
    console.log("results ", results);
    setSelectedData(results);
  }, [category]);

  const resourceName = {
    singular: "product",
    plural: "products",
  };
  const handleDataChange = useCallback((value) => setData(value), []);

  const handleChange = (title, image, desc, rate, count) => {
    setActive(!active);
    setModatData({ title, image, desc, rate, count });
  };

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );
  const handleCategoryChange = useCallback((value) => setCategory(value), []);

  const handleCategoryRemove = useCallback(() => setCategory(null), []);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  const filters = [
    {
      key: "category",
      label: "Category",
      filter: (
        <ChoiceList
          title="Category"
          titleHidden
          choices={[
            { label: "Men", value: "men's clothing" },
            { label: "Jewels", value: "jewelery" },
            { label: "Electronics", value: "electronics" },
            { label: "Women", value: "women's clothing" },
          ]}
          selected={category || []}
          onChange={handleCategoryChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
  ];

  const appliedFilters = [];

  if (!isEmpty(category)) {
    const key = "category";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, category),
      onRemove: handleCategoryRemove,
    });
  }

  const rowMarkup = selectedData.map(
    ({ id, image, title, price, description, rating, category }, index) => (
      <IndexTable.Row id={id} key={id} position={index}>
        <IndexTable.Cell>
          <img
            className="fitImage"
            src={image}
            alt={image}
            onClick={() =>
              handleChange(title, image, description, rating.rate, rating.count)
            }
            style={{ cursor: "pointer" }}
          />
        </IndexTable.Cell>

        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            <div
              className="title1"
              onClick={() =>
                handleChange(
                  title,
                  image,
                  description,
                  rating.rate,
                  rating.count
                )
              }
              style={{ cursor: "pointer" }}
            >
              {title}
            </div>
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <div
            onClick={() =>
              handleChange(title, image, description, rating.rate, rating.count)
            }
            style={{ cursor: "pointer" }}
          >
            {price}
          </div>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <div
            onClick={() =>
              handleChange(title, image, description, rating.rate, rating.count)
            }
            style={{ cursor: "pointer" }}
          >
            {category}
          </div>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <div
            onClick={() =>
              handleChange(title, image, description, rating.rate, rating.count)
            }
            style={{ cursor: "pointer" }}
          >
            {rating.rate}
          </div>
        </IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  console.log("reseer", selectedData);

  const tabs = [
    {
      id: "all-customers-1",
      content: "All",
      accessibilityLabel: "All customers",
      panelID: "all-customers-content-1",
    },
    {
      id: "men's-clothing-1",
      content: "Men's clothing",
      panelID: "men's-clothing-content-1",
    },
    {
      id: "electronics-1",
      content: "Electronics",
      panelID: "electronics-content-1",
    },
    {
      id: "jewelery-1",
      content: "Jewelery",
      panelID: "jewelery-content-1",
    },
    {
      id: "women's-cloting-1",
      content: "Women's Clothing",
      panelID: "women's-cloting-content-1",
    },
  ];

  return (
    <div>
      <Text variant="heading3xl" as="span" alignment="start">
        <div className="buttonStyles">
          Products
          <ButtonGroup>
            <Button plain>
              <div style={{ fontWeight: "bold" }}>Import</div>
            </Button>
            <Button plain>
              <div style={{ fontWeight: "bold" }}>Export</div>
            </Button>
            <Button onClick={togglePopoverActive} disclosure>
              More actions
            </Button>
            <Button primary>Add Product</Button>
          </ButtonGroup>
        </div>
      </Text>
      <Card>
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}></Tabs>
        <Card.Section>
          <Filters
            //   queryValue={queryValue}
            filters={filters}
            appliedFilters={appliedFilters}
            //   onQueryChange={handleFiltersQueryChange}
            //   onQueryClear={handleQueryValueRemove}
            //   onClearAll={handleFiltersClearAll}
          />
        </Card.Section>

        <IndexTable
          resourceName={resourceName}
          itemCount={data.length}
          headings={[
            { title: " " },
            { title: "Title" },
            { title: "Price" },
            { title: "Category" },
            { title: "Rating", hidden: false },
          ]}
          selectable={false}
        >
          {rowMarkup}
        </IndexTable>

        <div style={{ height: "500px" }}>
          <Modal
            // activator={activator}
            open={active}
            onClose={handleChange}
            title={modalData.title}
          >
            {/* <Text variant alignment="center"> */}
            {/* <div className="title1"> */}
            <Modal.Section>
              <img
                className="modalImage"
                src={modalData.image}
                alt={modalData.image}
              />
            </Modal.Section>
            {/* </div> */}
            {/* </Text> */}
            <Modal.Section>
              <Stack vertical>
                <Text variant="headingLg" as="h5">
                  A Description :
                </Text>
                <TextContainer>
                  <p>{modalData.desc}</p>
                </TextContainer>
              </Stack>
            </Modal.Section>
            <Modal.Section>
              <Stack vertical>
                <Text variant="headingLg" as="h5">
                  Rating :
                </Text>
                <TextContainer>
                  <Text variant="bodyMd" fontWeight="bold" as="span">
                    Rating:
                  </Text>
                  <span> {modalData.rate}</span>
                  <p> </p>
                  <Text variant="bodyMd" fontWeight="bold" as="span">
                    Count:
                  </Text>
                  <span> {modalData.count}</span>
                </TextContainer>
              </Stack>
            </Modal.Section>
          </Modal>
        </div>
      </Card>
    </div>
  );
}

function disambiguateLabel(key, value) {
  switch (key) {
    case "taggedWith":
      return `Tagged with ${value}`;
    case "availability":
      return value.map((val) => `Available on ${val}`).join(", ");
    case "productType":
      return value.join(", ");
    default:
      return value;
  }
}

function isEmpty(value) {
  if (Array.isArray(value)) {
    return value.length === 0;
  } else {
    return value === "" || value == null;
  }
}
