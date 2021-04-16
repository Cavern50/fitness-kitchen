const mobile = $(window).width() < 1240;

//навешиваем  обработчики открытия и закрытия на модалки
const bindModalListeners = modalArr => {
    modalArr.forEach(obj => {
        let jQTrigger = $(obj.trigger);
        let jQModal = $(obj.modal);
        jQTrigger.on('click', function () {
            stopScroll('body');
            jQModal.addClass('active');
        });

        jQModal.on('click', function (e) {
            if ($(e.target).hasClass('modal')) {
                $(this).removeClass('active');
                freeScroll();
            }
        });

        jQModal.find('[data-close]').on('click', function () {
            jQModal.removeClass('active');
            freeScroll();
        });

        $(document).keydown((e) => {
            if (e.keyCode === 27) {
                $('.modal').removeClass('active');
                freeScroll();
                return false;
            }
        });
    });
}

const stopScroll = (item = 'body') => {
    let documentWidth = parseInt(document.documentElement.clientWidth),
        windowsWidth = parseInt(window.innerWidth),
        scrollbarWidth = windowsWidth - documentWidth;
    $(item).attr("style", 'overflow: hidden; padding-right: ' + scrollbarWidth + 'px');
}

const freeScroll = (item = 'body') => {
    $(item).attr("style", '');
}

const list = (box, e) => {
    const current = $(e.currentTarget),
        parent = $(e.currentTarget).closest('div');
    if (parent.hasClass('open')) {
        let value = current.find('[class*=value]').text();
        parent.removeClass('open');
        current.closest(parent).attr('style', '');
        current.siblings('button').removeClass('active');
        current.addClass('active');
        current.siblings('input[type=hidden]').val(value);

    } else {
        let height = 0;
        $(box).removeClass('open').attr('style', '');
        parent.addClass('open');
        current.closest(parent).find('button').each((i, el) => {
            height += $(el).outerHeight(true);
        });
        current.closest(parent).css('height', height);
    }
}


const switchActive = e => {
    if (!$(e.currentTarget).hasClass('active')) {
        $(e.currentTarget).siblings().removeClass('active');
        $(e.currentTarget).addClass('active');
    }
}

const createYouTubeEmbedLink = (btn, container) => {
    $(btn).each((i, el) => {
        let link = $(el).attr('data-src'),
            linkStart = 'https://www.youtube.com/embed/',
            linkEnd = '?rel=0&showinfo=0&autoplay=1';
        let newLink = linkStart + link.slice(link.indexOf('=') + 1, link.length) + linkEnd;
        $(el).on('click', function () {
            $(this).parent(container).empty().append(`<iframe class="about__frame" src="${newLink}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
        })
        $(el).siblings('img').attr('src', 'http://img.youtube.com/vi/' + newLink.slice(newLink.indexOf('embed') + 6, newLink.indexOf('?')) + '/0.jpg')
    });
};

const scrollToAnchor = e => {
    e.preventDefault();
    const aid = $(e.currentTarget).attr("href");
    $('html,body').animate({scrollTop: $(aid).offset().top},'slow');
}







// const isVisible = (el) => {
//     let t = $(el),
//         w = $(window),
//         wt = w.scrollTop(),
//         tt = t.offset().top,
//         tb = tt + t.height();
//     return (tb <= wt + w.height()) && (tt >= wt);
// }


const parallaxEffect = (items) => {
    items.forEach((el, i) => {
        const startPos = parseInt(getComputedStyle(el)['top']);
        let cur,
        anchor;
        window.addEventListener('scroll', () => {
            anchor = el.getBoundingClientRect().top;
            if (anchor >= 0) {
                cur = el.getBoundingClientRect().top + document.body.scrollTop;
                el.style.top = startPos + (cur * 0.3) + 'px';
            }
        })
    })
}



// let lastScrollTop = 0;
// const circleAnim = (el) => {
//     const st = $(window).scrollTop(),
//         range = $(el).attr('data-range').split(',');
//     let top = parseInt($(el).attr('data-top'));
//     if (st < lastScrollTop) {
//         if (top < range[1]) {
//             $(el).attr('data-top', top += 7)
//                 .css('top', top + 'px')
//         }
//     } else {
//         if (top > range[0]) {
//             $(el).attr('data-top', top -= 7)
//                 .css('top', top + 'px')
//         }
//     }
//     lastScrollTop = st;
// }

const popup = (e, popup, button) => {
    const current = $(e.currentTarget);
    if ($(popup).hasClass('active') && !$(e.target).closest(popup).length) {
        $(popup).removeClass('active');
    }
    if ($(e.target).closest(button).length && !$(popup).hasClass('active')) {
        $(popup).addClass('active');
    }
}

$().ready(() => {

    bindModalListeners([{
        trigger: '.header__basket',
        modal: '.modal--cart'
    }]);

    $("a[href^='#'").on( 'click', e => {
        scrollToAnchor(e);
    });

    if (!mobile) parallaxEffect(document.querySelectorAll('.circle'));

    // if (!mobile) {
    //     $(window).on('scroll', e => {
    //         $('.circle').each((i, el) => {
    //             // const byDefault = $(el).attr('data-default');
    //             // if (i === 1) console.log(isVisible(el));
    //             // if (isVisible(el)) {
    //             //     circleAnim(el);
    //             // }
    //             // else {
    //             //     $(el).attr('data-range', byDefault).css('top', byDefault + 'px');
    //             // }
    //         })
    //     })
    // }


    $('.result__item').on('click', e => {
        list('.result__box', e);
    });

    $('.order__item').on('click', e => {
        list('.order__box', e);
    })
    $('.cart__city').on('click', e => {
        list('.cart__box', e);
    })
    $('.calc__checkbox').on('click', e => {
        switchActive(e);
    });
    $('.choose__program').on('click', e => {
        switchActive(e);
        $('.choose__container').attr('data-program', $(e.currentTarget).attr('data-name'));
    });
    $('.choose__day').on('click', e => {
        switchActive(e);
    });
    $('.header__burger').on('click', e => {
        $(e.currentTarget).toggleClass('active');
        $('.header__nav').toggleClass('active');
        if ($(e.currentTarget).hasClass('active')) {
            stopScroll();
        } else {
            freeScroll();
        }
    })
    $('body').on('click', e => {
        popup(e, '.dpicker', '.result__choose');
    });
});