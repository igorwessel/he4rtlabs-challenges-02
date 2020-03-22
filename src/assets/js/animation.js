// Logo animation
const logo = anime.timeline({
  easing: 'easeInOutSine',
  duration: 1500
})

logo.add({
  targets: 'path',
  strokeDashoffset: [anime.setDashoffset, 0],
  fill: {
    value: '#9163cc',
    duration: 500,
    delay: 850
  },
  delay: function(el, i) { return i * 250 },
  direction: 'normal'
}).add({
  targets: 'path',
  fill: '#FFFFFF'
}).add({
  targets: 'svg',
  width: '60px'
}, 1500).add({
  targets: 'header',
  backgroundColor: '#9163cc'
}, '-=600')

// Show after logo animation finish
anime({
  targets: ['main', 'footer'],
  opacity: [0, 1],
  easing: 'easeInOutSine',
  duration: 1000,
  delay: 2000
})