import { useEffect, useState } from "react";
import emptyIcon from "../../assets/empty.png";

export default function Pagination({
  totalItems = 100,
  itemsPerPage = 10,
  paginate = () => {},
  style = {},
  className = "",
}) {
  const pages = Math.ceil(totalItems / itemsPerPage);
  const numberOfPages = [];
  for (let i = 1; i <= pages; i++) {
    numberOfPages.push(i);
  }

  // Current active button number
  const [currentButton, setCurrentButton] = useState(1);

  // Array of buttons what we see on the page
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);

  useEffect(() => {
    let tempNumberOfPages = [...arrOfCurrButtons];

    let dotsInitial = "...";
    let dotsLeft = "... ";
    let dotsRight = " ...";

    if (numberOfPages?.length < 6) {
      tempNumberOfPages = numberOfPages;
    } else if (currentButton >= 1 && currentButton <= 3) {
      tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages?.length];
    } else if (currentButton === 4) {
      const sliced = numberOfPages.slice(0, 5);
      tempNumberOfPages = [...sliced, dotsInitial, numberOfPages?.length];
    } else if (currentButton > 4 && currentButton < numberOfPages?.length - 2) {
      // from 5 to 8 -> (10 - 2)
      const sliced1 = numberOfPages.slice(currentButton - 2, currentButton); // sliced1 (5-2, 5) -> [4,5]
      const sliced2 = numberOfPages.slice(currentButton, currentButton + 1); // sliced1 (5, 5+1) -> [6]
      tempNumberOfPages = [
        1,
        dotsLeft,
        ...sliced1,
        ...sliced2,
        dotsRight,
        numberOfPages?.length,
      ]; // [1, '...', 4, 5, 6, '...', 10]
    } else if (currentButton > numberOfPages?.length - 3) {
      // > 7
      const sliced = numberOfPages.slice(numberOfPages?.length - 4); // slice(10-4)
      tempNumberOfPages = [1, dotsLeft, ...sliced];
    } else if (currentButton === dotsInitial) {
      //[1, 2, 3, 4, "...", 10]?.length = 6 - 3  = 3
      // arrOfCurrButtons[3] = 4 + 1 = 5
      // or
      // [1, 2, 3, 4, 5, "...", 10]?.length = 7 - 3 = 4
      // [1, 2, 3, 4, 5, "...", 10][4] = 5 + 1 = 6
      setCurrentButton(arrOfCurrButtons[arrOfCurrButtons?.length - 3] + 1);
    } else if (currentButton === dotsRight) {
      setCurrentButton(arrOfCurrButtons[3] + 2);
    } else if (currentButton === dotsLeft) {
      setCurrentButton(arrOfCurrButtons[3] - 2);
    }

    setArrOfCurrButtons(tempNumberOfPages);
    paginate(currentButton);
  }, [currentButton, paginate]);

  const defaultClassName =
    "text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-offset-0 px-4 py-2  lg:text-xl text-sm ";
  const activeClassName = "bg-[#77d256] text-white disabled:opacity-50";

  const buttons = (
    <div className={"w-fit " + className} style={style}>
      <button
        onClick={() =>
          setCurrentButton((prev) => (prev <= 1 ? prev : prev - 1))
        }
        disabled={currentButton === 1}
        className={` rounded-l-md disabled:opacity-50 ${defaultClassName}`}
      >
        {"<"}
      </button>
      {arrOfCurrButtons.map((item, index) => (
        <button
          key={index}
          onClick={() => setCurrentButton(item)}
          className={`${
            currentButton === item && activeClassName
          } ${defaultClassName}`}
        >
          {item}
        </button>
      ))}
      <button
        onClick={() =>
          setCurrentButton((prev) =>
            prev >= numberOfPages?.length ? prev : prev + 1
          )
        }
        disabled={currentButton === numberOfPages?.length}
        className={`rounded-r-md  disabled:opacity-50 ${defaultClassName}`}
      >
        {">"}
      </button>
    </div>
  );

  if (totalItems === 0)
    return (
      <div className="flex justify-center items-end mt-10">
        <img src={emptyIcon} alt="empty" className="max-w-[400px]" />
      </div>
    );
  if (totalItems <= itemsPerPage) return null;

  return buttons;
}
