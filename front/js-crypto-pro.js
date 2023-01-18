

//Вопросы
let items = document.querySelectorAll('.faq__in')
    if(items.length > 0) {
        for(let i = 0; i < items.length; i++) {
            const item = items[i];
            item.addEventListener('click', function (e) {
                item.parentElement.classList.toggle('active')
                e.stopPropagation()
                items.forEach((element, j) => {
                    if (j !== i){
                        element.parentElement.classList.remove('active')
                    }
                })
            })
        }
    }


//Видео
let plays = document.querySelectorAll('video')
if(plays.length > 0) {
    for(i = 0; i < plays.length; i++) {
        const play = plays[i]
        play.addEventListener('click', async function(e) {
            play.parentElement.classList.toggle('_active')
            if(play.parentElement.classList.contains('_active')) {
                
                for(let j=0; j<plays.length; j++) {
                    if(plays[j] === play) {
                        continue;
                    } else {
                        plays[j].pause()
                        plays[j].parentElement.classList.remove('_active')
                    }
                }

                play.play()
            } else {
                play.pause()
            }
            // if(!play.parentElement.classList.contains('_active')) {
            //     play.pause()
            // }
        })
    }
}

/*let video = document.querySelector('#video');
let progress = document.querySecector('#progress') ;
video.ontimeupdate = progressUpDate;
function progressUpDate() {
    console.log(video.duration);
    console.log(video.currentTime);
    let d = video.duration;
    let c = video.currentTime;
    progress.value = 100 * c / d;
}*/

/*const animItems = document.querySelectorAll('._anim-items');

if(animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll() {
        for (let i = 0; i < animItems.length; i++) {
            const animItem = animItems[i];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if(animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if((scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight)){
                animItem.classList.add('__active');
            } else{
                if(!animItem.classList.contains('_anim-no-hide')) {
                    animItem.classList.remove('__active');
                }
            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientrect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }

    setTimeout(() => {
        animOnScroll();
    }, 300);
}*/