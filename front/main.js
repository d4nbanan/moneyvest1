const borderTexts = ["Быстрое пополнение и вывод средств", "Комисия 0% для граждан РФ", "Помощь аналитика"];

window.onload = () => {
    const cont = document.querySelector('#border');
    let iteration = 0;
    setInterval(() => {
        cont.classList.add('left');

        setTimeout(() => {
            document.querySelector('.variable .text').innerText = borderTexts[iteration % borderTexts.length];
            iteration++;
            cont.classList.remove('left');
        }, 1000);
    }, 6000);
}

document.querySelectorAll('.nav p').forEach(btn => {
    btn.onclick = () => {
        window.scrollTo({
            top: document.querySelector(`.${btn.id}`).getBoundingClientRect().top,
            behavior: 'smooth'
          });
    }
})

document.querySelectorAll('.prices__container .navigation .nav').forEach(btn => {
    btn.onclick = () => {
        document.querySelector(`.prices__container .selected`).classList.remove('selected');
        btn.classList.add('selected');

        document.querySelector(`.prices__container .picked`).classList.remove('picked');
        document.querySelector(`.prices__container .${btn.id}`).classList.add('picked');
    }
})

document.querySelector('.license_link').onclick = () => {
    document.querySelector('.license_popup').classList.toggle('open_license');
}

document.querySelectorAll('.question_cont .question').forEach(question => {
    console.log(question)
    question.onclick = () => {
        question.parentElement.classList.toggle('open');
    }
})

document.querySelector('.support_widget .circle').onclick = e => {
    e.stopPropagation();
    document.querySelector('.support_widget .socials').classList.toggle('active');
    document.querySelector('.support_widget').classList.toggle('open');
}

document.querySelector('.support_widget').onclick = e => {
    e.stopPropagation();
}

document.onclick = () => {
    document.querySelector('.support_widget .socials').classList.remove('active');
    document.querySelector('.support_widget').classList.remove('open');
}