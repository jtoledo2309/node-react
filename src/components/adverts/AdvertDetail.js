import Page from "../layout/Page";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAdvertsDetail } from "./service";

const AdvertDetail = (props) => {
  const [advert, setAdvert] = useState(null);
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
  return (
    <Page title="Detail product" {...props}>
      <div>{JSON.stringify(advert)}</div>
    </Page>
  );
};

export default AdvertDetail;
