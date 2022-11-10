import Page from "../layout/Page";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAdvertsDetail, removeAdvert } from "./service";
import Button from "../common/Button";

const AdvertDetail = (props) => {
  const [advert, setAdvert] = useState(null);
  const [deleteProdcut, setDeleteProdcut] = useState(false);
  const [removeProduct, setRemoveProduct] = useState(false);
  const { advertId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getAdvertsDetail(advertId)
      .then((advert) => setAdvert(advert))
      .catch((error) => {
        if (error.status === 404) {
          navigate("404");
        }
      });
  }, [advertId, navigate]);

  const handleDeleteProduct = () => setDeleteProdcut(true);

  const removeAdvise = () => setDeleteProdcut(false);

  const handleRemoveProdcut = () => setRemoveProduct(true);

  const borrarProducto = async (advert) => {
    try {
      console.log(advert);
      await removeAdvert(advert.id);
      navigate("/adverts");
    } catch (error) {
      navigate("404");
    }
  };
  if (removeProduct) {
    borrarProducto(advert);
  }

  return (
    <Page title="Detail product" {...props}>
      {advert !== null ? (
        <div>
          Name: {advert.name} - Precio: {advert.price}$ -Estado:
          {advert.sale ? "Se vende" : "Se compra"} -Etiquetas:
          {advert.tags}
          {advert.photo ? (
            <img src={advert.photo} alt="imagen del producto" />
          ) : (
            ""
          )}{" "}
        </div>
      ) : (
        " "
      )}

      <Button className="detailProduct-button" onClick={handleDeleteProduct}>
        {" "}
        Borrar
      </Button>
      {deleteProdcut ? (
        <div>
          <h3>Estas seguro?</h3>
          <Button type="submit" onClick={handleRemoveProdcut}>
            Si
          </Button>
          <Button onClick={removeAdvise}>No</Button>
        </div>
      ) : (
        ""
      )}
    </Page>
  );
};

export default AdvertDetail;
