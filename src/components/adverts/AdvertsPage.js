import { useEffect, useState } from "react";
import { getAdverts, getTags } from "./service";
import Page from "../layout/Page";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import { getAdvertsFiltered, getEndpoint } from "../../utils/SearchParams";
import CheckBox from "../common/Checkbox";
import { useNavigate } from "react-router-dom";

import "./AdvertsPage.css";

const EmptyList = () => (
  <div>
    <p>Sube tu primer producto</p>
    <Button as={Link} to="new" variant="primary">
      Subir
    </Button>
  </div>
);

const AdvertsPage = (props) => {
  const [adverts, setAdverts] = useState([]);
  const [name, setName] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [forSale, setForSale] = useState(undefined);
  const [tags, setTags] = useState([]);
  const [etiquetas, setEtiquetas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const execute = async () => {
      const adverts = await getAdverts();
      setAdverts(adverts);
    };
    execute();
  }, []);

  const handleChangeName = (event) => setName(event.target.value);
  const handleChangePriceMin = (event) => setPriceMin(event.target.value);
  const handleChangePriceMax = (event) => setPriceMax(event.target.value);
  const precioFinal = [];
  if (priceMin) {
    precioFinal[0] = priceMin;
  }
  if (priceMax) {
    precioFinal[1] = priceMax;
  }

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
  if (precioFinal !== []) {
    petition.price = precioFinal;
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
      setAdverts(advertsFiltered);
    } catch (error) {
      navigate("404");
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
    <Page title="Node-React" {...props}>
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
            name="precio-min"
            className="newAdvert-price"
            placeholder="Precio minimo"
            onChange={handleChangePriceMin}
            value={priceMin}
          />
          <input
            type="number"
            name="precio-max"
            className="newAdvert-price"
            placeholder="Precio maximo"
            onChange={handleChangePriceMax}
            value={priceMax}
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
      <div className="advertsPage">
        {adverts.length ? (
          <ul>
            {adverts.map((item) => (
              <li className="advertsPage-item" key={item.id}>
                <Link to={`/adverts/${item.id}`}>
                  Producto: {item.name} - Etiqueta/s: {item.tags} -Precio:{" "}
                  {item.price} -Estado:{item.sale ? "Se vende" : "Se compra"}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyList />
        )}
      </div>
    </Page>
  );
};

export default AdvertsPage;
