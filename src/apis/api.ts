/**
 * Pseudo APIs
 */

import { mocked_equipments, mocked_telematicData } from "./data";

const FAKE_API_DELAY: number = 2e3;

export const fake_fetch = async <T>(
  url: string,
  method: string
): Promise<T> => {
  return new Promise((resolve) => {
    if (url.startsWith(`${process.env.REACT_APP_BACKEND_URL}/equipments/:`)) {
      const param = url.substring(url.indexOf("/:") + 2);
      // console.log(param);

      setTimeout(() => {
        resolve(
          mocked_telematicData.find(
            (datum) =>
              datum.EquipmentHeader.SerialNumber.toLowerCase() ===
              param.toLowerCase()
          ) as any
        );
      }, FAKE_API_DELAY);
    } else if (url === `${process.env.REACT_APP_BACKEND_URL}/equipments`) {
      setTimeout(() => {
        resolve(mocked_equipments as any);
      }, FAKE_API_DELAY);
    }
  });
};
