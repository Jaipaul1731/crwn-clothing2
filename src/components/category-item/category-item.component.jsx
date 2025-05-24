import "./category-item.style.scss";
import Button from "../button/button.component";

const CategoryItem = ({ category }) => {
  const { title, imageUrl } = category;
  return (
    <>
      <div className="category-container">
        <div
          className="background-image"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        ></div>
        <div className="category-body-container">
          <h2>{title}</h2>
          <p>shop now</p>
        </div>
        {/* <h1>jai</h1> */}
      </div>
    </>
  );
};

export default CategoryItem;
