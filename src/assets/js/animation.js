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
  delay: function(el, i) { return i * 250 },
  direction: 'normal'
}).add({
  targets: '.header-logo-path path',
  fill: '#FFFFFF'
}).add({
  targets: '.header-logo-path svg',
  width: '60px'
}, 1500 ).add({
  targets: 'header',
  backgroundColor: '#9163cc'
}, '-=600').add({
  targets: '.header-logo-typography',
  width: '100%',
  height: '98.31px'
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