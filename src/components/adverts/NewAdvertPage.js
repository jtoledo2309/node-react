import { useEffect, useState } from "react";
import Button from "../common/Button";
import RadioButton from "../common/RadioButton";
import FormField from "../common/FormField";
import Page from "../layout/Page";
import CheckBox from "../common/Checkbox";
import { createAdvert, getTags } from "./service";
import { useNavigate } from "react-router-dom";

const NewAdvertPage = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [forSale, setForSale] = useState(undefined);
  const [tags, setTags] = useState([]);
  const [etiquetas, setEtiquetas] = useState([]);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newAdvert = await createAdvert({
        name: name,
        sale: forSale,
        price: price,
        tags: tags,
      });
      navigate(`/adverts/${newAdvert.id}`);
    } catch (error) {
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

  //console.log(etiquetas);

  return (
    <Page title="Upload a product" {...props}>
      <form onSubmit={handleSubmit}>
        <FormField
          type="text"
          name="producto"
          className="newAdvert-name"
          label="Product to upload"
          onChange={handleChangeName}
          value={name}
        />
        <FormField
          type="text"
          name="precio"
          className="newAdvert-price"
          label="Money"
          onChange={handleChangePrice}
          value={price}
        />
        <label>Compra o venta</label>
        <RadioButton
          type="radio"
          name="venta"
          id="venta"
          className="newAdvert-venta"
          label="Venta"
          onChange={handleForSale}
          value={forSale}
        />
        <RadioButton
          type="radio"
          name="venta"
          id="venta"
          className="newAdvert-venta"
          label="Compra"
          onChange={handleForBuy}
          value={forSale}
        />
        <label>Etiquetas</label>
        <div className="newAdvert-checkbox">
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
