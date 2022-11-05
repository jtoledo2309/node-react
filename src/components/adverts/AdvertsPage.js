import { useEffect, useState } from "react";
import { getAdverts } from "./service";
import Layout from "../layout/Layout";

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
    <Layout title="Node-React" {...props}>
      <div className="advertsPage">
        {adverts.length ? (
          <ul>
            {adverts.map((item) => (
              <li key={item.id}>
                Producto: {item.name} - etiqueta/s: {item.tags}
              </li>
            ))}
          </ul>
        ) : (
          <button>Sube el primer producto</button>
        )}
      </div>
    </Layout>
  );
};

export default AdvertsPage;
