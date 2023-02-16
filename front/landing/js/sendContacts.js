function formValidate() {
    let error = 0;
    let formReq = document.querySelectorAll('._req');

    for (let index = 0; index < formReq.length; index++) {
        const input = formReq[index];
        formRemoveError(input);

        if (input.classList.contains('_email')) {
            if (emailTest(input)) {
                formAddError(input);
                error++;
            }
        }
        if (input.classList.contains('_number')) {
            if(input.value.length < 10) {
                formAddError(input);
                error++;
            }
        } else {
            if (input.value === '') {
                formAddError(input);
                error++;
            }
        }
    }
    return error;
}

function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
}
function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
}
function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

document.querySelector('#sendContacts').onclick = async (e) => {
    e.preventDefault();
    
    if(formValidate()) {
        alert('Заполните обязательные поля');
        return;
    }

    const fullName = document.querySelector('#formName').value;
    const email = document.querySelector('#formEmail').value;
    const phoneNumber = document.querySelector('#formNumber').value;
    const country = document.querySelector('#countries').value;

    form.classList.add('_sending');

    const response = await fetch("/api/sendContacts", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fullName,
            email,
            phoneNumber,
            country
        })
    });

    if (response.ok) {
        let result = await response.json();
        alert("Сообщение отправлено");
        document.querySelector('#form').reset();
        document.querySelector('#form').classList.remove('_sending');
    } else {
        alert("Ошибка");
        document.querySelector('#form').classList.remove('_sending');
    }

    // const data = await response.json();
}