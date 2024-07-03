import React, { useRef } from "react";

const Card = ({ university }: any) => {
  const { name, domains, web_pages, country, alpha_two_code, state_province } =
    university;

  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (cardRef.current) {
      const cardElement = cardRef.current;
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (context) {
        const cardWidth = cardElement.offsetWidth;
        const cardHeight = cardElement.offsetHeight;
        canvas.width = cardWidth * 2;
        canvas.height = cardHeight * 2;
        context.scale(2, 2);

        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.font = "16px Arial";
        context.fillStyle = "#000000";

        let yPos = 30;

        context.fillText(`Name: ${name}`, 20, yPos);
        yPos += 24;
        context.fillText(`Country: ${country}`, 20, yPos);
        yPos += 24;
        context.fillText(`Domains: ${domains.join(", ")}`, 20, yPos);
        yPos += 24;
        context.fillText(`Web Pages: ${web_pages.join(", ")}`, 20, yPos);
        yPos += 24;
        context.fillText(`Alpha Two Code: ${alpha_two_code}`, 20, yPos);
        yPos += 24;
        context.fillText(`State/Province: ${state_province}`, 20, yPos);

        const image = canvas.toDataURL("image/jpeg", 1.0);
        const link = document.createElement("a");
        link.download = `${name}.jpeg`;
        link.href = image;
        link.click();
      }
    }
  };

  return (
    <div
      className="card bg-white rounded-lg shadow-md p-6 mb-4 border border-gray-200"
      ref={cardRef}
    >
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="mb-2">
        <strong>Country:</strong> {country}
      </p>
      <p className="mb-2">
        <strong>Domains:</strong> {domains.join(", ")}
      </p>
      <p className="mb-2">
        <strong>Web Pages:</strong>{" "}
        {web_pages.map((page: string, index: number) => (
          <a
            key={index}
            href={page}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {page}
            {index !== web_pages.length - 1 && ", "}
          </a>
        ))}
      </p>
      <p className="mb-2">
        <strong>Alpha Two Code:</strong> {alpha_two_code}
      </p>
      <p className="mb-2">
        <strong>State/Province:</strong> {state_province}
      </p>
      <button
        onClick={handleDownload}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Download Card
      </button>
    </div>
  );
};

export default Card;
