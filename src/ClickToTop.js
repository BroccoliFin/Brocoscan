import { FaChevronUp } from "react-icons/fa";
const ClickToTop = () => {
  const ScrollToTopNow = () => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
    });
  };
  return (
    <div>
      <div className="scroll-to-top">
        <button onClick={ScrollToTopNow}>
          <FaChevronUp />
        </button>
      </div>
    </div>
  );
};
export default ClickToTop;
