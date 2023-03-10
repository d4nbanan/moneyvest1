document.querySelector('#loginBtn').onclick = async (e) => {
    e.preventDefault();
    const emailRegexp = new RegExp(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
    const passRegexp = new RegExp(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/);
    
    const password = document.querySelector('#password');
    const email = document.querySelector('#email');

    if(!emailRegexp.test(email.value)){
        email.style.border = "1px solid #ff352e";
        email.oninput = () => {
            if(emailRegexp.test(email.value)){
                email.style.border = null;
            }
        }
        return;
    }
    if(!passRegexp.test(password.value)){
        password.style.border = "1px solid #ff352e";
        password.oninput = () => {
            if(passRegexp.test(password.value)){
                password.style.border = null;
            }
        }
        
        document.querySelector('.notice').classList.add('error', 'active');
        document.querySelector('.notice').innerText = "Пароль должен содержать минимум 6 символов, 1 большую букву и 1 цифру";

        setTimeout(() => {
            document.querySelector('.notice').classList.remove('active', 'error');
            document.querySelector('.notice').innerText = "";
        }, 5000);
        return;
    }
    
    const response = await sendRequest('POST', '/api/login', {
        password: password.value,
        email: email.value
    });

    const data = await response.json();
    console.log(data)

    if(response.status === 200){
        localStorage.token = data.token;
        localStorage.email = data.email;
        localStorage.id = data.id;
        localStorage.expires = data.expires;
        localStorage.role = data.role;

        location.href = '/trade';
    } else {
        if(data.nonActivated){
            document.querySelector('.notice').classList.add('error', 'active');
            document.querySelector('.notice').innerText = "Прежде чем войти, активируйте аккаунт по ссылке, отправленной на вашу почту";

            setTimeout(() => {
                document.querySelector('.notice').classList.remove('active', 'error');
                document.querySelector('.notice').innerText = "";
            }, 5000);
        } else {
            document.querySelector('.notice').classList.add('error', 'active');
            document.querySelector('.notice').innerText = "Неизвестная ошибка";

            setTimeout(() => {
                document.querySelector('.notice').classList.remove('active', 'error');
                document.querySelector('.notice').innerText = "";
            }, 5000);
        }
    }
}