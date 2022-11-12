import { useEffect, useState } from "react";
import Button from "../common/Button";
import RadioButton from "../common/RadioButton";
import Page from "../layout/Page";
import CheckBox from "../common/Checkbox";
import { createAdvert, getTags } from "./service";
import { useNavigate } from "react-router-dom";

import "./NewAdvertsPage.css";

const NewAdvertPage = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [forSale, setForSale] = useState(undefined);
  const [tags, setTags] = useState([]);
  const [etiquetas, setEtiquetas] = useState([]);
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const handleChangeName = (event) => setName(event.target.value);
  const handleChangePrice = (event) => setPrice(event.target.value);
  const handleForSale = () => {
    setForSale(true);
  };
  const handleForBuy = () => {
    setForSale(false);
  };

  const handleChangeCheckbox = (event) => {
    if (event.target.checked) {
      setTags([...tags, event.target.value]);
    } else {
      setTags(tags.filter((tag) => tag !== event.target.value));
    }
  };

  const handleChangePhoto = (event) => setPhoto(event.target.files[0]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("sale", forSale);
    formData.append("price", price);
    formData.append("tags", tags);
    if (photo !== null) {
      formData.append("photo", photo);
    }
    try {
      const newAdvert = await createAdvert(formData);
      navigate(`/adverts/${newAdvert.id}`);
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        navigate("/login");
      }
    }
  };

  const isDisabled = () => {
    return !(name && price && forSale !== undefined && tags.length > 0);
  };

  useEffect(() => {
    const traerEtiquetas = async () => {
      const etiquetas = await getTags();
      setEtiquetas(etiquetas);
    };
    traerEtiquetas();
  }, []);

  return (
    <Page title="Upload a product" {...props}>
      <form onSubmit={handleSubmit} className="newAdvert-page-form">
        <div className="name-form-wrap">
          <label className="label-form">Nombre del producto</label>
          <input
            type="text"
            name="producto"
            className="newAdvert-name-form"
            placeholder="Nombre del producto"
            onChange={handleChangeName}
            value={name}
          />
        </div>
        <div className="price-form-wrap">
          <label className="label-form">Precio del producto</label>
          <input
            type="number"
            name="precio"
            className="newAdvert-price-form"
            placeholder="Precio ($)"
            onChange={handleChangePrice}
            value={price}
          />
        </div>
        <label className="label-form">Compra o venta</label>
        <RadioButton
          type="radio"
          name="venta"
          id="venta"
          className="newAdvert-venta-form"
          label="Venta"
          onChange={handleForSale}
          value={forSale}
        />
        <RadioButton
          type="radio"
          name="venta"
          id="venta"
          className="newAdvert-venta-form"
          label="Compra"
          onChange={handleForBuy}
          value={forSale}
        />
        <label className="label-form">Etiquetas</label>
        <div className="newAdvert-checkbox-form">
          {etiquetas.map((tag) => (
            <CheckBox
              type="checkbox"
              key={tag}
              name={tag}
              label={tag}
              onChange={handleChangeCheckbox}
              value={tag}
            />
          ))}
        </div>

        <input
          type="file"
          name="upload-photo"
          accept="image/png, .jpeg, .jpg"
          onChange={handleChangePhoto}
        />

        <Button
          type="submit"
          className="newAdvert-submit"
          disabled={isDisabled()}
        >
          Subir
        </Button>
      </form>
    </Page>
  );
};

export default NewAdvertPage;
