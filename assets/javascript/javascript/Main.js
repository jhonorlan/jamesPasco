import {
    Tool
} from "../modules/Tool.js"

let TOOL = new Tool()

function Cards() {
    let CaseStudies = [{
        head: '2018 - 2019',
        main: 'Basic UX - design resources for inVision Studio',
        button: 'View Case Study',
        image: "./assets/images/image/cards-background/tile_basicux-480.jpg",
        Isnew: true
    }, {
        head: '2017',
        main: 'Triniso - responsive eComerse website design',
        button: 'View Case Study',
        image: "./assets/images/image/cards-background/tile_triniso-480.jpg",
        Isnew: false
    }, {
        head: '2017',
        main: 'Symova - responsive website design',
        button: 'View Case Study',
        image: "./assets/images/image/cards-background/tile_symova-480.jpg",
        Isnew: false
    }, ]
    let PersonalCards = [{
        head: '2019',
        main: 'Iceland - landscapes & vistas',
        button: 'View Project',
        image: "./assets/images/image/cards-background/tile_iceland.jpg",
        Isnew: true
    }, {
        head: '2013 - 2019',
        main: 'Photography',
        button: 'View Project',
        image: "./assets/images/image/cards-background/tile_photography.jpg",
        Isnew: false
    }, {
        head: '2008 - 2010',
        main: 'Drawings',
        button: 'View Project',
        image: "./assets/images/image/cards-background/tile_pencildrawings.jpg",
        Isnew: false
    }, ]
    let InstagramCards = [{
        image: './assets/images/image/instagram/instagram3.jpg',
        icon: 'instagram',
        text: `I'm happy to announce that my website has been featured on Flux channel by Ran Segall in the "TOP 5 STUNNING PORTFOLIO WEBSITES" YouTube video! 🤩

        It took me by a surprise as I was already a subscriber to the channel, and while watching this video to take a look at some inspirations I suddenly saw my face... 😅
        
        Follow the link (LINK IN BIO) to hear what Ran has to tell about my website (the second one, around 4:25). Thanks @ransegall , I'm happy that it received such a positive feedback! 😁🍾 https://www.youtube.com/watch?v=R7aM6s-x1c0
        `,
        heart: 70
    }, {
        image: './assets/images/image/instagram/instagram2.jpg',
        icon: 'instagram',
        text: `I just published a new case study on my portfolio! 😁 Please check link in my bio. It is quite an old project but since I had the case study almost complete, I decided to finish it and put on my website. I hope that you will like it! 😊

        Project info:
        Less Doing, More Living was a conference about productivity and entrepreneurship hosted by Ari Meisel, author of two bestselling books: “The Art of Less Doing” and “The Replaceable Founder”. The event lasted for three days and took place in the Scholastic Building in the heart of Manhattan, New York.
        
        From the design perspective, the goal was to create an elegant, simple and engaging website focused on selling the conference tickets; the website was meant to have a checkout form and provide information about the event, the speakers, schedule, and venue.`,
        heart: 74
    }, {
        image: './assets/images/image/instagram/instagram1.jpg',
        icon: 'instagram',
        text: `Getting back to work after a long vacation is never easy 🙃 After several weeks in Iceland and Faroe Islands I really missed the green color so I decided to put some flowers in my home office. By some I mean over 20 😅 There are several benefits of having green plants in your workspace: they clean the air, increase productivity and reduce stress levels. I will test that in upcoming weeks when working on some new projects 😉`,
        heart: 80
    }, {
        image: './assets/images/image/instagram/instagram1.jpg',
        icon: 'instagram',
        text: `Getting back to work after a long vacation is never easy 🙃 After several weeks in Iceland and Faroe Islands I really missed the green color so I decided to put some flowers in my home office. By some I mean over 20 😅 There are several benefits of having green plants in your workspace: they clean the air, increase productivity and reduce stress levels. I will test that in upcoming weeks when working on some new projects 😉`,
        heart: 80
    }, ]


    createCards('.grid-card-lists.cards', CaseStudies)
    createCards('.personal-card-lists.cards', PersonalCards)
    createCards('.instagram-card-lists.cards.flex', InstagramCards, {
        flex: true,
        drag: true
    })
}

