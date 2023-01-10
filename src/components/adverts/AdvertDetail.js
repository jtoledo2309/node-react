import Page from "../layout/Page";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { removeAdvert } from "./service";
import Button from "../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { getUniqueAdvert } from "../../store/selector";
import { advertLoad } from "../../store/actions";

const AdvertDetail = (props) => {
  //const [advert, setAdvert] = useState(null);
  const [deleteProdcut, setDeleteProdcut] = useState(false);
  const [removeProduct, setRemoveProduct] = useState(false);
  const { advertId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const advert = useSelector(getUniqueAdvert(advertId));
  console.log(advert);

  useEffect(() => {
    dispatch(advertLoad(advertId)).catch((error) => {
      if (error.status === 404) {
        navigate("404");
      }
    });
  }, [dispatch, advertId, navigate]);

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
          <p>Name: {advert.name}</p>
          <p>
            - Precio: {advert.price}$ -Estado:
            {advert.sale ? "Se vende" : "Se compra"}
          </p>
          <p>
            -Etiquetas:
            {advert.tags.toString()}
          </p>
          <div>
            {advert.photo ? (
              <img
                height="60%"
                width="40%"
                src={advert.photo}
                alt="imagen del producto"
              />
            ) : (
              "Imagen no disponible"
            )}{" "}
          </div>
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
