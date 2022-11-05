import { useEffect, useState } from "react";
import { getAdverts } from "./service";
import Page from "../layout/Page";
import { Link } from "react-router-dom";
import Button from "../common/Button";

const EmptyList = () => (
  <div>
    <p>Sube tu primer producto</p>
    <Button as={Link} to="adverts/new" variant="primary">
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
      <div className="advertsPage">
        {adverts.length ? (
          <ul>
            {adverts.map((item) => (
              <li key={item.id}>
                <Link to={`/adverts/${item.id}`}>
                  Producto: {item.name} - etiqueta/s: {item.tags}
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
