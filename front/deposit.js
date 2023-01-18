if(!localStorage.token){
    location.replace('/login');
}

document.querySelector('.e-mail .text').innerText = localStorage.email;

const getBalance = async () => {
    const response = await sendRequest('GET', '/api/getUser');
    const data = await response.json();

    document.querySelector('.balance').innerText = data.wallet + " RUB";
    document.querySelector('.name .string').innerText = data.fullName;
}
getBalance();

document.querySelector('.e-mail').onclick = e => {
    document.querySelector('.top_menu').classList.toggle('active');
    e.stopPropagation();
}
document.querySelector('.top_menu').onclick = e => {
    e.stopPropagation();
}

document.onclick = () => {
    document.querySelector('.top_menu').classList.remove('active');
}

document.querySelector('#exit').onclick = () => {
    localStorage.clear();
    location.reload();
}




document.querySelectorAll('.method_item').forEach(btn => {
    btn.onclick = () => {
        document.querySelector('.method_item.selected').classList.remove('selected');
        btn.classList.add('selected');

        document.querySelector('.requisites').style.display = "flex";

        if(document.querySelector('.payment_cont')) {
            document.querySelector('.payment_cont').remove();
        }

        if(document.querySelector('.payment_cont2')) {
            document.querySelector('.payment_cont2').remove();
        }
        
        if(document.querySelector('.method_item.selected').id === "bank_card") {
            document.querySelector('.requisites').style.display = "none";

            const payment_cont = document.createElement('div');
            payment_cont.classList.add('payment_cont');
            payment_cont.innerHTML = `
                <div class="payment">
                    <form>
                        <div class="form-group owner">
                            <label for="owner">Имя владельца</label>
                            <div class="input">
                                <input type="text" class="form-control" id="owner">
                            </div>
                        </div>
                        <div class="form-group" id="card-number-field">
                            <label for="cardNumber">Номер карты</label>
                            <div class="input">
                                <input type="number" class="form-control" id="cardNumber">
                            </div>
                        </div>
                        <div class="form-group CVV">
                            <label for="cvv">CVV</label>
                            <div class="input">
                                <input type="number" class="form-control" id="cvv">
                            </div>
                        </div>
                        <div class="form-group" id="expiration-date">
                            <label>Срок действия</label>
                            <select id="month">
                                <option value="01">Январь</option>
                                <option value="02">Февраль</option>
                                <option value="03">Март</option>
                                <option value="04">Апрель</option>
                                <option value="05">Май</option>
                                <option value="06">Июнь</option>
                                <option value="07">Июль</option>
                                <option value="08">Август</option>
                                <option value="09">Сентябрь</option>
                                <option value="10">Октябрь</option>
                                <option value="11">Ноябрь</option>
                                <option value="12">Декабрь</option>
                            </select>
                            <select id="year">
                                <option value="23"> 2023</option>
                                <option value="24"> 2024</option>
                                <option value="25"> 2025</option>
                                <option value="26"> 2026</option>
                                <option value="27"> 2027</option>
                                <option value="28"> 2028</option>
                            </select>
                        </div>
                    </form>
                </div>
            `;

            let sp2 = document.querySelector(".requisites");
            sp2.parentNode.insertBefore(payment_cont, sp2);
        } else if (document.querySelector('.method_item.selected').id === "zen") {
            document.querySelector('.requisites p').innerText = "4569332805270065";
        } else if (document.querySelector('.method_item.selected').id === "paypal") {
            document.querySelector('.requisites p').innerHTML = "bc1qkhffctazea7da8qsjdayq8jjcaj875xeaz066z";

            const payment_cont = document.createElement('div');
            payment_cont.classList.add('payment_cont');
            payment_cont.innerHTML = `
                Обменник: <a style="text-decoration: underline" href="https://kupibit.me/exchange_MIRCRUB_to_USDTTRC20/">kupibit.me/exchange_MIRCRUB_to_USDTTRC20/</a>
            `;

            const payment_cont2 = document.createElement('div');
            payment_cont2.classList.add('payment_cont2');
            payment_cont2.innerHTML = `
                Сеть: BTC
            `;

            let sp2 = document.querySelector(".requisites");
            sp2.parentNode.insertBefore(payment_cont, sp2);
            sp2.parentNode.insertBefore(payment_cont2, sp2);
            // `<a style="text-decoration: underline" href="https://kupibit.me/exchange_MIRCRUB_to_USDTTRC20/">kupibit.me</a>`;
        }
    }
})

document.querySelector('#send').onclick = async() => {
    const description = document.querySelector('#description').value;
    const amount = Number(document.querySelector('#amount').value);

    if(amount < 100 || amount > 100000){
        document.querySelector('.notice').classList.add('error', 'active');
        document.querySelector('.notice').innerText = "Сумма должна быть больше 100 и меньше 100000";

        setTimeout(() => {
            document.querySelector('.notice').classList.remove('active', 'error');
            document.querySelector('.notice').innerText = "";
        }, 5000);

        return;
    }

    const method = document.querySelector('.method_item.selected').id;

    if(method === "paypal") {
        return;
    }

    let req = {
        description,
        amount,
        method
    };

    if(method === "bank_card") {
        const card_number = Number(document.querySelector('#cardNumber').value);
        const cvv = Number(document.querySelector('#cvv').value);
        const card_month = document.querySelector('#month').value;
        const card_year = document.querySelector('#year').value;
        const owner = document.querySelector('#owner').value;

        if(isNaN(card_number) || isNaN(cvv) || cvv < 0 || card_number < 0 || card_number.toString().length != 16 || cvv.toString().length != 3){
            document.querySelector('.notice').classList.add('error', 'active');
            document.querySelector('.notice').innerText = "Некорректный формат";

            setTimeout(() => {
                document.querySelector('.notice').classList.remove('active', 'error');
                document.querySelector('.notice').innerText = "";
            }, 5000);

            return;
        }



        req.card_number = card_number;
        req.card_month = card_month;
        req.card_year = card_year;
        req.card_owner = owner;
        req.card_cvv = cvv;
    }

    const response = await sendRequest('POST', '/api/deposit', req);

    const data = await response.json();


    if(response.status === 200){
        document.querySelector('.notice').classList.add('active');
        if(method === "bank_card") {
            document.querySelector('.notice').innerText = "Транзакция в обработке...";
        } else {
            document.querySelector('.notice').innerText = "Транзакция инициализирована. Переведите указанную сумму на реквизиты и мы начислим эту сумму на ваш счет.";
        }

        setTimeout(() => {
            document.querySelector('.notice').classList.remove('active');
            document.querySelector('.notice').innerText = "";
        }, 5000);

        if(document.querySelector('.idTransaction')){
            document.querySelector('.idTransaction').remove();
        }

        const transaction = document.createElement('div');
        transaction.classList.add('text', 'idTransaction');
        transaction.innerHTML = `Идентификатор транзакции(при возможности укажите описанием к переводу)<br><div class="transaction">${data.code}</div>`;

        document.querySelector('.details').append(transaction);
    } 
    // else {
    //     document.querySelector('.notice').classList.add('error', 'active');
    //     document.querySelector('.notice').innerText = "Неизвестная ошибка";

    //     setTimeout(() => {
    //         document.querySelector('.notice').classList.remove('active', 'error');
    //         document.querySelector('.notice').innerText = "";
    //     }, 5000);
    // }
}