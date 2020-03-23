// Logo animation
const logo = anime.timeline({
  easing: 'easeInOutSine',
  duration: 1500
})

logo.add({
  targets: '.header-logo-path path',
  strokeDashoffset: [anime.setDashoffset, 0],
  fill: {
    value: '#9163cc',
    duration: 500,
    delay: 850
  },
  delay: function (el, i) { return i * 250 },
  direction: 'normal'
}).add({
  targets: '.header-logo-path path',
  fill: '#FFFFFF'
}).add({
  targets: '.header-logo-path svg',
  width: '60px'
}, 1500).add({
  targets: 'header',
  backgroundColor: '#9163cc',
  begin: () => {
    document.querySelector('main').style.display = 'grid'
    document.querySelector('footer').style.display = 'flex'
  }
}, '-=600').add({
  targets: '.header-logo-typography',
  width: '100%',
  height: '96.9844px'
}, '-=600').add({
  targets: '.header-logo-typography h1',
  opacity: [.5, 1],
  duration: 1000,
  begin: () => {
    document.querySelector('.header-logo-typography h1').style.display = 'block';
  }
}, '-=1000')

// Show after logo animation finish
anime({
  targets: ['main', 'footer'],
  opacity: [0, 1],
  easing: 'easeInOutSine',
  duration: 1000,
  delay: 2000
})

// Animate

const headerHeartTypography = document.querySelector('.header-logo-img img')

const scale = (element, scale, duration) => {
  anime.remove(element)
  anime({
    targets: element,
    scale: scale,
    duration: duration
  })
}

const scaleHeartTypography = () => {
  scale(headerHeartTypography, 1.2, 1000)
}

const scaleToNormalHeartTypography = () => {
  scale(headerHeartTypography, 1, 1000)
}

headerHeartTypography.addEventListener('mouseenter', scaleHeartTypography, false)
headerHeartTypography.addEventListener('mouseleave', scaleToNormalHeartTypography, false)
headerHeartTypography.addEventListener('click', (e) => {
  open('https://labs.heartdevs.com')
})
