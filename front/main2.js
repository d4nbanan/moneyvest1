function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

if(!localStorage.token){
    location.replace('/login');
}

document.querySelector('.e-mail .text').innerText = localStorage.email;

let walletAmount;

const getBets = async () => {
    document.querySelector('.history').innerHTML = "";

    const response = await sendRequest('GET', '/api/getUser');
    const data = await response.json();
    const betsData = data.bets;

    for (let i=betsData.length-1; i>=0; i--) {
        let result = betsData[i].done ? "" : "В процессе...";
        let resultClass = "";
        if (betsData[i].done) {
            result = betsData[i].successful ? "+" + betsData[i].amount + "₽" : "-" + betsData[i].amount + "₽";
            resultClass = betsData[i].successful ? "green" : "red";
        }

        const betDate = new Date(betsData[i].createdAt);
        const date = betDate.toLocaleTimeString([], 
        { hour12: false, hour: "2-digit", minute: "2-digit" }) + " " + 
        [padTo2Digits(betDate.getDate()),
        padTo2Digits(betDate.getMonth() + 1),
        betDate.getFullYear()].join('.');

        const bet = document.createElement('div');
        bet.classList.add('bet');
        bet.innerHTML = `
            <div class="top">
                <div class="amount">${betsData[i].amount}₽</div>
                <div class="date">${date}</div>
            </div>
            <div class="bottom">
                <div class="type ${betsData[i].type === "up" ? "green" : "red"}">${betsData[i].type === "up" ? "На повышение" : "На понижение"}</div>
                <div class="result ${resultClass}">${result}</div>
            </div>
        `;

        document.querySelector('.history').append(bet);
    }
}

const getWallet = async () => {
    const response = await sendRequest('GET', '/api/getUser');

    const data = await response.json();
    walletAmount = data.wallet;

    const wallet = document.createElement('div');
    wallet.classList.add('wallet');
    wallet.innerText = walletAmount + "₽";

    document.querySelector('.e-mail').prepend(wallet);

    await getBets();
}

getWallet();

document.querySelectorAll('.instruments .box').forEach(box => {
    box.onclick = async () => {
        document.querySelector('.instruments .box.chosen').classList.remove('chosen');
        box.classList.add('chosen');

        document.querySelector('.left-panel').classList.toggle('open');

        const options = {
            "width": 980,
            "height": 610,
            "symbol": box.id,
            "interval": "15",
            "timezone": "Europe/Moscow",
            "theme": "dark",
            "style": "1",
            "locale": "ru",
            "toolbar_bg": "#f1f3f6",
            "enable_publishing": false,
            "hide_legend": true,
            "allow_symbol_change": true,
            "container_id": "tradingview_0a660"
        }

        document.querySelector('.currency-chart .top .left .top').innerText = box.id.split(':')[1];

        new TradingView.widget(options);
    }
})

document.querySelector('.currency-chart .top .left').onclick = () => {
    document.querySelector('.left-panel').classList.toggle('open');
}

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

document.querySelectorAll('.trade').forEach(btn => {
    btn.onclick = () => {
        const type = btn.id;
        
        const popup = document.createElement('div');
        popup.classList.add('popup_cont');

        popup.innerHTML = `
            <div class="popup">
                <div class="popup_title">Введите сумму</div>
                <div class="input">
                    <input id="amount" placeholder="500" type="number" />
                </div>
                <div class="popup_btn">Далее</div>
            </div>
        `;

        const checkAmount = (target) => {
            const amount = Number(target.value);

            if(isNaN(amount) || amount <= 0) {
                target.style.border = "1px solid #ff352e";
                return false;
            }
            target.style.border = null;
            return true;
        }

        const amountCont = popup.querySelector('#amount');

        amountCont.onchange = (e) => {
            checkAmount(e.target);
        }

        popup.querySelector('.popup_btn').onclick = async () => {
            if(checkAmount(amountCont)) {
                const amount = Number(amountCont.value);

                const response = await sendRequest('POST', '/api/bet', {
                    amount,
                    type
                });

                if(response.ok) {
                    const data = await response.json();

                    const alert = document.createElement('div');
                    alert.classList.add('alert', 'green_bg');
                    
                    let message = "Ставка зарегистрирована";
                    alert.innerText = message;

                    document.querySelector('.wallet').innerText = data.wallet + "₽";
                    document.querySelector('body').append(alert);
                    document.querySelector('.popup_cont').remove();

                    setTimeout(() => {
                        document.querySelector('.alert').remove();
                    }, 5000)

                    await getBets();
                }
            }

        }

        popup.onclick = () => {
            document.querySelector('.popup_cont').remove();
        }

        popup.querySelector('.popup').onclick = e => {
            e.stopPropagation();
        }

        document.querySelector('.wrapper').append(popup);
    }
});