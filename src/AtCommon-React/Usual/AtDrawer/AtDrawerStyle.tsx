import {
  list_background_prim,
  list_background_sec,
} from "../AtList/AtListStyle";

export const drawer_title = {
  bgcolor: "#495057",
  color: "#dee2e6",
  "&:hover": { bgcolor: "#495057", color: "#dee2e6" },
};

export const drawer_title_font = {
  bgcolor: "#495057",
  color: "#dee2e6",
  fontSize: "1.4rem",
  fontWeight:"700",
  "&:hover": { bgcolor: "#495057", color: "#dee2e6" },
};

// drawer 底下的群組Title
export const drawer_groupTitle = {
  paddingTop:"25px",
  paddingLeft:"5px",
  bgcolor: "#ced4da",
  color: "#343a40",
  fontWeight: "bold",
  fontSize: "1.13rem",
  borderBottom: "0.2rem solid #ced4da",
  "&:hover": { color: "#495057" },
};

// drawer 底下的list樣式都直接繼承過來
export const drawer_listPrim = Object.assign({}, list_background_prim);
export const drawer_listSec = Object.assign({}, list_background_sec);
