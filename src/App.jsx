import { useState } from "react";
import csvImage from "/csv-file.png";

export default function App() {
  const [file, setFile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  console.log(file);
  const fakeFile = {
    title: "FoodExpress",
    description: "Delicious meals delivered fast",
    phone: "01812642302",
    address: "123 Food St, Dhaka, Bangladesh",
    domain: "foodexpress.com",
  };

  const covertCsvToJson = (csv) => {
    const lines = csv.split("\n");
    const headers = lines[0].split(",");
    const result = [];

    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentLine = lines[i].split("/");

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentLine[j];
      }

      result.push(obj);
    }
    return result;
  };
  const handleBackendApiCall = async () => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const csvData = e.target.result;
      const jsonData = covertCsvToJson(csvData);
      console.log((jsonData));
    };

    reader.readAsText(file);
    //TODO: make api call here
    // setIsOpen(false);
  };
  return (
    <div className="flex items-center justify-center flex-col gap-10 h-screen">
      <h1 className="font-[600] text-4xl ">CSV to REACT APPLICATION</h1>
      <div className="border border-gray-400 w-[500px] h-[400px] rounded-2xl pt-6 px-10 flex gap-0 flex-col items-start">
        <h2 className="text-2xl mb-3">Enter your csv file here</h2>
        <div className="border-2 border-dashed border-gray-500 bg-gray-100 h-full rounded-lg w-full relative">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            className="bg-blue-50 h-full w-full cursor-pointer opacity-0"
            type="file"
            accept=".csv"
          />

          {file ? (
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-full w-full">
              <img
                className="  h-[140px] mx-auto mt-10"
                src={csvImage}
                alt="csv file"
              />
              <p className="text-center w-full text-gray-800 inter-semibold mt-5">
                {file.name} has been selected {"✔"}
              </p>
            </div>
          ) : (
            <span className="pointer-events-none absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center text-xl text-gray-600  w-full">
              Click or Drag a CSV File here
            </span>
          )}
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="my-3 py-2.5 bg-blue-600 hover:bg-blue-700 cursor-pointer duration-300 active:scale-90 text-white rounded px-4"
        >
          Generate React App
        </button>
      </div>
      {isOpen ? (
        <div className="absolute bg-[#00000046] backdrop-blur-lg w-screen h-screen flex items-center justify-center">
          <div className="bg-white w-[600px] h-[700px] rounded-2xl p-4">
            <h2 className="text-3xl mx-6 mt-6 mb-3">App Preview</h2>

            <div className="app w-full h-[595px] rounded-xl flex flex-col justify-between">
              <div>
                {/* hero */}
                <div className="bg-blue-400 rounded-lg w-full h-[280px] flex flex-col items-center justify-center ">
                  <h1 className="text-3xl font-bold text-white">
                    {fakeFile.name}
                  </h1>
                  <h3 className="text-gray-200">{fakeFile.motto}</h3>
                  <p className="bg-white px-6 py-2 rounded-lg mt-6">
                    {"fast"} delivery service in dhaka
                  </p>
                </div>
                {/* contact */}
                <div className="flex items-start flex-col gap-3 ml-6 mt-4">
                  <h3 className="font-bold text-lg">contact</h3>
                  <div className="flex items-center  gap-3">
                    <img
                      className="w-4 h-4 object-cover"
                      src="https://cdn-icons-png.flaticon.com/512/3083/3083741.png"
                      alt="website icon"
                    />
                    {fakeFile.domain}
                  </div>
                  <div className="flex items-center  gap-3">
                    <img
                      className="w-4 h-4 object-cover"
                      src="https://icons.veryicon.com/png/o/miscellaneous/heg-main-function-icon/phone-98.png"
                      alt="phone icon"
                    />
                    {fakeFile.phone}
                  </div>
                  <div className="flex items-center  gap-3">
                    <img
                      className="w-4 h-4 object-cover"
                      src="https://cdn-icons-png.flaticon.com/512/503/503080.png"
                      alt="address icon"
                    />
                    {fakeFile.address}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleBackendApiCall()}
                className="my-3 py-2.5 bg-green-600 w-fit hover:bg-green-700 cursor-pointer duration-300 active:scale-90 text-white rounded px-4"
              >
                Start generating
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
