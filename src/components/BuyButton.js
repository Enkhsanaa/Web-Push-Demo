import Toki from "../toki.service";

function BuyButton() {
  return (
    <button
      aria-label="buy from shoppy"
      className="CustomButton"
      onClick={() => {
        console.log("calling Toki buy");
        Toki.buy(
          "623bd591bb6c3f36a6356457",
          100,
          "order-000001",
          "Test",
          "http://10.21.67.155:5200/v1/web/callback"
        );
      }}
    >
      Open toki buy screen
    </button>
  );
}

export default BuyButton;
