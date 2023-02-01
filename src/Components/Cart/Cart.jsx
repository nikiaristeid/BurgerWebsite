import * as React from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import "./css/Cart.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import Navigation from "../Common/Navigation";
import WhenSubmit from "./WhenSumbit";
import EmptyCart from "./EmptyCart";
import { query, where } from "firebase/firestore";
import BillingForm from "./BillingForm";
import SignInToContinue from "./SignInToContinue";
import CartInformation from "./CartInformation";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [codePrice, setCodePrice] = useState(0);
  const [emptyCart, setEmptyCart] = useState(false);
  const [firstLetter, SetFirstLetter] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [submit, setSubmit] = useState(false);
  const [deliveryCost, setDeliveryCost] = useState(3.99);
  const [checkedCash, setCheckedCash] = useState(true);
  const [checkedCard, setCheckedCard] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [takeaway, setTakeaway] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [date, setDate] = useState("");
  const [deliveryClass, setDeliveryClass] = useState("");
  const [takeawayClass, setTakeawayClass] = useState("");
  const [logIn, setLogIn] = useState(false);
  const [deleteP, setDeleteP] = useState(false);
  const [sameShipping, setSameShipping] = useState(true);
  const [code, setCode] = useState([]);
  const [codeActive, setCodeActive] = useState(false);
  const [codeDontExist, setCodeDontExist] = useState(false);
  const [orderNumber, setOrderNumber] = useState(0);
  const [orderId, setOrderId] = useState("");

  const formikCode = useFormik({
    initialValues: {
      code: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  function redeemCode(e) {
    e.preventDefault();
    getCodes(formikCode.values.code);
    formikCode.values.code = "";
  }
  async function getCodes(code) {
    const q = query(collection(db, "codes"), where("name", "==", code));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log("No documents match the query");
      setCodeDontExist(true);
    } else {
      //console.log(querySnapshot);
      const newcodes = [];
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
        console.log(doc.data());
        newcodes.push(doc.data());
        setCodePrice(doc.data().price);
        setCode(newcodes);
        setCodeActive(true);
        console.log(newcodes.price);
      });
    }
  }

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogIn(true);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(user.email);
        setEmail(user.email);
        setUserId(uid);
        SetFirstLetter(user.email.charAt(0).toUpperCase());
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  const SignupSchema = Yup.object().shape({
    fname: Yup.string()
      .min(1, "Too short")
      .required("Please enter your First Name"),
    lname: Yup.string()
      .min(1, "Too short")
      .required("Please enter your Last Name"),
    address: Yup.string()
      .min(1, "Too short")
      .required("Please enter your address"),
    address2: Yup.string().min(1, "Too short"),
    country: Yup.string().required("Please select a country"),
    zip: Yup.string()
      .required("Please enter your Zip Code")
      .matches(/^[0-9]{5}$/, "Invalid zip code"),
    delivery: Yup.string().required("Please choose a shipping method"),
    payment: Yup.string().required(),
    fnameShipping: "",
    lnameShipping: "",
    addressShipping: "",
    address2Shipping: "",
    countryShipping: "",
    zipShipping: "",
  });

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      address: "",
      address2: "",
      country: "",
      zip: "",
      shippingOption: "",
      fnameShipping: "",
      lnameShipping: "",
      addressShipping: "",
      address2Shipping: "",
      countryShipping: "",
      zipShipping: "",
      payment: "cash",
      delivery: "",
    },
    validationSchema: SignupSchema,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: (values) => {
      if (delivery) {
        setTotal((deliveryCost + total).toFixed(2));
      }
      addInformationToFirebase(values);
      addOrdersToFirebase(values);
      getOrderNumber();
      setSubmit(true);
      localStorage.clear();
      setQuantity(0);
      //alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    //console.log(formik);
    console.log(formik.errors);
  }, [formik]);

  let savedCart = JSON.parse(localStorage.getItem("cart"));
  useEffect(() => {
    if (savedCart) {
      console.log(savedCart);
      if (savedCart.length === 0) {
        setEmptyCart(true);
      }
      let total1 = 0;
      savedCart.map((product) => {
        total1 = total1 + product.price * product.howmany;
      });
      let discount = parseFloat((total1 * codePrice).toFixed(2));
      setDiscount(discount);
      setTotal(parseFloat((total1 - discount).toFixed(2)));
      setDate(new Date().toLocaleDateString());
      setProducts(savedCart);
    }
  }, []);

  useEffect(() => {
    let discount = parseFloat((total * codePrice).toFixed(2));
    setDiscount(discount);
    setTotal(parseFloat((total - discount).toFixed(2)));
  }, [codePrice]);

  useEffect(() => {
    if (quantity == 0) {
      setEmptyCart(true);
    } else {
      setEmptyCart(false);
    }
  }, [quantity]);

  useEffect(() => {
    let quantity = 0;
    let total1 = 0;
    if (savedCart) {
      savedCart.map((product) => {
        quantity += product.howmany;
        total1 = total1 + product.price * product.howmany;
      });
      setTotal(parseFloat((total1 - total1 * codePrice).toFixed(2)));
      setQuantity(quantity);
    }
  }, [products]);

  async function addInformationToFirebase(values) {
    console.log("addInformation");
    try {
      await setDoc(doc(db, "users", userId), {
        fname: values.fname,
        lname: values.lname,
        address: values.address,
        address2: values.address2,
        country: values.country,
        zip: values.zip,
      });
      console.log("added");
      //console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  async function addOrdersToFirebase(values) {
    console.log("addOrders");

    try {
      const docRef = await addDoc(collection(db, "orders"), {
        orderNumber: 0,
        total: total,
        products: products,
        delivery: delivery,
        takeaway: takeaway,
        cash: checkedCash,
        date: date,
        userId: userId,
        quantity: quantity,
      });
      //console.log("Document written with ID: ", docRef.id);

      console.log(docRef.id);
      setOrderId(docRef.id);

      //console.log(submit);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function getOrderNumber() {
    console.log("getNumber");
    let counter;
    try {
      const q = query(collection(db, "counter"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        counter = doc.data().counter;
        console.log(counter);
        counter++;
      });
      setOrderNumber(counter);

      await updateDoc(doc(db, "counter", "value"), {
        counter: counter,
      });
    } catch (e) {
      console.error("Error adding document: ");
    }
  }

  function chooseDelivery() {
    formik.setFieldValue("delivery", "delivery");
    setDelivery(true);
    setTakeaway(false);
    setDeliveryClass("shippingClass");
    setTakeawayClass("");
  }

  function chooseTakeaway() {
    formik.setFieldValue("delivery", "takeaway");
    setDelivery(false);
    setTakeaway(true);
    setTakeawayClass("shippingClass");
    setDeliveryClass("");
  }

  function handlePayment(id) {
    //console.log(id);
    if (id == "cash") {
      console.log(id);
      formik.setFieldValue("payment", "cash");
      setCheckedCash(true);
      setCheckedCard(false);
    } else if (id == "card") {
      console.log(id);
      formik.setFieldValue("payment", "card");
      setCheckedCash(false);
      setCheckedCard(true);
    }
  }

  function deleteProduct(product1) {
    setDeleteP(true);
    console.log("Delete product");
    let productsCopy = [...products];
    console.log(product1);
    const index = productsCopy.findIndex(
      (product) => product.key === product1.key
    );
    console.log(productsCopy);
    if (index !== -1) {
      productsCopy.splice(index, 1);
      //console.log("find it");
    }
    console.log(productsCopy);
    if (productsCopy.length === 0) {
      setEmptyCart(true);
    }
    setProducts(productsCopy);
    console.log(deleteP);
    localStorage.setItem("cart", JSON.stringify(productsCopy));
  }

  return (
    <div>
      <Navigation
        firstLetter={firstLetter}
        quantity={quantity}
        logIn={logIn}
        submit={submit}
      />
      {!emptyCart ? (
        <div className="container">
          {!submit && (
            <main>
              <div className="py-5 text-center">
                <h2>Checkout form</h2>
                <p className="lead">Fill in the information to Checkout</p>
              </div>
              <div className="row g-5">
                <CartInformation
                  deleteProduct={deleteProduct}
                  quantity={quantity}
                  products={products}
                  delivery={delivery}
                  takeaway={takeaway}
                  deliveryCost={deliveryCost}
                  redeemCode={redeemCode}
                  values={formikCode.values}
                  handleChange={formikCode.handleChange}
                  codeActive={codeActive}
                  code={code}
                  codeDontExist={codeDontExist}
                  total={total}
                  discount={discount}
                />
                {logIn ? (
                  <BillingForm
                    values={formik.values}
                    handleChange={formik.handleChange}
                    handleSubmit={formik.handleSubmit}
                    errors={formik.errors}
                    deliveryCost={deliveryCost}
                    setSameShipping={setSameShipping}
                    chooseDelivery={chooseDelivery}
                    chooseTakeaway={chooseTakeaway}
                    deliveryClass={deliveryClass}
                    takeawayClass={takeawayClass}
                    checkedCard={checkedCard}
                    checkedCash={checkedCash}
                    handlePayment={handlePayment}
                  />
                ) : (
                  <SignInToContinue />
                )}
              </div>
            </main>
          )}
        </div>
      ) : (
        <>
          {submit ? (
            <WhenSubmit
              products={products}
              total={total}
              userId={userId}
              values={formik.values}
              cash={checkedCash}
              delivery={chooseDelivery}
              date={date}
              sameShipping={sameShipping}
              handlePayment={handlePayment}
              code={code}
              deliveryCost={deliveryCost}
              discount={discount}
              orderNumber={orderNumber}
              orderId={orderId}
            />
          ) : (
            <EmptyCart />
          )}
        </>
      )}
    </div>
  );
}
