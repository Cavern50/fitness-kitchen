const dPicker = (box, date) => {
    let year = date.getFullYear(), //текущий год (с 0)
        month = date.getUTCMonth(), //текущий месяц (с 0)
        today = date.getDate(), // текунщая дата
        todaysDate = new Date(),
        fullTodaysDate = todaysDate.getDate() + ' ' + (todaysDate.getMonth() + 1) + ' ' + todaysDate.getFullYear(),
        firstDay = new Date(year, month, 1), //первый день месяца (индекс)
        oneHour = 1000 * 60 * 60, // один час
        oneDay = oneHour * 24, // один день
        nextMonth = new Date(year, month + 1, 1),
        lastDay = Math.ceil((nextMonth.getTime() - firstDay.getTime() - oneHour) / oneDay), //последний день месяца
        scheme = (data, className = '') => `<button class="dpicker__item ${className}" data-date="${data + ' ' + (month + 1) + ' ' + year}">${data}</button>`;

    const arrMonth = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const monthValue = document.querySelector(".dpicker__current");

    if (!!monthValue) {
        monthValue.textContent = `${arrMonth[month]} ${year}`;
    }

    const renderBtn = () => {
        // количество дней в прошлом месяце
        let prevMonth = new Date(year, month, 0).getDate() + 1,
            prevDays = firstDay.getDay() - 1; // дней прошлого месяца для отображения в верстке

        // если воскресенье то индекс 6
        if (prevDays < 0) {
            prevDays = 6
        }

        // 42 ячейки в верстке минус дни пред. месяца + дни текущего
        const nextDays = 42 - (prevDays + lastDay);

        // рендер пред, текущего и след. месяцев
        let newPrevMonth = month;
        let prevYear = year;

        if (newPrevMonth == 0) {
            newPrevMonth = 12;
            prevYear--;
        }

        for (let i = prevMonth - prevDays; i < prevMonth; i++) {
            eventDate = i + ' ' + (month + 1) + ' ' + year;
            newEventDate = i + ' ' + newPrevMonth + ' ' + prevYear;
            if (newEventDate !== fullTodaysDate) {
                box.append(scheme(i))
            } else {
                box.append(scheme(i, 'today'))
            }
            $("[data-date='" + eventDate + "']").attr('data-date', newEventDate);
            if (typeof events_days !== 'undefined' && events_days.includes(newEventDate)) {
                $("[data-date='" + newEventDate + "']").addClass('dpicker__item active')
            }
        }

        for (let i = 1; i < lastDay + 1; i++) {
            eventDate = i + ' ' + (month + 1) + ' ' + year;
            // if (i !== today) {
            if (eventDate !== fullTodaysDate) {
                box.append(scheme(i, 'current'))
            } else {
                box.append(scheme(i, 'today'))
            }
            if (typeof events_days !== 'undefined' && events_days.includes(eventDate)) {
                $("[data-date='" + eventDate + "']").addClass('dpicker__item active')
            }
        }

        // убираем взаимодействие с днями до текущего 
        const currentDate = new Date(),
            currentMonth = currentDate.getMonth(),
            currentYear = currentDate.getFullYear();
        if (month === currentMonth && year === currentYear) {
            $('.dpicker__body').find('.dpicker__item').each((i, el) => {
                if ($(el).hasClass('today')) {
                    return false;
                }
                $(el).addClass('disabled');
            })
        }

        let newNextMonth = month + 2;
        let nextYear = year;

        if (newNextMonth == 13) {
            newNextMonth = 1;
            nextYear++;
        }

        for (let i = 1; i < nextDays + 1; i++) {
            eventDate = i + ' ' + (month + 1) + ' ' + year;
            newEventDate = i + ' ' + newNextMonth + ' ' + nextYear;
            if (newEventDate !== fullTodaysDate) {
                box.append(scheme(i))
            } else {
                box.append(scheme(i, 'today'))
            }
            $("[data-date='" + eventDate + "']").not($(".current, .today")).attr('data-date', newEventDate);
            if (typeof events_days !== 'undefined' && events_days.includes(newEventDate)) {
                $("[data-date='" + newEventDate + "']").addClass('dpicker__item active')
            }
        }
    }

    if (!!document.querySelector(".dpicker__body")) {
        document.querySelector(".dpicker__body").innerHTML = "";
    }
    renderBtn();
}


