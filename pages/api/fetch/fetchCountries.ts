import { NextApiRequest, NextApiResponse } from "next";
import universities from "../../../utils/world_universities_and_domains.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  switch (method) {
    case "POST": {
      const countries = universities.map((university) => university.country);
      const uniqueCountries = Array.from(new Set(countries));
      console.log(uniqueCountries);
      res.status(200).send({ countries: uniqueCountries });
      break;
    }
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
