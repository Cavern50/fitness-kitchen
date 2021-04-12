//навешиваем  обработчики открытия и закрытия на модалки
const bindModalListeners = modalArr => {
    modalArr.forEach(obj => {
        let jQTrigger = $(obj.trigger);
        let jQModal = $(obj.modal);

        jQTrigger.on('click', function() {
            stopScroll('body');
            jQModal.addClass('active');
        });

        jQModal.on('click', function(e) {
            if ($(e.target).hasClass('modal')) {
                $(this).removeClass('active');
                freeScroll();
            }
        });

        jQModal.find('.modal__close').on('click', function() {
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

const stopScroll = (item='body') => {
    let documentWidth = parseInt(document.documentElement.clientWidth),
        windowsWidth = parseInt(window.innerWidth),
        scrollbarWidth = windowsWidth - documentWidth;
    $(item).attr("style", 'overflow: hidden; padding-right: ' + scrollbarWidth + 'px');
}

const freeScroll = (item='body') => {
    $(item).attr("style", '');
}

const list = (button, box, e) => {
    $(box).toggleClass('open');
    if ($(box).hasClass('open')) {
        let height = 0;
        $(e.currentTarget).closest(box).find('button').each((i, el) => {
            height += $(el).outerHeight(true);
        });
        $(e.currentTarget).closest(box).css('height', height);
    } else {
        $(e.currentTarget).closest(box).attr('style', '');
        $(e.currentTarget).siblings(button).removeClass('active');
        $(e.currentTarget).addClass('active');
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


$().ready(() => {
    bindModalListeners([]);
    $('.result__item').on('click', e => {
        list('.result__item', $(e.target).closest('div'), e);
    });
    $('.calc__checkbox').on('click', e => {
        switchActive(e);
    });
    $('.choose__program').on('click', e => {
        switchActive(e);
    });
    $('.choose__day').on('click', e => {
        switchActive(e);
    });
});


