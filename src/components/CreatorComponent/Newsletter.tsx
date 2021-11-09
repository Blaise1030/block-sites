import {useEffect, useState} from "react";

const Newsletter = ({w, columns}) => {
  //   const {columns} = useContext(CreatorContext);
  const [showButtonOnly, setShowButton] = useState(false);

  useEffect(() => {
    setShowButton(w > columns / 2);
  }, [w, columns]);

  return (
    <div className="border border-black h-full w-full bg-white flex flex-col items-center justify-center">
      <div className="flex flex-row w-full items-center justify-center">
        {showButtonOnly && (
          <input
            disabled
            className="border rounded mr-1 border-black outline-none p-1.5 w-1/3"
            type="text"
          />
        )}
        <div
          className={`border-gray border bg-black text-white py-2 px-3 rounded hover:shadow-lg duration-200 ${
            !showButtonOnly ? "text-2xl" : ""
          }`}
        >
          Subscribe
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