const switchMonth = () => {
    const [arrowPrev, arrowNext] = document.querySelectorAll(".dpicker__arrow");
    let index = 1;

    let date = new Date(),
        year = date.getFullYear(), //текущий год (с 0)
        month = date.getUTCMonth(), //текущий месяц (с 0)
        today = date.getDate(); // текунщая дата

    !!arrowNext && arrowNext.addEventListener('click', () => {
            date = new Date(year, month + index, today);
            dPicker($('.dpicker__body'), date);
            index++;
        })

        !!arrowPrev && arrowPrev.addEventListener('click', () => {
            date = new Date(year, index + 1, today);
            dPicker($('.dpicker__body'), date);
            index--;
        })
}

const clickToActiveRange = (e) => {
    if ($('.dpicker__item.first').index() > $(e.currentTarget).index() && !$('.dpicker__item.last').length) {
        $('.dpicker__item').removeClass('first active');
        $(e.currentTarget).addClass('first');
    }
    if (!$(e.currentTarget).hasClass('active')) {
        switch ($('.dpicker__item.active').length) {
            case 0:
                $(e.currentTarget).addClass('first');
                break;
            case 1:
                $(e.currentTarget).addClass('last');
                break;
            case 2:
                return false;
        }
        $(e.currentTarget).addClass('active');
    } else {
        $(e.currentTarget).removeClass('active');
        $('.dpicker__item').removeClass('last first ranged');
        $('.dpicker__item.active').addClass('first');
    }
}

const hoverOnActiveRange = (e) => {
    if ($('.dpicker__item.last').length) {
        return false;
    }
    if ($('.dpicker__item.first').length) {
        $('.dpicker__body .dpicker__item').each((i, el) => {
            if ($('.dpicker__item.first').index() <= i && i <= $(e.currentTarget).index()) {
                $(el).addClass('ranged');
            } else {
                $(el).removeClass('ranged');
            }
        })
    }

}


const calcDays = (days) => {

    const discount = (days) => {
        switch (true) {
            case (days >= 7 && days <= 13):
                return '-10%';
            case (days >= 14 && days <= 29):
                return '-15%';
            case (days >= 30):
                return '-20%';
            default:
                return '';
        }
    }

    const daysForm = (days) => {
        const n = days % 10;
        switch (true) {
            case (n > 4 || n === 0 || (days > 10 && days < 20)):
                return days + ' дней';
            case ((days > 1 && days < 5) || (n > 1 && n < 5)):
                return days + ' дня';
            default:
                return days + ' день'
        }
    }

    const button = `<button type='button' class="result__item custom active">
                        <span class='result__value'>${daysForm(days)}</span>
                        <span class="result__discount">${discount(days)}</span>
                    </button>`;
    $('.result__box--days button:not(.custom)').removeClass('active');
    if ($('.result__item.custom').length) {
        $('.result__item.custom .result__value')
            .text(daysForm(days));
        $('.result__item.custom .result__discount')
            .text(discount(days));
    } else {
        $('.result__box--days').prepend(button);
    }
}

window.onload = () => {
    dPicker($('.dpicker__body'), new Date());
    switchMonth();
    $(document).on('click', '.dpicker__body .dpicker__item', e => {
        clickToActiveRange(e);
    });
    $(document).on('mouseover', '.dpicker__body .dpicker__item', e => {
        hoverOnActiveRange(e);
    });
    $('.dpicker__done').on('click', () => {
        $('.dpicker').removeClass('active');
        $('.result__box--days').removeClass('open').attr('style', '');
        if ($('.dpicker__item.ranged').length) {
            calcDays($('.dpicker__item.ranged').length)
        }
    })
}