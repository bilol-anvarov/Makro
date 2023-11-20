const PromotionCard = ({ imgUrl, onClick }) => {
  return (
    <div
      className="w-full overflow-hidden md:rounded-[50px] sm:rounded-[30px] rounded-[15px] cursor-pointer"
      onClick={onClick ? onClick : () => null}
    >
      <img src={imgUrl} alt="img not found" style={{ width: "100%", height: "100%" }} />
    </div>
  );
};
export default PromotionCard;
