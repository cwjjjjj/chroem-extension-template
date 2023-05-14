import { get, post } from ".";
import { QiniuFile } from "../@types/Qiniu";

export const handleUpload = async (file: File) => {
  const {
    data: { token },
  } = await get(
    "https://balloon.midway.run/qiniu/provision?midway-project-id=1_y5pPukmudE&type=IMAGE"
  );
  const formData = new FormData();

  formData.append("token", token);
  formData.append("file", file as unknown as File);

  const { data } = await post<{ file: QiniuFile; success: boolean }>(
    "https://upload.qiniup.com",
    formData,
    {
      withCredentials: false,
    }
  );
  return data.file;
};
