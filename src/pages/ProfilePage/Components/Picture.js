import axios from "axios";

const Picture = (props) => {
  const { url, assetId, publicId, authToken } = props;

  const handleDeletePictureClick = async () => {
    try {
      if (assetId && publicId) {
        const sendData = {
          asset_id: assetId,
          public_id: publicId,
        };
        const response = await axios.post(`${process.env.REACT_APP_API_URL}user/delete-picture`, sendData, { headers: { Authorization: `Bearer ${authToken}` } });
        if (response) {
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="picture">
      <img src={url} alt="pic" />
      <span onClick={handleDeletePictureClick}>X</span>
    </div>
  );
};
export default Picture;
