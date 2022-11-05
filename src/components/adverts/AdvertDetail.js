import Layout from "../layout/Layout";
import { useParams } from "react-router-dom";

const AdvertDetail = (props) => {
  const { advertId } = useParams();

  return (
    <Layout title="Upload a product" {...props}>
      <div>Advert detail: {advertId}</div>
    </Layout>
  );
};

export default AdvertDetail;
