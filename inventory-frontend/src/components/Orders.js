import { useState, useEffect } from "react";

export const Orders = () => {
  const [id, setId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("Buy your Favourite Product!");

  useEffect(() => {
    (async () => {
      try {
        if (id) {
          const response = await fetch(`http://127.0.0.1:8000/products/${id}`);
          const content = response.json();

          const price = parseFloat(content.price) * 1.2;
          setMessage(`Your product price is: $${price}`);
        }
      } catch {
        setMessage("Buy your favourite Product!");
      }
    })();
  }, [id]);

  const submit = async (event) => {
    event.preventDefault();

    await fetch("http://127.0.0.1:8001/orders/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        quantity,
      }),
    });

    setMessage("Thank you for your order!");
  };

  return (
    <div className="container">
      <main>
        <div className="py-5 text-center">
          <h2>Checkout Form</h2>
          <p className="lead">{message}</p>
        </div>

        <form onSubmit={submit}>
          <div className="row g-3">
            <div className="col-sm-6">
              <label className="form-label">Product</label>
              <input
                className="form-control"
                onChange={(e) => setId(e.target.value)}
              />
            </div>

            <div className="col-sm-6">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                className="form-control"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </div>

          <hr className="my-4" />
          <button className="w-100 btn btn-primary btn-lg" type="submit">
            Buy
          </button>
        </form>
      </main>
    </div>
  );
};
