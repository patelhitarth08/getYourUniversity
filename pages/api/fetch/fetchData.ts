import { NextApiRequest, NextApiResponse } from "next";
import universities from "../../../utils/world_universities_and_domains.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  switch (method) {
    case "POST": {
      const country = req.body.country;
      const filteredUniversities = universities.filter((university) => {
        return university.country == country;
      });
      let states = filteredUniversities.map(
        (university) => university["state_province"]
      );
      states = states.filter((state) => state != null);
      const uniqueStates = Array.from(new Set(states));
      res.status(200).send({ filteredUniversities, uniqueStates });
      break;
    }
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
