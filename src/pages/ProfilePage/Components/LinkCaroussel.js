const LinkCaroussel = (props) => {
  const { setAddLinkPicture } = props;
  return (
    <div className="links-container">
      <div className="link">
        <img title="your web site" onClick={() => setAddLinkPicture("/link-picture/site.jpg")} src={"/link-picture/site.jpg"} alt="your web site" />
      </div>
      <div className="link">
        <img title="you tube" onClick={() => setAddLinkPicture("/link-picture/you-tube.jpeg")} src={"/link-picture/you-tube.jpeg"} alt="you tube" />
      </div>
      <div className="link">
        <img title="facebook" onClick={() => setAddLinkPicture("/link-picture/facebook.png")} src={"/link-picture/facebook.png"} alt="link" />
      </div>
      <div className="link">
        <img title="instagram" onClick={() => setAddLinkPicture("/link-picture/instagram.jpg")} src={"/link-picture/instagram.jpg"} alt="link" />
      </div>
      <div className="link">
        <img title="linkedin" onClick={() => setAddLinkPicture("/link-picture/linkedin.png")} src={"/link-picture/linkedin.png"} alt="link" />
      </div>
      <div className="link">
        <img title="snapchat" onClick={() => setAddLinkPicture("/link-picture/snap.png")} src={"/link-picture/snap.png"} alt="link" />
      </div>
      <div className="link">
        <img title="tiktok" onClick={() => setAddLinkPicture("/link-picture/tiktok.png")} src={"/link-picture/tiktok.png"} alt="link" />
      </div>
      <div className="link">
        <img title="twitch" onClick={() => setAddLinkPicture("/link-picture/twitch.png")} src={"/link-picture/twitch.png"} alt="link" />
      </div>
      <div className="link">
        <img title="twitter" onClick={() => setAddLinkPicture("/link-picture/twitter.png")} src={"/link-picture/twitter.png"} alt="link" />
      </div>
      <div className="link">
        <img title="whatsap" onClick={() => setAddLinkPicture("/link-picture/whatsapp.jpg")} src={"/link-picture/whatsapp.jpg"} alt="link" />
      </div>
      <div className="link">
        <img title="discord" onClick={() => setAddLinkPicture("/link-picture/discord.jpg")} src={"/link-picture/discord.jpg"} alt="link" />
      </div>
      <div className="link">
        <img title="onlyfans" onClick={() => setAddLinkPicture("/link-picture/onlyfans.jpg")} src={"/link-picture/onlyfans.jpg"} alt="link" />
      </div>
      <div className="link">
        <img title="patreon" onClick={() => setAddLinkPicture("/link-picture/patreon.png")} src={"/link-picture/patreon.png"} alt="link" />
      </div>
      <div className="link">
        <img title="telegram" onClick={() => setAddLinkPicture("/link-picture/telegram.jpg")} src={"/link-picture/telegram.jpg"} alt="link" />
      </div>
      <div className="link">
        <img title="pinterest" onClick={() => setAddLinkPicture("/link-picture/pinterest.png")} src={"/link-picture/pinterest.png"} alt="link" />
      </div>
      <div className="link">
        <img title="flickr" onClick={() => setAddLinkPicture("/link-picture/flickr.jpg")} src={"/link-picture/flickr.jpg"} alt="flickr" />
      </div>
      <div className="link">
        <img title="periscope" onClick={() => setAddLinkPicture("/link-picture/periscope.png")} src={"/link-picture/periscope.png"} alt="link" />
      </div>
      <div className="link">
        <img title="xing" onClick={() => setAddLinkPicture("/link-picture/xing.png")} src={"/link-picture/xing.png"} alt="link" />
      </div>
      <div className="link">
        <img title="wechat" onClick={() => setAddLinkPicture("/link-picture/wechat.png")} src={"/link-picture/wechat.png"} alt="link" />
      </div>
      <div className="link">
        <img title="vkontakte" onClick={() => setAddLinkPicture("/link-picture/vkontakte.png")} src={"/link-picture/vkontakte.png"} alt="link" />
      </div>
      <div className="link">
        <img title="vimeo" onClick={() => setAddLinkPicture("/link-picture/vimeo.png")} src={"/link-picture/vimeo.png"} alt="link" />
      </div>
      <div className="link">
        <img title="tencent" onClick={() => setAddLinkPicture("/link-picture/tencent.jpg")} src={"/link-picture/tencent.jpg"} alt="link" />
      </div>
      <div className="link">
        <img title="soundcloud" onClick={() => setAddLinkPicture("/link-picture/soundcloud.png")} src={"/link-picture/soundcloud.png"} alt="link" />
      </div>
      <div className="link">
        <img title="sinaweibo" onClick={() => setAddLinkPicture("/link-picture/sinaweibo.jpg")} src={"/link-picture/sinaweibo.jpg"} alt="link" />
      </div>
      <div className="link">
        <img title="qzone" onClick={() => setAddLinkPicture("/link-picture/qzone.png")} src={"/link-picture/qzone.png"} alt="link" />
      </div>
      <div className="link">
        <img title="odnoklassniki" onClick={() => setAddLinkPicture("/link-picture/odnoklassniki.png")} src={"/link-picture/odnoklassniki.png"} alt="link" />
      </div>
      <div className="link">
        <img title="little red book" onClick={() => setAddLinkPicture("/link-picture/littleRedBook.png")} src={"/link-picture/littleRedBook.png"} alt="link" />
      </div>
      <div className="link">
        <img title="line" onClick={() => setAddLinkPicture("/link-picture/line.png")} src={"/link-picture/line.png"} alt="link" />
      </div>
      <div className="link">
        <img title="dailymotion" onClick={() => setAddLinkPicture("/link-picture/dailymotion.png")} src={"/link-picture/dailymotion.png"} alt="link" />
      </div>
      <div className="link">
        <img title="byte" onClick={() => setAddLinkPicture("/link-picture/byte.png")} src={"/link-picture/byte.png"} alt="link" />
      </div>
    </div>
  );
};
export default LinkCaroussel;
