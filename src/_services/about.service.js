import axios from "axios";
export const aboutUsService = {
  aboutUsAPi,
};
const config = {
  headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` },
};
// counter api
async function aboutUsAPi(data) {
  return await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/about-us`,
    config,
    data
  );
}
