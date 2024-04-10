var prim_bgColor = "#ced4da";
var prim_color = "#212529";
var prim_hover_bgColor = "#e9ecef";
var prim_hover_color = "#212529";

var sec_bgColor = "#FCFCFD";
var sec_color = "#495057";
var sec_hover_bgColor = "#F2F4F5";
var sec_hover_color = "#495057";

export const list_background_prim = {
  bgcolor: prim_bgColor,
  color: prim_color,
  borderBottom: "0.1rem solid #dee2e6",
  fontWeight: "600",
  "&:hover": { bgcolor: prim_hover_bgColor, color: prim_hover_color },
};

export const list_ft_prim = {
  color: prim_color,
  fontWeight: "600",
};

export const list_background_sec = {
  bgcolor: sec_bgColor,
  color: sec_color,
  borderBottom: "0.1rem solid #dee2e6",
  "&:hover": { bgcolor: sec_hover_bgColor, color: sec_hover_color },
};

export const list_ft_sec = {
  color: sec_color,
};

export const title_background = {
  bgcolor: "#6c757d",
  color: "#f8f9fa",
};
