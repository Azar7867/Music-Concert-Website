import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/PaymentGateway.css';
import { renderToString } from 'react-dom/server';
import { FaGooglePay, FaPhoneAlt } from "react-icons/fa";
import { SiPaytm} from "react-icons/si";
import { MdAccountBalanceWallet } from "react-icons/md";
import { MdAccountBalance } from "react-icons/md";

const PaymentGateway = () => {
  const [pendingPayments, setPendingPayments] = useState([]);
  const [paidPayments, setPaidPayments] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPayments();
  }, []);
const upiApps = [
  {
    name: "GPay",
    icon: <FaGooglePay size={30} color="#4285F4" />
  },
  {
    name: "PhonePe",
    icon: <FaPhoneAlt size={30} color="#5C2D91" />
  },
  {
    name: "Paytm",
    icon: <SiPaytm size={30} color="#00baf2" />
  },
  {
    name: "BHIM",
    icon: <MdAccountBalanceWallet size={26} color="#008000" />
    
  },
  {
    name: "Net Banking",
    icon: <MdAccountBalance size={30} color="#6c63ff" />
  }
];

  const fetchPayments = async () => {
    try {
      const [pendingRes, paidRes] = await Promise.all([
        axios.get("http://localhost:3000/api/payments?status=pending"),
        axios.get("http://localhost:3000/api/payments?status=paid")
      ]);
      setPendingPayments(pendingRes.data);
      setPaidPayments(paidRes.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };
const handlePaidDelete = async (paymentId) => {
  const result = await Swal.fire({
    title: '🗑️ Confirm Deletion',
    text: "Are you sure you want to delete this paid record?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Yes, delete it!',
    background: '#fff8f0'
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`http://localhost:3000/api/payments/${paymentId}`);
      setPaidPayments((prev) => prev.filter((p) => p._id !== paymentId));

      Swal.fire({
        title: 'Deleted!',
        text: 'The paid record has been removed.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      console.error("Error deleting paid payment:", error);
      Swal.fire('Error', 'Failed to delete payment.', 'error');
    }
  }
};

  const handleMethodChange = (id, method) => {
    setSelectedMethod((prev) => ({ ...prev, [id]: method }));
  };

const handlePayment = async (paymentId) => {
  return new Promise(async (resolve) => {
    let selected = null;

    const container = document.createElement("div");
    container.innerHTML = `
      <style>
        .upi-options-container {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          justify-content: center;
          margin-top: 20px;
        }
        .upi-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          border: 2px solid #ccc;
          border-radius: 10px;
          padding: 12px 16px;
          width: 110px;
          background: #f9f9f9;
          cursor: pointer;
          transition: 0.3s ease;
        }
        .upi-card:hover {
          border-color: #007bff;
          background: #eaf5ff;
        }
        .upi-label {
          font-size: 14px;
          margin-top: 6px;
          font-weight: 500;
        }
      </style>
    `;

    const wrapper = document.createElement("div");
    wrapper.className = "upi-options-container";

    upiApps.forEach((app) => {
      const item = document.createElement("div");
      item.className = "upi-card";
      item.innerHTML = `
        <div>${renderToString(app.icon)}</div>
        <div class="upi-label">${app.name}</div>
      `;
      item.onclick = () => {
        selected = app.name;
        Swal.close();
      };
      wrapper.appendChild(item);
    });

    container.appendChild(wrapper);

    await Swal.fire({
      title: '💳 Select Payment Method',
      html: container,
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      willClose: () => {
        if (selected) proceedPayment(paymentId, selected);
      }
    });

    resolve();
  });
};

const proceedPayment = async (paymentId, method) => {
  setLoading(true);
  try {
    const res = await axios.get(`http://localhost:3000/api/payments/${paymentId}`);
    const paymentData = res.data;

    await axios.patch(`http://localhost:3000/api/payments/${paymentId}`, {
      method,
      status: "paid"
    });

    await axios.post("http://localhost:3000/api/bookings2", {
      name: paymentData.name || "User",
      email: paymentData.email || "user@example.com",
      artist: paymentData.concert || paymentData.concertTitle || "Unknown",
      venue: paymentData.venue || "Venue Not Provided",
      date: paymentData.date || "TBD",
      time: paymentData.time || "7:00 PM",
      location: paymentData.location || "Unknown",
      seatType: paymentData.seat || "General",
      price: paymentData.amount || 0,
      ticketCount: paymentData.count,
      totalPrice: (paymentData.amount || 0) * (paymentData.count || 1)
    });

    await fetchPayments();

    Swal.fire({
      title: `🎉 Paid with ${method}!`,
      text: "Your ticket is confirmed!",
      icon: "success",
      confirmButtonText: "View Ticket 🎫",
    }).then((res) => {
      if (res.isConfirmed) navigate("/confirmation");
    });

  } catch (err) {
    console.error(err);
    Swal.fire("Error", "Payment failed", "error");
  } finally {
    setLoading(false);
  }
};

const handleDelete = async (paymentId) => {
  const result = await Swal.fire({
    title: '❌ Confirm Deletion',
    text: "Do you want to delete this pending payment?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc3545',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Yes, delete it!',
    background: '#fff8f0'
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`http://localhost:3000/api/payments/${paymentId}`);
      setPendingPayments((prev) => prev.filter((p) => p._id !== paymentId));

      Swal.fire({
        title: 'Deleted!',
        text: 'Pending payment has been deleted.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      console.error("Error deleting payment:", error);
      Swal.fire('Error', 'Failed to delete pending payment.', 'error');
    }
  }
};

  return (
    <div className="payment-background">
      <div className="container">
        <div className="payment-container mx-auto">
          <h2 className="text-center text-light mb-5">💳 Premium Payment Gateway</h2>

          <h4 className="text-info p-2">🕒 Pending Payments</h4>
          {pendingPayments.length === 0 ? (
            <p className="text-muted text-center">No pending payments.</p>
          ) : (
            pendingPayments.map((payment) => (
              <div key={payment._id} className="payment-card p-4 mb-4">
                <h5>{payment.concertTitle}</h5>
                <p><strong>Amount:</strong> ₹{payment.amount}</p>
                {/* <div className="mb-2">
                  <label>Select Payment Method:</label>
                  <div className="form-check">
                    <input type="radio" className="form-check-input"
                      name={`method-${payment._id}`}
                      onChange={() => handleMethodChange(payment._id, "UPI")}
                      checked={selectedMethod[payment._id] === "UPI"} />
                    <label className="form-check-label">UPI</label>
                  </div>
                  <div className="form-check">
                    <input type="radio" className="form-check-input"
                      name={`method-${payment._id}`}
                      onChange={() => handleMethodChange(payment._id, "Net Banking")}
                      checked={selectedMethod[payment._id] === "Net Banking"} />
                    <label className="form-check-label">Net Banking</label>
                  </div>
                </div> */}

                <div className="d-flex justify-content-between mt-4">
                  <button className="btn btn-success"
                    onClick={() => handlePayment(payment._id)}
                    disabled={loading}>
                    {loading ? "Processing..." : "Pay Now"}
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(payment._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}

          <hr className="my-5 border-light" />

          <h4 className="text-success">✅ Paid Payments</h4>
          {paidPayments.length === 0 ? (
            <p className="text-muted text-center">No paid records yet.</p>
          ) : (
            paidPayments.map((payment) => (
  <div key={payment._id} className="payment-paid p-4 mb-3">
    <h5>{payment.concertTitle || "Unknown Concert"}</h5>
    <p><strong>Amount:</strong> ₹{payment.amount|| 0}</p>
    <p><strong>Method:</strong> {payment.method || "Unknown"}</p>
    <span className="badge bg-success mb-2">Paid</span>
    
    <button className="btn btn-outline-danger mt-2 m-3"
      onClick={() => handlePaidDelete(payment._id)}>
      🗑️ Delete Payment
    </button>
  </div>
))

          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
