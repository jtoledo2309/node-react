import Page from "../layout/Page";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { getUniqueAdvert } from "../../store/selector";
import { advertDeleted, advertLoad } from "../../store/actions";

const AdvertDetail = (props) => {
  //const [advert, setAdvert] = useState(null);
  const [deleteProdcut, setDeleteProdcut] = useState(false);
  const { advertId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const advert = useSelector(getUniqueAdvert(advertId));

  useEffect(() => {
    dispatch(advertLoad(advertId)).catch((error) => {
      if (error.status === 404) {
        navigate("404");
      }
    });
  }, [dispatch, advertId, navigate]);

  const handleDeleteProduct = () => setDeleteProdcut(true);

  const removeAdvise = () => setDeleteProdcut(false);

  const handleRemoveProdcut = () => {
    dispatch(advertDeleted(advert));

    navigate("/adverts");
  };

  // const borrarProducto = (advert) => {
  //     console.log(advert);
  //     dispatch(advertDeleted(advert));
  //     //await removeAdvert(advert.id);
  //     navigate("/adverts");
  // };
  // if (removeProduct) {
  //   borrarProducto(advert);
  // }

  return (
    <Page title="Detail product" {...props}>
      {advert !== undefined ? (
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
