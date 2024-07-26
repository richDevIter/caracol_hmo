import { use, useContext } from "react";
import CartContext from "../context/CartContext";

const useAppData = () => useContext(CartContext);

export default useAppData