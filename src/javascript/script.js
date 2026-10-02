$(document).ready(function() {
    $('#mobile_btn').on('click', function () {
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
    });

    const sections = $('section');
    const navItems = $('.nav-item');

    $(window).on('scroll', function () {
        const header = $('header');
        const scrollPosition = $(window).scrollTop();

        let activeSectionIndex = 0;

        if (scrollPosition <= 0) {
            header.css('box-shadow', 'none');
        } else {
            header.css('box-shadow', '5px 1px 5px rgba(0, 0, 0, 0.1)');
        }

        sections.each(function(i) {
    const section = $(this);
    const headerHeight = header.outerHeight();

    const sectionTop = section.offset().top - headerHeight - 40; // ajuste fino aqui
    const sectionBottom = sectionTop + section.outerHeight();

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        activeSectionIndex = i;
        return false;
    }
});

        navItems.removeClass('active');

const activeSection = $(sections[activeSectionIndex]).attr('id');
$('.nav-item a[href="#' + activeSection + '"]').parent().addClass('active');

const scrollTop = $(window).scrollTop();
const windowHeight = $(window).height();
const documentHeight = $(document).height();

if (scrollTop + windowHeight >= documentHeight - 50) {
    navItems.removeClass('active');
    $('.nav-item a[href="#footer"]').parent().addClass('active');
}


    });

    ScrollReveal().reveal('#cta', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.dish', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('#testimonial_chef', {
        origin: 'left',
        duration: 1000,
        distance: '20%'
    })

    ScrollReveal().reveal('.feedback', {
        origin: 'right',
        duration: 1000,
        distance: '20%'
    })
});


ScrollReveal().reveal('.box-atendimento', {
    distance: '40px',
    duration: 800,
    easing: 'ease',
    origin: 'bottom',
    interval: 200
});

ScrollReveal().reveal('.faq-item', {
    distance: '30px',
    duration: 700,
    easing: 'ease',
    origin: 'bottom',
    interval: 100
});



const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const btn = item.querySelector('.faq-question');

  btn.addEventListener('click', () => {

    // fecha outros (comportamento premium)
    faqItems.forEach(i => {
      if(i !== item) {
        i.classList.remove('active');
      }
    });

    // toggle atual
    item.classList.toggle('active');
  });
});
