import { useEffect, useState } from "react";
import { getAdverts, getTags } from "../adverts/service";
import { useNavigate } from "react-router-dom";
import CheckBox from "./Checkbox";
import { getAdvertsFiltered, getEndpoint } from "../../utils/SearchParams";

export const FilterNav = () => {
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
  const handleForSaleAll = () => {
    setForSale(undefined);
  };

  const handleChangeCheckbox = (event) => {
    if (event.target.checked) {
      setTags([...tags, event.target.value]);
    } else {
      setTags(tags.filter((tag) => tag !== event.target.value));
    }
  };

  let petition = {};
  if (name) {
    petition.name = name;
  }
  if (price) {
    petition.price = price;
  }
  if (forSale !== undefined) {
    petition.sale = forSale;
  }
  if (tags.length > 0) {
    petition.tags = tags;
  }

  console.log(petition);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const query = getEndpoint(petition);
      console.log(query);
      const advertsFiltered = await getAdvertsFiltered(query);
      console.log(advertsFiltered);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const traerEtiquetas = async () => {
      const etiquetas = await getTags();
      setEtiquetas(etiquetas);
    };
    traerEtiquetas();
  }, []);

  return (
    <div className="filterNav-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="producto"
          className="newAdvert-name"
          placeholder="Nombre del producto"
          onChange={handleChangeName}
          value={name}
        />
        <input
          type="number"
          name="precio"
          className="newAdvert-price"
          placeholder="Precio del producto"
          onChange={handleChangePrice}
          value={price}
        />
        <label>Venta</label>
        <input
          type="radio"
          name="venta"
          id="venta"
          className="newAdvert-venta"
          label="Venta"
          onChange={handleForSale}
          value={forSale}
        />
        <label>Compra</label>
        <input
          type="radio"
          name="venta"
          id="venta"
          className="newAdvert-venta"
          label="Compra"
          onChange={handleForBuy}
          value={forSale}
        />
        <label>Todos</label>
        <input
          type="radio"
          name="venta"
          id="venta"
          className="newAdvert-venta"
          label="Todos"
          onChange={handleForSaleAll}
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

        <button type="submit" className="newAdvert-submit">
          Buscar
        </button>
      </form>
    </div>
  );
};
