import { useEffect, useState } from "react";
import { getAdverts } from "./service";
import Page from "../layout/Page";
import { Link } from "react-router-dom";
import Button from "../common/Button";

import "./AdvertsPage.css";
import { FilterNav } from "../common/FilterNav";

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

  useEffect(() => {
    const execute = async () => {
      const adverts = await getAdverts();
      setAdverts(adverts);
    };
    execute();
  }, []);

  return (
    <Page title="Node-React" {...props}>
      <FilterNav />
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
