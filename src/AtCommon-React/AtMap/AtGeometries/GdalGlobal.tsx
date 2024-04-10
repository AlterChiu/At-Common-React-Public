import proj4 from "proj4";

export const EPSG_TWD97 =
  "+proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +units=m +no_defs";
export const EPSG_WGS84 = "EPSG:4326";

export const CoordinateTranslate = (
  sourcePoint: [number, number], //經緯，lon、lat
  sourceEPSG: string,
  targetEPSG: string
) => {
  return proj4(sourceEPSG, targetEPSG, sourcePoint);
};
