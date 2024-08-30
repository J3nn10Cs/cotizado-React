const formatMoney = (value) => {
    //api -> formato al dinero
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })
    return formatter.format(value)
}


const calculateTotalPay = (quantity,months) => {
    let total;
    //mientras mayor es el monto, mayor es el interes
    if(quantity < 5000){
        total = quantity * 1.5; 
    }else if(quantity >= 5000 && quantity < 10000){
        total = quantity * 1.4;
    }else if(quantity >= 10000 && quantity < 15000){
        total = quantity * 1.3;
    }else{
        total = quantity * 1.2;
    }
    //plazo -> + plazo + interes
    if(months === 6){
        total *= 1.1;  //10%
    }else if(months === 12){
        total *= 1.2; //20%
    }else{
        total *= 1.3; //30%
    }

    return total;
}

export{
    formatMoney,
    calculateTotalPay
}