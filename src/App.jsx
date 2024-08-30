import { useState, useEffect } from "react"
import Header from "./components/Header"
import Button from "./components/Button";
import { formatMoney, calculateTotalPay } from "./helpers";

function App() {

  const [quantity, setQuantity] = useState(10000);
  const [months, setMonths] = useState(6);
  const [total, setTotal] = useState(0);
  const [pay, setPay] = useState(0);

  useEffect(() => {
    setTotal(calculateTotalPay(quantity,months))

  }, [quantity,months])

  useEffect(() => {
    //calcular pago mensual
    setPay(total/months)

  },[total,months])

  const min = 0;
  const max = 20000;
  const step= 100;

  function handleChange(e){
    //Modificar la cantidad
    setQuantity(e.target.value)
  }

  function handleClickIncrement(){
    const value = (quantity + step);

    if(value > max){
      alert('Maximum number reached')
      return
    }

    setQuantity(value)
  }

  function handleClickDecrement(){
    const value = quantity - step;

    if(value < min){
      alert('Invalid quantity')
      return
    }

    setQuantity(value)
  }

  return (
    <>
      <div className="my-20 max-w-lg mx-auto bg-white rounded-lg shadow p-10">
          <Header />

          <div className="flex justify-between my-6">
            <Button
              operator='-'
              fn = {handleClickDecrement}
            />
            <Button
              operator='+'
              fn= {handleClickIncrement}
            />
          </div>

          <input 
            type="range" 
            className="mt-2 w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600"
            onChange={handleChange} 
            min={min}
            max={max}
            step={step}
            value={quantity}
          />

          <p className="text-center my-10 text-5xl font-extrabold text-blue-700">
            {formatMoney(quantity)}
          </p>

          <h2 className="text-2xl font-extrabold text-gray-500 text-center">
            Elige un <span className="text-blue-600">Plazo</span> a pagar
          </h2>

          <select
            className="mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500"
            value={(months)}
            // + -> convierte a number
            onChange={e => setMonths(+e.target.value)} 
          >
            <option value="6">6 Months</option>
            <option value="12">12 Months</option>
            <option value="24">24 Months</option>
          </select>

          <div className="my-5 space-y-3 bg-gray-100 rounded-lg p-5">
            <h2 className="text-2xl font-extrabold text-gray-500 text-center">
              Resumen <span className="text-blue-600">de pagos</span>
            </h2>
            <p className="text-xl text-gray-500 text-center font-bold"> {(months)} Meses </p>
            <p className="text-xl text-gray-500 text-center font-bold">
               {formatMoney(total)} Total a pagar 
            </p>
            <p className="text-xl text-gray-500 text-center font-bold"> {formatMoney(pay)} Mensuales </p>
          </div>

      </div>
    </>
  )
}

export default App