function createCards(el, obj, options) {

    let parent = TOOL.getEl(el)
    Array.isArray(obj) ? obj.forEach(newObj => {
        create(newObj, options)
    }) : create(obj, options)

    function create(obj, options) {

        if (!options) {
            let {
                head,
                main,
                button,
                image,
                Isnew
            } = obj
            let heading = TOOL.createEl({
                    el: 'DIV',
                    className: 'card-heading',
                    append: TOOL.createEl({
                        el: 'SPAN',
                        append: head
                    })
                }),
                mainText = TOOL.createEl({
                    el: 'DIV',
                    className: 'card-main-text',
                    append: TOOL.createEl({
                        el: 'h2',
                        append: main
                    })
                }),
                buttonText = TOOL.createEl({
                    el: 'DIV',
                    className: 'card-button',
                    append: TOOL.createEl({
                        el: 'SPAN',
                        append: button
                    })
                }),
                top = TOOL.createEl({
                    el: 'DIV',
                    className: 'top',
                    append: [heading, mainText, buttonText]
                }),
                img = TOOL.createEl({
                    el: 'DIV',
                    className: 'center-image',
                    append: TOOL.createEl({
                        el: 'img',
                        src: image
                    })
                }),
                left = !Isnew ? false : TOOL.createEl({
                    el: 'DIV',
                    className: 'left-circle',
                    append: TOOL.createEl({
                        el: 'SPAN',
                        append: 'NEW'
                    })
                }),
                fulsizeBackground = TOOL.createEl({
                    el: 'DIV',
                    className: 'whole-background-full-size'
                }),
                Card = TOOL.createEl({
                    el: 'DIV',
                    className: 'card',
                    append: [top, left, img, fulsizeBackground],
                    attr: {
                        data_aos: 'fade-up'
                    }
                })
            parent.appendChild(Card)
        } else if (options.flex) {
            let {
                text,
                image,
                icon,
                heart
            } = obj
            let textContent = TOOL.createEl({
                    el: 'DIV',
                    className: 'text-content',
                    append: TOOL.createEl({
                        el: 'SPAN',
                        append: text
                    })
                }),
                iconContent = TOOL.createEl({
                    el: 'DIV',
                    className: 'icon-content',
                    append: icon
                }),
                heartContent = TOOL.createEl({
                    el: 'DIV',
                    className: 'heart-content',
                    append: TOOL.createEl({
                        el: 'SPAN',
                        append: heart
                    })
                }),
                contents = TOOL.createEl({
                    el: 'DIV',
                    className: 'content',
                    append: [iconContent, textContent, heartContent]
                }),
                textContainer = TOOL.createEl({
                    el: 'DIV',
                    className: 'text-container',
                    append: contents
                }),
                background = TOOL.createEl({
                    el: 'DIV',
                    className: 'card-bg-image-full-size',
                    append: TOOL.createEl({
                        el: "IMG",
                        src: image
                    })
                }),
                Card = TOOL.createEl({
                    el: 'DIV',
                    className: 'card',
                    append: [textContainer, background],
                    attr: {
                        data_aos: 'fade-left'
                    }
                })

            parent.appendChild(Card)
        }

        options ? options.drag ? TOOL.DrgToScroll(parent) : false : false
    }
}

function Listener() {
    TOOL.addListener(window, {
        scroll: function (evt) {
            let scrl = document.documentElement.scrollTop,
                backgroundImage = TOOL.getEl('.bg-image-full-size img')
        }
    })

    TOOL.addListener(TOOL.getEl('.right-content.menu'), {
        click: function () {

            let subNav = TOOL.getEl('nav.sub'),
                left = TOOL.getEl('nav .left-content.logo'),
                right = TOOL.getEl('nav .right-content'),
                icon = right.querySelector('.icon'),
                span = this.querySelector('span'),
                text = span.innerHTML,
                newText

            if (subNav.classList.contains('show')) {
                subNav.classList.remove('show')
                subNav.style.top = '-1000px'
            } else {
                subNav.classList.add('show')
                subNav.style.top = 0
            }

            newText = text == 'MENU' ? 'CLOSE' : 'MENU'
            span.innerHTML = newText

            TOOL.toggleHasClass(right, 'active')
            TOOL.toggleClass(icon, 'close', 'hamburger')
            left.querySelectorAll('svg').forEach(svg => {
                TOOL.toggleHasClass(svg, 'active')
            })
        }
    })
}

function init() {
    Cards()
    Listener()
    AOS.init()
}


init()