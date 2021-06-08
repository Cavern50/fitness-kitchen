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
        let j = 1;
        $('.dpicker__body .dpicker__item').each((i, el) => {
            if (j === 5 || j === 6) $(el).attr('data-weekend', true);
            j === 7 ? j = 1 : j++;
        })
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
        today = date.getDate(); // текущая дата
    let next = null;
    arrowNext.addEventListener('click', () => {
        next ? index++ : 0
        console.log(index);
        date = new Date(year, month + index, today);
        dPicker($('.dpicker__body'), date);
        next = true;
    })

    arrowPrev.addEventListener('click', () => {
        !next ? index-- : 0;
        console.log(index);
        date = new Date(year, month + index - 1, today);
        dPicker($('.dpicker__body'), date);
        next = false;
    });
}

const clickToActiveRange = e => {
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

const hoverOnActiveRange = e => {
    if ($('.dpicker__item.last').length) {
        return false;
    }
    console.log(!!$(e.target).attr('data-weekend'))
    if ($('.dpicker__item.first').length) {
        $('.dpicker__body .dpicker__item').each((i, el) => {
            if ($('.dpicker__item.first').index() <= i && i <= $(e.currentTarget).index() && !$(el).hasClass('disabled')) {
                $(el).addClass('ranged');
            } else {
                $(el).removeClass('ranged');
            }
        })
    }
}



window.onload = () => {

    $('body').on('click', '.result__choose', e => {
        if ($(e.currentTarget).hasClass('result__choose--order')) {
            $('.dpicker').addClass('dpicker--order');
            dPicker($('.dpicker__body'), new Date());
            switchMonth();
        } else {
            $('.dpicker').removeClass('dpicker--order');
            dPicker($('.dpicker__body'), new Date());
            switchMonth();
        }
        popup(e, '.dpicker', '.result__choose');
        clicked = $(e.currentTarget);
    });
    dPicker($('.dpicker__body'), new Date());
    switchMonth();
    $(document).on('click', '.dpicker__body .dpicker__item', e => {
        clickToActiveRange(e);
    });
    $(document).on('mouseover', '.dpicker__body .dpicker__item', e => {
        hoverOnActiveRange(e);
    });

    $('.dpicker__checkbox').on('change', () => {
        $('.dpicker__item[data-weekend]').toggleClass('disabled weekend');
    });

}