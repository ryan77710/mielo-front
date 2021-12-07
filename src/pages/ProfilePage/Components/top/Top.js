import { useState } from "react";
import uid2 from "uid2";

const Top = (props) => {
  const { title, data, setData } = props;

  const [toogle, setToogle] = useState(false);

  const handleAddTopClick = (state, setState, toogle, setToogle) => {
    !toogle && setToogle(true);
    const tab = [...state];
    tab.push({ id: uid2(10), title: "new top :)", order: state.length + 1 });
    setState(tab);
  };
  const handleAboutTitleChange = (event, order, state, setState) => {
    const value = event.target.value;

    const tab = [...state];
    tab[order - 1].title = value;
    setState(tab);
  };
  const handleDeleteAboutElement = (index, state, setState) => {
    const tab = [...state];
    tab.splice(index - 1, 1);
    tab.forEach((ele) => {
      if (ele.order > index) {
        ele.order--;
      }
    });
    setState(tab);
  };
  return (
    <div className="about-tops">
      <div>
        <h2>top {title}</h2>
        <div>
          <button disabled={data.length < 10 ? false : true} onClick={() => handleAddTopClick(data, setData, toogle, setToogle)}>
            +
          </button>
          <button>o</button>
          <button onClick={() => setToogle((x) => !x)}>{toogle ? "-" : "+"}</button>
        </div>
      </div>
      {toogle ? (
        <div className="about-top-container">
          {data.length > 0 ? (
            <div>
              {data.map((top) => {
                return (
                  <div key={top.id} className="about-top">
                    <span>{top.order}</span>
                    <input type="text" onChange={(event) => handleAboutTitleChange(event, top.order, data, setData)} value={top.title} />
                    <div>
                      <button onClick={() => handleDeleteAboutElement(top.order, data, setData)}>X</button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="top-missing-message">no favorite series</div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default Top;
