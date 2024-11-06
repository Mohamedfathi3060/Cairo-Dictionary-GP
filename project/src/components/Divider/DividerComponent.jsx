import Divider from "@mui/material/Divider";
import img from "../../assets/images/ض.png";
import styles from "./style.module.css";
function DividerComponent({}) {
  return (
    // <Divider className="divider">
    //   <img src={img} alt="" style={{ width: "60px", height: "30px" }} />
    // </Divider>
    <div>
      <hr />
      <span className={styles.span}>
        <img src={img} alt="" style={{ width: "100px", height: "60px" }} />
      </span>
    </div>
  );
}

export default DividerComponent;
