const person = {
    age: 0,
    height: 0,
    weight: 0
}

const params = {
    goal: $('.goal.active').attr('data-ratio'),
    gender: $('.gender.active').attr('data-ratio'),
    level: $('.level.active').attr('data-ratio')
}


const programs = {
    Lite: [0, 1200],
    Fit: [1200, 1400],
    Active: [1400, 1600],
    Balance: [1600, 2000],
    Vitality: [2200, 99999]
}

let blocker = true, sum = 0;

const paramsCalculate = e => {
    const current = $(e.target);
    if (current.hasClass('goal')) params.goal = current.attr('data-ratio');
    if (current.hasClass('gender')) params.gender = current.attr('data-ratio');
    if (current.hasClass('level')) params.level = current.attr('data-ratio');
}


const personCalculate = e => {
    const current = $(e.target);
    blocker = false;
    if (current.hasClass('age')) person.age = current.val();
    if (current.hasClass('height')) person.height = current.val();
    if (current.hasClass('weight')) person.weight = current.val();
    for (let key in person) {
        if (person[key] < 10) blocker = true;
    }
}

const calculate = () => {
    sum = Math.round(((9.99 * person.weight) + (6.25 * person.height) - (4.92 * person.age) - +params.gender) * params.level * params.goal);
    console.log(sum);
    for (let key in programs) {
        if (sum > programs[key][0] && sum < programs[key][1]) {
            $(`.choose__program[data-name="${key}"]`).trigger('click');
        }
    }
}

$(window).on('load', () => {
    $('.calc__input').on('input', e => {
        personCalculate(e);
        if (!blocker) calculate();
    })
    $('.calc__checkbox').on('click', e => {
        paramsCalculate(e);
        if (!blocker) calculate();
    })
})