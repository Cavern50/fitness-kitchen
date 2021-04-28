


const chooseProgramSlider = () => {
    $('.choose__programs')
        .addClass('owl-carousel')
        .owlCarousel({
            autoWidth: true,
            margin: 11
        });
}

const chooseDaySlider = () => {
    $('.choose__days')
        .addClass('owl-carousel')
        .owlCarousel({
            autoWidth: true,
            margin: 14
        });
}

const menuSlider = () => {
    $('.specific__day.active')
        .addClass('owl-carousel')
        .owlCarousel({
            autoWidth: true,
            margin: 8,
            navContainer: '.choose__nav',
            navText: ['<svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg"><circle r="23" transform="matrix(-1 0 0 1 23 23)" fill="#F2F2F2"/><path fill-rule="evenodd" clip-rule="evenodd" d="M24.9998 18.0002C25.2558 18.0002 25.5118 18.0984 25.7068 18.2938C26.0978 18.6857 26.0978 19.3191 25.7068 19.7109L22.4018 23.0232L25.5818 26.3235C25.9648 26.7224 25.9538 27.3568 25.5568 27.7406C25.1588 28.1244 24.5258 28.1134 24.1428 27.7165L20.2808 23.7077C19.9018 23.3139 19.9068 22.6895 20.2928 22.3026L24.2928 18.2938C24.4878 18.0984 24.7438 18.0002 24.9998 18.0002" fill="#222B45"/></svg>', '<svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="23" cy="23" r="23" fill="#F2F2F2"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21.0002 18.0002C20.7442 18.0002 20.4882 18.0984 20.2932 18.2938C19.9022 18.6857 19.9022 19.3191 20.2932 19.7109L23.5982 23.0232L20.4182 26.3235C20.0352 26.7224 20.0462 27.3568 20.4432 27.7406C20.8412 28.1244 21.4742 28.1134 21.8572 27.7165L25.7192 23.7077C26.0982 23.3139 26.0932 22.6895 25.7072 22.3026L21.7072 18.2938C21.5122 18.0984 21.2562 18.0002 21.0002 18.0002" fill="#222B45"/><circle cx="23" cy="23" r="22" stroke="#F2F2F2" stroke-width="2"/></svg>'],
        })
};


const switchProgram = () => {
    const currentProgram = $('.choose__program.active').attr('data-name');
    $('.specific__day').hide().removeClass('active animated');
    $(`.specific[data-program=${currentProgram}] .specific__day:first-child`)
        .fadeIn(500)
        .addClass('active animated');
    $('.choose__day').removeClass('active');
    $('.choose__day:first-child').addClass('active');
    $('.result__name').text(currentProgram);
    $('.result__amount').text($('.choose__program.active .choose__programAmount').text());
}

const switchDay = that => {
    const currentProgram = $('.choose__program.active').attr('data-name'),
        currentDay = that.attr('data-day');
    $(`.specific[data-program="${currentProgram}"]`)
        .find('.specific__day')
        .each((i, el) => {
            if ($(el).attr('data-day') === currentDay) {
                $('.specific__day').removeClass('active animated');
                $(el).addClass('active');
            }
        })
}

$(window).on('load', () => {
    if (mobile) {
        chooseProgramSlider();
        chooseDaySlider();
        menuSlider();
        $('.owl-carousel').each((i,el) => {
            $(el).on('click', (e) => {
                let index = $(e.target).parent().index(),
                    count = $(el).find('.owl-item').length;
                console.log(count);
                if(index > 0 && index < count - 1) {
                    $(el).trigger('to.owl.carousel', index - 1);
                }
            });
        })
    }
    $('.choose__program').on('click', e => {
        if (mobile) {
            $('.specific__day.active').trigger("destroy.owl.carousel");
            $('.choose__days').trigger("destroy.owl.carousel");
        }
        switchActive($(e.currentTarget), '.choose__program');
        switchProgram();
        $('.choose__container').attr('data-program', $(e.currentTarget).attr('data-name'));
        if (mobile) {
            menuSlider();
            chooseDaySlider();
        }
    });


    if (!mobile) {
        $('.choose__day').on('click', e => {
            switchActive($(e.currentTarget), '.choose__day');
            switchDay($(e.currentTarget));
        });
    } else {
        $('.choose__days').on('click', 'button', e => {
            $('.specific__day.active').trigger("destroy.owl.carousel");
            switchActive($(e.currentTarget), '.choose__day');
            switchDay($(e.currentTarget));
            menuSlider();
        })
    }
    
})


