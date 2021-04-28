// const _token = 'IGQVJYWkEzV1JSdE1xQWlFdHRWcFJtNW5lRHFldlFCQzd4d3ZAiajBObXpxQkQxeDYwTHF4WlFsZATczYWpCV01mMjktX3plNk9xbzc0dnpVczIzZAEIteHYtanZAza0oySkt1dEU1WGo0Y0IzZAnExdEMzYQZDZD';

// const createImage = (array) => {
//     const wrap = ``;
//     const result = $(array).map((i, el) => {
//         $(el).
//     })
// }



// $.ajax({
//     url: `https://graph.instagram.com/me/media?fields=media_url,timestamp,caption&edges=media&access_token=${_token}`,
//     dataType: 'jsonp',
//     type: 'GET',
//     success: function(data){
//         console.log(data);
//     },
//     error: function(data){
//         console.log(data);
//     }
// });

const initImages = (data) => {
    const item = data.edge_owner_to_timeline_media.edges;
    console.log(data, item)
    const result = item.map(info => {
        return `<div class="reviews__item">
            <img class='reviews__image' src="${info.node.display_url}" alt="">
            <div class="reviews__description">
                <p class="reviews__text">${info.node.edge_media_to_caption.edges[0].node.text}</p>
                <div class="reviews__block">
                    <span class="reviews__info reviews__info--like">
                        <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 18C9.355 17.428 8.626 16.833 7.855 16.2H7.845C5.13 13.98 2.053 11.468 0.694 8.45803C0.247517 7.49975 0.0109039 6.45715 -1.14822e-05 5.40003C-0.00299328 3.94951 0.578771 2.55901 1.61381 1.54279C2.64885 0.526575 4.04978 -0.0295798 5.5 2.56451e-05C6.68063 0.00189045 7.83584 0.343107 8.828 0.983026C9.26397 1.26599 9.65842 1.60828 10 2.00003C10.3435 1.60982 10.738 1.26773 11.173 0.983026C12.1647 0.34298 13.3197 0.0017442 14.5 2.56451e-05C15.9502 -0.0295798 17.3512 0.526575 18.3862 1.54279C19.4212 2.55901 20.003 3.94951 20 5.40003C19.9898 6.45884 19.7532 7.50322 19.306 8.46303C17.947 11.473 14.871 13.984 12.156 16.2L12.146 16.208C11.374 16.837 10.646 17.432 10.001 18.008L10 18ZM5.5 2.00003C4.56851 1.98837 3.67007 2.34487 3 2.99203C2.35439 3.62619 1.99355 4.49507 1.99992 5.40003C2.01133 6.17053 2.18583 6.92988 2.512 7.62803C3.15351 8.92673 4.01911 10.1021 5.069 11.1C6.06 12.1 7.2 13.068 8.186 13.882C8.459 14.107 8.737 14.334 9.015 14.561L9.19 14.704C9.457 14.922 9.733 15.148 10 15.37L10.013 15.358L10.019 15.353H10.025L10.034 15.346H10.039H10.044L10.062 15.331L10.103 15.298L10.11 15.292L10.121 15.284H10.127L10.136 15.276L10.8 14.731L10.974 14.588C11.255 14.359 11.533 14.132 11.806 13.907C12.792 13.093 13.933 12.126 14.924 11.121C15.974 10.1236 16.8397 8.94854 17.481 7.65003C17.8131 6.94583 17.9901 6.17853 18 5.40003C18.0042 4.49786 17.6435 3.63232 17 3.00003C16.3312 2.34995 15.4326 1.99051 14.5 2.00003C13.3619 1.99035 12.2739 2.46739 11.51 3.31103L10 5.05103L8.49 3.31103C7.72606 2.46739 6.63808 1.99035 5.5 2.00003Z" fill="#3F4C5A"/>
                        </svg>
                        <span>${info.node.edge_liked_by.count}</span>
                    </span>
                    <span class="reviews__info reviews__info--comment">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.291 18.824L-1.57595e-07 20L1.176 14.709C0.401532 13.2604 -0.00247329 11.6426 -1.57595e-07 10C-1.57595e-07 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20C8.35735 20.0025 6.73962 19.5985 5.291 18.824V18.824ZM5.581 16.711L6.234 17.061C7.39255 17.6801 8.68639 18.0027 10 18C11.5823 18 13.129 17.5308 14.4446 16.6518C15.7602 15.7727 16.7855 14.5233 17.391 13.0615C17.9965 11.5997 18.155 9.99113 17.8463 8.43928C17.5376 6.88743 16.7757 5.46197 15.6569 4.34315C14.538 3.22433 13.1126 2.4624 11.5607 2.15372C10.0089 1.84504 8.40034 2.00346 6.93853 2.60896C5.47672 3.21447 4.22729 4.23984 3.34824 5.55544C2.46919 6.87103 2 8.41775 2 10C2 11.334 2.325 12.618 2.94 13.766L3.289 14.419L2.634 17.366L5.581 16.711V16.711Z" fill="#3F4C5A"/>
                        </svg>                            
                        <span>${info.node.edge_media_to_comment.count}</span>
                    </span>
                </div>
            </div>
        </div>`
    });
    $('.reviews__slider').append(result);
    $('.reviews__slider').addClass('owl-carousel').owlCarousel({
        autoWidth: true,
        nav: true,
        dots: false,
        margin: 20,
        navContainer: '.reviews__nav',
        navText: ['<svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg"><circle r="23" transform="matrix(-1 0 0 1 23 23)" fill="#F2F2F2"/><path fill-rule="evenodd" clip-rule="evenodd" d="M24.9998 18.0002C25.2558 18.0002 25.5118 18.0984 25.7068 18.2938C26.0978 18.6857 26.0978 19.3191 25.7068 19.7109L22.4018 23.0232L25.5818 26.3235C25.9648 26.7224 25.9538 27.3568 25.5568 27.7406C25.1588 28.1244 24.5258 28.1134 24.1428 27.7165L20.2808 23.7077C19.9018 23.3139 19.9068 22.6895 20.2928 22.3026L24.2928 18.2938C24.4878 18.0984 24.7438 18.0002 24.9998 18.0002" fill="#222B45"/></svg>', '<svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="23" cy="23" r="23" fill="#F2F2F2"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21.0002 18.0002C20.7442 18.0002 20.4882 18.0984 20.2932 18.2938C19.9022 18.6857 19.9022 19.3191 20.2932 19.7109L23.5982 23.0232L20.4182 26.3235C20.0352 26.7224 20.0462 27.3568 20.4432 27.7406C20.8412 28.1244 21.4742 28.1134 21.8572 27.7165L25.7192 23.7077C26.0982 23.3139 26.0932 22.6895 25.7072 22.3026L21.7072 18.2938C21.5122 18.0984 21.2562 18.0002 21.0002 18.0002" fill="#222B45"/><circle class="timer" cx="23" cy="23" r="22" stroke="#FF7A6C" stroke-width="2"/></svg>'],
        loop: true,
        onTranslate: e => timer('.reviews__slider', '.reviews__nav', true),
        responsive: {
            1240: {
                autoWidth: false,
                items: 3
            }
        }
    });
    timer('.reviews__slider', '.reviews__nav', false);
}

$.instagramFeed({
    'username': 'zyranov_18',
    // 'display_profile': true,
    // 'display_biography': true,
    // 'display_gallery': true,
    // 'display_captions': true,
    'max_tries': 4,
    // 'styling': true,
    'items': 12,
    // 'items_per_row': 4,
    // 'margin': 1,
    // 'lazy_load': true,
    'host': 'https://images' + ~~(Math.random() * 3333) + '-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=https://www.instagram.com/',
    'on_error': console.log,
    'callback': initImages,
});